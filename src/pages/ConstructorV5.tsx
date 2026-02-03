import { useState, useEffect, useMemo, useRef } from 'react'
import { AnimatedImage } from '../components/AnimatedImage'
import './ConstructorV5.css'

type RoofStyle = 'natural' | 'soft' | 'flat'
type FacadeStyle = 'brick' | 'combined' | 'ventilated'

// SVG Icons
const Icons = {
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  exterior: (
    <svg viewBox="0 0 256 256" fill="currentColor">
      <path d="M239.98828,210h-18V115.53882a14.03222,14.03222,0,0,0-4.582-10.35889L137.40039,32.44458a13.94491,13.94491,0,0,0-18.83594.001L38.57031,105.17969a14.02742,14.02742,0,0,0-4.582,10.35888V210h-18a6,6,0,0,0,0,12h224a6,6,0,1,0,0-12Zm-194-94.46143a2.00429,2.00429,0,0,1,.6543-1.48l79.99414-72.73437a1.99291,1.99291,0,0,1,2.6914-.00049L209.333,114.05786a2.00817,2.00817,0,0,1,.65527,1.481V210H157.98242V151.9917a6.00014,6.00014,0,0,0-6-6h-48a6.00015,6.00015,0,0,0-6,6V210H45.98828ZM145.98242,210h-36V157.9917h36Z"/>
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M23,30H21V28a3.0033,3.0033,0,0,0-3-3H14a3.0033,3.0033,0,0,0-3,3v2H9V28a5.0059,5.0059,0,0,1,5-5h4a5.0059,5.0059,0,0,1,5,5Z"/>
      <path d="M16,13a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,16,11Z"/>
      <path d="M30,30H28V14.4639L16,4.31,4,14.4639V30H2V14a1,1,0,0,1,.354-.7634l13-11a1,1,0,0,1,1.292,0l13,11A1,1,0,0,1,30,14Z"/>
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  ),
}

