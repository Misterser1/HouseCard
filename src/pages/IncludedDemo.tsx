import { useState } from 'react'
import { Link } from 'react-router-dom'
import './IncludedDemo.css'

// Данные
const includedGroups = [
  {
    title: 'Проектирование',
    icon: '📐',
    items: ['Архитектурный проект', 'Конструктивный раздел', 'Инженерные разделы', '3D-визуализация']
  },
  {
    title: 'Строительство',
    icon: '🏗️',
    items: ['Фундамент под ключ', 'Стены и перегородки', 'Кровельные работы', 'Окна и двери', 'Фасадная отделка']
  },
  {
    title: 'Инженерия',
    icon: '⚡',
    items: ['Электромонтаж', 'Водоснабжение', 'Отопление', 'Вентиляция']
  }
]

const paymentStages = [
  { percent: 10, title: 'Договор', desc: 'Предоплата при заключении', icon: '📝' },
  { percent: 25, title: 'Фундамент', desc: 'После завершения работ', icon: '🧱' },
  { percent: 30, title: 'Коробка', desc: 'Стены и кровля готовы', icon: '🏠' },
  { percent: 25, title: 'Инженерия', desc: 'Коммуникации проведены', icon: '🔧' },
  { percent: 10, title: 'Сдача', desc: 'Финальный расчёт', icon: '🔑' }
]

