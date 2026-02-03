import { useState } from 'react'
import './FloorPlanDemo.css'

// Room data
const rooms = [
  { id: 'boiler', name: 'Котельная', area: 6.92, description: 'Техническое помещение', image: '/rooms/boiler.jpg' },
  { id: 'bedroom-parents', name: 'Спальня родителей', area: 13.83, description: 'Спальня с гардеробной', image: '/rooms/5. Спальня.jpg' },
  { id: 'bathroom-small', name: 'С/У', area: 4.83, description: 'Гостевой санузел', image: '/rooms/7.Ванная.jpg' },
  { id: 'hallway', name: 'Прихожая', area: 10.87, description: 'Просторная прихожая', image: '/rooms/1. Прихожая.jpg' },
  { id: 'living-room', name: 'Кухня-гостиная', area: 43.60, description: 'Сердце дома', image: '/rooms/3.Кухня-столовая.jpg' },
  { id: 'bathroom-large', name: 'Ванная', area: 8.47, description: 'Основной санузел', image: '/rooms/7.Ванная.jpg' },
  { id: 'bedroom-left', name: 'Спальня', area: 16.72, description: 'Главная спальня', image: '/rooms/5. Спальня.jpg' },
  { id: 'bedroom-right', name: 'Детская', area: 15.21, description: 'Детская комната', image: '/rooms/5. Спальня.jpg' },
]

const totalArea = 240

