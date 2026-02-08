import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './InteriorMobileDemo.css'

type Room = { id: string; name: string; area: number; image: string }

const rooms: Room[] = [
  { id: 'hallway', name: 'Прихожая', area: 10.87, image: '/rooms/1.%20Прихожая.jpg' },
  { id: 'wardrobe', name: 'Гардероб', area: 6.08, image: '/rooms/2.Гардероб.jpg' },
  { id: 'living-room', name: 'Кухня-гостиная', area: 43.60, image: '/rooms/3.Кухня-столовая.jpg' },
  { id: 'kitchen', name: 'Кухня', area: 12.04, image: '/rooms/4.%20Кухня.jpg' },
  { id: 'bedroom-1', name: 'Спальня', area: 13.83, image: '/rooms/5.%20Спальня.jpg' },
  { id: 'bedroom-2', name: 'Спальня', area: 16.72, image: '/rooms/6.Спальня.jpg' },
  { id: 'bathroom', name: 'Ванная', area: 8.47, image: '/rooms/7.Ванная.jpg' },
  { id: 'storage', name: 'Кладовая', area: 8.07, image: '/rooms/8.Кладовая.jpg' },
  { id: 'wc', name: 'С/У', area: 4.63, image: '/rooms/9.Сан.узел.jpg' },
  { id: 'terrace', name: 'Терраса', area: 26.27, image: '/rooms/10.%20Терраса.jpg' },
  { id: 'porch', name: 'Крыльцо', area: 4.50, image: '/rooms/11.Крыльцо.jpg' },
  { id: 'bedroom-3', name: 'Спальня', area: 11.88, image: '/rooms/5.%20Спальня.jpg' },
  { id: 'boiler', name: 'Котельная', area: 6.92, image: '/rooms/8.Кладовая.jpg' },
  { id: 'corridor', name: 'Коридор', area: 9.12, image: '/rooms/1.%20Прихожая.jpg' },
]

export function InteriorMobileDemo() {
  const [activeVariant, setActiveVariant] = useState(1)

  return (
    <div className="imob-page">
      <nav className="imob-nav">
        <Link to="/constructor-v1" className="imob-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <h1>Мобильный интерьер</h1>
      </nav>

      <div className="imob-tabs">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className={`imob-tab ${activeVariant === n ? 'active' : ''}`}
            onClick={() => setActiveVariant(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="imob-variant-label">
        {activeVariant === 1 && 'Карусель с карточками'}
        {activeVariant === 2 && 'Stories + полноэкранный просмотр'}
        {activeVariant === 3 && 'Компактная Bento сетка'}
        {activeVariant === 4 && 'Вертикальные карточки'}
        {activeVariant === 5 && 'Аккордеон'}
      </div>

      {activeVariant === 1 && <Variant1Carousel rooms={rooms} />}
      {activeVariant === 2 && <Variant2Stories rooms={rooms} />}
      {activeVariant === 3 && <Variant3Bento rooms={rooms} />}
      {activeVariant === 4 && <Variant4Vertical rooms={rooms} />}
      {activeVariant === 5 && <Variant5Accordion rooms={rooms} />}
    </div>
  )
}

/* ===== Variant 1: Swipeable Card Carousel ===== */
function Variant1Carousel({ rooms }: { rooms: Room[] }) {
  const [current, setCurrent] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const cardWidth = el.offsetWidth * 0.78
    const gap = 12
    const index = Math.round(el.scrollLeft / (cardWidth + gap))
    setCurrent(Math.min(index, rooms.length - 1))
  }

  return (
    <section className="imob-section imob-v1">
      <div className="imob-v1-header">
        <h2>Интерьер</h2>
        <p>{rooms.length} помещений</p>
      </div>
      <div
        className="imob-v1-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {rooms.map((room, i) => (
          <div key={room.id} className={`imob-v1-card ${i === current ? 'active' : ''}`}>
            <div className="imob-v1-img">
              <img src={room.image} alt={room.name} />
              <div className="imob-v1-badge">{String(i + 1).padStart(2, '0')}</div>
            </div>
            <div className="imob-v1-info">
              <h3>{room.name}</h3>
              <span>{room.area} м²</span>
            </div>
          </div>
        ))}
      </div>
      <div className="imob-v1-progress">
        <div className="imob-v1-progress-bar" style={{ width: `${((current + 1) / rooms.length) * 100}%` }} />
      </div>
      <div className="imob-v1-counter">{current + 1} / {rooms.length}</div>
    </section>
  )
}