export function IncludedDemo() {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)

  // Для аккордеона
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  // Для табов
  const [activeTab, setActiveTab] = useState(0)

  // Для флип-карточек
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  // Для степпера
  const [activeStep, setActiveStep] = useState(0)

  const toggleFlip = (idx: number) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(idx)) {
      newFlipped.delete(idx)
    } else {
      newFlipped.add(idx)
    }
    setFlippedCards(newFlipped)
  }

  return (
    <div className="included-demo">
      <header className="demo-header">
        <Link to="/constructor" className="back-link">← Назад к конструктору</Link>
        <h1>Варианты отображения секции</h1>
        <p>Разные форматы подачи информации</p>
      </header>

      {/* ============================================ */}
      {/* ВАРИАНТ 1: АККОРДЕОН */}
      {/* ============================================ */}
      <section className={`demo-section ${selectedVariant === 1 ? 'selected' : ''}`}>
        <div className="variant-header">
          <span className="variant-number">01</span>
          <h2>Аккордеон</h2>
          <span className="variant-tag">Раскрывающиеся секции</span>
          <button
            className={`select-btn ${selectedVariant === 1 ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 1 ? null : 1)}
          >
            {selectedVariant === 1 ? '✓ Выбрано' : 'Выбрать'}
          </button>
        </div>

        <div className="accordion-container">
          <div className="accordion-section">
            <h3 className="accordion-main-title">Что входит в стоимость</h3>
            {includedGroups.map((group, idx) => (
              <div key={idx} className={`accordion-item ${openAccordion === idx ? 'open' : ''}`}>
                <button
                  className="accordion-header"
                  onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                >
                  <span className="accordion-icon">{group.icon}</span>
                  <span className="accordion-title">{group.title}</span>
                  <span className="accordion-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </span>
                </button>
                <div className="accordion-content">
                  <ul>
                    {group.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="accordion-payment">
            <h3 className="accordion-main-title">Этапы оплаты</h3>
            <div className="accordion-timeline">
              {paymentStages.map((stage, idx) => (
                <div key={idx} className="accordion-stage">
                  <div className="accordion-stage-dot">{stage.icon}</div>
                  <div className="accordion-stage-info">
                    <div className="accordion-stage-top">
                      <span className="accordion-stage-title">{stage.title}</span>
                      <span className="accordion-stage-percent">{stage.percent}%</span>
                    </div>
                    <span className="accordion-stage-desc">{stage.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ВАРИАНТ 2: ТАБЫ */}
      {/* ============================================ */}
      <section className={`demo-section ${selectedVariant === 2 ? 'selected' : ''}`}>
        <div className="variant-header">
          <span className="variant-number">02</span>
          <h2>Переключаемые вкладки</h2>
          <span className="variant-tag">Всё в одном блоке</span>
          <button
            className={`select-btn ${selectedVariant === 2 ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 2 ? null : 2)}
          >
            {selectedVariant === 2 ? '✓ Выбрано' : 'Выбрать'}
          </button>
        </div>

        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => setActiveTab(0)}
            >
              📦 Что входит
            </button>
            <button
              className={`tab-btn ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              💳 Оплата
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 0 ? (
              <div className="tab-panel">
                <div className="tab-grid">
                  {includedGroups.map((group, idx) => (
                    <div key={idx} className="tab-group">
                      <div className="tab-group-header">
                        <span className="tab-group-icon">{group.icon}</span>
                        <h4>{group.title}</h4>
                      </div>
                      <ul>
                        {group.items.map((item, i) => (
                          <li key={i}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                              <path d="M5 13l4 4L19 7"/>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="tab-panel">
                <div className="tab-payment-flow">
                  {paymentStages.map((stage, idx) => (
                    <div key={idx} className="tab-payment-item">
                      <div className="tab-payment-circle">
                        <span className="tab-payment-emoji">{stage.icon}</span>
                        <span className="tab-payment-percent">{stage.percent}%</span>
                      </div>
                      <div className="tab-payment-label">{stage.title}</div>
                      {idx < paymentStages.length - 1 && <div className="tab-payment-arrow">→</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ВАРИАНТ 3: FLIP КАРТОЧКИ */}
      {/* ============================================ */}
      <section className={`demo-section ${selectedVariant === 3 ? 'selected' : ''}`}>
        <div className="variant-header">
          <span className="variant-number">03</span>
          <h2>Переворачивающиеся карточки</h2>
          <span className="variant-tag">Кликните чтобы перевернуть</span>
          <button
            className={`select-btn ${selectedVariant === 3 ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 3 ? null : 3)}
          >
            {selectedVariant === 3 ? '✓ Выбрано' : 'Выбрать'}
          </button>
        </div>

        <div className="flip-container">
          {/* Что входит - flip cards */}
          <div className="flip-section">
            <h3>Что входит в стоимость</h3>
            <div className="flip-grid">
              {includedGroups.map((group, idx) => (
                <div
                  key={idx}
                  className={`flip-card ${flippedCards.has(idx) ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(idx)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <span className="flip-icon">{group.icon}</span>
                      <h4>{group.title}</h4>
                      <span className="flip-hint">Нажмите</span>
                    </div>
                    <div className="flip-card-back">
                      <ul>
                        {group.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Оплата - круговая диаграмма */}
          <div className="flip-payment">
            <h3>График оплаты</h3>
            <div className="circular-chart">
              <svg viewBox="0 0 200 200">
                {paymentStages.map((stage, idx) => {
                  const startAngle = paymentStages.slice(0, idx).reduce((sum, s) => sum + s.percent * 3.6, -90)
                  const endAngle = startAngle + stage.percent * 3.6
                  const x1 = 100 + 70 * Math.cos(startAngle * Math.PI / 180)
                  const y1 = 100 + 70 * Math.sin(startAngle * Math.PI / 180)
                  const x2 = 100 + 70 * Math.cos(endAngle * Math.PI / 180)
                  const y2 = 100 + 70 * Math.sin(endAngle * Math.PI / 180)
                  const largeArc = stage.percent > 50 ? 1 : 0
                  const colors = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']
                  return (
                    <path
                      key={idx}
                      d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={colors[idx]}
                      stroke="white"
                      strokeWidth="2"
                    />
                  )
                })}
                <circle cx="100" cy="100" r="40" fill="white"/>
                <text x="100" y="95" textAnchor="middle" fontSize="12" fill="#666">Итого</text>
                <text x="100" y="115" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">100%</text>
              </svg>
              <div className="circular-legend">
                {paymentStages.map((stage, idx) => {
                  const colors = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']
                  return (
                    <div key={idx} className="legend-item">
                      <span className="legend-color" style={{ background: colors[idx] }}></span>
                      <span className="legend-text">{stage.title} — {stage.percent}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ВАРИАНТ 4: ГОРИЗОНТАЛЬНЫЙ СТЕППЕР */}
      {/* ============================================ */}
      <section className={`demo-section ${selectedVariant === 4 ? 'selected' : ''}`}>
        <div className="variant-header">
          <span className="variant-number">04</span>
          <h2>Интерактивный степпер</h2>
          <span className="variant-tag">Кликайте на этапы</span>
          <button
            className={`select-btn ${selectedVariant === 4 ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 4 ? null : 4)}
          >
            {selectedVariant === 4 ? '✓ Выбрано' : 'Выбрать'}
          </button>
        </div>

        <div className="stepper-container">
          <div className="stepper-included">
            <h3>Что входит в стоимость</h3>
            <div className="stepper-badges">
              {includedGroups.flatMap(g => g.items).map((item, idx) => (
                <span key={idx} className="stepper-badge">✓ {item}</span>
              ))}
            </div>
          </div>

          <div className="stepper-payment">
            <h3>Этапы оплаты</h3>
            <div className="stepper-track">
              {paymentStages.map((stage, idx) => (
                <div
                  key={idx}
                  className={`stepper-step ${idx <= activeStep ? 'active' : ''} ${idx === activeStep ? 'current' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="stepper-node">
                    <span className="stepper-emoji">{stage.icon}</span>
                  </div>
                  <div className="stepper-label">{stage.title}</div>
                  <div className="stepper-percent">{stage.percent}%</div>
                  {idx < paymentStages.length - 1 && <div className="stepper-line"></div>}
                </div>
              ))}
            </div>
            <div className="stepper-detail">
              <div className="stepper-detail-icon">{paymentStages[activeStep].icon}</div>
              <div className="stepper-detail-content">
                <h4>{paymentStages[activeStep].title}</h4>
                <p>{paymentStages[activeStep].desc}</p>
                <div className="stepper-detail-percent">{paymentStages[activeStep].percent}% от стоимости</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ВАРИАНТ 5: БЕГУЩАЯ СТРОКА + ПРОГРЕСС БАР */}
      {/* ============================================ */}
      <section className={`demo-section ${selectedVariant === 5 ? 'selected' : ''}`}>
        <div className="variant-header">
          <span className="variant-number">05</span>
          <h2>Marquee + Прогресс-бар</h2>
          <span className="variant-tag">Динамичное отображение</span>
          <button
            className={`select-btn ${selectedVariant === 5 ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 5 ? null : 5)}
          >
            {selectedVariant === 5 ? '✓ Выбрано' : 'Выбрать'}
          </button>
        </div>

        <div className="marquee-container">
          <h3>В стоимость входит</h3>
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {[...includedGroups, ...includedGroups].map((group, gIdx) => (
                group.items.map((item, idx) => (
                  <span key={`${gIdx}-${idx}`} className="marquee-item">
                    <span className="marquee-check">✓</span> {item}
                  </span>
                ))
              ))}
            </div>
          </div>

          <h3 style={{ marginTop: '32px' }}>Схема оплаты</h3>
          <div className="progress-payment">
            <div className="progress-bar-container">
              {paymentStages.map((stage, idx) => {
                const colors = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']
                return (
                  <div
                    key={idx}
                    className="progress-segment"
                    style={{ width: `${stage.percent}%`, background: colors[idx] }}
                  >
                    <span className="progress-segment-text">{stage.percent}%</span>
                  </div>
                )
              })}
            </div>
            <div className="progress-labels">
              {paymentStages.map((stage, idx) => (
                <div key={idx} className="progress-label" style={{ width: `${stage.percent}%` }}>
                  <span className="progress-label-icon">{stage.icon}</span>
                  <span className="progress-label-title">{stage.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ВАРИАНТ 6: HOVER REVEAL */}
      {/* ============================================ */}
      <section className={`demo-section ${selectedVariant === 6 ? 'selected' : ''}`}>
        <div className="variant-header">
          <span className="variant-number">06</span>
          <h2>Hover Reveal</h2>
          <span className="variant-tag">Наведите для деталей</span>
          <button
            className={`select-btn ${selectedVariant === 6 ? 'active' : ''}`}
            onClick={() => setSelectedVariant(selectedVariant === 6 ? null : 6)}
          >
            {selectedVariant === 6 ? '✓ Выбрано' : 'Выбрать'}
          </button>
        </div>

        <div className="hover-container">
          <div className="hover-included">
            <h3>Состав работ</h3>
            <div className="hover-grid">
              {includedGroups.map((group, idx) => (
                <div key={idx} className="hover-card">
                  <div className="hover-card-preview">
                    <span className="hover-card-icon">{group.icon}</span>
                    <span className="hover-card-title">{group.title}</span>
                    <span className="hover-card-count">{group.items.length} пунктов</span>
                  </div>
                  <div className="hover-card-reveal">
                    {group.items.map((item, i) => (
                      <div key={i} className="hover-card-item">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hover-payment">
            <h3>Оплата по этапам</h3>
            <div className="hover-stages">
              {paymentStages.map((stage, idx) => (
                <div key={idx} className="hover-stage">
                  <div className="hover-stage-main">
                    <span className="hover-stage-icon">{stage.icon}</span>
                    <span className="hover-stage-title">{stage.title}</span>
                    <span className="hover-stage-percent">{stage.percent}%</span>
                  </div>
                  <div className="hover-stage-tooltip">{stage.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedVariant && (
        <div className="selected-notification">
          Выбран вариант {selectedVariant}. Сообщите номер, и я применю его к конструктору!
        </div>
      )}
    </div>
  )
}
