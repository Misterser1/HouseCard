import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TransitionDemoV2.css'

const rooms = [
  { name: 'Спальня', area: 16.72, image: '/rooms/6.Спальня.jpg' },
  { name: 'Ванная', area: 8.47, image: '/rooms/7.Ванная.jpg' },
  { name: 'Кладовая', area: 8.07, image: '/rooms/8.Кладовая.jpg' },
  { name: 'Терраса', area: 26.27, image: '/rooms/10.%20Терраса.jpg' },
  { name: 'Крыльцо', area: 4.50, image: '/rooms/11.Крыльцо.jpg' },
  { name: 'Кухня', area: 12.04, image: '/rooms/4.%20Кухня.jpg' },
]

const socialLinks = [
  { name: 'YouTube', color: '#FF0000' },
  { name: 'Telegram', color: '#26A5E4' },
  { name: 'VK', color: '#0077FF' },
  { name: 'Дзен', color: '#000' },
]

const stats = [
  { value: '150+', label: 'Домов построено' },
  { value: '12', label: 'Лет опыта' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '24/7', label: 'Поддержка' },
]

export function TransitionDemoV2() {
  const [active, setActive] = useState(1)

  return (
    <div className="tdv2-page">
      <nav className="tdv2-nav">
        <Link to="/constructor-v1" className="tdv2-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <h1>Переход: Интерьер → Контакты</h1>
      </nav>

      <div className="tdv2-tabs">
        {[
          { n: 1, label: 'Мягкий градиент' },
          { n: 2, label: 'Волна SVG' },
          { n: 3, label: 'Диагональ' },
          { n: 4, label: 'Тонкая линия' },
          { n: 5, label: 'Тень-перекрытие' },
        ].map(t => (
          <button
            key={t.n}
            className={`tdv2-tab ${active === t.n ? 'active' : ''}`}
            onClick={() => setActive(t.n)}
          >
            <span className="tdv2-tab-num">{t.n}</span>
            <span className="tdv2-tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Mini interior section (last few rooms) */}
      <section className="tdv2-interior">
        <div className="tdv2-interior-grid">
          {rooms.map((r, i) => (
            <div key={i} className={`tdv2-room ${i === 0 || i === 3 ? 'wide' : ''}`}>
              <img src={r.image} alt={r.name} />
              <div className="tdv2-room-overlay">
                <span>{r.name}</span>
                <span>{r.area} м²</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === TRANSITION VARIANTS === */}

      {active === 1 && (
        <div className="tdv2-transition tdv2-t1">
          <div className="tdv2-t1-gradient" />
        </div>
      )}

      {active === 2 && (
        <div className="tdv2-transition tdv2-t2">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="tdv2-t2-wave">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#e4efe8"/>
          </svg>
          <div className="tdv2-t2-fill" />
        </div>
      )}

      {active === 3 && (
        <div className="tdv2-transition tdv2-t3">
          <div className="tdv2-t3-diagonal" />
        </div>
      )}

      {active === 4 && (
        <div className="tdv2-transition tdv2-t4">
          <div className="tdv2-t4-space">
            <div className="tdv2-t4-line" />
          </div>
        </div>
      )}

      {active === 5 && (
        <div className="tdv2-transition tdv2-t5" />
      )}

      {/* Mini social section */}
      <section className={`tdv2-social ${active === 5 ? 'overlap' : ''}`}>
        <div className="tdv2-social-inner">
          <div className="tdv2-social-info">
            <h2>HouseCard</h2>
            <p>Дома, в которых хочется жить</p>
            <div className="tdv2-social-stats">
              {stats.map(s => (
                <div key={s.label} className="tdv2-social-stat">
                  <span className="tdv2-social-stat-val">{s.value}</span>
                  <span className="tdv2-social-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tdv2-social-links">
            {socialLinks.map(s => (
              <div key={s.name} className="tdv2-social-link" style={{ '--accent': s.color } as React.CSSProperties}>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TransitionDemoV2
