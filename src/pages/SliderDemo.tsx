import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SliderDemo.css'

const houseImages = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
]

const Icons = {
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

export function SliderDemo() {
  const [variant, setVariant] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    setCurrentIndex(prev => prev === 0 ? houseImages.length - 1 : prev - 1)
  }

  const goToNext = () => {
    setCurrentIndex(prev => prev === houseImages.length - 1 ? 0 : prev + 1)
  }

  const selectImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="slider-demo-page">
      {/* Header */}
      <header className="demo-header">
        <Link to="/constructor" className="back-btn">
          {Icons.back}
          <span>Назад</span>
        </Link>
        <h1>Варианты слайдера</h1>
        <div className="variant-selector">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              className={`variant-btn ${variant === num ? 'active' : ''}`}
              onClick={() => setVariant(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </header>

      {/* Вариант 1: Полноэкранный с эффектом параллакса */}
      {variant === 1 && (
        <div className="slider-variant variant-1">
          <div className="fullwidth-slider">
            <div className="slider-image-wrapper">
              <img
                src={houseImages[currentIndex]}
                alt="Дом"
                className="slider-main-image"
              />
              <div className="slider-gradient-overlay"></div>
            </div>

            <button className="nav-btn nav-prev" onClick={goToPrev}>
              {Icons.chevronLeft}
            </button>
            <button className="nav-btn nav-next" onClick={goToNext}>
              {Icons.chevronRight}
            </button>

            <div className="slider-info">
              <h2>О проекте</h2>
              <p>Современный дом с панорамными окнами</p>
            </div>

            <div className="bottom-thumbnails">
              {houseImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img} alt={`Фото ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="variant-label">Вариант 1: Полноэкранный баннер</div>
        </div>
      )}

      {/* Вариант 2: Слайдер с градиентной рамкой */}
      {variant === 2 && (
        <div className="slider-variant variant-2">
          <div className="gradient-frame-slider">
            <div className="gradient-border">
              <div className="slider-inner">
                <img
                  src={houseImages[currentIndex]}
                  alt="Дом"
                  className="slider-main-image"
                />

                <button className="nav-btn nav-prev" onClick={goToPrev}>
                  {Icons.chevronLeft}
                </button>
                <button className="nav-btn nav-next" onClick={goToNext}>
                  {Icons.chevronRight}
                </button>

                <div className="image-counter">
                  {currentIndex + 1} / {houseImages.length}
                </div>
              </div>
            </div>

            <div className="thumbnails-row">
              {houseImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img} alt={`Фото ${idx + 1}`} />
                  <span className="thumb-number">{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="variant-label">Вариант 2: Градиентная рамка</div>
        </div>
      )}

      {/* Вариант 3: Минималистичный с превью */}
      {variant === 3 && (
        <div className="slider-variant variant-3">
          <div className="minimal-slider">
            <div className="slider-wrapper">
              <div className="slider-container">
                <img
                  src={houseImages[currentIndex]}
                  alt="Дом"
                  className="slider-main-image"
                />

                <button className="nav-btn nav-prev" onClick={goToPrev}>
                  {Icons.chevronLeft}
                </button>
                <button className="nav-btn nav-next" onClick={goToNext}>
                  {Icons.chevronRight}
                </button>

                {/* Fullscreen Button */}
                <button className="fullscreen-btn-v3" title="Полноэкранный просмотр">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
                  </svg>
                </button>
              </div>

              {/* Thumbnails на всю ширину */}
              <div className="thumbnails-strip">
                {houseImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-v3 ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => selectImage(idx)}
                  >
                    <img src={img} alt={`Фото ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="variant-label">Вариант 3: Минимализм с превью</div>
        </div>
      )}

      {/* Вариант 4: Карусель с превью сбоку */}
      {variant === 4 && (
        <div className="slider-variant variant-4">
          <div className="side-preview-slider">
            <div className="main-image-area">
              <img
                src={houseImages[currentIndex]}
                alt="Дом"
                className="slider-main-image"
              />

              <button className="nav-btn nav-prev" onClick={goToPrev}>
                {Icons.chevronLeft}
              </button>
              <button className="nav-btn nav-next" onClick={goToNext}>
                {Icons.chevronRight}
              </button>

              <div className="image-title">
                <span>Фото {currentIndex + 1}</span>
              </div>
            </div>

            <div className="side-thumbnails">
              {houseImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img} alt={`Фото ${idx + 1}`} />
                  <div className="thumb-overlay">
                    <span>{idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="variant-label">Вариант 4: Превью сбоку</div>
        </div>
      )}
    </div>
  )
}