export function ConstructorV5() {
  const [facadeStyle, setFacadeStyle] = useState<FacadeStyle>('brick')
  const [roofStyle, setRoofStyle] = useState<RoofStyle>('natural')
  const [isExterior, setIsExterior] = useState(true)
  const [isDay, setIsDay] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const thumbsRef = useRef<HTMLDivElement>(null)

  // House images by config (DAY)
  const houseImagesByConfigDay: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/brick/natural/house_brick_roof1.jpg',
        '/houses/brick/natural/house_brick_roof2.jpg',
        '/houses/brick/natural/house_brick_roof3.jpg',
        '/houses/brick/natural/house_brick_roof4.jpg',
        '/houses/brick/natural/house_brick_roof5.jpg',
      ],
      soft: [
        '/houses/brick/soft/house_brick_soft1.jpg',
        '/houses/brick/soft/house_brick_soft2.jpg',
        '/houses/brick/soft/house_brick_soft3.jpg',
        '/houses/brick/soft/house_brick_soft4.jpg',
        '/houses/brick/soft/house_brick_soft5.jpg',
      ],
      flat: [
        '/houses/brick/flat/house_brick1.jpg',
        '/houses/brick/flat/house_brick2.jpg',
        '/houses/brick/flat/house_brick3.jpg',
        '/houses/brick/flat/house_brick4.jpg',
        '/houses/brick/flat/house_brick5.jpg',
      ],
    },
    combined: {
      natural: [
        '/houses/combined/natural/house_roof1.jpg',
        '/houses/combined/natural/house_roof2.jpg',
        '/houses/combined/natural/house_roof3.jpg',
        '/houses/combined/natural/house_roof4.jpg',
        '/houses/combined/natural/house_roof5.jpg',
      ],
      soft: [
        '/houses/combined/soft/house_combined_soft1.jpg',
        '/houses/combined/soft/house_combined_soft2.jpg',
        '/houses/combined/soft/house_combined_soft3.jpg',
        '/houses/combined/soft/house_combined_soft4.jpg',
        '/houses/combined/soft/house_combined_soft5.jpg',
      ],
      flat: [
        '/houses/combined/flat/house1.jpg',
        '/houses/combined/flat/house2.jpg',
        '/houses/combined/flat/house3.jpg',
        '/houses/combined/flat/house4.jpg',
        '/houses/combined/flat/house5.jpg',
      ],
    },
    ventilated: {
      natural: [
        '/houses/ventilated/natural/house_vent_roof1.jpg',
        '/houses/ventilated/natural/house_vent_roof2.jpg',
        '/houses/ventilated/natural/house_vent_roof3.jpg',
        '/houses/ventilated/natural/house_vent_roof4.jpg',
        '/houses/ventilated/natural/house_vent_roof5.jpg',
      ],
      soft: [
        '/houses/ventilated/soft/house_vent_soft1.jpg',
        '/houses/ventilated/soft/house_vent_soft2.jpg',
        '/houses/ventilated/soft/house_vent_soft3.jpg',
        '/houses/ventilated/soft/house_vent_soft4.jpg',
        '/houses/ventilated/soft/house_vent_soft5.jpg',
      ],
      flat: [
        '/houses/ventilated/flat/house_vent1.jpg',
        '/houses/ventilated/flat/house_vent2.jpg',
        '/houses/ventilated/flat/house_vent3.jpg',
        '/houses/ventilated/flat/house_vent4.jpg',
        '/houses/ventilated/flat/house_vent5.jpg',
      ],
    },
  }

  // House images by config (NIGHT)
  const houseImagesByConfigNight: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/night/brick/natural/house_brick_roof_night1.jpg',
        '/houses/night/brick/natural/house_brick_roof_night2.jpg',
        '/houses/night/brick/natural/house_brick_roof_night3.jpg',
        '/houses/night/brick/natural/house_brick_roof_night4.jpg',
        '/houses/night/brick/natural/house_brick_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/brick/soft/house_brick_soft_night1.jpg',
        '/houses/night/brick/soft/house_brick_soft_night2.jpg',
        '/houses/night/brick/soft/house_brick_soft_night3.jpg',
        '/houses/night/brick/soft/house_brick_soft_night4.jpg',
        '/houses/night/brick/soft/house_brick_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/brick/flat/house_brick_night1.jpg',
        '/houses/night/brick/flat/house_brick_night2.jpg',
        '/houses/night/brick/flat/house_brick_night3.jpg',
        '/houses/night/brick/flat/house_brick_night4.jpg',
        '/houses/night/brick/flat/house_brick_night5.jpg',
      ],
    },
    combined: {
      natural: [
        '/houses/night/combined/natural/house_roof_night1.jpg',
        '/houses/night/combined/natural/house_roof_night2.jpg',
        '/houses/night/combined/natural/house_roof_night3.jpg',
        '/houses/night/combined/natural/house_roof_night4.jpg',
        '/houses/night/combined/natural/house_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/combined/soft/house_combined_soft_night1.jpg',
        '/houses/night/combined/soft/house_combined_soft_night2.jpg',
        '/houses/night/combined/soft/house_combined_soft_night3.jpg',
        '/houses/night/combined/soft/house_combined_soft_night4.jpg',
        '/houses/night/combined/soft/house_combined_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/combined/flat/house_combined_night1.jpg',
        '/houses/night/combined/flat/house_combined_night2.jpg',
        '/houses/night/combined/flat/house_combined_night3.jpg',
        '/houses/night/combined/flat/house_combined_night4.jpg',
        '/houses/night/combined/flat/house_combined_night5.jpg',
      ],
    },
    ventilated: {
      natural: [
        '/houses/night/ventilated/natural/house_vent_roof_night1.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night2.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night3.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night4.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/ventilated/soft/house_vent_soft_night1.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night2.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night3.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night4.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/ventilated/flat/house_vent_night1.jpg',
        '/houses/night/ventilated/flat/house_vent_night2.jpg',
        '/houses/night/ventilated/flat/house_vent_night3.jpg',
        '/houses/night/ventilated/flat/house_vent_night4.jpg',
        '/houses/night/ventilated/flat/house_vent_night5.jpg',
      ],
    },
  }

  // Interior images
  const interiorImages: Record<FacadeStyle, string[]> = {
    brick: [
      '/houses/interior/brick/1. Прихожая.jpg',
      '/houses/interior/brick/2.Гардероб.jpg',
      '/houses/interior/brick/3.Кухня-столовая.jpg',
      '/houses/interior/brick/4. Кухня.jpg',
      '/houses/interior/brick/5. Спальня.jpg',
      '/houses/interior/brick/6.Спальня.jpg',
      '/houses/interior/brick/7.Ванная.jpg',
      '/houses/interior/brick/8.Кладовая.jpg',
      '/houses/interior/brick/9.Сан.узел.jpg',
      '/houses/interior/brick/9.Терраса.jpg',
      '/houses/interior/brick/10. Терраса.jpg',
      '/houses/interior/brick/11.Крыльцо.jpg',
    ],
    combined: [
      '/houses/interior/combined/1. Прихожая.jpg',
      '/houses/interior/combined/2.Гардероб.jpg',
      '/houses/interior/combined/3.Кухня-столовая.jpg',
      '/houses/interior/combined/4. Кухня.jpg',
      '/houses/interior/combined/5. Спальня.jpg',
      '/houses/interior/combined/6.Спальня.jpg',
      '/houses/interior/combined/7.Ванная.jpg',
      '/houses/interior/combined/8.Кладовая.jpg',
      '/houses/interior/combined/9.Сан.узел.jpg',
      '/houses/interior/combined/9.Терраса.jpg',
      '/houses/interior/combined/10. Терраса.jpg',
      '/houses/interior/combined/11.Крыльцо.jpg',
    ],
    ventilated: [
      '/houses/interior/ventilated/1. Прихожая.jpg',
      '/houses/interior/ventilated/2.Гардероб.jpg',
      '/houses/interior/ventilated/3.Кухня-столовая.jpg',
      '/houses/interior/ventilated/4. Кухня.jpg',
      '/houses/interior/ventilated/5. Спальня.jpg',
      '/houses/interior/ventilated/6.Спальня.jpg',
      '/houses/interior/ventilated/7.Ванная.jpg',
      '/houses/interior/ventilated/8.Кладовая.jpg',
      '/houses/interior/ventilated/9.Сан.узел.jpg',
      '/houses/interior/ventilated/9.Терраса.jpg',
      '/houses/interior/ventilated/10. Терраса.jpg',
      '/houses/interior/ventilated/11.Крыльцо.jpg',
    ],
  }

  // Videos
  const houseVideos: Record<string, string> = {
    '/houses/brick/natural/house_brick_roof1.jpg': '/videos/brick/natural/house_brick_roof1.mp4',
    '/houses/brick/natural/house_brick_roof2.jpg': '/videos/brick/natural/house_brick_roof2.mp4',
    '/houses/brick/natural/house_brick_roof3.jpg': '/videos/brick/natural/house_brick_roof3.mp4',
    '/houses/brick/natural/house_brick_roof4.jpg': '/videos/brick/natural/house_brick_roof4.mp4',
    '/houses/brick/natural/house_brick_roof5.jpg': '/videos/brick/natural/house_brick_roof5.mp4',
  }

  const interiorVideos: Record<string, string> = {
    '1. Прихожая.jpg': '/videos/rooms/1. Прихожая.mp4',
    '2.Гардероб.jpg': '/videos/rooms/2.Гардероб.mp4',
    '3.Кухня-столовая.jpg': '/videos/rooms/3.Кухня-столовая.mp4',
    '4. Кухня.jpg': '/videos/rooms/4. Кухня.mp4',
    '5. Спальня.jpg': '/videos/rooms/5. Спальня.mp4',
    '6.Спальня.jpg': '/videos/rooms/6.Спальня.mp4',
    '7.Ванная.jpg': '/videos/rooms/7.Ванная.mp4',
    '8.Кладовая.jpg': '/videos/rooms/8.Кладовая.mp4',
    '9.Сан.узел.jpg': '/videos/rooms/9.Сан.узел.mp4',
    '9.Терраса.jpg': '/videos/rooms/9.Терраса.mp4',
    '10. Терраса.jpg': '/videos/rooms/10. Терраса.mp4',
    '11.Крыльцо.jpg': '/videos/rooms/11.Крыльцо.mp4',
  }

  // Current images
  const houseImagesByConfig = isDay ? houseImagesByConfigDay : houseImagesByConfigNight
  const currentImages = isExterior
    ? houseImagesByConfig[facadeStyle][roofStyle]
    : interiorImages[facadeStyle]

  const safeIndex = Math.min(currentImageIndex, currentImages.length - 1)

  // Reset index on config change
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [facadeStyle, roofStyle, isExterior, isDay])

  // Preload images
  const allImages = useMemo(() => {
    const images: string[] = []
    Object.values(houseImagesByConfigDay).forEach(roofTypes => {
      Object.values(roofTypes).forEach(imgs => images.push(...imgs))
    })
    Object.values(houseImagesByConfigNight).forEach(roofTypes => {
      Object.values(roofTypes).forEach(imgs => images.push(...imgs))
    })
    Object.values(interiorImages).forEach(imgs => images.push(...imgs))
    return images
  }, [])

  useEffect(() => {
    allImages.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [allImages])

  // Scroll thumbnails
  useEffect(() => {
    if (thumbsRef.current) {
      const activeThumb = thumbsRef.current.children[safeIndex] as HTMLElement
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [safeIndex])

  // Get video for image
  const getVideo = (imagePath: string): string | undefined => {
    if (!isExterior) {
      const filename = imagePath.split('/').pop() || ''
      return interiorVideos[filename]
    }
    return houseVideos[imagePath]
  }

  // Navigation
  const goToPrev = () => {
    setCurrentImageIndex(prev => prev === 0 ? currentImages.length - 1 : prev - 1)
  }

  const goToNext = () => {
    setCurrentImageIndex(prev => prev === currentImages.length - 1 ? 0 : prev + 1)
  }

  // Fullscreen
  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen && e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, currentImages.length])

  // Labels
  const facadeLabels: Record<FacadeStyle, string> = {
    brick: 'Кирпичный',
    combined: 'Комбинированный',
    ventilated: 'Вентфасад',
  }

  const roofLabels: Record<RoofStyle, string> = {
    natural: 'Натуральная черепица',
    soft: 'Мягкая кровля',
    flat: 'Плоская кровля',
  }

  return (
    <div className="luxury-page">
      <div className="luxury-layout">
        {/* Left Panel */}
        <div className="luxury-left-panel">
          <nav className="luxury-nav">
            <span className="luxury-logo">РК</span>
          </nav>

          <div className="luxury-hero-text">
            <span className="luxury-eyebrow">Коллекция 2024</span>
            <h1>Родные<br/>Края</h1>
            <div className="luxury-line"></div>
            <p>
              {facadeLabels[facadeStyle]} фасад с {roofLabels[roofStyle].toLowerCase()}.
              Элитный загородный дом с безупречной архитектурой и премиальной отделкой.
            </p>
          </div>

          {/* Controls */}
          <div className="luxury-controls">
            <div className="luxury-control-group">
              <span className="luxury-control-label">Фасад</span>
              <div className="luxury-control-options">
                {(['brick', 'combined', 'ventilated'] as FacadeStyle[]).map(style => (
                  <button
                    key={style}
                    className={`luxury-control-btn ${facadeStyle === style ? 'active' : ''}`}
                    onClick={() => setFacadeStyle(style)}
                  >
                    {style === 'brick' ? 'Кирпич' : style === 'combined' ? 'Комби' : 'Вент.'}
                  </button>
                ))}
              </div>
            </div>

            <div className="luxury-control-group">
              <span className="luxury-control-label">Кровля</span>
              <div className="luxury-control-options">
                {(['natural', 'soft', 'flat'] as RoofStyle[]).map(style => (
                  <button
                    key={style}
                    className={`luxury-control-btn ${roofStyle === style ? 'active' : ''}`}
                    onClick={() => setRoofStyle(style)}
                  >
                    {style === 'natural' ? 'Натур.' : style === 'soft' ? 'Мягкая' : 'Плоская'}
                  </button>
                ))}
              </div>
            </div>

            <div className="luxury-control-group">
              <div className="luxury-toggles">
                <button
                  className={`luxury-toggle-btn ${isExterior ? 'active' : ''}`}
                  onClick={() => setIsExterior(true)}
                >
                  <span className="luxury-toggle-icon">{Icons.exterior}</span>
                  <span>Экстерьер</span>
                </button>
                <button
                  className={`luxury-toggle-btn ${!isExterior ? 'active' : ''}`}
                  onClick={() => setIsExterior(false)}
                >
                  <span className="luxury-toggle-icon">{Icons.interior}</span>
                  <span>Интерьер</span>
                </button>
              </div>
            </div>

            <div className="luxury-control-group">
              <div className="luxury-toggles">
                <button
                  className={`luxury-toggle-btn ${isDay ? 'active' : ''}`}
                  onClick={() => setIsDay(true)}
                >
                  <span className="luxury-toggle-icon">{Icons.sun}</span>
                  <span>День</span>
                </button>
                <button
                  className={`luxury-toggle-btn ${!isDay ? 'active' : ''}`}
                  onClick={() => setIsDay(false)}
                >
                  <span className="luxury-toggle-icon">{Icons.moon}</span>
                  <span>Ночь</span>
                </button>
              </div>
            </div>
          </div>

          <div className="luxury-bottom-info">
            <div className="luxury-price-block">
              <span className="luxury-price-label">Стоимость</span>
              <span className="luxury-price-amount">20.40 млн ₽</span>
            </div>
            <div className="luxury-area-block">
              <span className="luxury-area-label">Площадь</span>
              <span className="luxury-area-amount">240 м²</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="luxury-right-panel">
          <div className="luxury-image-showcase" onClick={openFullscreen}>
            <AnimatedImage
              src={currentImages[safeIndex]}
              localVideo={getVideo(currentImages[safeIndex])}
              alt="Главное изображение"
              enableAnimation={true}
            />
            <div className="luxury-image-counter">
              <span className="luxury-current">{String(safeIndex + 1).padStart(2, '0')}</span>
              <span className="luxury-divider">/</span>
              <span className="luxury-total">{String(currentImages.length).padStart(2, '0')}</span>
            </div>
            {/* Navigation arrows */}
            <button className="luxury-nav-btn luxury-prev" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>
              {Icons.chevronLeft}
            </button>
            <button className="luxury-nav-btn luxury-next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
              {Icons.chevronRight}
            </button>
          </div>

          <div className="luxury-thumbs-strip" ref={thumbsRef}>
            {currentImages.map((img, idx) => (
              <button
                key={idx}
                className={`luxury-thumb ${idx === safeIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <img src={img} alt={`Миниатюра ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="luxury-fullscreen" onClick={closeFullscreen}>
          <button className="luxury-fullscreen-close" onClick={closeFullscreen}>
            {Icons.close}
          </button>

          <div className="luxury-fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <AnimatedImage
              src={currentImages[safeIndex]}
              localVideo={getVideo(currentImages[safeIndex])}
              alt="Полноэкранное изображение"
              enableAnimation={true}
            />
          </div>

          <button className="luxury-fullscreen-nav luxury-fullscreen-prev" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>
            {Icons.chevronLeft}
          </button>
          <button className="luxury-fullscreen-nav luxury-fullscreen-next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
            {Icons.chevronRight}
          </button>

          <div className="luxury-fullscreen-counter">
            {safeIndex + 1} / {currentImages.length}
          </div>

          <div className="luxury-fullscreen-thumbs">
            {currentImages.map((img, idx) => (
              <button
                key={idx}
                className={`luxury-fullscreen-thumb ${idx === safeIndex ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
              >
                <img src={img} alt={`Миниатюра ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
