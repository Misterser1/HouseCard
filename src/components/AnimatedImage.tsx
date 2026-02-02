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
}

type AnimationStatus = 'idle' | 'loading' | 'ready' | 'error';

export function AnimatedImage({
  src,
  alt,
  className = '',
  enableAnimation = true,
  externalSrc,
  localVideo
}: AnimatedImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<AnimationStatus>('idle');
  const [progress, setProgress] = useState<ProgressInfo | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load cached animation on mount or when props change
  useEffect(() => {
    if (!enableAnimation) return;

    // Use local video if provided (pre-generated)
    if (localVideo) {
      setVideoUrl(localVideo);
      setStatus('ready');
      return;
    }

    // Reset state when localVideo becomes undefined (e.g., switching modes)
    setVideoUrl(null);
    setStatus('idle');

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

  // Play/pause video on hover
  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    if (isHovering) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovering, videoUrl]);

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

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={`animated-image-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Static Image */}
      <img
        src={src}
        alt={alt}
        className="animated-image-static"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.3s ease',
          opacity: isHovering && videoUrl ? 0 : 1,
        }}
      />

      {/* Animated Video (shown on hover) */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          crossOrigin="anonymous"
          muted
          loop
          playsInline
          preload="auto"
          className="animated-image-video"
          onError={(e) => {
            console.error('Video load error:', e);
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
            opacity: isHovering ? 1 : 0,
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
      {status === 'error' && isHovering && (
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
            background: 'rgba(74, 222, 128, 0.9)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            opacity: isHovering ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          LIVE
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AnimatedImage;
