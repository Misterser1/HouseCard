import { useState } from 'react'
import './PricingSectionDemo.css'

const specs = [
  { label: 'Фундамент', value: 'Монолитная плита 300мм' },
  { label: 'Стены', value: 'Газобетон 400мм + утепление' },
  { label: 'Кровля', value: 'Натуральная черепица' },
  { label: 'Окна', value: 'Двухкамерные стеклопакеты' },
  { label: 'Отопление', value: 'Газовый котёл + тёплый пол' },
  { label: 'Высота потолков', value: '3.0 м' },
]

const included = [
  'Архитектурный проект',
  'Фундамент под ключ',
  'Стены и перегородки',
  'Кровельные работы',
  'Окна и двери',
  'Наружная отделка',
  'Инженерные сети',
  'Внутренняя отделка',
]

export default function PricingSectionDemo() {
  const [activeVariant, setActiveVariant] = useState(1)
  const [expandedSection, setExpandedSection] = useState<number | null>(0)
  const [sliderValue, setSliderValue] = useState(240)

  return (
    <div className="pricing-demo-page">
      <h1>Варианты секции "Стоимость"</h1>

      {/* Variant 1: Split Card with Gradient */}
      <section className="pricing-variant v1">
        <div className="variant-label">1. Разделённая карточка с градиентом</div>
        <div className="v1-container">
          <div className="v1-left">
            <span className="v1-tag">Стоимость проекта</span>
            <div className="v1-price">
              <span className="v1-price-value">12.5</span>
              <span className="v1-price-unit">млн ₽</span>
            </div>
            <p className="v1-price-note">Фиксированная цена под ключ</p>
            <div className="v1-actions">
              <button className="v1-btn-primary">Получить смету</button>
              <button className="v1-btn-secondary">Рассчитать ипотеку</button>
            </div>
          </div>
          <div className="v1-right">
            <h3>Технические характеристики</h3>
            <div className="v1-specs">
              {specs.map((spec, i) => (
                <div key={i} className="v1-spec">
                  <span className="v1-spec-label">{spec.label}</span>
                  <span className="v1-spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Variant 2: Horizontal Cards */}
      <section className="pricing-variant v2">
        <div className="variant-label">2. Горизонтальные карточки</div>
        <div className="v2-header">
          <h2>Стоимость и характеристики</h2>
          <p>Всё включено в фиксированную стоимость</p>
        </div>
        <div className="v2-cards">
          <div className="v2-card v2-price-card">
            <div className="v2-card-icon">₽</div>
            <div className="v2-card-content">
              <span className="v2-card-label">Стоимость</span>
              <span className="v2-card-value">12 500 000 ₽</span>
              <span className="v2-card-note">под ключ</span>
            </div>
          </div>
          <div className="v2-card">
            <div className="v2-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <div className="v2-card-content">
              <span className="v2-card-label">Площадь</span>
              <span className="v2-card-value">240 м²</span>
            </div>
          </div>
          <div className="v2-card">
            <div className="v2-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21h18M5 21V7l7-4 7 4v14"/>
              </svg>
            </div>
            <div className="v2-card-content">
              <span className="v2-card-label">Этажность</span>
              <span className="v2-card-value">1 этаж</span>
            </div>
          </div>
          <div className="v2-card">
            <div className="v2-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div className="v2-card-content">
              <span className="v2-card-label">Срок</span>
              <span className="v2-card-value">6 месяцев</span>
            </div>
          </div>
        </div>
        <div className="v2-specs-grid">
          {specs.map((spec, i) => (
            <div key={i} className="v2-spec">
              <span className="v2-spec-label">{spec.label}</span>
              <span className="v2-spec-value">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Variant 3: Dark Cinematic */}
      <section className="pricing-variant v3">
        <div className="variant-label">3. Тёмный кинематографический</div>
        <div className="v3-container">
          <div className="v3-header">
            <h2>Инвестиция в качество</h2>
            <p>Премиальные материалы и технологии строительства</p>
          </div>
          <div className="v3-content">
            <div className="v3-price-block">
              <div className="v3-price-label">Стоимость под ключ</div>
              <div className="v3-price">
                <span className="v3-currency">₽</span>
                <span className="v3-amount">12 500 000</span>
              </div>
              <div className="v3-price-breakdown">
                <div className="v3-breakdown-item">
                  <span>Строительство</span>
                  <span>9 800 000 ₽</span>
                </div>
                <div className="v3-breakdown-item">
                  <span>Отделка</span>
                  <span>2 200 000 ₽</span>
                </div>
                <div className="v3-breakdown-item">
                  <span>Инженерия</span>
                  <span>500 000 ₽</span>
                </div>
              </div>
              <button className="v3-cta">Получить детальную смету</button>
            </div>
            <div className="v3-specs-block">
              <h3>Характеристики</h3>
              <div className="v3-specs">
                {specs.map((spec, i) => (
                  <div key={i} className="v3-spec">
                    <span className="v3-spec-label">{spec.label}</span>
                    <span className="v3-spec-divider"></span>
                    <span className="v3-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 4: Minimalist with Tabs */}
      <section className="pricing-variant v4">
        <div className="variant-label">4. Минималистичный с табами</div>
        <div className="v4-container">
          <div className="v4-tabs">
            <button className={`v4-tab ${activeVariant === 1 ? 'active' : ''}`} onClick={() => setActiveVariant(1)}>
              Стоимость
            </button>
            <button className={`v4-tab ${activeVariant === 2 ? 'active' : ''}`} onClick={() => setActiveVariant(2)}>
              Характеристики
            </button>
            <button className={`v4-tab ${activeVariant === 3 ? 'active' : ''}`} onClick={() => setActiveVariant(3)}>
              Что входит
            </button>
          </div>
          <div className="v4-content">
            {activeVariant === 1 && (
              <div className="v4-price-content">
                <div className="v4-price-main">
                  <span className="v4-price-number">12.5</span>
                  <span className="v4-price-suffix">
                    <span>млн</span>
                    <span>рублей</span>
                  </span>
                </div>
                <p className="v4-price-desc">Фиксированная стоимость строительства дома под ключ с отделкой и всеми инженерными коммуникациями</p>
                <div className="v4-price-actions">
                  <button className="v4-btn">Скачать смету PDF</button>
                  <button className="v4-btn-outline">Рассчитать ипотеку</button>
                </div>
              </div>
            )}
            {activeVariant === 2 && (
              <div className="v4-specs-content">
                {specs.map((spec, i) => (
                  <div key={i} className="v4-spec-row">
                    <span>{spec.label}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeVariant === 3 && (
              <div className="v4-included-content">
                <div className="v4-included-grid">
                  {included.map((item, i) => (
                    <div key={i} className="v4-included-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Variant 5: Bento Grid */}
      <section className="pricing-variant v5">
        <div className="variant-label">5. Bento сетка</div>
        <div className="v5-grid">
          <div className="v5-cell v5-price">
            <span className="v5-cell-tag">Стоимость</span>
            <div className="v5-price-value">
              <span className="v5-big">12.5</span>
              <span className="v5-small">млн ₽</span>
            </div>
            <span className="v5-note">под ключ</span>
          </div>
          <div className="v5-cell v5-area">
            <span className="v5-cell-tag">Площадь</span>
            <div className="v5-metric">
              <span className="v5-big">240</span>
              <span className="v5-small">м²</span>
            </div>
          </div>
          <div className="v5-cell v5-time">
            <span className="v5-cell-tag">Срок</span>
            <div className="v5-metric">
              <span className="v5-big">6</span>
              <span className="v5-small">мес</span>
            </div>
          </div>
          <div className="v5-cell v5-specs">
            <span className="v5-cell-tag">Характеристики</span>
            <div className="v5-specs-list">
              {specs.slice(0, 4).map((spec, i) => (
                <div key={i} className="v5-spec">
                  <span>{spec.label}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="v5-cell v5-cta">
            <h3>Готовы начать?</h3>
            <p>Получите персональное предложение</p>
            <button className="v5-btn">Связаться</button>
          </div>
        </div>
      </section>

      {/* Variant 6: Timeline Style */}
      <section className="pricing-variant v6">
        <div className="variant-label">6. Стиль таймлайн</div>
        <div className="v6-container">
          <div className="v6-header">
            <h2>Стоимость и этапы</h2>
            <div className="v6-total">
              <span className="v6-total-label">Итого:</span>
              <span className="v6-total-value">12 500 000 ₽</span>
            </div>
          </div>
          <div className="v6-timeline">
            <div className="v6-stage">
              <div className="v6-stage-marker">1</div>
              <div className="v6-stage-content">
                <h4>Проектирование</h4>
                <p>Архитектурный и инженерный проект</p>
                <span className="v6-stage-price">500 000 ₽</span>
              </div>
            </div>
            <div className="v6-stage">
              <div className="v6-stage-marker">2</div>
              <div className="v6-stage-content">
                <h4>Фундамент</h4>
                <p>Монолитная плита с гидроизоляцией</p>
                <span className="v6-stage-price">1 800 000 ₽</span>
              </div>
            </div>
            <div className="v6-stage">
              <div className="v6-stage-marker">3</div>
              <div className="v6-stage-content">
                <h4>Коробка дома</h4>
                <p>Стены, перекрытия, кровля</p>
                <span className="v6-stage-price">5 500 000 ₽</span>
              </div>
            </div>
            <div className="v6-stage">
              <div className="v6-stage-marker">4</div>
              <div className="v6-stage-content">
                <h4>Инженерия</h4>
                <p>Отопление, электрика, водоснабжение</p>
                <span className="v6-stage-price">2 000 000 ₽</span>
              </div>
            </div>
            <div className="v6-stage">
              <div className="v6-stage-marker">5</div>
              <div className="v6-stage-content">
                <h4>Отделка</h4>
                <p>Внутренняя и наружная отделка</p>
                <span className="v6-stage-price">2 700 000 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 7: Glass Morphism */}
      <section className="pricing-variant v7">
        <div className="variant-label">7. Glass морфизм</div>
        <div className="v7-bg">
          <div className="v7-container">
            <div className="v7-glass-card v7-main">
              <div className="v7-price-section">
                <span className="v7-label">Стоимость строительства</span>
                <div className="v7-price">12 500 000 ₽</div>
                <span className="v7-sublabel">фиксированная цена под ключ</span>
              </div>
              <div className="v7-divider"></div>
              <div className="v7-stats">
                <div className="v7-stat">
                  <span className="v7-stat-value">240</span>
                  <span className="v7-stat-label">м² площадь</span>
                </div>
                <div className="v7-stat">
                  <span className="v7-stat-value">14</span>
                  <span className="v7-stat-label">помещений</span>
                </div>
                <div className="v7-stat">
                  <span className="v7-stat-value">6</span>
                  <span className="v7-stat-label">мес. срок</span>
                </div>
              </div>
            </div>
            <div className="v7-glass-card v7-specs-card">
              <h3>Технические характеристики</h3>
              <div className="v7-specs">
                {specs.map((spec, i) => (
                  <div key={i} className="v7-spec">
                    <span className="v7-spec-label">{spec.label}</span>
                    <span className="v7-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 8: Accordion Style */}
      <section className="pricing-variant v8">
        <div className="variant-label">8. Аккордеон стиль</div>
        <div className="v8-container">
          <div className="v8-header">
            <div className="v8-price-display">
              <span className="v8-price-label">Итоговая стоимость</span>
              <div className="v8-price">12 500 000 ₽</div>
            </div>
            <button className="v8-cta">Получить смету</button>
          </div>
          <div className="v8-accordions">
            {[
              { title: 'Стоимость по этапам', items: [
                { name: 'Проектирование', price: '500 000 ₽' },
                { name: 'Фундамент', price: '1 800 000 ₽' },
                { name: 'Коробка дома', price: '5 500 000 ₽' },
                { name: 'Инженерия', price: '2 000 000 ₽' },
                { name: 'Отделка', price: '2 700 000 ₽' },
              ]},
              { title: 'Характеристики', items: specs.map(s => ({ name: s.label, price: s.value })) },
              { title: 'Что входит', items: included.slice(0, 5).map(item => ({ name: item, price: '✓' })) },
            ].map((section, idx) => (
              <div key={idx} className={`v8-accordion ${expandedSection === idx ? 'expanded' : ''}`}>
                <button
                  className="v8-accordion-header"
                  onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                >
                  <span>{section.title}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="v8-accordion-content">
                  {section.items.map((item, i) => (
                    <div key={i} className="v8-accordion-item">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 9: Magazine Editorial */}
      <section className="pricing-variant v9">
        <div className="variant-label">9. Журнальный / Редакционный</div>
        <div className="v9-container">
          <div className="v9-editorial">
            <div className="v9-big-number">12.5</div>
            <div className="v9-text-block">
              <span className="v9-currency">миллионов рублей</span>
              <h2>Ваш новый дом под ключ</h2>
              <p>Фиксированная стоимость включает все работы от проектирования до финишной отделки с гарантией качества</p>
            </div>
          </div>
          <div className="v9-details">
            <div className="v9-column">
              <h3>Технические характеристики</h3>
              {specs.slice(0, 3).map((spec, i) => (
                <div key={i} className="v9-detail-row">
                  <span className="v9-detail-label">{spec.label}</span>
                  <span className="v9-detail-value">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="v9-column">
              <h3>&nbsp;</h3>
              {specs.slice(3).map((spec, i) => (
                <div key={i} className="v9-detail-row">
                  <span className="v9-detail-label">{spec.label}</span>
                  <span className="v9-detail-value">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="v9-column v9-stats-col">
              <div className="v9-stat-big">
                <span className="v9-stat-number">240</span>
                <span className="v9-stat-unit">м²</span>
              </div>
              <div className="v9-stat-big">
                <span className="v9-stat-number">6</span>
                <span className="v9-stat-unit">месяцев</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 10: Radial Progress */}
      <section className="pricing-variant v10">
        <div className="variant-label">10. Радиальный прогресс</div>
        <div className="v10-container">
          <div className="v10-center">
            <div className="v10-circle">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" className="v10-circle-bg"/>
                <circle cx="100" cy="100" r="90" className="v10-circle-progress"/>
              </svg>
              <div className="v10-circle-content">
                <span className="v10-price">12.5</span>
                <span className="v10-unit">млн ₽</span>
              </div>
            </div>
            <div className="v10-label">Стоимость под ключ</div>
          </div>
          <div className="v10-metrics">
            <div className="v10-metric">
              <div className="v10-metric-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="v10-metric-bg"/>
                  <circle cx="50" cy="50" r="45" className="v10-metric-progress" style={{ strokeDashoffset: 283 * 0.2 }}/>
                </svg>
                <span className="v10-metric-value">240</span>
              </div>
              <span className="v10-metric-label">м² площадь</span>
            </div>
            <div className="v10-metric">
              <div className="v10-metric-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="v10-metric-bg"/>
                  <circle cx="50" cy="50" r="45" className="v10-metric-progress" style={{ strokeDashoffset: 283 * 0.5 }}/>
                </svg>
                <span className="v10-metric-value">14</span>
              </div>
              <span className="v10-metric-label">комнат</span>
            </div>
            <div className="v10-metric">
              <div className="v10-metric-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="v10-metric-bg"/>
                  <circle cx="50" cy="50" r="45" className="v10-metric-progress" style={{ strokeDashoffset: 283 * 0.7 }}/>
                </svg>
                <span className="v10-metric-value">6</span>
              </div>
              <span className="v10-metric-label">месяцев</span>
            </div>
          </div>
          <div className="v10-specs">
            {specs.map((spec, i) => (
              <div key={i} className="v10-spec">
                <span>{spec.label}</span>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 11: Feature Comparison */}
      <section className="pricing-variant v11">
        <div className="variant-label">11. Сравнительная таблица</div>
        <div className="v11-container">
          <div className="v11-header">
            <h2>Что включено в стоимость</h2>
            <div className="v11-price-badge">12 500 000 ₽</div>
          </div>
          <div className="v11-table">
            <div className="v11-table-header">
              <span>Категория</span>
              <span>Описание</span>
              <span>Статус</span>
            </div>
            {[
              { category: 'Проект', desc: 'Архитектурный и инженерный проект', included: true },
              { category: 'Фундамент', desc: 'Монолитная плита 300мм с гидроизоляцией', included: true },
              { category: 'Стены', desc: 'Газобетон 400мм + утепление минватой', included: true },
              { category: 'Кровля', desc: 'Натуральная черепица Braas', included: true },
              { category: 'Окна', desc: 'Двухкамерные стеклопакеты VEKA', included: true },
              { category: 'Инженерия', desc: 'Отопление, электрика, водоснабжение', included: true },
              { category: 'Отделка', desc: 'Внутренняя и наружная под ключ', included: true },
              { category: 'Ландшафт', desc: 'Озеленение и благоустройство', included: false },
            ].map((row, i) => (
              <div key={i} className={`v11-table-row ${row.included ? '' : 'not-included'}`}>
                <span className="v11-category">{row.category}</span>
                <span className="v11-desc">{row.desc}</span>
                <span className="v11-status">
                  {row.included ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <span className="v11-optional">Опционально</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variant 12: Interactive Slider */}
      <section className="pricing-variant v12">
        <div className="variant-label">12. Интерактивный слайдер</div>
        <div className="v12-container">
          <div className="v12-left">
            <h2>Рассчитайте стоимость</h2>
            <p>Подберите оптимальный вариант под ваш бюджет</p>
            <div className="v12-slider-block">
              <div className="v12-slider-header">
                <span>Площадь дома</span>
                <span className="v12-slider-value">{sliderValue} м²</span>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="v12-slider"
              />
              <div className="v12-slider-labels">
                <span>100 м²</span>
                <span>400 м²</span>
              </div>
            </div>
            <div className="v12-options">
              <label className="v12-option">
                <input type="checkbox" defaultChecked />
                <span>Отделка под ключ</span>
              </label>
              <label className="v12-option">
                <input type="checkbox" defaultChecked />
                <span>Инженерные сети</span>
              </label>
              <label className="v12-option">
                <input type="checkbox" />
                <span>Ландшафтный дизайн</span>
              </label>
            </div>
          </div>
          <div className="v12-right">
            <div className="v12-result">
              <span className="v12-result-label">Расчётная стоимость</span>
              <div className="v12-result-price">
                {((sliderValue * 52000) / 1000000).toFixed(1)} млн ₽
              </div>
              <div className="v12-result-breakdown">
                <div className="v12-breakdown-row">
                  <span>Строительство</span>
                  <span>{((sliderValue * 40000) / 1000000).toFixed(1)} млн ₽</span>
                </div>
                <div className="v12-breakdown-row">
                  <span>Отделка</span>
                  <span>{((sliderValue * 9000) / 1000000).toFixed(1)} млн ₽</span>
                </div>
                <div className="v12-breakdown-row">
                  <span>Инженерия</span>
                  <span>{((sliderValue * 3000) / 1000000).toFixed(1)} млн ₽</span>
                </div>
              </div>
              <button className="v12-cta">Получить точный расчёт</button>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 13: Floating Cards / 3D */}
      <section className="pricing-variant v13">
        <div className="variant-label">13. Парящие карточки / 3D эффект</div>
        <div className="v13-container">
          <div className="v13-bg-shapes">
            <div className="v13-shape v13-shape-1"></div>
            <div className="v13-shape v13-shape-2"></div>
            <div className="v13-shape v13-shape-3"></div>
          </div>
          <div className="v13-cards">
            <div className="v13-card v13-main-card">
              <div className="v13-card-glow"></div>
              <span className="v13-card-label">Стоимость проекта</span>
              <div className="v13-price">12.5</div>
              <span className="v13-price-unit">миллионов рублей</span>
              <button className="v13-btn">Получить смету</button>
            </div>
            <div className="v13-card v13-side-card v13-card-area">
              <span className="v13-side-value">240</span>
              <span className="v13-side-label">м² площадь</span>
            </div>
            <div className="v13-card v13-side-card v13-card-rooms">
              <span className="v13-side-value">14</span>
              <span className="v13-side-label">помещений</span>
            </div>
            <div className="v13-card v13-side-card v13-card-time">
              <span className="v13-side-value">6</span>
              <span className="v13-side-label">месяцев</span>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 14: Neon Cyberpunk */}
      <section className="pricing-variant v14">
        <div className="variant-label">14. Неон / Киберпанк</div>
        <div className="v14-container">
          <div className="v14-grid-bg"></div>
          <div className="v14-content">
            <div className="v14-header">
              <div className="v14-glitch-text" data-text="СТОИМОСТЬ">СТОИМОСТЬ</div>
            </div>
            <div className="v14-price-block">
              <span className="v14-currency">₽</span>
              <span className="v14-price">12 500 000</span>
            </div>
            <div className="v14-stats-row">
              <div className="v14-stat">
                <span className="v14-stat-value">240</span>
                <span className="v14-stat-label">ПЛОЩАДЬ М²</span>
              </div>
              <div className="v14-stat">
                <span className="v14-stat-value">14</span>
                <span className="v14-stat-label">КОМНАТ</span>
              </div>
              <div className="v14-stat">
                <span className="v14-stat-value">6</span>
                <span className="v14-stat-label">МЕСЯЦЕВ</span>
              </div>
            </div>
            <div className="v14-specs-grid">
              {specs.map((spec, i) => (
                <div key={i} className="v14-spec">
                  <span className="v14-spec-label">{spec.label}</span>
                  <span className="v14-spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
            <button className="v14-btn">
              <span>ЗАКАЗАТЬ</span>
              <div className="v14-btn-glow"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Variant 15: Newspaper/Print Style */}
      <section className="pricing-variant v15">
        <div className="variant-label">15. Газетный / Печатный стиль</div>
        <div className="v15-container">
          <div className="v15-masthead">
            <div className="v15-date">МОСКВА • {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</div>
            <h1 className="v15-title">СТРОИТЕЛЬНАЯ ГАЗЕТА</h1>
            <div className="v15-edition">СПЕЦИАЛЬНЫЙ ВЫПУСК</div>
          </div>
          <div className="v15-content">
            <div className="v15-main-story">
              <h2 className="v15-headline">Дом мечты за 12,5 миллионов рублей</h2>
              <p className="v15-lead">Фиксированная стоимость строительства под ключ включает все работы от проектирования до финишной отделки</p>
              <div className="v15-columns">
                <div className="v15-column">
                  <p>Общая площадь дома составляет 240 квадратных метров, что позволяет комфортно разместить все необходимые помещения.</p>
                  <p>В проект входит 14 помещений, включая 4 спальни, просторную гостиную и современную кухню-столовую.</p>
                </div>
                <div className="v15-column">
                  <p>Срок строительства — 6 месяцев с момента подписания договора и получения разрешительной документации.</p>
                  <p>Все материалы премиум-класса включены в стоимость.</p>
                </div>
              </div>
            </div>
            <div className="v15-sidebar">
              <div className="v15-box">
                <h3>ХАРАКТЕРИСТИКИ</h3>
                {specs.slice(0, 4).map((spec, i) => (
                  <div key={i} className="v15-spec-row">
                    <span>{spec.label}:</span> {spec.value}
                  </div>
                ))}
              </div>
              <div className="v15-price-box">
                <span className="v15-price-label">ЦЕНА</span>
                <span className="v15-price-value">12 500 000 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 16: Dashboard Analytics */}
      <section className="pricing-variant v16">
        <div className="variant-label">16. Дашборд / Аналитика</div>
        <div className="v16-container">
          <div className="v16-topbar">
            <span className="v16-project-name">Проект «Загородный дом»</span>
            <span className="v16-status">● В работе</span>
          </div>
          <div className="v16-grid">
            <div className="v16-widget v16-main-metric">
              <span className="v16-widget-label">Общая стоимость</span>
              <div className="v16-metric-value">₽ 12 500 000</div>
              <div className="v16-metric-change positive">+0% к смете</div>
            </div>
            <div className="v16-widget">
              <span className="v16-widget-label">Площадь</span>
              <div className="v16-widget-value">240 м²</div>
            </div>
            <div className="v16-widget">
              <span className="v16-widget-label">Помещений</span>
              <div className="v16-widget-value">14</div>
            </div>
            <div className="v16-widget">
              <span className="v16-widget-label">Срок</span>
              <div className="v16-widget-value">6 мес</div>
            </div>
            <div className="v16-widget v16-chart-widget">
              <span className="v16-widget-label">Распределение бюджета</span>
              <div className="v16-bars">
                <div className="v16-bar">
                  <div className="v16-bar-fill" style={{ width: '78%' }}></div>
                  <span className="v16-bar-label">Строительство</span>
                  <span className="v16-bar-value">78%</span>
                </div>
                <div className="v16-bar">
                  <div className="v16-bar-fill" style={{ width: '18%' }}></div>
                  <span className="v16-bar-label">Отделка</span>
                  <span className="v16-bar-value">18%</span>
                </div>
                <div className="v16-bar">
                  <div className="v16-bar-fill" style={{ width: '4%' }}></div>
                  <span className="v16-bar-label">Инженерия</span>
                  <span className="v16-bar-value">4%</span>
                </div>
              </div>
            </div>
            <div className="v16-widget v16-specs-widget">
              <span className="v16-widget-label">Спецификация</span>
              <div className="v16-specs-list">
                {specs.map((spec, i) => (
                  <div key={i} className="v16-spec-item">
                    <span>{spec.label}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variant 17: Ticket/Receipt Style */}
      <section className="pricing-variant v17">
        <div className="variant-label">17. Билет / Квитанция</div>
        <div className="v17-wrapper">
          <div className="v17-ticket">
            <div className="v17-ticket-header">
              <div className="v17-logo">HB</div>
              <div className="v17-company">
                <span className="v17-company-name">HOUSEBUILDER</span>
                <span className="v17-company-sub">СТРОИТЕЛЬНАЯ КОМПАНИЯ</span>
              </div>
            </div>
            <div className="v17-tear-line">
              <div className="v17-circle v17-circle-left"></div>
              <div className="v17-dashed"></div>
              <div className="v17-circle v17-circle-right"></div>
            </div>
            <div className="v17-ticket-body">
              <div className="v17-ticket-row">
                <span>Проект</span>
                <span>Загородный дом 240м²</span>
              </div>
              <div className="v17-ticket-row">
                <span>Комплектация</span>
                <span>Под ключ</span>
              </div>
              <div className="v17-ticket-row">
                <span>Площадь</span>
                <span>240 м²</span>
              </div>
              <div className="v17-ticket-row">
                <span>Помещений</span>
                <span>14</span>
              </div>
              <div className="v17-ticket-row">
                <span>Срок строительства</span>
                <span>6 месяцев</span>
              </div>
            </div>
            <div className="v17-tear-line">
              <div className="v17-circle v17-circle-left"></div>
              <div className="v17-dashed"></div>
              <div className="v17-circle v17-circle-right"></div>
            </div>
            <div className="v17-ticket-footer">
              <div className="v17-total">
                <span className="v17-total-label">ИТОГО К ОПЛАТЕ</span>
                <span className="v17-total-value">12 500 000 ₽</span>
              </div>
              <div className="v17-barcode">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="v17-barcode-line" style={{ height: `${20 + Math.random() * 20}px` }}></div>
                ))}
              </div>
              <span className="v17-barcode-number">HB-2024-00142-PRJ</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
