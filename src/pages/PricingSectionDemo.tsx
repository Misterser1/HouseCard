import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './PricingSectionDemo.css'

const packages = [
  {
    name: 'Коробка',
    price: '8.5',
    pricePerM: '35 400',
    description: 'Базовая комплектация',
    note: 'Только конструктив',
    features: ['Фундамент монолитная плита', 'Стены из газобетона 400мм', 'Кровля с утеплением', 'Окна ПВХ двухкамерные', 'Входная дверь'],
    percent: 33,
  },
  {
    name: 'Стандарт',
    price: '12.5',
    pricePerM: '52 000',
    description: 'Оптимальный выбор',
    note: '',
    features: ['Всё из "Коробки"', 'Электрика полный монтаж', 'Отопление газовый котёл', 'Водоснабжение и канализация', 'Черновая отделка'],
    popular: true,
    percent: 66,
  },
  {
    name: 'Под ключ',
    price: '18.9',
    pricePerM: '78 750',
    description: 'Максимум комфорта',
    note: 'Заезжай и живи',
    features: ['Всё из "Стандарта"', 'Чистовая отделка премиум', 'Сантехника и освещение', 'Межкомнатные двери', 'Готов к заселению'],
    percent: 100,
  }
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

export default function PricingSectionDemo() {
  const [activePackage, setActivePackage] = useState(1)
  const [sliderValue, setSliderValue] = useState(66)
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({})
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const observerRefs = useRef<{[key: string]: HTMLElement | null}>({})

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.2 }
    )

    Object.values(observerRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Update active package based on slider
  useEffect(() => {
    if (sliderValue <= 33) setActivePackage(0)
    else if (sliderValue <= 66) setActivePackage(1)
    else setActivePackage(2)
  }, [sliderValue])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div className="pricing-demo-page">
      <header className="pricing-demo-header">
        <Link to="/constructor-v1" className="back-link">← Назад к конструктору</Link>
        <h1>Варианты секции комплектаций</h1>
        <p>Креативные полноэкранные решения</p>
      </header>

      {/* ============================================
          VARIANT 1: Morphing Gradient Background
          ============================================ */}
      <section
        className="variant variant-morph"
        id="v1"
        ref={el => { observerRefs.current['v1'] = el }}
      >
        <div className="variant-label">1. Морфинг градиент</div>
        <div className="morph-container" onMouseMove={handleMouseMove}>
          <div
            className="morph-bg"
            style={{
              '--mouse-x': `${mousePos.x}%`,
              '--mouse-y': `${mousePos.y}%`,
            } as React.CSSProperties}
          >
            <div className="morph-blob morph-blob-1" />
            <div className="morph-blob morph-blob-2" />
            <div className="morph-blob morph-blob-3" />
          </div>

          <div className={`morph-content ${isVisible['v1'] ? 'visible' : ''}`}>
            <h1 className="morph-title">
              <span>Выберите</span>
              <span className="morph-title-accent">комплектацию</span>
            </h1>

            <div className="morph-cards">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`morph-card ${activePackage === i ? 'active' : ''} ${pkg.popular ? 'popular' : ''}`}
                  onClick={() => setActivePackage(i)}
                  style={{ '--index': i } as React.CSSProperties}
                >
                  <div className="morph-card-bg" />
                  {pkg.popular && <div className="morph-badge">Хит</div>}
                  <div className="morph-card-content">
                    <h3>{pkg.name}</h3>
                    <div className="morph-price">
                      <span className="morph-price-value">{pkg.price}</span>
                      <span className="morph-price-unit">млн ₽</span>
                    </div>
                    <p className="morph-desc">{pkg.description}</p>
                    <ul className="morph-features">
                      {pkg.features.slice(0, 3).map((f, j) => (
                        <li key={j}><CheckIcon />{f}</li>
                      ))}
                    </ul>
                    <button className="morph-btn">
                      Выбрать <ArrowIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          VARIANT 2: Horizontal Scroll Journey
          ============================================ */}
      <section
        className="variant variant-journey"
        id="v2"
        ref={el => { observerRefs.current['v2'] = el }}
      >
        <div className="variant-label">2. Горизонтальное путешествие</div>
        <div className="journey-container">
          <div className="journey-track">
            <div className="journey-line">
              <div
                className="journey-line-fill"
                style={{ width: `${packages[activePackage].percent}%` }}
              />
            </div>

            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`journey-stop ${i <= activePackage ? 'passed' : ''} ${i === activePackage ? 'active' : ''}`}
                style={{ left: `${pkg.percent}%` }}
                onClick={() => setActivePackage(i)}
              >
                <div className="journey-stop-marker">
                  <span>{i + 1}</span>
                </div>
                <div className="journey-stop-content">
                  {pkg.popular && <span className="journey-badge">★ Популярный</span>}
                  <h3>{pkg.name}</h3>
                  <div className="journey-price">{pkg.price} млн ₽</div>
                  <p>{pkg.description}</p>
                  <div className={`journey-details ${i === activePackage ? 'show' : ''}`}>
                    {pkg.features.map((f, j) => (
                      <div key={j} className="journey-feature">
                        <CheckIcon /><span>{f}</span>
                      </div>
                    ))}
                    <button className="journey-btn">Выбрать</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="journey-nav">
            <button
              className="journey-nav-btn"
              onClick={() => setActivePackage(Math.max(0, activePackage - 1))}
              disabled={activePackage === 0}
            >
              ←
            </button>
            <span className="journey-nav-label">
              Этап {activePackage + 1} из {packages.length}
            </span>
            <button
              className="journey-nav-btn"
              onClick={() => setActivePackage(Math.min(2, activePackage + 1))}
              disabled={activePackage === 2}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          VARIANT 3: Interactive Price Slider
          ============================================ */}
      <section
        className="variant variant-slider"
        id="v3"
        ref={el => { observerRefs.current['v3'] = el }}
      >
        <div className="variant-label">3. Интерактивный слайдер</div>
        <div className="slider-container">
          <div className="slider-left">
            <h1>Настройте уровень готовности</h1>
            <p>Передвигайте ползунок для выбора комплектации</p>

            <div className="slider-control">
              <div className="slider-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="slider-input"
                />
                <div className="slider-track">
                  <div
                    className="slider-fill"
                    style={{ width: `${sliderValue}%` }}
                  />
                </div>
                <div
                  className="slider-thumb"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="slider-thumb-value">{sliderValue}%</span>
                </div>
              </div>

              <div className="slider-labels">
                <span className={activePackage === 0 ? 'active' : ''}>Коробка</span>
                <span className={activePackage === 1 ? 'active' : ''}>Стандарт</span>
                <span className={activePackage === 2 ? 'active' : ''}>Под ключ</span>
              </div>
            </div>

            <div className="slider-stats">
              <div className="slider-stat">
                <span className="slider-stat-value">{packages[activePackage].price}</span>
                <span className="slider-stat-label">млн ₽</span>
              </div>
              <div className="slider-stat">
                <span className="slider-stat-value">{packages[activePackage].pricePerM}</span>
                <span className="slider-stat-label">₽ за м²</span>
              </div>
            </div>
          </div>

          <div className="slider-right">
            <div className="slider-card">
              <div className="slider-card-header">
                <h2>{packages[activePackage].name}</h2>
                {packages[activePackage].popular && (
                  <span className="slider-popular">Рекомендуем</span>
                )}
              </div>
              <p className="slider-card-desc">{packages[activePackage].description}</p>

              <div className="slider-features">
                {packages[activePackage].features.map((f, i) => (
                  <div
                    key={i}
                    className="slider-feature"
                    style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
                  >
                    <div className="slider-feature-icon"><CheckIcon /></div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {packages[activePackage].note && (
                <div className="slider-note">{packages[activePackage].note}</div>
              )}

              <button className="slider-cta">
                Оформить заказ
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          VARIANT 4: 3D Cards Perspective
          ============================================ */}
      <section
        className="variant variant-3d"
        id="v4"
        ref={el => { observerRefs.current['v4'] = el }}
      >
        <div className="variant-label">4. 3D перспектива</div>
        <div className="perspective-container">
          <div className="perspective-header">
            <h1>Выберите комплектацию</h1>
            <p>Наведите на карточку для подробностей</p>
          </div>

          <div className="perspective-cards">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`perspective-card ${pkg.popular ? 'featured' : ''} ${hoveredCard === i ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ '--index': i } as React.CSSProperties}
              >
                <div className="perspective-card-inner">
                  <div className="perspective-card-front">
                    {pkg.popular && <div className="perspective-badge">★</div>}
                    <div className="perspective-icon">
                      <span>{i + 1}</span>
                    </div>
                    <h3>{pkg.name}</h3>
                    <div className="perspective-price">
                      <span>{pkg.price}</span> млн ₽
                    </div>
                    <p>{pkg.description}</p>
                  </div>
                  <div className="perspective-card-back">
                    <h4>Что входит:</h4>
                    <ul>
                      {pkg.features.map((f, j) => (
                        <li key={j}><CheckIcon />{f}</li>
                      ))}
                    </ul>
                    <button className="perspective-btn">Выбрать</button>
                  </div>
                </div>
                <div className="perspective-shadow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          VARIANT 5: Stacked Magazine Style
          ============================================ */}
      <section
        className="variant variant-magazine"
        id="v5"
        ref={el => { observerRefs.current['v5'] = el }}
      >
        <div className="variant-label">5. Журнальный стиль</div>
        <div className={`magazine-container ${isVisible['v5'] ? 'visible' : ''}`}>
          <div className="magazine-hero">
            <div className="magazine-hero-content">
              <span className="magazine-tag">Комплектации 2024</span>
              <h1>
                <span>Три уровня</span>
                <span className="magazine-accent">готовности</span>
                <span>вашего дома</span>
              </h1>
            </div>
            <div className="magazine-hero-visual">
              <div className="magazine-circle magazine-circle-1" />
              <div className="magazine-circle magazine-circle-2" />
              <div className="magazine-circle magazine-circle-3" />
            </div>
          </div>

          <div className="magazine-grid">
            {packages.map((pkg, i) => (
              <article
                key={i}
                className={`magazine-item magazine-item-${i + 1} ${pkg.popular ? 'featured' : ''}`}
              >
                <div className="magazine-item-number">{String(i + 1).padStart(2, '0')}</div>
                <div className="magazine-item-content">
                  {pkg.popular && <span className="magazine-popular">Выбор клиентов</span>}
                  <h2>{pkg.name}</h2>
                  <div className="magazine-price-tag">
                    <span className="magazine-price">{pkg.price}</span>
                    <span className="magazine-price-sub">млн ₽</span>
                  </div>
                  <p className="magazine-desc">{pkg.description}</p>
                  <div className="magazine-features">
                    {pkg.features.map((f, j) => (
                      <span key={j} className="magazine-feature">{f}</span>
                    ))}
                  </div>
                  <button className="magazine-btn">
                    Подробнее <ArrowIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          VARIANT 6: Radial/Circular Layout
          ============================================ */}
      <section
        className="variant variant-radial"
        id="v6"
        ref={el => { observerRefs.current['v6'] = el }}
      >
        <div className="variant-label">6. Радиальный выбор</div>
        <div className="radial-container">
          <div className="radial-center">
            <div className="radial-center-content">
              <span className="radial-center-label">Ваш выбор</span>
              <h2>{packages[activePackage].name}</h2>
              <div className="radial-center-price">
                {packages[activePackage].price} <span>млн ₽</span>
              </div>
              <button className="radial-center-btn">Оформить</button>
            </div>
            <div className="radial-ring radial-ring-1" />
            <div className="radial-ring radial-ring-2" />
            <div className="radial-ring radial-ring-3" />
          </div>

          <div className="radial-items">
            {packages.map((pkg, i) => {
              const angle = -90 + (i * 120)
              const radian = (angle * Math.PI) / 180
              const x = Math.cos(radian) * 280
              const y = Math.sin(radian) * 280

              return (
                <div
                  key={i}
                  className={`radial-item ${activePackage === i ? 'active' : ''} ${pkg.popular ? 'popular' : ''}`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    '--index': i
                  } as React.CSSProperties}
                  onClick={() => setActivePackage(i)}
                >
                  <div className="radial-item-connector" style={{
                    transform: `rotate(${angle + 180}deg)`,
                    width: activePackage === i ? '180px' : '0px'
                  }} />
                  <div className="radial-item-content">
                    {pkg.popular && <span className="radial-badge">★</span>}
                    <span className="radial-item-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{pkg.name}</h3>
                    <span className="radial-item-price">{pkg.price} млн</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className={`radial-details ${isVisible['v6'] ? 'visible' : ''}`}>
            <h4>В комплектацию входит:</h4>
            <div className="radial-features">
              {packages[activePackage].features.map((f, i) => (
                <div
                  key={i}
                  className="radial-feature"
                  style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
                >
                  <CheckIcon />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          VARIANT 7: Split Comparison with House Image
          ============================================ */}
      <section
        className="variant variant-split"
        id="v7"
        ref={el => { observerRefs.current['v7'] = el }}
      >
        <div className="variant-label">7. Разделённое сравнение</div>
        <div className="split-container">
          {/* Background house image */}
          <div className="split-house-bg">
            <img
              src="/houses/combined/flat/house1.jpg"
              alt="Дом"
              className="split-house-img"
            />
            <div className="split-house-overlay" />
          </div>

          {/* Package panels */}
          <div className="split-panels">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`split-panel ${activePackage === i ? 'expanded' : ''} ${pkg.popular ? 'featured' : ''}`}
                onClick={() => setActivePackage(i)}
              >
                <div className="split-panel-glass" />
                <div className="split-panel-content">
                  <div className="split-panel-header">
                    {pkg.popular && <span className="split-badge">Рекомендуем</span>}
                    <span className="split-number">{String(i + 1).padStart(2, '0')}</span>
                    <h2>{pkg.name}</h2>
                    <p>{pkg.description}</p>
                  </div>

                  <div className="split-panel-price">
                    <span className="split-price-value">{pkg.price}</span>
                    <span className="split-price-unit">млн ₽</span>
                  </div>

                  <div className="split-panel-details">
                    <ul className="split-features">
                      {pkg.features.map((f, j) => (
                        <li key={j}>
                          <CheckIcon />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="split-btn">
                      Выбрать комплектацию
                      <ArrowIcon />
                    </button>
                  </div>
                </div>

                {/* Completion indicator */}
                <div className="split-completion">
                  <div className="split-completion-bar">
                    <div
                      className="split-completion-fill"
                      style={{ height: `${pkg.percent}%` }}
                    />
                  </div>
                  <span className="split-completion-text">{pkg.percent}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Floor plan overlay */}
          <div className={`split-floorplan ${activePackage === 2 ? 'show' : ''}`}>
            <img src="/floor-plan.png" alt="План дома" />
          </div>
        </div>
      </section>

      {/* ============================================
          VARIANT 8: Animated Counter Display
          ============================================ */}
      <section
        className="variant variant-counter"
        id="v8"
        ref={el => { observerRefs.current['v8'] = el }}
      >
        <div className="variant-label">8. Счётчик с анимацией</div>
        <div className="counter-container">
          <div className="counter-bg">
            <div className="counter-grid" />
          </div>

          <div className="counter-content">
            <div className="counter-header">
              <h1>Стоимость строительства</h1>
              <p>Проект дома 240 м²</p>
            </div>

            <div className="counter-display">
              <div className="counter-main">
                <div className="counter-value">
                  <span className="counter-num">{packages[activePackage].price}</span>
                  <span className="counter-unit">млн ₽</span>
                </div>
                <div className="counter-label">{packages[activePackage].name}</div>
              </div>

              <div className="counter-meter">
                <svg viewBox="0 0 200 200" className="counter-svg">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    className="counter-circle-bg"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    className="counter-circle-fill"
                    style={{
                      strokeDasharray: `${packages[activePackage].percent * 5.65} 565`
                    }}
                  />
                </svg>
                <div className="counter-meter-value">
                  {packages[activePackage].percent}%
                </div>
              </div>
            </div>

            <div className="counter-selector">
              {packages.map((pkg, i) => (
                <button
                  key={i}
                  className={`counter-option ${activePackage === i ? 'active' : ''} ${pkg.popular ? 'popular' : ''}`}
                  onClick={() => setActivePackage(i)}
                >
                  {pkg.popular && <span className="counter-star">★</span>}
                  <span className="counter-option-name">{pkg.name}</span>
                  <span className="counter-option-price">{pkg.price} млн</span>
                </button>
              ))}
            </div>

            <div className="counter-features">
              {packages[activePackage].features.map((f, i) => (
                <div
                  key={i}
                  className="counter-feature"
                  style={{ '--delay': `${i * 0.05}s` } as React.CSSProperties}
                >
                  <CheckIcon />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <button className="counter-cta">
              Получить смету
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
