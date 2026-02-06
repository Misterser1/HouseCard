import { useState } from 'react'
import { Link } from 'react-router-dom'
import './InteriorDemo.css'

// Room data - 14 rooms
const rooms = [
  { id: 'hallway', name: 'Прихожая', area: 10.87, image: '/rooms/1.%20Прихожая.jpg' },
  { id: 'wardrobe', name: 'Гардероб', area: 6.08, image: '/rooms/2.Гардероб.jpg' },
  { id: 'living-room', name: 'Кухня-гостиная', area: 43.60, image: '/rooms/3.Кухня-столовая.jpg' },
  { id: 'corridor', name: 'Коридор', area: 9.12, image: '/rooms/4.Коридор.jpg' },
  { id: 'bedroom-1', name: 'Спальня родителей', area: 13.83, image: '/rooms/5.%20Спальня.jpg' },
  { id: 'bedroom-2', name: 'Детская', area: 16.72, image: '/rooms/6.Спальня.jpg' },
  { id: 'bathroom', name: 'Ванная', area: 8.47, image: '/rooms/7.Ванная.jpg' },
  { id: 'storage', name: 'Кладовая', area: 8.07, image: '/rooms/8.Кладовая.jpg' },
  { id: 'wc', name: 'Санузел', area: 4.63, image: '/rooms/9.Сан.узел.jpg' },
  { id: 'terrace', name: 'Терраса', area: 26.27, image: '/rooms/10.%20Терраса.jpg' },
  { id: 'bedroom-3', name: 'Гостевая', area: 11.88, image: '/rooms/5.%20Спальня.jpg' },
  { id: 'boiler', name: 'Котельная', area: 6.92, image: '/rooms/8.Кладовая.jpg' },
  { id: 'laundry', name: 'Постирочная', area: 5.20, image: '/rooms/8.Кладовая.jpg' },
  { id: 'office', name: 'Кабинет', area: 12.50, image: '/rooms/6.Спальня.jpg' },
]

