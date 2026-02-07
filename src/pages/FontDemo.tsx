import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FontDemo.css'

const fonts = [
  { id: 1, name: 'Playfair Display', family: "'Playfair Display', Georgia, serif", desc: 'Элегантный, журнальный, премиальный' },
  { id: 2, name: 'Cormorant Garamond', family: "'Cormorant Garamond', Georgia, serif", desc: 'Утончённый, классический, книжный' },
  { id: 3, name: 'DM Serif Display', family: "'DM Serif Display', Georgia, serif", desc: 'Контрастный, выразительный, дорогой' },
  { id: 4, name: 'Montserrat', family: "'Montserrat', sans-serif", desc: 'Современный, геометричный, чистый' },
  { id: 5, name: 'Raleway', family: "'Raleway', sans-serif", desc: 'Тонкий, воздушный, архитектурный' },
  { id: 6, name: 'Lora', family: "'Lora', Georgia, serif", desc: 'Мягкий serif, уютный, сбалансированный' },
  { id: 7, name: 'Libre Baskerville', family: "'Libre Baskerville', Georgia, serif", desc: 'Строгий, британский, благородный' },
  { id: 8, name: 'Josefin Sans', family: "'Josefin Sans', sans-serif", desc: 'Геометрический, скандинавский стиль' },
  { id: 9, name: 'Tenor Sans', family: "'Tenor Sans', sans-serif", desc: 'Минималистичный, деликатный' },
  { id: 10, name: 'Forum', family: "'Forum', Georgia, serif", desc: 'Античный, монументальный, римский' },
  { id: 11, name: 'Cinzel', family: "'Cinzel', Georgia, serif", desc: 'Величественный, роскошный, для логотипов' },
  { id: 12, name: 'Spectral', family: "'Spectral', Georgia, serif", desc: 'Современный serif, экранный, читаемый' },
]

export function FontDemo() {
  const [activeFont, setActiveFont] = useState(1)
  const current = fonts.find(f => f.id === activeFont)!

  return (
    <div className="font-demo-page">
      <nav className="font-demo-nav">
        <Link to="/constructor-v1" className="font-demo-back">← Назад</Link>
        <h1>Выбор шрифта</h1>
        <div className="font-demo-tabs">
          {fonts.map(f => (
            <button
              key={f.id}
              className={`font-demo-tab ${activeFont === f.id ? 'active' : ''}`}
              onClick={() => setActiveFont(f.id)}
            >
              {f.id}
            </button>
          ))}
        </div>
      </nav>

      <div className="font-demo-label">
        <span className="font-demo-label-name">{current.name}</span>
        <span className="font-demo-label-desc">{current.desc}</span>
      </div>

      {/* Preview */}
      <div className="font-demo-preview" style={{ fontFamily: current.family }}>
        {/* Hero-like section */}
        <div className="font-preview-hero">
          <span className="font-preview-tag">ПРЕМИУМ КЛАСС</span>
          <h1>HouseCard</h1>
          <p className="font-preview-subtitle">Дома, в которых хочется жить</p>
        </div>

        {/* Section headers */}
        <div className="font-preview-sections">
          <div className="font-preview-section">
            <h2>Планировка</h2>
            <p>Каждый метр используется максимально эффективно</p>
          </div>
          <div className="font-preview-section">
            <h2>Интерьер</h2>
            <p>Визуализация всех 14 помещений вашего будущего дома</p>
          </div>
          <div className="font-preview-section">
            <h2>Стоимость</h2>
            <p>Прозрачное ценообразование без скрытых платежей</p>
          </div>
        </div>

        {/* UI elements */}
        <div className="font-preview-ui">
          <div className="font-preview-card">
            <h3>Фасад</h3>
            <div className="font-preview-options">
              <span className="font-preview-option">Кирпич</span>
              <span className="font-preview-option active">Комбинированный</span>
              <span className="font-preview-option">Вентилируемый</span>
            </div>
          </div>
          <div className="font-preview-card">
            <h3>Кровля</h3>
            <div className="font-preview-options">
              <span className="font-preview-option active">Натуральная</span>
              <span className="font-preview-option">Мягкая</span>
              <span className="font-preview-option">Плоская</span>
            </div>
          </div>
          <div className="font-preview-card">
            <h3>Статистика</h3>
            <div className="font-preview-stats">
              <div className="font-preview-stat">
                <span className="font-preview-stat-val">1 200+</span>
                <span className="font-preview-stat-lbl">построенных домов</span>
              </div>
              <div className="font-preview-stat">
                <span className="font-preview-stat-val">15 лет</span>
                <span className="font-preview-stat-lbl">на рынке</span>
              </div>
              <div className="font-preview-stat">
                <span className="font-preview-stat-val">189.17 м²</span>
                <span className="font-preview-stat-lbl">общая площадь</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weight showcase */}
        <div className="font-preview-weights">
          <h3>Начертания</h3>
          <div className="font-preview-weight-list">
            <span style={{ fontWeight: 300 }}>Light 300 — Дом мечты</span>
            <span style={{ fontWeight: 400 }}>Regular 400 — Дом мечты</span>
            <span style={{ fontWeight: 500 }}>Medium 500 — Дом мечты</span>
            <span style={{ fontWeight: 600 }}>SemiBold 600 — Дом мечты</span>
            <span style={{ fontWeight: 700 }}>Bold 700 — Дом мечты</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FontDemo
