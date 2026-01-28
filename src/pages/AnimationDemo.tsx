import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AnimationDemo.css'

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

type AnimationType = 'fade' | 'slide-right' | 'slide-left' | 'zoom' | 'flip' | 'blur'

export function AnimationDemo() {
  const [animation, setAnimation] = useState<AnimationType>('fade')
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

  const animations: { type: AnimationType; label: string; desc: string }[] = [
    { type: 'fade', label: 'Fade', desc: 'Плавное появление' },
    { type: 'slide-right', label: 'Slide Right', desc: 'Сдвиг справа' },
    { type: 'slide-left', label: 'Slide Left', desc: 'Сдвиг слева' },
    { type: 'zoom', label: 'Zoom', desc: 'Приближение' },
    { type: 'flip', label: 'Flip', desc: 'Переворот' },
    { type: 'blur', label: 'Blur', desc: 'Размытие' },
  ]

  return (
    <div className="animation-demo-page">
      {/* Header */}
      <header className="anim-demo-header">
        <Link to="/constructor" className="back-btn">
          {Icons.back}
          <span>Назад</span>
        </Link>
        <h1>Выберите анимацию</h1>
        <div className="animation-selector">
          {animations.map(anim => (
            <button
              key={anim.type}
              className={`anim-btn ${animation === anim.type ? 'active' : ''}`}
              onClick={() => setAnimation(anim.type)}
            >
              {anim.label}
            </button>
          ))}
        </div>
      </header>

      {/* Demo Area */}
      <div className="anim-demo-content">
        <div className="anim-slider-wrapper">
          <div className="anim-slider-container">
            <img
              key={`${animation}-${currentIndex}`}
              src={houseImages[currentIndex]}
              alt="Дом"
              className={`anim-slider-image anim-${animation}`}
            />

            <button className="anim-nav-btn anim-nav-prev" onClick={goToPrev}>
              {Icons.chevronLeft}
            </button>
            <button className="anim-nav-btn anim-nav-next" onClick={goToNext}>
              {Icons.chevronRight}
            </button>
          </div>

          <div className="anim-thumbnails">
            {houseImages.map((img, idx) => (
              <button
                key={idx}
                className={`anim-thumb ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => selectImage(idx)}
              >
                <img src={img} alt={`Фото ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="anim-info">
          <h2>{animations.find(a => a.type === animation)?.label}</h2>
          <p>{animations.find(a => a.type === animation)?.desc}</p>
          <p className="anim-hint">Нажмите на стрелки или превью для просмотра анимации</p>
        </div>
      </div>
    </div>
  )
}