/* ===== Variant 2: Stories-style ===== */
function Variant2Stories({ rooms }: { rooms: Room[] }) {
  const [activeRoom, setActiveRoom] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (activeRoom === null) return
    setProgress(0)
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Go to next story
          setActiveRoom(i => {
            if (i === null) return null
            return i < rooms.length - 1 ? i + 1 : null
          })
          return 0
        }
        return prev + 2
      })
    }, 60)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeRoom, rooms.length])

  return (
    <section className="imob-section imob-v2">
      <div className="imob-v2-header">
        <h2>Интерьер</h2>
        <p>Нажмите на комнату для просмотра</p>
      </div>
      <div className="imob-v2-stories-row">
        {rooms.map((room, i) => (
          <button
            key={room.id}
            className={`imob-v2-story-btn ${activeRoom === i ? 'active' : ''}`}
            onClick={() => setActiveRoom(i)}
          >
            <div className="imob-v2-story-ring">
              <img src={room.image} alt={room.name} />
            </div>
            <span>{room.name}</span>
          </button>
        ))}
      </div>

      {/* Fullscreen story viewer */}
      {activeRoom !== null && (
        <div className="imob-v2-fullscreen" onClick={() => setActiveRoom(null)}>
          <div className="imob-v2-progress-bars">
            {rooms.map((_, i) => (
              <div key={i} className="imob-v2-progress-track">
                <div
                  className="imob-v2-progress-fill"
                  style={{
                    width: i < activeRoom ? '100%' : i === activeRoom ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>
          <img src={rooms[activeRoom].image} alt={rooms[activeRoom].name} />
          <div className="imob-v2-story-info">
            <h3>{rooms[activeRoom].name}</h3>
            <span>{rooms[activeRoom].area} м²</span>
          </div>
          <div className="imob-v2-story-nav">
            <div
              className="imob-v2-story-prev"
              onClick={(e) => { e.stopPropagation(); setActiveRoom(i => i !== null && i > 0 ? i - 1 : i) }}
            />
            <div
              className="imob-v2-story-next"
              onClick={(e) => { e.stopPropagation(); setActiveRoom(i => i !== null && i < rooms.length - 1 ? i + 1 : null) }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

/* ===== Variant 3: Compact Bento Grid (Mobile-optimized) ===== */
function Variant3Bento({ rooms }: { rooms: Room[] }) {
  return (
    <section className="imob-section imob-v3">
      <div className="imob-v3-header">
        <h2>Интерьер</h2>
        <p>{rooms.length} помещений вашего дома</p>
      </div>
      <div className="imob-v3-grid">
        {rooms.map((room, i) => (
          <div key={room.id} className={`imob-v3-cell imob-v3-cell-${i + 1}`}>
            <img src={room.image} alt={room.name} />
            <div className="imob-v3-overlay">
              <span className="imob-v3-name">{room.name}</span>
              <span className="imob-v3-area">{room.area} м²</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===== Variant 4: Vertical Full-Width Cards ===== */
function Variant4Vertical({ rooms }: { rooms: Room[] }) {
  return (
    <section className="imob-section imob-v4">
      <div className="imob-v4-header">
        <h2>Интерьер</h2>
        <p>Все помещения дома</p>
      </div>
      <div className="imob-v4-list">
        {rooms.map((room, i) => (
          <div key={room.id} className={`imob-v4-card ${i % 2 === 0 ? 'left' : 'right'}`}>
            <div className="imob-v4-img">
              <img src={room.image} alt={room.name} />
              <div className="imob-v4-num">{String(i + 1).padStart(2, '0')}</div>
            </div>
            <div className="imob-v4-info">
              <h3>{room.name}</h3>
              <span className="imob-v4-area">{room.area} м²</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===== Variant 5: Accordion ===== */
function Variant5Accordion({ rooms }: { rooms: Room[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="imob-section imob-v5">
      <div className="imob-v5-header">
        <h2>Интерьер</h2>
        <p>Нажмите на комнату для раскрытия</p>
      </div>
      <div className="imob-v5-list">
        {rooms.map((room, i) => (
          <div
            key={room.id}
            className={`imob-v5-item ${openIndex === i ? 'open' : ''}`}
          >
            <button
              className="imob-v5-trigger"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="imob-v5-trigger-left">
                <span className="imob-v5-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="imob-v5-name">{room.name}</span>
              </div>
              <div className="imob-v5-trigger-right">
                <span className="imob-v5-area">{room.area} м²</span>
                <svg
                  className="imob-v5-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="18"
                  height="18"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </button>
            <div className="imob-v5-content">
              <div className="imob-v5-img-wrapper">
                <img src={room.image} alt={room.name} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InteriorMobileDemo
