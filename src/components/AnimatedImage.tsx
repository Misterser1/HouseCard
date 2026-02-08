import { useState, useRef, useEffect, useCallback } from 'react';
import {
  createImageAnimation,
  getCachedAnimation,
  setCachedAnimation,
  loadAnimationsFromStorage,
  saveAnimationToStorage,
} from '../services/replicateService';
import type { ProgressInfo } from '../services/replicateService';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  enableAnimation?: boolean;
  externalSrc?: string; // Public URL for Replicate API (if src is local)
  localVideo?: string; // Pre-generated local video file (skips API call)
  autoPlay?: boolean; // Auto-start video on mount (useful for modals on mobile)
}

type AnimationStatus = 'idle' | 'loading' | 'ready' | 'error';

export function AnimatedImage({
  src,
  alt,
  className = '',
  enableAnimation = true,
  externalSrc,
  localVideo,
  autoPlay = false
}: AnimatedImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // For mobile tap-to-play
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<AnimationStatus>('idle');
  const [progress, setProgress] = useState<ProgressInfo | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // Reset image loaded state when src changes
  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  // Load cached animation on mount or when props change
  useEffect(() => {
    if (!enableAnimation) return;

    // Use local video if provided (pre-generated)
    if (localVideo) {
      setVideoUrl(localVideo);
      setStatus('ready');
      setVideoLoaded(false); // Reset video loaded state
      return;
    }

    // Reset state when localVideo becomes undefined (e.g., switching modes)
    setVideoUrl(null);
    setStatus('idle');
    setVideoLoaded(false);

    const cacheKey = externalSrc || src;

    // Check memory cache first
    const cached = getCachedAnimation(cacheKey);
    if (cached) {
      setVideoUrl(cached);
      setStatus('ready');
      return;
    }

    // Check localStorage
    const storedAnimations = loadAnimationsFromStorage();
    const stored = storedAnimations.get(cacheKey);
    if (stored) {
      setVideoUrl(stored);
      setCachedAnimation(cacheKey, stored);
      setStatus('ready');
    }
  }, [src, externalSrc, localVideo, enableAnimation]);

  // Play/pause video based on hover (desktop) or isPlaying (mobile)
  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    const shouldPlay = isTouchDevice ? isPlaying : isHovering;

    if (shouldPlay) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovering, isPlaying, videoUrl, isTouchDevice]);

  // Reset isPlaying when video URL changes (switching images)
  useEffect(() => {
    setIsPlaying(false);
  }, [src, localVideo]);

  // Auto-play video on mobile when autoPlay is true and video is ready
  useEffect(() => {
    if (autoPlay && isTouchDevice && status === 'ready' && videoUrl) {
      setIsPlaying(true);
    }
  }, [autoPlay, isTouchDevice, status, videoUrl]);

  // Progress callback
  const handleProgress = useCallback((info: ProgressInfo) => {
    setProgress(info);
  }, []);

  // URL to use for API (prefer externalSrc if provided)
  const apiUrl = externalSrc || src;
  const canAnimate = apiUrl.startsWith('http://') || apiUrl.startsWith('https://');

  // Generate animation on first hover (if not cached)
  const handleMouseEnter = async () => {
    setIsHovering(true);

    if (!enableAnimation || status !== 'idle') return;

    // Skip animation if no public URL available
    if (!canAnimate) {
      return;
    }

    // Start generating animation
    setStatus('loading');

    try {
      const result = await createImageAnimation(apiUrl, handleProgress);

      if (result.status === 'succeeded' && result.videoUrl) {
        setVideoUrl(result.videoUrl);
        setCachedAnimation(apiUrl, result.videoUrl);
        saveAnimationToStorage(apiUrl, result.videoUrl);
        setStatus('ready');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Failed to generate animation:', error);
      setStatus('error');
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Touch handler for mobile - tap to toggle play
  const handleTouch = (e: React.TouchEvent) => {
    if (!isTouchDevice || !enableAnimation) return;

    // Only handle if video is ready
    if (status === 'ready' && videoUrl) {
      e.preventDefault();
      setIsPlaying(prev => !prev);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Compute shouldShowVideo once
  const shouldShowVideo = isTouchDevice ? isPlaying : isHovering;

  return (
    <div
      ref={containerRef}
      className={`animated-image-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouch}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Static Image */}
      <img
        src={src}
        alt={alt}
        className={`animated-image-static ${imageLoaded ? 'loaded' : ''}`}
        onLoad={() => setImageLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.4s ease',
          opacity: shouldShowVideo && videoLoaded ? 0 : 1,
        }}
      />

      {/* Animated Video (shown on hover/tap) */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          crossOrigin="anonymous"
          muted
          loop
          playsInline
          preload="metadata"
          className="animated-image-video"
          onCanPlay={() => setVideoLoaded(true)}
          onError={(e) => {
            console.error('Video load error:', e);
            setVideoLoaded(false);
            // Try without crossOrigin if it fails
            const video = e.currentTarget;
            if (video.crossOrigin) {
              video.crossOrigin = '';
              video.load();
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: shouldShowVideo && videoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Loading Progress Indicator */}
      {status === 'loading' && (
        <div
          className="animated-image-loading"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, transparent 100%)',
            padding: '2rem 1rem 1rem',
            color: 'white',
          }}
        >
          {/* Progress info */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
            fontSize: '0.85rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="loading-spinner" style={{
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#4ade80',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <span>{progress?.message || 'Оживляем фото...'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>
                {progress?.progress ? `${Math.round(progress.progress)}%` : '0%'}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                {progress?.elapsedSeconds ? formatTime(progress.elapsedSeconds) : '0:00'}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            height: '4px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress?.progress || 0}%`,
              background: 'linear-gradient(90deg, #4ade80, #22c55e)',
              borderRadius: '2px',
              transition: 'width 0.5s ease',
            }} />
          </div>

          {/* Status hint */}
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
          }}>
            {progress?.status === 'starting' && 'Запуск AI модели...'}
            {progress?.status === 'processing' && 'Генерация занимает 3-5 минут'}
          </div>
        </div>
      )}

      {/* Error State */}
      {status === 'error' && shouldShowVideo && (
        <div
          className="animated-image-error"
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            background: 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {progress?.message || 'Не удалось создать анимацию'}
        </div>
      )}

      {/* Animation Ready Badge */}
      {status === 'ready' && (
        <div
          className="animated-image-badge"
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            background: shouldShowVideo ? 'rgba(239, 68, 68, 0.9)' : 'rgba(74, 222, 128, 0.9)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            transition: 'opacity 0.3s ease, background 0.3s ease',
          }}
        >
          {shouldShowVideo ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              LIVE
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              LIVE
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AnimatedImage;
