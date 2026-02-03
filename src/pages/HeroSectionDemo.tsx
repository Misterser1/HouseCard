import { useState } from 'react'
import './HeroSectionDemo.css'

// Демо-изображения
const images = [
  '/houses/brick/natural/house_brick_roof1.jpg',
  '/houses/brick/natural/house_brick_roof2.jpg',
  '/houses/brick/natural/house_brick_roof3.jpg',
  '/houses/brick/natural/house_brick_roof4.jpg',
  '/houses/brick/natural/house_brick_roof5.jpg',
]

export default function HeroSectionDemo() {
  const [activeVariant, setActiveVariant] = useState<number | null>(null)

  const variants = [
    { id: 1, name: 'Cinematic Fullscreen', desc: 'Полноэкранный слайдер с кинематографическим эффектом' },
    { id: 2, name: 'Split Diagonal', desc: 'Диагональное разделение экрана' },
    { id: 3, name: 'Card Stack 3D', desc: '3D стопка карточек с параллаксом' },
    { id: 4, name: 'Morphing Gallery', desc: 'Галерея с морфингом изображений' },
    { id: 5, name: 'Circular Carousel', desc: 'Круговая карусель с центральным фокусом' },
    { id: 6, name: 'Magazine Layout', desc: 'Журнальная раскладка с типографикой' },
    { id: 7, name: 'Floating Cards', desc: 'Парящие карточки с глубиной' },
    { id: 8, name: 'Perspective Grid', desc: 'Перспективная сетка изображений' },
    { id: 9, name: 'Glassmorphism Hero', desc: 'Стеклянный эффект с размытием' },
    { id: 10, name: 'Reveal on Scroll', desc: 'Раскрытие при скролле' },
    { id: 11, name: 'Immersive Panorama', desc: 'Погружающая панорама 360°' },
    { id: 12, name: 'Luxury Minimal', desc: 'Люксовый минимализм' },
  ]

  return (
    <div className="hero-demo-page">
      <header className="hero-demo-header">
        <h1>Варианты главной секции</h1>
        <p>Выберите понравившийся дизайн</p>
      </header>

      <div className="hero-variants-grid">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="hero-variant-card"
            onClick={() => setActiveVariant(variant.id)}
          >
            <div className="variant-preview">
              {variant.id === 1 && <Variant1Preview />}
              {variant.id === 2 && <Variant2Preview />}
              {variant.id === 3 && <Variant3Preview />}
              {variant.id === 4 && <Variant4Preview />}
              {variant.id === 5 && <Variant5Preview />}
              {variant.id === 6 && <Variant6Preview />}
              {variant.id === 7 && <Variant7Preview />}
              {variant.id === 8 && <Variant8Preview />}
              {variant.id === 9 && <Variant9Preview />}
              {variant.id === 10 && <Variant10Preview />}
              {variant.id === 11 && <Variant11Preview />}
              {variant.id === 12 && <Variant12Preview />}
            </div>
            <div className="variant-info">
              <span className="variant-number">#{variant.id}</span>
              <h3>{variant.name}</h3>
              <p>{variant.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Полноэкранный просмотр варианта */}
      {activeVariant && (
        <div className="variant-fullscreen" onClick={() => setActiveVariant(null)}>
          <button className="close-fullscreen" onClick={() => setActiveVariant(null)}>✕</button>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            {activeVariant === 1 && <Variant1Full />}
            {activeVariant === 2 && <Variant2Full />}
            {activeVariant === 3 && <Variant3Full />}
            {activeVariant === 4 && <Variant4Full />}
            {activeVariant === 5 && <Variant5Full />}
            {activeVariant === 6 && <Variant6Full />}
            {activeVariant === 7 && <Variant7Full />}
            {activeVariant === 8 && <Variant8Full />}
            {activeVariant === 9 && <Variant9Full />}
            {activeVariant === 10 && <Variant10Full />}
            {activeVariant === 11 && <Variant11Full />}
            {activeVariant === 12 && <Variant12Full />}
          </div>
        </div>
      )}
    </div>
  )
}

