import { useState, useEffect } from 'react'
import './InteriorSectionDemo.css'

// Sample room data
const rooms = [
  { id: 1, name: 'Кухня-гостиная', area: 43.6, image: '/rooms/3.Кухня-столовая.jpg' },
  { id: 2, name: 'Спальня', area: 16.72, image: '/rooms/5.%20Спальня.jpg' },
  { id: 3, name: 'Ванная', area: 8.47, image: '/rooms/7.Ванная.jpg' },
  { id: 4, name: 'Кухня', area: 12.04, image: '/rooms/4.%20Кухня.jpg' },
  { id: 5, name: 'Терраса', area: 26.27, image: '/rooms/10.%20Терраса.jpg' },
  { id: 6, name: 'Гардероб', area: 6.08, image: '/rooms/2.Гардероб.jpg' },
  { id: 7, name: 'Прихожая', area: 10.87, image: '/rooms/1.%20Прихожая.jpg' },
  { id: 8, name: 'Крыльцо', area: 4.5, image: '/rooms/11.Крыльцо.jpg' },
]

export default function InteriorSectionDemo() {
  const [activeCard, setActiveCard] = useState(0)
  const [hoveredHex, setHoveredHex] = useState<number | null>(null)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [activeSlide, setActiveSlide] = useState(0)
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const [polaroidStack, setPolaroidStack] = useState<number[]>([0, 1, 2, 3, 4])

  // Auto-rotate spotlight
  useEffect(() => {
    const timer = setInterval(() => {
      setSpotlightIndex(prev => (prev + 1) % rooms.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const shufflePolaroid = () => {
    setPolaroidStack(prev => {
      const newStack = [...prev]
      const first = newStack.shift()!
      newStack.push(first)
      return newStack
    })
  }

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="interior-demo-page">
      <header className="demo-header">
        <h1>Варианты секции "Интерьер"</h1>
        <p>Выберите понравившийся вариант</p>
      </header>

      {/* Variant 1: Horizontal Scroll Cinema */}
      <section className="demo-section">
        <div className="variant-label">Вариант 1: Кинематографический скролл</div>
        <div className="interior-v1">
          <div className="v1-header">
            <h2>Интерьер</h2>
            <p>Листайте вправо для просмотра</p>
          </div>
          <div className="v1-scroll-container">
            <div className="v1-scroll-track">
              {rooms.map((room, i) => (
                <div key={room.id} className="v1-card" style={{ '--delay': i } as React.CSSProperties}>
                  <div className="v1-card-inner">
                    <img src={room.image} alt={room.name} />
                    <div className="v1-card-content">
                      <span className="v1-number">{String(i + 1).padStart(2, '0')}</span>
                      <h3>{room.name}</h3>
                      <span className="v1-area">{room.area} м²</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variant 2: Stacked Cards */}
      <section className="demo-section">
        <div className="variant-label">Вариант 2: Стопка карточек</div>
        <div className="interior-v2">
          <div className="v2-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v2-stack-container">
            <div className="v2-stack">
              {rooms.slice(0, 5).map((room, i) => (
                <div
                  key={room.id}
                  className={`v2-card ${i === activeCard ? 'active' : ''} ${i < activeCard ? 'passed' : ''}`}
                  style={{ '--index': i, '--total': 5 } as React.CSSProperties}
                  onClick={() => setActiveCard((activeCard + 1) % 5)}
                >
                  <img src={room.image} alt={room.name} />
                  <div className="v2-card-info">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="v2-dots">
              {rooms.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  className={`v2-dot ${i === activeCard ? 'active' : ''}`}
                  onClick={() => setActiveCard(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variant 3: Hexagonal Grid */}
      <section className="demo-section">
        <div className="variant-label">Вариант 3: Соты</div>
        <div className="interior-v3">
          <div className="v3-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v3-hex-grid">
            {rooms.map((room, i) => (
              <div
                key={room.id}
                className={`v3-hex ${hoveredHex === i ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredHex(i)}
                onMouseLeave={() => setHoveredHex(null)}
                style={{ '--delay': i * 0.1 } as React.CSSProperties}
              >
                <div className="v3-hex-inner">
                  <img src={room.image} alt={room.name} />
                  <div className="v3-hex-content">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 4: 3D Flip Cards */}
      <section className="demo-section">
        <div className="variant-label">Вариант 4: 3D Переворачивающиеся карточки</div>
        <div className="interior-v4">
          <div className="v4-header">
            <h2>Интерьер</h2>
            <p>Нажмите на карточку</p>
          </div>
          <div className="v4-grid">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`v4-card ${flippedCards.has(room.id) ? 'flipped' : ''}`}
                onClick={() => toggleFlip(room.id)}
              >
                <div className="v4-card-inner">
                  <div className="v4-card-front">
                    <img src={room.image} alt={room.name} />
                    <div className="v4-card-title">{room.name}</div>
                  </div>
                  <div className="v4-card-back">
                    <h3>{room.name}</h3>
                    <div className="v4-area">{room.area} м²</div>
                    <p>Просторное помещение с современной отделкой и панорамными окнами</p>
                    <button className="v4-btn">Подробнее</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 5: Diagonal/Skewed Layout */}
      <section className="demo-section">
        <div className="variant-label">Вариант 5: Диагональный дизайн</div>
        <div className="interior-v5">
          <div className="v5-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v5-diagonal-grid">
            {rooms.slice(0, 6).map((room, i) => (
              <div key={room.id} className="v5-item" style={{ '--i': i } as React.CSSProperties}>
                <div className="v5-item-inner">
                  <img src={room.image} alt={room.name} />
                  <div className="v5-content">
                    <span className="v5-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{room.name}</h3>
                    <span className="v5-area">{room.area} м²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 6: Split Screen Reveal */}
      <section className="demo-section">
        <div className="variant-label">Вариант 6: Разделённый экран</div>
        <div className="interior-v6">
          <div className="v6-split-container">
            <div className="v6-left">
              <h2>Интерьер</h2>
              <p>Каждое помещение продумано до мелочей</p>
              <div className="v6-room-list">
                {rooms.slice(0, 5).map((room, i) => (
                  <button
                    key={room.id}
                    className={`v6-room-btn ${activeSlide === i ? 'active' : ''}`}
                    onClick={() => setActiveSlide(i)}
                  >
                    <span className="v6-room-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="v6-room-name">{room.name}</span>
                    <span className="v6-room-area">{room.area} м²</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="v6-right">
              {rooms.slice(0, 5).map((room, i) => (
                <div key={room.id} className={`v6-image ${activeSlide === i ? 'active' : ''}`}>
                  <img src={room.image} alt={room.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variant 7: Floating Gallery */}
      <section className="demo-section">
        <div className="variant-label">Вариант 7: Парящая галерея</div>
        <div className="interior-v7">
          <div className="v7-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v7-floating-grid">
            {rooms.map((room, i) => (
              <div
                key={room.id}
                className="v7-float-card"
                style={{ '--delay': i * 0.15, '--float-y': `${Math.sin(i) * 10}px` } as React.CSSProperties}
              >
                <div className="v7-card-glow"></div>
                <img src={room.image} alt={room.name} />
                <div className="v7-card-info">
                  <h3>{room.name}</h3>
                  <span>{room.area} м²</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 8: Magazine/Editorial */}
      <section className="demo-section">
        <div className="variant-label">Вариант 8: Журнальный стиль</div>
        <div className="interior-v8">
          <div className="v8-editorial">
            <div className="v8-hero">
              <img src={rooms[0].image} alt={rooms[0].name} />
              <div className="v8-hero-content">
                <span className="v8-tag">Featured</span>
                <h2>{rooms[0].name}</h2>
                <p>{rooms[0].area} м²</p>
              </div>
            </div>
            <div className="v8-sidebar">
              <h3>Интерьер</h3>
              <div className="v8-mini-grid">
                {rooms.slice(1, 5).map((room, i) => (
                  <div key={room.id} className="v8-mini-card">
                    <img src={room.image} alt={room.name} />
                    <div className="v8-mini-info">
                      <span className="v8-mini-num">{String(i + 2).padStart(2, '0')}</span>
                      <h4>{room.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="v8-bottom-strip">
              {rooms.slice(5).map((room) => (
                <div key={room.id} className="v8-strip-item">
                  <img src={room.image} alt={room.name} />
                  <span>{room.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variant 9: Circular/Orbital */}
      <section className="demo-section">
        <div className="variant-label">Вариант 9: Орбитальная галерея</div>
        <div className="interior-v9">
          <div className="v9-orbital-container">
            <div className="v9-center">
              <h2>Интерьер</h2>
              <p>{rooms.length} помещений</p>
            </div>
            <div className="v9-orbit">
              {rooms.map((room, i) => (
                <div
                  key={room.id}
                  className="v9-planet"
                  style={{ '--angle': `${(360 / rooms.length) * i}deg`, '--delay': i * 0.1 } as React.CSSProperties}
                >
                  <div className="v9-planet-inner">
                    <img src={room.image} alt={room.name} />
                    <div className="v9-planet-info">
                      <span>{room.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variant 10: Masonry Cascade */}
      <section className="demo-section">
        <div className="variant-label">Вариант 10: Каскадная мозаика</div>
        <div className="interior-v10">
          <div className="v10-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v10-masonry">
            {rooms.map((room, i) => (
              <div
                key={room.id}
                className={`v10-item v10-item-${(i % 3) + 1}`}
                style={{ '--delay': i * 0.1 } as React.CSSProperties}
              >
                <img src={room.image} alt={room.name} />
                <div className="v10-overlay">
                  <div className="v10-line"></div>
                  <h3>{room.name}</h3>
                  <span>{room.area} м²</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 11: Infinite Marquee */}
      <section className="demo-section">
        <div className="variant-label">Вариант 11: Бесконечная лента</div>
        <div className="interior-v11">
          <div className="v11-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v11-marquee">
            <div className="v11-track">
              {[...rooms, ...rooms].map((room, i) => (
                <div key={`${room.id}-${i}`} className="v11-item">
                  <img src={room.image} alt={room.name} />
                  <div className="v11-info">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="v11-marquee v11-reverse">
            <div className="v11-track">
              {[...rooms, ...rooms].reverse().map((room, i) => (
                <div key={`${room.id}-rev-${i}`} className="v11-item">
                  <img src={room.image} alt={room.name} />
                  <div className="v11-info">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variant 12: Accordion Reveal */}
      <section className="demo-section">
        <div className="variant-label">Вариант 12: Аккордеон</div>
        <div className="interior-v12">
          <div className="v12-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v12-accordion">
            {rooms.slice(0, 6).map((room, i) => (
              <div
                key={room.id}
                className={`v12-panel ${expandedAccordion === i ? 'expanded' : ''}`}
                onClick={() => setExpandedAccordion(expandedAccordion === i ? null : i)}
              >
                <img src={room.image} alt={room.name} />
                <div className="v12-content">
                  <span className="v12-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{room.name}</h3>
                  <span className="v12-area">{room.area} м²</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 13: Polaroid Stack */}
      <section className="demo-section">
        <div className="variant-label">Вариант 13: Стопка полароидов</div>
        <div className="interior-v13">
          <div className="v13-header">
            <h2>Интерьер</h2>
            <p>Нажмите, чтобы перелистать</p>
          </div>
          <div className="v13-polaroid-container" onClick={shufflePolaroid}>
            {polaroidStack.map((roomIndex, stackPos) => {
              const room = rooms[roomIndex]
              return (
                <div
                  key={room.id}
                  className="v13-polaroid"
                  style={{
                    '--stack-pos': stackPos,
                    '--rotation': `${(stackPos - 2) * 5}deg`,
                    zIndex: 5 - stackPos,
                  } as React.CSSProperties}
                >
                  <div className="v13-photo">
                    <img src={room.image} alt={room.name} />
                  </div>
                  <div className="v13-caption">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Variant 14: 3D Carousel */}
      <section className="demo-section">
        <div className="variant-label">Вариант 14: 3D Карусель</div>
        <div className="interior-v14">
          <div className="v14-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v14-carousel-container">
            <div
              className="v14-carousel"
              style={{ '--rotation': carouselIndex * -(360 / rooms.length) } as React.CSSProperties}
            >
              {rooms.map((room, i) => (
                <div
                  key={room.id}
                  className="v14-slide"
                  style={{ '--angle': `${(360 / rooms.length) * i}deg` } as React.CSSProperties}
                >
                  <img src={room.image} alt={room.name} />
                  <div className="v14-slide-info">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="v14-controls">
              <button onClick={() => setCarouselIndex(prev => prev - 1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button onClick={() => setCarouselIndex(prev => prev + 1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 15: Spotlight/Focus */}
      <section className="demo-section">
        <div className="variant-label">Вариант 15: Прожектор</div>
        <div className="interior-v15">
          <div className="v15-spotlight-container">
            <div className="v15-background">
              {rooms.map((room, i) => (
                <div
                  key={room.id}
                  className={`v15-bg-item ${spotlightIndex === i ? 'active' : ''}`}
                >
                  <img src={room.image} alt={room.name} />
                </div>
              ))}
            </div>
            <div className="v15-content">
              <h2>Интерьер</h2>
              <div className="v15-info">
                <span className="v15-num">{String(spotlightIndex + 1).padStart(2, '0')}</span>
                <h3>{rooms[spotlightIndex].name}</h3>
                <span className="v15-area">{rooms[spotlightIndex].area} м²</span>
              </div>
              <div className="v15-dots">
                {rooms.map((_, i) => (
                  <button
                    key={i}
                    className={`v15-dot ${spotlightIndex === i ? 'active' : ''}`}
                    onClick={() => setSpotlightIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 16: Glassmorphism */}
      <section className="demo-section">
        <div className="variant-label">Вариант 16: Стеклянные карточки</div>
        <div className="interior-v16">
          <div className="v16-bg-pattern"></div>
          <div className="v16-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v16-glass-grid">
            {rooms.map((room, i) => (
              <div key={room.id} className="v16-glass-card" style={{ '--delay': i * 0.1 } as React.CSSProperties}>
                <div className="v16-glass-inner">
                  <div className="v16-image-container">
                    <img src={room.image} alt={room.name} />
                  </div>
                  <div className="v16-glass-info">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 17: Neon Cyberpunk */}
      <section className="demo-section">
        <div className="variant-label">Вариант 17: Неон</div>
        <div className="interior-v17">
          <div className="v17-header">
            <h2 className="v17-neon-text">Интерьер</h2>
          </div>
          <div className="v17-neon-grid">
            {rooms.map((room, i) => (
              <div key={room.id} className="v17-neon-card" style={{ '--hue': i * 45 } as React.CSSProperties}>
                <div className="v17-neon-border"></div>
                <img src={room.image} alt={room.name} />
                <div className="v17-neon-info">
                  <h3>{room.name}</h3>
                  <span>{room.area} м²</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 18: Timeline */}
      <section className="demo-section">
        <div className="variant-label">Вариант 18: Таймлайн</div>
        <div className="interior-v18">
          <div className="v18-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v18-timeline">
            <div className="v18-line"></div>
            {rooms.map((room, i) => (
              <div key={room.id} className={`v18-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="v18-dot"></div>
                <div className="v18-card">
                  <img src={room.image} alt={room.name} />
                  <div className="v18-card-info">
                    <span className="v18-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 19: Tilt Cards */}
      <section className="demo-section">
        <div className="variant-label">Вариант 19: Tilt эффект</div>
        <div className="interior-v19">
          <div className="v19-header">
            <h2>Интерьер</h2>
          </div>
          <div className="v19-tilt-grid">
            {rooms.map((room) => (
              <div key={room.id} className="v19-tilt-card">
                <div className="v19-tilt-inner">
                  <img src={room.image} alt={room.name} />
                  <div className="v19-tilt-shine"></div>
                  <div className="v19-tilt-info">
                    <h3>{room.name}</h3>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 20: Book/Magazine Flip */}
      <section className="demo-section">
        <div className="variant-label">Вариант 20: Книжный разворот</div>
        <div className="interior-v20">
          <div className="v20-book">
            <div className="v20-page v20-left">
              <div className="v20-page-content">
                <h2>Интерьер</h2>
                <p className="v20-intro">Откройте для себя пространство, созданное для жизни</p>
                <div className="v20-room-list">
                  {rooms.slice(0, 4).map((room, i) => (
                    <div key={room.id} className="v20-room-item">
                      <span className="v20-room-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="v20-room-name">{room.name}</span>
                      <span className="v20-room-area">{room.area} м²</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="v20-spine"></div>
            <div className="v20-page v20-right">
              <div className="v20-gallery">
                {rooms.slice(0, 4).map((room) => (
                  <div key={room.id} className="v20-gallery-item">
                    <img src={room.image} alt={room.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
