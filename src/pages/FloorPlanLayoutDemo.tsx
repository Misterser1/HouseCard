import { useState } from 'react'
import './FloorPlanLayoutDemo.css'

const rooms = [
  { name: 'Прихожая', area: 10.87 },
  { name: 'Коридор', area: 9.12 },
  { name: 'Кухня-гостиная', area: 43.6 },
  { name: 'Спальня', area: 13.83 },
  { name: 'Гардероб', area: 6.08 },
  { name: 'Спальня', area: 16.72 },
  { name: 'Спальня', area: 11.88 },
  { name: 'Ванная', area: 8.47 },
  { name: 'С/У', area: 4.63 },
  { name: 'Котельная', area: 6.92 },
  { name: 'Кладовая', area: 8.07 },
  { name: 'Терраса', area: 26.27 },
  { name: 'Крыльцо', area: 4.5 },
  { name: 'Кухня', area: 12.04 },
]

export default function FloorPlanLayoutDemo() {
  const [activeRoom, setActiveRoom] = useState<number | null>(null)

  return (
    <div className="layout-demo-page">
      <h1>Варианты секции планировки</h1>

      {/* Variant 1: Minimal Dark */}
      <section className="full-variant dark-variant">
        <div className="variant-label">1. Минимализм (тёмный)</div>
        <div className="v1-layout">
          <div className="v1-left">
            <div className="v1-header">
              <h2>Планировка</h2>
              <div className="v1-stats-inline">
                <span>240 м²</span>
                <span className="v1-dot">•</span>
                <span>14 комнат</span>
                <span className="v1-dot">•</span>
                <span>1 этаж</span>
              </div>
            </div>
            <div className="v1-rooms">
              {rooms.map((room, i) => (
                <button key={i} className={`v1-room ${activeRoom === i ? 'active' : ''}`} onClick={() => setActiveRoom(i)}>
                  <span>{room.name}</span>
                  <span className="v1-area">{room.area}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="v1-plan">
            <img src="/floor-plan.svg" alt="План" />
          </div>
        </div>
      </section>

      {/* Variant 2: Cards Grid */}
      <section className="full-variant light-variant">
        <div className="variant-label">2. Карточки сетка</div>
        <div className="v2-layout">
          <div className="v2-top">
            <div className="v2-info">
              <span className="v2-tag">Планировка</span>
              <h2>240 м²</h2>
              <p>14 помещений • 1 этаж</p>
            </div>
            <div className="v2-plan">
              <img src="/floor-plan.svg" alt="План" />
            </div>
          </div>
          <div className="v2-rooms">
            {rooms.map((room, i) => (
              <button key={i} className={`v2-card ${activeRoom === i ? 'active' : ''}`} onClick={() => setActiveRoom(i)}>
                <span className="v2-name">{room.name}</span>
                <span className="v2-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 3: Side pills */}
      <section className="full-variant green-variant">
        <div className="variant-label">3. Боковые пилюли</div>
        <div className="v3-layout">
          <div className="v3-sidebar">
            <h2>Планировка</h2>
            <div className="v3-meta">
              <div className="v3-stat"><strong>240</strong> м²</div>
              <div className="v3-stat"><strong>14</strong> комнат</div>
            </div>
            <div className="v3-rooms">
              {rooms.map((room, i) => (
                <button key={i} className={`v3-pill ${activeRoom === i ? 'active' : ''}`} onClick={() => setActiveRoom(i)}>
                  {room.name} <span>{room.area}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="v3-plan">
            <img src="/floor-plan.svg" alt="План" />
          </div>
        </div>
      </section>

      {/* Variant 4: Horizontal bottom bar */}
      <section className="full-variant cream-variant">
        <div className="variant-label">4. Нижняя панель</div>
        <div className="v4-layout">
          <div className="v4-main">
            <div className="v4-header">
              <h2>Планировка дома</h2>
              <div className="v4-badges">
                <span className="v4-badge">240 м²</span>
                <span className="v4-badge">14 комнат</span>
                <span className="v4-badge">1 этаж</span>
              </div>
            </div>
            <div className="v4-plan">
              <img src="/floor-plan.svg" alt="План" />
            </div>
          </div>
          <div className="v4-bottom">
            {rooms.map((room, i) => (
              <button key={i} className={`v4-chip ${activeRoom === i ? 'active' : ''}`} onClick={() => setActiveRoom(i)}>
                <span className="v4-name">{room.name}</span>
                <span className="v4-area">{room.area}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 5: Split with accent */}
      <section className="full-variant split-variant">
        <div className="variant-label">5. Разделённый с акцентом</div>
        <div className="v5-layout">
          <div className="v5-accent">
            <div className="v5-number">240</div>
            <div className="v5-unit">м²</div>
            <div className="v5-divider"></div>
            <div className="v5-counts">
              <div>14 комнат</div>
              <div>1 этаж</div>
            </div>
          </div>
          <div className="v5-content">
            <div className="v5-rooms-grid">
              {rooms.map((room, i) => (
                <button key={i} className={`v5-item ${activeRoom === i ? 'active' : ''}`} onClick={() => setActiveRoom(i)}>
                  <span className="v5-name">{room.name}</span>
                  <span className="v5-area">{room.area} м²</span>
                </button>
              ))}
            </div>
          </div>
          <div className="v5-plan">
            <img src="/floor-plan.svg" alt="План" />
          </div>
        </div>
      </section>

      {/* Variant 6: Overlay style */}
      <section className="full-variant overlay-variant">
        <div className="variant-label">6. Оверлей стиль</div>
        <div className="v6-layout">
          <div className="v6-plan-bg">
            <img src="/floor-plan.svg" alt="План" />
          </div>
          <div className="v6-overlay">
            <div className="v6-info">
              <h2>Планировка</h2>
              <div className="v6-stats">240 м² • 14 комнат</div>
            </div>
            <div className="v6-rooms">
              {rooms.slice(0, 10).map((room, i) => (
                <button key={i} className={`v6-tag ${activeRoom === i ? 'active' : ''}`} onClick={() => setActiveRoom(i)}>
                  {room.name}
                </button>
              ))}
              <button className="v6-more">+4</button>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 7: Modern compact */}
      <section className="full-variant modern-variant">
        <div className="variant-label">7. Современный компакт</div>
        <div className="v7-layout">
          <div className="v7-left">
            <div className="v7-title-row">
              <h2>План дома</h2>
              <div className="v7-stats">
                <span className="v7-big">240</span>
                <span className="v7-small">м² / 14 комнат</span>
              </div>
            </div>
            <div className="v7-grid">
              {rooms.map((room, i) => (
                <div key={i} className={`v7-cell ${activeRoom === i ? 'active' : ''}`} onClick={() => setActiveRoom(i)}>
                  <div className="v7-cell-name">{room.name}</div>
                  <div className="v7-cell-area">{room.area}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="v7-right">
            <img src="/floor-plan.svg" alt="План" />
          </div>
        </div>
      </section>

    </div>
  )
}
