import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TransitionSectionDemo.css'

const variants = [
  { n: 1, label: 'Длинный градиент' },
  { n: 2, label: 'Скруглённая карточка' },
  { n: 3, label: 'SVG волна' },
  { n: 4, label: 'Диагональ' },
  { n: 5, label: 'Тёмная арка' },
  { n: 6, label: 'Зелёная полоса' },
]

export function TransitionSectionDemo() {
  const [active, setActive] = useState(1)

  return (
    <div className="tsd-page">
      <nav className="tsd-nav">
        <Link to="/constructor-v1" className="tsd-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <h1>Переход: Hero → Планировка</h1>
      </nav>

      <div className="tsd-tabs">
        {variants.map(t => (
          <button
            key={t.n}
            className={`tsd-tab ${active === t.n ? 'active' : ''}`}
            onClick={() => setActive(t.n)}
          >
            <span className="tsd-tab-num">{t.n}</span>
            <span className="tsd-tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ======= VARIANT 1: Длинный градиент ======= */}
      {active === 1 && (
        <div className="tsd-variant tsd-var1">
          <section className="tsd-hero">
            <img src="/rooms/3.Кухня-столовая.jpg" alt="Hero" className="tsd-hero-img" />
            <div className="tsd-hero-overlay" />
            <div className="tsd-hero-content">
              <span className="tsd-hero-tag">Серия Modern</span>
              <h2>Дом 170 м²</h2>
              <p>Одноэтажный дом с террасой и панорамными окнами</p>
            </div>
          </section>
          <div className="tsd-v1-zone">
            <div className="tsd-v1-gradient" />
          </div>
          <section className="tsd-floor">
            <FloorContent />
          </section>
        </div>
      )}

      {/* ======= VARIANT 2: Скруглённая карточка ======= */}
      {active === 2 && (
        <div className="tsd-variant tsd-var2">
          <section className="tsd-hero">
            <img src="/rooms/3.Кухня-столовая.jpg" alt="Hero" className="tsd-hero-img" />
            <div className="tsd-hero-overlay" />
            <div className="tsd-hero-content">
              <span className="tsd-hero-tag">Серия Modern</span>
              <h2>Дом 170 м²</h2>
              <p>Одноэтажный дом с террасой и панорамными окнами</p>
            </div>
          </section>
          <section className="tsd-floor tsd-floor-rounded">
            <FloorContent />
          </section>
        </div>
      )}

      {/* ======= VARIANT 3: SVG волна ======= */}
      {active === 3 && (
        <div className="tsd-variant tsd-var3">
          <section className="tsd-hero">
            <img src="/rooms/3.Кухня-столовая.jpg" alt="Hero" className="tsd-hero-img" />
            <div className="tsd-hero-overlay" />
            <div className="tsd-hero-content">
              <span className="tsd-hero-tag">Серия Modern</span>
              <h2>Дом 170 м²</h2>
              <p>Одноэтажный дом с террасой и панорамными окнами</p>
            </div>
          </section>
          <div className="tsd-v3-wave-wrap">
            <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="tsd-v3-wave">
              <path d="M0,120 C180,180 360,60 540,100 C720,140 900,40 1080,80 C1200,105 1350,160 1440,120 L1440,180 L0,180 Z" />
            </svg>
          </div>
          <section className="tsd-floor">
            <FloorContent />
          </section>
        </div>
      )}

      {/* ======= VARIANT 4: Диагональ ======= */}
      {active === 4 && (
        <div className="tsd-variant tsd-var4">
          <section className="tsd-hero tsd-hero-diag">
            <img src="/rooms/3.Кухня-столовая.jpg" alt="Hero" className="tsd-hero-img" />
            <div className="tsd-hero-overlay" />
            <div className="tsd-hero-content">
              <span className="tsd-hero-tag">Серия Modern</span>
              <h2>Дом 170 м²</h2>
              <p>Одноэтажный дом с террасой и панорамными окнами</p>
            </div>
          </section>
          <section className="tsd-floor tsd-floor-diag">
            <FloorContent />
          </section>
        </div>
      )}

      {/* ======= VARIANT 5: Тёмная арка ======= */}
      {active === 5 && (
        <div className="tsd-variant tsd-var5">
          <section className="tsd-hero">
            <img src="/rooms/3.Кухня-столовая.jpg" alt="Hero" className="tsd-hero-img" />
            <div className="tsd-hero-overlay" />
            <div className="tsd-hero-content">
              <span className="tsd-hero-tag">Серия Modern</span>
              <h2>Дом 170 м²</h2>
              <p>Одноэтажный дом с террасой и панорамными окнами</p>
            </div>
            <div className="tsd-v5-arch" />
          </section>
          <section className="tsd-floor">
            <FloorContent />
          </section>
        </div>
      )}

      {/* ======= VARIANT 6: Зелёная полоса ======= */}
      {active === 6 && (
        <div className="tsd-variant tsd-var6">
          <section className="tsd-hero">
            <img src="/rooms/3.Кухня-столовая.jpg" alt="Hero" className="tsd-hero-img" />
            <div className="tsd-hero-overlay" />
            <div className="tsd-hero-content">
              <span className="tsd-hero-tag">Серия Modern</span>
              <h2>Дом 170 м²</h2>
              <p>Одноэтажный дом с террасой и панорамными окнами</p>
            </div>
          </section>
          <div className="tsd-v6-strip">
            <div className="tsd-v6-strip-inner">
              <span>150+ домов</span>
              <span className="tsd-v6-dot" />
              <span>12 лет опыта</span>
              <span className="tsd-v6-dot" />
              <span>Гарантия 10 лет</span>
              <span className="tsd-v6-dot" />
              <span>98% довольных клиентов</span>
            </div>
          </div>
          <section className="tsd-floor">
            <FloorContent />
          </section>
        </div>
      )}

      <div className="tsd-spacer" />
    </div>
  )
}

function FloorContent() {
  return (
    <>
      <div className="tsd-floor-header">
        <span className="tsd-floor-tag">Планировка</span>
        <h2>170.96 м²</h2>
        <p>14 помещений продуманных до мелочей</p>
      </div>
      <div className="tsd-floor-stats">
        <div className="tsd-floor-stat">
          <span className="tsd-floor-stat-val">170.96</span>
          <span className="tsd-floor-stat-lbl">Общая площадь, м²</span>
        </div>
        <div className="tsd-floor-stat">
          <span className="tsd-floor-stat-val">14</span>
          <span className="tsd-floor-stat-lbl">Помещений</span>
        </div>
        <div className="tsd-floor-stat">
          <span className="tsd-floor-stat-val">3</span>
          <span className="tsd-floor-stat-lbl">Спальни</span>
        </div>
      </div>
      <div className="tsd-floor-chips">
        {['Прихожая', 'Коридор', 'Кухня-гостиная', 'Спальня', 'Гардероб', 'Ванная', 'С/У', 'Котельная', 'Кладовая', 'Терраса', 'Крыльцо', 'Кухня'].map((r, i) => (
          <span key={i} className="tsd-floor-chip">{r}</span>
        ))}
      </div>
      <div className="tsd-floor-plan-img">
        <img src="/plan.svg" alt="Floor Plan" />
      </div>
    </>
  )
}

export default TransitionSectionDemo