export function InteriorDemo() {
  const [activeVariant, setActiveVariant] = useState(1)

  return (
    <div className="interior-demo-page">
      {/* Navigation */}
      <nav className="demo-nav">
        <Link to="/constructor-v1" className="demo-back">← Назад</Link>
        <h1>Варианты секции Интерьер</h1>
        <div className="demo-tabs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
            <button
              key={n}
              className={`demo-tab ${activeVariant === n ? 'active' : ''}`}
              onClick={() => setActiveVariant(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </nav>

      {/* Variant 1: Horizontal Scroll Gallery */}
      {activeVariant === 1 && (
        <section className="interior-v1">
          <div className="interior-v1-header">
            <h2>Интерьер</h2>
            <p>Горизонтальная галерея с прокруткой</p>
          </div>
          <div className="interior-v1-scroll">
            {rooms.map((room, i) => (
              <div key={room.id} className="interior-v1-card">
                <div className="interior-v1-card-img">
                  <img src={room.image} alt={room.name} />
                  <span className="interior-v1-card-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="interior-v1-card-info">
                  <h3>{room.name}</h3>
                  <span>{room.area} м²</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variant 2: Masonry Grid */}
      {activeVariant === 2 && (
        <section className="interior-v2">
          <div className="interior-v2-header">
            <h2>Интерьер</h2>
            <p>Masonry сетка с разной высотой</p>
          </div>
          <div className="interior-v2-masonry">
            {rooms.map((room, i) => (
              <div
                key={room.id}
                className={`interior-v2-item ${i % 3 === 0 ? 'tall' : ''}`}
              >
                <img src={room.image} alt={room.name} />
                <div className="interior-v2-overlay">
                  <h3>{room.name}</h3>
                  <span>{room.area} м²</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variant 3: Featured + Grid */}
      {activeVariant === 3 && (
        <section className="interior-v3">
          <div className="interior-v3-header">
            <h2>Интерьер</h2>
            <p>Большое фото + сетка миниатюр</p>
          </div>
          <div className="interior-v3-layout">
            <div className="interior-v3-featured">
              <img src={rooms[2].image} alt={rooms[2].name} />
              <div className="interior-v3-featured-info">
                <h3>{rooms[2].name}</h3>
                <span>{rooms[2].area} м²</span>
              </div>
            </div>
            <div className="interior-v3-grid">
              {rooms.filter((_, i) => i !== 2).slice(0, 8).map(room => (
                <div key={room.id} className="interior-v3-thumb">
                  <img src={room.image} alt={room.name} />
                  <div className="interior-v3-thumb-info">
                    <span>{room.name}</span>
                    <span>{room.area} м²</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Variant 4: Cards with Hover */}
      {activeVariant === 4 && (
        <section className="interior-v4">
          <div className="interior-v4-header">
            <h2>Интерьер</h2>
            <p>Карточки с эффектом при наведении</p>
          </div>
          <div className="interior-v4-cards">
            {rooms.slice(0, 8).map((room, i) => (
              <div key={room.id} className="interior-v4-card">
                <div className="interior-v4-card-inner">
                  <img src={room.image} alt={room.name} />
                  <div className="interior-v4-card-content">
                    <span className="interior-v4-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{room.name}</h3>
                    <p>{room.area} м²</p>
                    <button className="interior-v4-btn">Подробнее</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variant 5: Tabs by Room Type */}
      {activeVariant === 5 && (
        <InteriorV5 rooms={rooms} />
      )}

      {/* Variant 6: Bento Grid (like Apple) */}
      {activeVariant === 6 && (
        <section className="interior-v6">
          <div className="interior-v6-header">
            <h2>Интерьер</h2>
            <p>Bento сетка в стиле Apple</p>
          </div>
          <div className="interior-v6-bento">
            {rooms.map((room, i) => (
              <div key={room.id} className={`interior-v6-cell cell-${i + 1}`}>
                <img src={room.image} alt={room.name} />
                <div className="interior-v6-info">
                  <h3>{room.name}</h3>
                  <span>{room.area} м²</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variant 7: Carousel with Preview */}
      {activeVariant === 7 && (
        <InteriorV7 rooms={rooms} />
      )}

      {/* Variant 8: Split Screen */}
      {activeVariant === 8 && (
        <InteriorV8 rooms={rooms} />
      )}

      {/* Variant 9: Accordion Strips */}
      {activeVariant === 9 && (
        <InteriorV9 rooms={rooms} />
      )}

      {/* Variant 10: Circular Wheel */}
      {activeVariant === 10 && (
        <InteriorV10 rooms={rooms} />
      )}

      {/* Variant 11: 3D Flip Cards */}
      {activeVariant === 11 && (
        <section className="interior-v11">
          <div className="interior-v11-grid">
            {rooms.slice(0, 8).map((room, i) => (
              <div key={room.id} className="interior-v11-card">
                <div className="interior-v11-card-inner">
                  <div className="interior-v11-front">
                    <img src={room.image} alt={room.name} />
                    <span className="interior-v11-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="interior-v11-back">
                    <h3>{room.name}</h3>
                    <p>{room.area} м²</p>
                    <span>Наведите для просмотра</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variant 12: Stacked Cards */}
      {activeVariant === 12 && (
        <InteriorV12 rooms={rooms} />
      )}
    </div>
  )
}

// Separate component for Variant 5 with its own state
function InteriorV5({ rooms }: { rooms: typeof rooms }) {
  const [activeTab, setActiveTab] = useState('all')

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'living', name: 'Жилые' },
    { id: 'service', name: 'Сервисные' },
    { id: 'outdoor', name: 'Улица' },
  ]

  const filteredRooms = activeTab === 'all' ? rooms : rooms.filter(room => {
    if (activeTab === 'living') return ['Спальня родителей', 'Детская', 'Гостевая', 'Кухня-гостиная', 'Кабинет'].includes(room.name)
    if (activeTab === 'service') return ['Ванная', 'Санузел', 'Котельная', 'Кладовая', 'Гардероб', 'Постирочная'].includes(room.name)
    if (activeTab === 'outdoor') return ['Терраса'].includes(room.name)
    return true
  })

  return (
    <section className="interior-v5">
      <div className="interior-v5-header">
        <h2>Интерьер</h2>
        <p>Фильтрация по категориям</p>
      </div>
      <div className="interior-v5-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`interior-v5-tab ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="interior-v5-grid">
        {filteredRooms.map(room => (
          <div key={room.id} className="interior-v5-item">
            <img src={room.image} alt={room.name} />
            <div className="interior-v5-info">
              <h3>{room.name}</h3>
              <span>{room.area} м²</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Variant 7: Carousel with large preview
function InteriorV7({ rooms }: { rooms: typeof rooms }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="interior-v7">
      <div className="interior-v7-header">
        <h2>Интерьер</h2>
        <p>Карусель с превью</p>
      </div>
      <div className="interior-v7-layout">
        <div className="interior-v7-main">
          <img src={rooms[activeIndex].image} alt={rooms[activeIndex].name} />
          <div className="interior-v7-main-info">
            <span className="interior-v7-num">{String(activeIndex + 1).padStart(2, '0')}/{rooms.length}</span>
            <h3>{rooms[activeIndex].name}</h3>
            <p>{rooms[activeIndex].area} м²</p>
          </div>
          <div className="interior-v7-nav">
            <button
              onClick={() => setActiveIndex(i => i > 0 ? i - 1 : rooms.length - 1)}
              className="interior-v7-nav-btn"
            >
              ←
            </button>
            <button
              onClick={() => setActiveIndex(i => i < rooms.length - 1 ? i + 1 : 0)}
              className="interior-v7-nav-btn"
            >
              →
            </button>
          </div>
        </div>
        <div className="interior-v7-thumbs">
          {rooms.map((room, i) => (
            <button
              key={room.id}
              className={`interior-v7-thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={room.image} alt={room.name} />
              <span>{room.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// Variant 8: Split screen with list
function InteriorV8({ rooms }: { rooms: typeof rooms }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="interior-v8">
      <div className="interior-v8-left">
        <div className="interior-v8-header">
          <h2>Интерьер</h2>
          <p>14 комнат</p>
        </div>
        <div className="interior-v8-list">
          {rooms.map((room, i) => (
            <button
              key={room.id}
              className={`interior-v8-item ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="interior-v8-item-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="interior-v8-item-name">{room.name}</span>
              <span className="interior-v8-item-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </div>
      <div className="interior-v8-right">
        <img src={rooms[activeIndex].image} alt={rooms[activeIndex].name} />
        <div className="interior-v8-overlay">
          <h3>{rooms[activeIndex].name}</h3>
          <p>{rooms[activeIndex].area} м²</p>
        </div>
      </div>
    </section>
  )
}

// Variant 9: Accordion Strips (вертикальные полоски)
function InteriorV9({ rooms }: { rooms: typeof rooms }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="interior-v9">
      <div className="interior-v9-strips">
        {rooms.slice(0, 10).map((room, i) => (
          <div
            key={room.id}
            className={`interior-v9-strip ${activeIndex === i ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <img src={room.image} alt={room.name} />
            <div className="interior-v9-info">
              <span className="interior-v9-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{room.name}</h3>
              <p>{room.area} м²</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Variant 10: Circular Wheel
function InteriorV10({ rooms }: { rooms: typeof rooms }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const displayRooms = rooms.slice(0, 8)

  return (
    <section className="interior-v10">
      <div className="interior-v10-wheel">
        {displayRooms.map((room, i) => {
          const angle = (i * 360) / displayRooms.length - 90
          const isActive = i === activeIndex
          return (
            <button
              key={room.id}
              className={`interior-v10-item ${isActive ? 'active' : ''}`}
              style={{
                '--angle': `${angle}deg`,
                '--index': i,
              } as React.CSSProperties}
              onClick={() => setActiveIndex(i)}
            >
              <img src={room.image} alt={room.name} />
            </button>
          )
        })}
        <div className="interior-v10-center">
          <img src={displayRooms[activeIndex].image} alt={displayRooms[activeIndex].name} />
          <div className="interior-v10-center-info">
            <h3>{displayRooms[activeIndex].name}</h3>
            <p>{displayRooms[activeIndex].area} м²</p>
          </div>
        </div>
      </div>
      <div className="interior-v10-nav">
        <button onClick={() => setActiveIndex(i => i > 0 ? i - 1 : displayRooms.length - 1)}>←</button>
        <span>{activeIndex + 1} / {displayRooms.length}</span>
        <button onClick={() => setActiveIndex(i => i < displayRooms.length - 1 ? i + 1 : 0)}>→</button>
      </div>
    </section>
  )
}

// Variant 12: Stacked Cards
function InteriorV12({ rooms }: { rooms: typeof rooms }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayRooms = rooms.slice(0, 6)

  const nextCard = () => {
    setCurrentIndex(i => (i + 1) % displayRooms.length)
  }

  return (
    <section className="interior-v12">
      <div className="interior-v12-header">
        <h2>Интерьер</h2>
        <p>Листайте карточки</p>
      </div>
      <div className="interior-v12-stack" onClick={nextCard}>
        {displayRooms.map((room, i) => {
          const offset = (i - currentIndex + displayRooms.length) % displayRooms.length
          return (
            <div
              key={room.id}
              className={`interior-v12-card ${offset === 0 ? 'active' : ''}`}
              style={{
                '--offset': offset,
                zIndex: displayRooms.length - offset,
              } as React.CSSProperties}
            >
              <img src={room.image} alt={room.name} />
              <div className="interior-v12-card-info">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{room.name}</h3>
                <p>{room.area} м²</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="interior-v12-dots">
        {displayRooms.map((_, i) => (
          <button
            key={i}
            className={`interior-v12-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i) }}
          />
        ))}
      </div>
    </section>
  )
}