export default function FloorPlanDemo() {
  const [activeVariant, setActiveVariant] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  const variants = [
    { id: 1, name: 'Cinematic Split' },
    { id: 2, name: 'Floating Cards' },
    { id: 3, name: '3D Perspective' },
    { id: 4, name: 'Minimal Luxury' },
    { id: 5, name: 'Interactive Grid' },
  ]

  return (
    <div className="fp-demo-page">
      {/* Variant Selector */}
      <div className="fp-demo-nav">
        <h1>Варианты секции планировки</h1>
        <div className="fp-demo-tabs">
          {variants.map(v => (
            <button
              key={v.id}
              className={`fp-demo-tab ${activeVariant === v.id ? 'active' : ''}`}
              onClick={() => { setActiveVariant(v.id); setSelectedRoom(null); setHoveredRoom(null) }}
            >
              {v.id}. {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* Variant 1: Cinematic Split */}
      {activeVariant === 1 && (
        <section className="fp-v1">
          <div className="fp-v1-container">
            <div className="fp-v1-left">
              <div className="fp-v1-header">
                <span className="fp-v1-tag">ПЛАНИРОВКА</span>
                <h2>Продуманное пространство</h2>
                <p>Каждый метр используется максимально эффективно</p>
              </div>
              <div className="fp-v1-stats">
                <div className="fp-v1-stat">
                  <span className="fp-v1-stat-value">{totalArea}</span>
                  <span className="fp-v1-stat-label">м² общая</span>
                </div>
                <div className="fp-v1-stat">
                  <span className="fp-v1-stat-value">{rooms.length}</span>
                  <span className="fp-v1-stat-label">помещений</span>
                </div>
                <div className="fp-v1-stat">
                  <span className="fp-v1-stat-value">1</span>
                  <span className="fp-v1-stat-label">этаж</span>
                </div>
              </div>
              <div className="fp-v1-rooms">
                {rooms.map(room => (
                  <button
                    key={room.id}
                    className={`fp-v1-room ${selectedRoom === room.id ? 'active' : ''}`}
                    onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                  >
                    <span className="fp-v1-room-name">{room.name}</span>
                    <span className="fp-v1-room-area">{room.area} м²</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="fp-v1-right">
              <div className="fp-v1-plan">
                <img src="/floor-plan.svg" alt="План" />
                <div className="fp-v1-plan-overlay" />
              </div>
              {selectedRoom && (
                <div className="fp-v1-room-preview">
                  <img src={rooms.find(r => r.id === selectedRoom)?.image} alt="" />
                  <div className="fp-v1-room-preview-info">
                    <h3>{rooms.find(r => r.id === selectedRoom)?.name}</h3>
                    <p>{rooms.find(r => r.id === selectedRoom)?.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Variant 2: Floating Cards */}
      {activeVariant === 2 && (
        <section className="fp-v2">
          <div className="fp-v2-header">
            <h2>Планировка дома</h2>
            <div className="fp-v2-area-badge">
              <span>{totalArea} м²</span>
            </div>
          </div>
          <div className="fp-v2-content">
            <div className="fp-v2-plan-wrapper">
              <img src="/floor-plan.svg" alt="План" className="fp-v2-plan" />
              <div className="fp-v2-glow" />
            </div>
            <div className="fp-v2-cards">
              {rooms.slice(0, 6).map((room, idx) => (
                <div
                  key={room.id}
                  className={`fp-v2-card fp-v2-card-${idx + 1}`}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                >
                  <div className="fp-v2-card-inner">
                    <img src={room.image} alt={room.name} />
                    <div className="fp-v2-card-content">
                      <h4>{room.name}</h4>
                      <span>{room.area} м²</span>
                    </div>
                  </div>
                  {hoveredRoom === room.id && (
                    <div className="fp-v2-card-expand">
                      <p>{room.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Variant 3: 3D Perspective */}
      {activeVariant === 3 && (
        <section className="fp-v3">
          <div className="fp-v3-scene">
            <div className="fp-v3-floor">
              <div className="fp-v3-plan-container">
                <img src="/floor-plan.svg" alt="План" className="fp-v3-plan" />
                <div className="fp-v3-shadow" />
              </div>
            </div>
            <div className="fp-v3-info-panel">
              <div className="fp-v3-title">
                <span className="fp-v3-eyebrow">ПЕРВЫЙ ЭТАЖ</span>
                <h2>Планировка</h2>
              </div>
              <div className="fp-v3-total">
                <div className="fp-v3-total-number">{totalArea}</div>
                <div className="fp-v3-total-label">квадратных метров</div>
              </div>
              <div className="fp-v3-room-list">
                {rooms.map(room => (
                  <div
                    key={room.id}
                    className={`fp-v3-room-item ${hoveredRoom === room.id ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                  >
                    <div className="fp-v3-room-line" />
                    <span className="fp-v3-room-name">{room.name}</span>
                    <span className="fp-v3-room-area">{room.area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Variant 4: Minimal Luxury */}
      {activeVariant === 4 && (
        <section className="fp-v4">
          <div className="fp-v4-grid">
            <div className="fp-v4-plan-cell">
              <div className="fp-v4-plan-frame">
                <img src="/floor-plan.svg" alt="План" />
              </div>
              <div className="fp-v4-badge">
                <span className="fp-v4-badge-number">{totalArea}</span>
                <span className="fp-v4-badge-unit">м²</span>
              </div>
            </div>
            <div className="fp-v4-info-cell">
              <div className="fp-v4-header">
                <div className="fp-v4-line" />
                <h2>Планировка</h2>
                <p>Одноэтажный дом с продуманной эргономикой</p>
              </div>
              <div className="fp-v4-rooms-grid">
                {rooms.map(room => (
                  <button
                    key={room.id}
                    className={`fp-v4-room-card ${selectedRoom === room.id ? 'active' : ''}`}
                    onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                  >
                    <div className="fp-v4-room-card-bg" style={{ backgroundImage: `url(${room.image})` }} />
                    <div className="fp-v4-room-card-content">
                      <span className="fp-v4-room-area">{room.area} м²</span>
                      <span className="fp-v4-room-name">{room.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Variant 5: Interactive Grid */}
      {activeVariant === 5 && (
        <section className="fp-v5">
          <div className="fp-v5-header">
            <div className="fp-v5-title-group">
              <span className="fp-v5-overline">LAYOUT</span>
              <h2>Планировка дома</h2>
            </div>
            <div className="fp-v5-counter">
              <span className="fp-v5-counter-value">{totalArea}</span>
              <span className="fp-v5-counter-unit">м²</span>
            </div>
          </div>
          <div className="fp-v5-main">
            <div className="fp-v5-sidebar">
              {rooms.map((room, idx) => (
                <button
                  key={room.id}
                  className={`fp-v5-sidebar-item ${selectedRoom === room.id ? 'active' : ''}`}
                  onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                >
                  <span className="fp-v5-sidebar-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="fp-v5-sidebar-name">{room.name}</span>
                  <span className="fp-v5-sidebar-area">{room.area}</span>
                </button>
              ))}
            </div>
            <div className="fp-v5-plan-area">
              <div className="fp-v5-plan-wrapper">
                <img src="/floor-plan.svg" alt="План" />
                {selectedRoom && (
                  <div className="fp-v5-spotlight" />
                )}
              </div>
              {selectedRoom && (
                <div className="fp-v5-room-detail">
                  <img src={rooms.find(r => r.id === selectedRoom)?.image} alt="" />
                  <div className="fp-v5-room-detail-info">
                    <h3>{rooms.find(r => r.id === selectedRoom)?.name}</h3>
                    <p>{rooms.find(r => r.id === selectedRoom)?.description}</p>
                    <span className="fp-v5-room-detail-area">{rooms.find(r => r.id === selectedRoom)?.area} м²</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