// ============ VARIANT 1: Cinematic Fullscreen ============
function Variant1Preview() {
  return (
    <div className="v1-preview">
      <img src={images[0]} alt="" />
      <div className="v1-overlay">
        <div className="v1-title">Родные Края</div>
        <div className="v1-subtitle">Дом вашей мечты</div>
      </div>
      <div className="v1-nav-dots">
        <span className="active"></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

function Variant1Full() {
  const [current, setCurrent] = useState(0)
  return (
    <div className="v1-full">
      <div className="v1-slider">
        {images.map((img, idx) => (
          <div key={idx} className={`v1-slide ${idx === current ? 'active' : ''}`}>
            <img src={img} alt="" />
          </div>
        ))}
        <div className="v1-content">
          <span className="v1-tag">ПРЕМИУМ КЛАСС</span>
          <h1>Родные Края</h1>
          <p>Дом площадью 240 м² в окружении природы</p>
          <div className="v1-stats">
            <div><strong>4</strong> комнаты</div>
            <div><strong>2</strong> санузла</div>
            <div><strong>240</strong> м²</div>
          </div>
        </div>
        <div className="v1-nav">
          <button onClick={() => setCurrent(p => p > 0 ? p - 1 : images.length - 1)}>❮</button>
          <button onClick={() => setCurrent(p => p < images.length - 1 ? p + 1 : 0)}>❯</button>
        </div>
        <div className="v1-progress">
          {images.map((_, idx) => (
            <div key={idx} className={`v1-dot ${idx === current ? 'active' : ''}`} onClick={() => setCurrent(idx)} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 2: Split Diagonal ============
function Variant2Preview() {
  return (
    <div className="v2-preview">
      <div className="v2-left">
        <img src={images[0]} alt="" />
      </div>
      <div className="v2-right">
        <div className="v2-info">
          <span>240 м²</span>
          <span>20.4 млн</span>
        </div>
      </div>
    </div>
  )
}

function Variant2Full() {
  const [current, setCurrent] = useState(0)
  return (
    <div className="v2-full">
      <div className="v2-diagonal-left">
        <img src={images[current]} alt="" />
        <div className="v2-thumbs">
          {images.map((img, idx) => (
            <div key={idx} className={`v2-thumb ${idx === current ? 'active' : ''}`} onClick={() => setCurrent(idx)}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="v2-diagonal-right">
        <div className="v2-content">
          <span className="v2-label">Проект дома</span>
          <h1>Родные<br/>Края</h1>
          <div className="v2-divider"></div>
          <div className="v2-details">
            <div className="v2-detail">
              <span className="v2-num">240</span>
              <span className="v2-unit">м²</span>
            </div>
            <div className="v2-detail">
              <span className="v2-num">4</span>
              <span className="v2-unit">комнаты</span>
            </div>
            <div className="v2-detail">
              <span className="v2-num">20.4</span>
              <span className="v2-unit">млн ₽</span>
            </div>
          </div>
          <button className="v2-btn">Подробнее</button>
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 3: Card Stack 3D ============
function Variant3Preview() {
  return (
    <div className="v3-preview">
      <div className="v3-stack">
        <div className="v3-card v3-c3"><img src={images[2]} alt="" /></div>
        <div className="v3-card v3-c2"><img src={images[1]} alt="" /></div>
        <div className="v3-card v3-c1"><img src={images[0]} alt="" /></div>
      </div>
    </div>
  )
}

function Variant3Full() {
  const [current, setCurrent] = useState(0)
  return (
    <div className="v3-full">
      <div className="v3-scene">
        <div className="v3-cards-container">
          {images.map((img, idx) => {
            const offset = idx - current
            return (
              <div
                key={idx}
                className={`v3-card-full ${offset === 0 ? 'active' : ''}`}
                style={{
                  transform: `translateX(${offset * 60}%) translateZ(${-Math.abs(offset) * 100}px) rotateY(${offset * -5}deg)`,
                  opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3,
                  zIndex: 10 - Math.abs(offset)
                }}
                onClick={() => setCurrent(idx)}
              >
                <img src={img} alt="" />
              </div>
            )
          })}
        </div>
        <div className="v3-info-panel">
          <h2>Родные Края</h2>
          <p>Кирпичный дом с натуральной черепицей</p>
          <div className="v3-price">20.40 млн ₽</div>
        </div>
        <div className="v3-controls">
          <button onClick={() => setCurrent(p => Math.max(0, p - 1))}>←</button>
          <span>{current + 1} / {images.length}</span>
          <button onClick={() => setCurrent(p => Math.min(images.length - 1, p + 1))}>→</button>
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 4: Morphing Gallery ============
function Variant4Preview() {
  return (
    <div className="v4-preview">
      <div className="v4-morph-grid">
        <div className="v4-cell v4-big"><img src={images[0]} alt="" /></div>
        <div className="v4-cell"><img src={images[1]} alt="" /></div>
        <div className="v4-cell"><img src={images[2]} alt="" /></div>
      </div>
    </div>
  )
}

function Variant4Full() {
  const [expanded, setExpanded] = useState(0)
  return (
    <div className="v4-full">
      <div className="v4-morph-container">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`v4-morph-item ${idx === expanded ? 'expanded' : ''}`}
            onClick={() => setExpanded(idx)}
          >
            <img src={img} alt="" />
            <div className="v4-item-overlay">
              <span className="v4-item-num">0{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="v4-info-bar">
        <div className="v4-title">
          <h1>Родные Края</h1>
          <span>Фото {expanded + 1} из {images.length}</span>
        </div>
        <div className="v4-specs">
          <span>240 м²</span>
          <span>4 комнаты</span>
          <span>20.4 млн ₽</span>
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 5: Circular Carousel ============
function Variant5Preview() {
  return (
    <div className="v5-preview">
      <div className="v5-circle">
        <div className="v5-center-img"><img src={images[0]} alt="" /></div>
        <div className="v5-orbit">
          <div className="v5-orb v5-o1"></div>
          <div className="v5-orb v5-o2"></div>
          <div className="v5-orb v5-o3"></div>
        </div>
      </div>
    </div>
  )
}

function Variant5Full() {
  const [rotation, setRotation] = useState(0)
  const current = Math.round((-rotation / 72) % 5 + 5) % 5
  return (
    <div className="v5-full">
      <div className="v5-carousel-scene">
        <div className="v5-carousel" style={{ transform: `rotateY(${rotation}deg)` }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              className="v5-carousel-item"
              style={{ transform: `rotateY(${idx * 72}deg) translateZ(400px)` }}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
        <div className="v5-center-info">
          <h1>Родные Края</h1>
          <div className="v5-current">Вид {current + 1}</div>
        </div>
      </div>
      <div className="v5-controls">
        <button onClick={() => setRotation(r => r + 72)}>← Назад</button>
        <button onClick={() => setRotation(r => r - 72)}>Вперёд →</button>
      </div>
    </div>
  )
}

// ============ VARIANT 6: Magazine Layout ============
function Variant6Preview() {
  return (
    <div className="v6-preview">
      <div className="v6-magazine">
        <div className="v6-big-letter">Р</div>
        <div className="v6-img"><img src={images[0]} alt="" /></div>
        <div className="v6-text">одные Края</div>
      </div>
    </div>
  )
}

function Variant6Full() {
  return (
    <div className="v6-full">
      <div className="v6-layout">
        <div className="v6-left-col">
          <div className="v6-giant-text">
            <span className="v6-letter">Р</span>
            <span className="v6-rest">одные</span>
          </div>
          <div className="v6-giant-text v6-second">
            <span className="v6-letter">К</span>
            <span className="v6-rest">рая</span>
          </div>
          <p className="v6-description">
            Уникальный проект загородного дома площадью 240 м²,
            созданный с учётом современных стандартов комфорта и эстетики.
          </p>
          <div className="v6-meta">
            <span>240 м²</span>
            <span>•</span>
            <span>4 комнаты</span>
            <span>•</span>
            <span>2 санузла</span>
          </div>
        </div>
        <div className="v6-right-col">
          <div className="v6-main-image">
            <img src={images[0]} alt="" />
          </div>
          <div className="v6-thumbs-row">
            {images.slice(1).map((img, idx) => (
              <div key={idx} className="v6-thumb">
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="v6-price-tag">
          <span className="v6-price-label">Стоимость</span>
          <span className="v6-price-value">20.40 млн ₽</span>
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 7: Floating Cards ============
function Variant7Preview() {
  return (
    <div className="v7-preview">
      <div className="v7-float-scene">
        <div className="v7-float-card v7-f1"><img src={images[0]} alt="" /></div>
        <div className="v7-float-card v7-f2"><img src={images[1]} alt="" /></div>
        <div className="v7-float-card v7-f3"><img src={images[2]} alt="" /></div>
      </div>
    </div>
  )
}

function Variant7Full() {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div className="v7-full">
      <div className="v7-floating-gallery">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`v7-floating-card ${hovered === idx ? 'hovered' : ''} ${hovered !== null && hovered !== idx ? 'dimmed' : ''}`}
            style={{
              '--delay': `${idx * 0.1}s`,
              '--x': `${(idx - 2) * 20}%`,
              '--y': `${Math.sin(idx * 1.5) * 10}%`,
              '--rotate': `${(idx - 2) * 3}deg`,
            } as React.CSSProperties}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={img} alt="" />
            <div className="v7-card-info">
              <span>Вид {idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="v7-bottom-bar">
        <h1>Родные Края</h1>
        <div className="v7-specs">
          <span>240 м²</span>
          <span>20.4 млн ₽</span>
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 8: Perspective Grid ============
function Variant8Preview() {
  return (
    <div className="v8-preview">
      <div className="v8-persp-grid">
        {images.slice(0, 4).map((img, idx) => (
          <div key={idx} className="v8-persp-cell"><img src={img} alt="" /></div>
        ))}
      </div>
    </div>
  )
}

function Variant8Full() {
  const [selected, setSelected] = useState(0)
  return (
    <div className="v8-full">
      <div className="v8-perspective-container">
        <div className="v8-main-view">
          <img src={images[selected]} alt="" />
          <div className="v8-main-overlay">
            <h1>Родные Края</h1>
            <p>Кирпичный дом премиум класса</p>
          </div>
        </div>
        <div className="v8-grid-panel">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`v8-grid-item ${idx === selected ? 'active' : ''}`}
              onClick={() => setSelected(idx)}
            >
              <img src={img} alt="" />
              <span className="v8-item-label">0{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="v8-info-strip">
        <div className="v8-stat"><span>240</span> м²</div>
        <div className="v8-stat"><span>4</span> комнаты</div>
        <div className="v8-stat"><span>20.4</span> млн ₽</div>
      </div>
    </div>
  )
}

// ============ VARIANT 9: Glassmorphism Hero ============
function Variant9Preview() {
  return (
    <div className="v9-preview">
      <img src={images[0]} alt="" className="v9-bg" />
      <div className="v9-glass-card">
        <div className="v9-glass-title">Родные Края</div>
      </div>
    </div>
  )
}

function Variant9Full() {
  const [current, setCurrent] = useState(0)
  return (
    <div className="v9-full">
      <div className="v9-bg-layer">
        <img src={images[current]} alt="" />
      </div>
      <div className="v9-content-layer">
        <div className="v9-glass-panel">
          <div className="v9-glass-header">
            <span className="v9-tag">ПРЕМИУМ</span>
            <h1>Родные Края</h1>
          </div>
          <div className="v9-glass-body">
            <p>Загородный дом площадью 240 м² с продуманной планировкой и качественной отделкой.</p>
            <div className="v9-features">
              <div className="v9-feature">
                <span className="v9-f-num">4</span>
                <span className="v9-f-label">Комнаты</span>
              </div>
              <div className="v9-feature">
                <span className="v9-f-num">2</span>
                <span className="v9-f-label">Санузла</span>
              </div>
              <div className="v9-feature">
                <span className="v9-f-num">240</span>
                <span className="v9-f-label">м²</span>
              </div>
            </div>
          </div>
          <div className="v9-glass-footer">
            <span className="v9-price">20.40 млн ₽</span>
            <button className="v9-cta">Подробнее</button>
          </div>
        </div>
        <div className="v9-thumbs-vertical">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`v9-thumb ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 10: Reveal on Scroll ============
function Variant10Preview() {
  return (
    <div className="v10-preview">
      <div className="v10-reveal-demo">
        <div className="v10-reveal-img"><img src={images[0]} alt="" /></div>
        <div className="v10-reveal-text">SCROLL</div>
      </div>
    </div>
  )
}

function Variant10Full() {
  const [scrollY, setScrollY] = useState(0)
  return (
    <div className="v10-full" onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}>
      <div className="v10-scroll-container">
        <section className="v10-hero-section">
          <div className="v10-parallax-bg" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
            <img src={images[0]} alt="" />
          </div>
          <div className="v10-hero-content" style={{ opacity: 1 - scrollY / 300 }}>
            <h1>Родные Края</h1>
            <p>Прокрутите вниз</p>
            <div className="v10-scroll-indicator">↓</div>
          </div>
        </section>
        <section className="v10-details-section">
          <div className="v10-detail-card" style={{ transform: `translateY(${Math.max(0, 100 - scrollY / 2)}px)`, opacity: Math.min(1, scrollY / 200) }}>
            <h2>240 м²</h2>
            <p>Общая площадь</p>
          </div>
          <div className="v10-detail-card" style={{ transform: `translateY(${Math.max(0, 150 - scrollY / 2)}px)`, opacity: Math.min(1, (scrollY - 50) / 200) }}>
            <h2>4 комнаты</h2>
            <p>Просторные спальни</p>
          </div>
          <div className="v10-detail-card" style={{ transform: `translateY(${Math.max(0, 200 - scrollY / 2)}px)`, opacity: Math.min(1, (scrollY - 100) / 200) }}>
            <h2>20.4 млн ₽</h2>
            <p>Стоимость</p>
          </div>
        </section>
        <section className="v10-gallery-section">
          <div className="v10-gallery-grid">
            {images.map((img, idx) => (
              <div key={idx} className="v10-gallery-item">
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

// ============ VARIANT 11: Immersive Panorama ============
function Variant11Preview() {
  return (
    <div className="v11-preview">
      <div className="v11-panorama-mini">
        <img src={images[0]} alt="" />
        <div className="v11-360-badge">360°</div>
      </div>
    </div>
  )
}

function Variant11Full() {
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const currentIdx = Math.abs(Math.floor(dragX / 100)) % images.length

  return (
    <div className="v11-full">
      <div
        className="v11-panorama-container"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(e) => isDragging && setDragX(d => d + e.movementX)}
      >
        <div className="v11-panorama-strip" style={{ transform: `translateX(${dragX}px)` }}>
          {[...images, ...images, ...images].map((img, idx) => (
            <div key={idx} className="v11-panorama-segment">
              <img src={img} alt="" />
            </div>
          ))}
        </div>
        <div className="v11-overlay-ui">
          <div className="v11-drag-hint">{isDragging ? 'Перетаскивайте' : 'Зажмите и перетащите'}</div>
          <div className="v11-info-card">
            <h1>Родные Края</h1>
            <p>Вид {currentIdx + 1} из {images.length}</p>
            <div className="v11-specs">
              <span>240 м²</span>
              <span>•</span>
              <span>20.4 млн ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ VARIANT 12: Luxury Minimal ============
function Variant12Preview() {
  return (
    <div className="v12-preview">
      <div className="v12-minimal">
        <div className="v12-mini-img"><img src={images[0]} alt="" /></div>
        <div className="v12-mini-text">LUXURY</div>
      </div>
    </div>
  )
}

function Variant12Full() {
  const [current, setCurrent] = useState(0)
  return (
    <div className="v12-full">
      <div className="v12-layout">
        <div className="v12-left-panel">
          <nav className="v12-nav">
            <span className="v12-logo">РК</span>
          </nav>
          <div className="v12-hero-text">
            <span className="v12-eyebrow">Коллекция 2024</span>
            <h1>Родные<br/>Края</h1>
            <div className="v12-line"></div>
            <p>Элитный загородный дом с безупречной архитектурой и премиальной отделкой</p>
          </div>
          <div className="v12-bottom-info">
            <div className="v12-price-block">
              <span className="v12-price-label">Стоимость</span>
              <span className="v12-price-amount">20.40 млн ₽</span>
            </div>
            <div className="v12-area-block">
              <span className="v12-area-label">Площадь</span>
              <span className="v12-area-amount">240 м²</span>
            </div>
          </div>
        </div>
        <div className="v12-right-panel">
          <div className="v12-image-showcase">
            <img src={images[current]} alt="" />
            <div className="v12-image-counter">
              <span className="v12-current">{String(current + 1).padStart(2, '0')}</span>
              <span className="v12-divider">/</span>
              <span className="v12-total">{String(images.length).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="v12-thumbs-strip">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`v12-thumb ${idx === current ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
