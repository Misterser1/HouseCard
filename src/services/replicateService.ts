// Replicate Service for Image Animation
// Uses Stable Video Diffusion for realistic image animation

const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;

// Available models for animation (2025 best options)
type AnimationModel = 'wan' | 'veo' | 'seedance' | 'minimax' | 'svd' | 'kling' | 'luma';
const CURRENT_MODEL: AnimationModel = 'wan'; // Wan 2.5 - best open-source, excellent texture preservation

interface AnimationResult {
  videoUrl: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  error?: string;
}

interface PredictionResponse {
  id: string;
  status: string;
  output?: string | string[];
  error?: string;
  logs?: string;
}

export interface ProgressInfo {
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  progress: number; // 0-100
  message: string;
  elapsedSeconds: number;
}

export type ProgressCallback = (info: ProgressInfo) => void;

// Use proxy in development to avoid CORS
const API_BASE = import.meta.env.DEV ? '/api/replicate' : 'https://api.replicate.com';

// Create animation from image using Stable Video Diffusion
export async function createImageAnimation(
  imageUrl: string,
  onProgress?: ProgressCallback
): Promise<AnimationResult> {
  if (!REPLICATE_API_TOKEN) {
    console.error('REPLICATE_API_TOKEN not set');
    return { videoUrl: '', status: 'failed', error: 'API token not configured' };
  }

  const startTime = Date.now();

  onProgress?.({
    status: 'starting',
    progress: 0,
    message: 'Запуск генерации...',
    elapsedSeconds: 0
  });

  try {
    // Model configurations for different providers (2025 best models)
    const modelConfigs = {
      // TOP TIER - Best quality
      wan: {
        // Wan 2.5 FAST - higher quality animation with complex motion
        url: `${API_BASE}/v1/models/wan-video/wan-2.5-i2v-fast/predictions`,
        input: {
          image: imageUrl,
          prompt: 'cinematic establishing shot, locked off tripod camera, gentle wind rustling tree leaves and ornamental grasses, soft clouds slowly drifting across blue sky, sunlight casting warm golden highlights, birds flying in distant background, professional real estate video, 4K quality, photorealistic',
          negative_prompt: 'morphing, warping, distortion, blur, noise, artifacts, camera shake, camera movement, pan, zoom, tilt, dark, underexposed, overexposed, desaturated, cartoon, anime, painting, illustration, cgi',
          duration: 5,
          resolution: '720p',
          enable_prompt_expansion: false,
        }
      },
      veo: {
        // Google Veo 3.1 - state of the art quality
        url: `${API_BASE}/v1/models/google/veo-3.1-fast/predictions`,
        input: {
          image: imageUrl,
          prompt: 'subtle natural movement, gentle wind in trees, soft cloud motion, static camera, preserve all details',
        }
      },
      seedance: {
        // ByteDance Seedance - fast and high quality
        url: `${API_BASE}/v1/models/bytedance/seedance-1-pro-fast/predictions`,
        input: {
          image: imageUrl,
          prompt: 'very subtle movement, gentle breeze, leaves swaying softly, clouds moving slowly, preserve original quality',
        }
      },
      // LEGACY MODELS
      minimax: {
        url: `${API_BASE}/v1/models/minimax/video-01-live/predictions`,
        input: {
          first_frame_image: imageUrl,
          prompt: 'gentle wind moving tree leaves, soft cloud movement in sky',
          prompt_optimizer: false,
        }
      },
      svd: {
        url: `${API_BASE}/v1/models/stability-ai/stable-video-diffusion-img2vid-xt/predictions`,
        input: {
          input_image: imageUrl,
          motion_bucket_id: 30,
          fps: 6,
          cond_aug: 0.02,
          decoding_t: 7,
          seed: 0,
        }
      },
      kling: {
        url: `${API_BASE}/v1/models/kwaivgi/kling-v2.5-turbo-pro/predictions`,
        input: {
          prompt: 'subtle realistic movement, gentle breeze, photorealistic',
          image: imageUrl,
          duration: 5,
          aspect_ratio: '16:9',
        }
      },
      luma: {
        url: `${API_BASE}/v1/models/luma/ray/predictions`,
        input: {
          image: imageUrl,
          prompt: 'very subtle movement, gentle breeze in trees',
          aspect_ratio: '16:9',
          loop: true,
        }
      }
    };

    const config = modelConfigs[CURRENT_MODEL];

    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait',
      },
      body: JSON.stringify({
        input: config.input
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Replicate API error:', response.status, errorText);
      throw new Error(`Replicate API error: ${response.status}`);
    }

    const prediction: PredictionResponse = await response.json();

    onProgress?.({
      status: 'processing',
      progress: 10,
      message: 'Задача в очереди...',
      elapsedSeconds: Math.floor((Date.now() - startTime) / 1000)
    });

    // Poll for result with progress
    const result = await pollForResult(prediction.id, startTime, onProgress);
    return result;

  } catch (error) {
    console.error('Animation creation failed:', error);
    onProgress?.({
      status: 'failed',
      progress: 0,
      message: error instanceof Error ? error.message : 'Ошибка генерации',
      elapsedSeconds: Math.floor((Date.now() - startTime) / 1000)
    });
    return {
      videoUrl: '',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Poll Replicate API until prediction is complete
async function pollForResult(
  predictionId: string,
  startTime: number,
  onProgress?: ProgressCallback,
  maxAttempts = 180 // ~6 minutes with 2s intervals
): Promise<AnimationResult> {
  let retryCount = 0;
  const maxRetries = 3;

  for (let i = 0; i < maxAttempts; i++) {
    let response;
    let prediction: PredictionResponse;

    try {
      response = await fetch(
        `${API_BASE}/v1/predictions/${predictionId}`,
        {
          headers: {
            'Authorization': `Token ${REPLICATE_API_TOKEN}`,
          },
        }
      );
      prediction = await response.json();
    } catch (fetchError) {
      // Network error - retry a few times
      retryCount++;
      console.warn(`Poll fetch error (retry ${retryCount}/${maxRetries}):`, fetchError);
      if (retryCount >= maxRetries) {
        throw new Error('Network error during polling');
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
      continue;
    }

    retryCount = 0; // Reset on successful fetch
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

    // Calculate estimated progress based on typical generation time (~5 minutes)
    const estimatedProgress = Math.min(95, 5 + (i * 0.5));

    if (prediction.status === 'starting') {
      onProgress?.({
        status: 'starting',
        progress: Math.min(15, 5 + i),
        message: 'Запуск модели...',
        elapsedSeconds
      });
    } else if (prediction.status === 'processing') {
      // Try to extract progress from logs if available
      let progressMessage = 'Генерация видео...';
      if (prediction.logs) {
        const lines = prediction.logs.split('\n').filter(l => l.trim());
        if (lines.length > 0) {
          const lastLine = lines[lines.length - 1];
          if (lastLine.includes('%')) {
            progressMessage = lastLine;
          }
        }
      }

      onProgress?.({
        status: 'processing',
        progress: estimatedProgress,
        message: progressMessage,
        elapsedSeconds
      });
    }

    if (prediction.status === 'succeeded' && prediction.output) {
      const videoUrl = Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output;

      onProgress?.({
        status: 'succeeded',
        progress: 100,
        message: 'Готово!',
        elapsedSeconds
      });

      return { videoUrl, status: 'succeeded' };
    }

    if (prediction.status === 'failed') {
      onProgress?.({
        status: 'failed',
        progress: 0,
        message: prediction.error || 'Ошибка генерации',
        elapsedSeconds
      });
      return {
        videoUrl: '',
        status: 'failed',
        error: prediction.error || 'Prediction failed'
      };
    }

    // Wait 2 seconds before next poll
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  onProgress?.({
    status: 'failed',
    progress: 0,
    message: 'Превышено время ожидания',
    elapsedSeconds: Math.floor((Date.now() - startTime) / 1000)
  });

  return { videoUrl: '', status: 'failed', error: 'Timeout waiting for result' };
}

// Cache for storing generated animations
const animationCache = new Map<string, string>();

export function getCachedAnimation(imageUrl: string): string | undefined {
  return animationCache.get(imageUrl);
}

export function setCachedAnimation(imageUrl: string, videoUrl: string): void {
  animationCache.set(imageUrl, videoUrl);
}

// LocalStorage persistence for animations
const STORAGE_KEY = 'house_animations';

export function loadAnimationsFromStorage(): Map<string, string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return new Map(Object.entries(parsed));
    }
  } catch (e) {
    console.error('Failed to load animations from storage:', e);
  }
  return new Map();
}

export function saveAnimationToStorage(imageUrl: string, videoUrl: string): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const animations = stored ? JSON.parse(stored) : {};
    animations[imageUrl] = videoUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animations));
  } catch (e) {
    console.error('Failed to save animation to storage:', e);
  }
}
