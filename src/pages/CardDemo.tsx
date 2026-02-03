import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CardDemo.css'

export default function CardDemo() {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)

  // Demo data (как в оригинале)
  const totalArea = 240
  const rooms = 4
  const bathrooms = 2
  const price = 20.40

  // Icons (копия из оригинала)
  const Icons = {
    rooms: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    bathroom: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z"/>
        <path d="M6 12V6a2 2 0 012-2h1a1 1 0 011 1v1"/>
      </svg>
    ),
    terrace: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V11M19 21V11M3 11h18M12 11V7M8 11V9M16 11V9"/>
        <circle cx="12" cy="5" r="2"/>
      </svg>
    ),
    wardrobe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="12" y1="2" x2="12" y2="22"/>
        <circle cx="9" cy="12" r="1" fill="currentColor"/>
        <circle cx="15" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
  }

  return (
    <div className="card-demo-page">
      <header className="card-demo-header">
        <Link to="/constructor" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Назад
        </Link>
        <h1>Варианты размещения панели управления</h1>
      </header>

      <div className="card-variants-grid">

        {/* Вариант 1: Без панели (чистая карточка) */}
        <div className={`card-variant ${selectedVariant === 1 ? 'selected' : ''}`} onClick={() => setSelectedVariant(1)}>
          <div className="variant-label">Вариант 1: Без панели (как было)</div>
          <div className="original-card">
            <div className="oc-specs">
              <div className="oc-block">
                <span className="oc-label">ПЛОЩАДЬ ПО ОСЯМ</span>
                <span className="oc-value-big">{totalArea} м²</span>
              </div>
              <div className="oc-block">
                <span className="oc-label">МАТЕРИАЛ СТЕН</span>
                <span className="oc-value-med">Кирпич</span>
              </div>
              <div className="oc-icons">
                <div className="oc-icon"><span>{rooms}</span>{Icons.rooms}<small>Комнат</small></div>
                <div className="oc-icon"><span>{bathrooms}</span>{Icons.bathroom}<small>Санузла</small></div>
                <div className="oc-icon"><span>1</span>{Icons.terrace}<small>Терраса</small></div>
                <div className="oc-icon"><span>1</span>{Icons.wardrobe}<small>Гардероб</small></div>
              </div>
            </div>
            <div className="oc-price-section">
              <div className="oc-price-label">ЦЕНА</div>
              <div className="oc-price">{price} млн ₽</div>
              <div className="oc-price-note">Успейте заказать по старой цене!</div>
            </div>
          </div>
        </div>

        {/* Вариант 2: Кнопка "Настроить" внизу */}
        <div className={`card-variant ${selectedVariant === 2 ? 'selected' : ''}`} onClick={() => setSelectedVariant(2)}>
          <div className="variant-label">Вариант 2: Кнопка "Настроить" внизу</div>
          <div className="original-card">
            <div className="oc-specs">
              <div className="oc-block">
                <span className="oc-label">ПЛОЩАДЬ ПО ОСЯМ</span>
                <span className="oc-value-big">{totalArea} м²</span>
              </div>
              <div className="oc-block">
                <span className="oc-label">МАТЕРИАЛ СТЕН</span>
                <span className="oc-value-med">Кирпич</span>
              </div>
              <div className="oc-icons">
                <div className="oc-icon"><span>{rooms}</span>{Icons.rooms}<small>Комнат</small></div>
                <div className="oc-icon"><span>{bathrooms}</span>{Icons.bathroom}<small>Санузла</small></div>
                <div className="oc-icon"><span>1</span>{Icons.terrace}<small>Терраса</small></div>
                <div className="oc-icon"><span>1</span>{Icons.wardrobe}<small>Гардероб</small></div>
              </div>
            </div>
            <div className="oc-price-section">
              <div className="oc-price-label">ЦЕНА</div>
              <div className="oc-price">{price} млн ₽</div>
              <div className="oc-price-note">Успейте заказать по старой цене!</div>
            </div>
            <button className="oc-config-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v10M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m6 0h10M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"/>
              </svg>
              Настроить дом
            </button>
          </div>
        </div>

        {/* Вариант 3: Компактные чипы под ценой */}
        <div className={`card-variant ${selectedVariant === 3 ? 'selected' : ''}`} onClick={() => setSelectedVariant(3)}>
          <div className="variant-label">Вариант 3: Чипы-опции под ценой</div>
          <div className="original-card">
            <div className="oc-specs">
              <div className="oc-block">
                <span className="oc-label">ПЛОЩАДЬ ПО ОСЯМ</span>
                <span className="oc-value-big">{totalArea} м²</span>
              </div>
              <div className="oc-block">
                <span className="oc-label">МАТЕРИАЛ СТЕН</span>
                <span className="oc-value-med">Кирпич</span>
              </div>
              <div className="oc-icons">
                <div className="oc-icon"><span>{rooms}</span>{Icons.rooms}<small>Комнат</small></div>
                <div className="oc-icon"><span>{bathrooms}</span>{Icons.bathroom}<small>Санузла</small></div>
                <div className="oc-icon"><span>1</span>{Icons.terrace}<small>Терраса</small></div>
                <div className="oc-icon"><span>1</span>{Icons.wardrobe}<small>Гардероб</small></div>
              </div>
            </div>
            <div className="oc-price-section">
              <div className="oc-price-label">ЦЕНА</div>
              <div className="oc-price">{price} млн ₽</div>
              <div className="oc-price-note">Успейте заказать по старой цене!</div>
            </div>
            <div className="oc-chips">
              <span className="oc-chip active">2 этажа</span>
              <span className="oc-chip">Кирпич</span>
              <span className="oc-chip active">+ Терраса</span>
              <span className="oc-chip">+ Гараж</span>
            </div>
          </div>
        </div>

        {/* Вариант 4: Аккордеон под иконками */}
        <div className={`card-variant ${selectedVariant === 4 ? 'selected' : ''}`} onClick={() => setSelectedVariant(4)}>
          <div className="variant-label">Вариант 4: Аккордеон под иконками</div>
          <div className="original-card">
            <div className="oc-specs">
              <div className="oc-block">
                <span className="oc-label">ПЛОЩАДЬ ПО ОСЯМ</span>
                <span className="oc-value-big">{totalArea} м²</span>
              </div>
              <div className="oc-block">
                <span className="oc-label">МАТЕРИАЛ СТЕН</span>
                <span className="oc-value-med">Кирпич</span>
              </div>
              <div className="oc-icons">
                <div className="oc-icon"><span>{rooms}</span>{Icons.rooms}<small>Комнат</small></div>
                <div className="oc-icon"><span>{bathrooms}</span>{Icons.bathroom}<small>Санузла</small></div>
                <div className="oc-icon"><span>1</span>{Icons.terrace}<small>Терраса</small></div>
                <div className="oc-icon"><span>1</span>{Icons.wardrobe}<small>Гардероб</small></div>
              </div>
              {/* Аккордеон */}
              <details className="oc-accordion" open>
                <summary>Настроить параметры ▾</summary>
                <div className="oc-acc-content">
                  <div className="oc-acc-row">
                    <span>Этажей</span>
                    <div className="oc-stepper"><button>−</button><span>2</span><button>+</button></div>
                  </div>
                  <div className="oc-acc-row">
                    <span>Материал</span>
                    <select><option>Кирпич</option><option>Газоблок</option></select>
                  </div>
                </div>
              </details>
            </div>
            <div className="oc-price-section">
              <div className="oc-price-label">ЦЕНА</div>
              <div className="oc-price">{price} млн ₽</div>
            </div>
          </div>
        </div>

        {/* Вариант 5: Иконки кликабельные */}
        <div className={`card-variant ${selectedVariant === 5 ? 'selected' : ''}`} onClick={() => setSelectedVariant(5)}>
          <div className="variant-label">Вариант 5: Кликабельные иконки</div>
          <div className="original-card">
            <div className="oc-specs">
              <div className="oc-block">
                <span className="oc-label">ПЛОЩАДЬ ПО ОСЯМ</span>
                <span className="oc-value-big">{totalArea} м²</span>
              </div>
              <div className="oc-block">
                <span className="oc-label">МАТЕРИАЛ СТЕН</span>
                <span className="oc-value-med">Кирпич</span>
              </div>
              <div className="oc-icons clickable">
                <div className="oc-icon-edit">
                  <span>{rooms}</span>
                  {Icons.rooms}
                  <small>Комнат</small>
                  <div className="oc-edit-badge">±</div>
                </div>
                <div className="oc-icon-edit">
                  <span>{bathrooms}</span>
                  {Icons.bathroom}
                  <small>Санузла</small>
                  <div className="oc-edit-badge">±</div>
                </div>
                <div className="oc-icon-edit active">
                  <span>1</span>
                  {Icons.terrace}
                  <small>Терраса</small>
                  <div className="oc-edit-badge check">✓</div>
                </div>
                <div className="oc-icon-edit">
                  <span>1</span>
                  {Icons.wardrobe}
                  <small>Гардероб</small>
                  <div className="oc-edit-badge check">✓</div>
                </div>
              </div>
            </div>
            <div className="oc-price-section">
              <div className="oc-price-label">ЦЕНА</div>
              <div className="oc-price">{price} млн ₽</div>
              <div className="oc-price-note">Нажмите на параметр для изменения</div>
            </div>
          </div>
        </div>

        {/* Вариант 6: Отдельная панель справа от карточки */}
        <div className={`card-variant wide ${selectedVariant === 6 ? 'selected' : ''}`} onClick={() => setSelectedVariant(6)}>
          <div className="variant-label">Вариант 6: Панель справа от карточки</div>
          <div className="split-layout">
            <div className="original-card compact">
              <div className="oc-specs">
                <div className="oc-block">
                  <span className="oc-label">ПЛОЩАДЬ ПО ОСЯМ</span>
                  <span className="oc-value-big">{totalArea} м²</span>
                </div>
                <div className="oc-block">
                  <span className="oc-label">МАТЕРИАЛ СТЕН</span>
                  <span className="oc-value-med">Кирпич</span>
                </div>
                <div className="oc-icons">
                  <div className="oc-icon"><span>{rooms}</span>{Icons.rooms}<small>Комнат</small></div>
                  <div className="oc-icon"><span>{bathrooms}</span>{Icons.bathroom}<small>Санузла</small></div>
                </div>
              </div>
              <div className="oc-price-section">
                <div className="oc-price-label">ЦЕНА</div>
                <div className="oc-price">{price} млн ₽</div>
              </div>
            </div>
            <div className="side-panel">
              <div className="sp-title">Настройки</div>
              <div className="sp-row">
                <span>Этажей</span>
                <div className="sp-stepper"><button>−</button><span>2</span><button>+</button></div>
              </div>
              <div className="sp-row">
                <span>Комнат</span>
                <div className="sp-stepper"><button>−</button><span>4</span><button>+</button></div>
              </div>
              <div className="sp-row">
                <span>Материал</span>
                <select><option>Кирпич</option><option>Газоблок</option></select>
              </div>
              <div className="sp-checks">
                <label><input type="checkbox" defaultChecked /> Терраса</label>
                <label><input type="checkbox" /> Гараж</label>
              </div>
            </div>
          </div>
        </div>

      </div>

      {selectedVariant && (
        <div className="selected-footer">
          <span>Выбран вариант {selectedVariant}</span>
          <button className="apply-btn">Применить этот вариант</button>
        </div>
      )}
    </div>
  )
}
