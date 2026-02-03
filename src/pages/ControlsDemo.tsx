import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ControlsDemo.css'

export default function ControlsDemo() {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  // Demo state for controls
  const [floors, setFloors] = useState(1)
  const [material, setMaterial] = useState('brick')
  const [roofType, setRoofType] = useState('flat')
  const [garage, setGarage] = useState(false)
  const [terrace, setTerrace] = useState(true)

  const materials = [
    { id: 'brick', name: 'Кирпич', color: '#c45c3e' },
    { id: 'wood', name: 'Дерево', color: '#a67c52' },
    { id: 'block', name: 'Блок', color: '#8a9a9a' },
    { id: 'sip', name: 'СИП-панель', color: '#d4c5a9' },
  ]

  const roofTypes = [
    { id: 'flat', name: 'Плоская' },
    { id: 'gable', name: 'Двускатная' },
    { id: 'hip', name: 'Вальмовая' },
  ]

  return (
    <div className={`controls-demo-page ${darkMode ? 'dark' : ''}`}>
      <header className="controls-demo-header">
        <Link to="/constructor" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Назад
        </Link>
        <h1>Варианты панели управления</h1>

        {/* Theme Toggle */}
        <button
          className={`theme-toggle ${darkMode ? 'dark' : ''}`}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Переключить тему"
        >
          <div className="toggle-track">
            <span className="toggle-icon sun">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </span>
            <span className="toggle-icon moon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            </span>
            <div className="toggle-thumb"></div>
          </div>
        </button>
      </header>

      <div className="variants-grid">

        {/* Variant 1: Compact Cards */}
        <div
          className={`variant-card ${selectedVariant === 1 ? 'selected' : ''}`}
          onClick={() => setSelectedVariant(1)}
        >
          <div className="variant-number">#1</div>
          <div className="variant-name">Компактные карточки</div>
          <div className="variant-preview">
            <div className="v1-panel">
              <div className="v1-section">
                <div className="v1-label">Этажность</div>
                <div className="v1-buttons">
                  <button className={floors === 1 ? 'active' : ''} onClick={(e) => {e.stopPropagation(); setFloors(1)}}>1</button>
                  <button className={floors === 2 ? 'active' : ''} onClick={(e) => {e.stopPropagation(); setFloors(2)}}>2</button>
                  <button className={floors === 3 ? 'active' : ''} onClick={(e) => {e.stopPropagation(); setFloors(3)}}>3</button>
                </div>
              </div>
              <div className="v1-section">
                <div className="v1-label">Материал стен</div>
                <div className="v1-materials">
                  {materials.map(m => (
                    <button
                      key={m.id}
                      className={`v1-material ${material === m.id ? 'active' : ''}`}
                      onClick={(e) => {e.stopPropagation(); setMaterial(m.id)}}
                    >
                      <span className="v1-color" style={{background: m.color}}></span>
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="v1-section">
                <div className="v1-label">Опции</div>
                <div className="v1-toggles">
                  <label className="v1-toggle">
                    <input type="checkbox" checked={garage} onChange={(e) => {e.stopPropagation(); setGarage(!garage)}} />
                    <span>Гараж</span>
                  </label>
                  <label className="v1-toggle">
                    <input type="checkbox" checked={terrace} onChange={(e) => {e.stopPropagation(); setTerrace(!terrace)}} />
                    <span>Терраса</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variant 2: Slider Style */}
        <div
          className={`variant-card ${selectedVariant === 2 ? 'selected' : ''}`}
          onClick={() => setSelectedVariant(2)}
        >
          <div className="variant-number">#2</div>
          <div className="variant-name">Слайдеры и переключатели</div>
          <div className="variant-preview">
            <div className="v2-panel">
              <div className="v2-section">
                <div className="v2-header">
                  <span>Этажность</span>
                  <span className="v2-value">{floors} этаж</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={floors}
                  onChange={(e) => {e.stopPropagation(); setFloors(Number(e.target.value))}}
                  className="v2-slider"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="v2-section">
                <div className="v2-header">Материал стен</div>
                <div className="v2-chips">
                  {materials.map(m => (
                    <button
                      key={m.id}
                      className={`v2-chip ${material === m.id ? 'active' : ''}`}
                      onClick={(e) => {e.stopPropagation(); setMaterial(m.id)}}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="v2-section">
                <div className="v2-header">Крыша</div>
                <div className="v2-segment">
                  {roofTypes.map(r => (
                    <button
                      key={r.id}
                      className={roofType === r.id ? 'active' : ''}
                      onClick={(e) => {e.stopPropagation(); setRoofType(r.id)}}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variant 3: Visual Cards */}
        <div
          className={`variant-card ${selectedVariant === 3 ? 'selected' : ''}`}
          onClick={() => setSelectedVariant(3)}
        >
          <div className="variant-number">#3</div>
          <div className="variant-name">Визуальные карточки</div>
          <div className="variant-preview">
            <div className="v3-panel">
              <div className="v3-section">
                <div className="v3-label">Этажность</div>
                <div className="v3-visual-options">
                  <button className={`v3-visual ${floors === 1 ? 'active' : ''}`} onClick={(e) => {e.stopPropagation(); setFloors(1)}}>
                    <div className="v3-house v3-h1">
                      <div className="v3-floor"></div>
                    </div>
                    <span>1 этаж</span>
                  </button>
                  <button className={`v3-visual ${floors === 2 ? 'active' : ''}`} onClick={(e) => {e.stopPropagation(); setFloors(2)}}>
                    <div className="v3-house v3-h2">
                      <div className="v3-floor"></div>
                      <div className="v3-floor"></div>
                    </div>
                    <span>2 этажа</span>
                  </button>
                  <button className={`v3-visual ${floors === 3 ? 'active' : ''}`} onClick={(e) => {e.stopPropagation(); setFloors(3)}}>
                    <div className="v3-house v3-h3">
                      <div className="v3-floor"></div>
                      <div className="v3-floor"></div>
                      <div className="v3-floor"></div>
                    </div>
                    <span>3 этажа</span>
                  </button>
                </div>
              </div>
              <div className="v3-section">
                <div className="v3-label">Материал</div>
                <div className="v3-materials-grid">
                  {materials.map(m => (
                    <button
                      key={m.id}
                      className={`v3-mat ${material === m.id ? 'active' : ''}`}
                      onClick={(e) => {e.stopPropagation(); setMaterial(m.id)}}
                    >
                      <div className="v3-mat-preview" style={{background: m.color}}></div>
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variant 4: Accordion */}
        <div
          className={`variant-card ${selectedVariant === 4 ? 'selected' : ''}`}
          onClick={() => setSelectedVariant(4)}
        >
          <div className="variant-number">#4</div>
          <div className="variant-name">Аккордеон-секции</div>
          <div className="variant-preview">
            <div className="v4-panel">
              <details className="v4-accordion" open>
                <summary>
                  <span>Конструкция</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </summary>
                <div className="v4-content">
                  <div className="v4-row">
                    <span>Этажей</span>
                    <div className="v4-stepper">
                      <button onClick={(e) => {e.stopPropagation(); setFloors(Math.max(1, floors-1))}}>−</button>
                      <span>{floors}</span>
                      <button onClick={(e) => {e.stopPropagation(); setFloors(Math.min(3, floors+1))}}>+</button>
                    </div>
                  </div>
                  <div className="v4-row">
                    <span>Материал</span>
                    <select value={material} onChange={(e) => setMaterial(e.target.value)} onClick={(e) => e.stopPropagation()}>
                      {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>
              </details>
              <details className="v4-accordion">
                <summary>
                  <span>Дополнения</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </summary>
                <div className="v4-content">
                  <label className="v4-check">
                    <input type="checkbox" checked={garage} onChange={() => setGarage(!garage)} />
                    <span>Гараж (+2.5 млн)</span>
                  </label>
                  <label className="v4-check">
                    <input type="checkbox" checked={terrace} onChange={() => setTerrace(!terrace)} />
                    <span>Терраса (+800 тыс)</span>
                  </label>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Variant 5: Tabs */}
        <div
          className={`variant-card ${selectedVariant === 5 ? 'selected' : ''}`}
          onClick={() => setSelectedVariant(5)}
        >
          <div className="variant-number">#5</div>
          <div className="variant-name">Табы с иконками</div>
          <div className="variant-preview">
            <div className="v5-panel">
              <div className="v5-tabs">
                <button className="v5-tab active">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  </svg>
                </button>
                <button className="v5-tab">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                </button>
                <button className="v5-tab">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </button>
              </div>
              <div className="v5-content">
                <div className="v5-title">Параметры дома</div>
                <div className="v5-option">
                  <span>Этажность</span>
                  <div className="v5-pills">
                    {[1,2,3].map(n => (
                      <button
                        key={n}
                        className={floors === n ? 'active' : ''}
                        onClick={(e) => {e.stopPropagation(); setFloors(n)}}
                      >{n}</button>
                    ))}
                  </div>
                </div>
                <div className="v5-option">
                  <span>Материал</span>
                  <div className="v5-dropdown">
                    <select value={material} onChange={(e) => setMaterial(e.target.value)} onClick={(e) => e.stopPropagation()}>
                      {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variant 6: Modern Minimal */}
        <div
          className={`variant-card ${selectedVariant === 6 ? 'selected' : ''}`}
          onClick={() => setSelectedVariant(6)}
        >
          <div className="variant-number">#6</div>
          <div className="variant-name">Минималистичный</div>
          <div className="variant-preview">
            <div className="v6-panel">
              <div className="v6-group">
                <div className="v6-label">Этажи</div>
                <div className="v6-radio-group">
                  {[1,2,3].map(n => (
                    <label key={n} className="v6-radio">
                      <input
                        type="radio"
                        name="floors6"
                        checked={floors === n}
                        onChange={() => setFloors(n)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>{n}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="v6-divider"></div>
              <div className="v6-group">
                <div className="v6-label">Материал</div>
                <div className="v6-select-wrap">
                  <select value={material} onChange={(e) => setMaterial(e.target.value)} onClick={(e) => e.stopPropagation()}>
                    {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="v6-divider"></div>
              <div className="v6-group">
                <div className="v6-label">Крыша</div>
                <div className="v6-select-wrap">
                  <select value={roofType} onChange={(e) => setRoofType(e.target.value)} onClick={(e) => e.stopPropagation()}>
                    {roofTypes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="v6-divider"></div>
              <div className="v6-switches">
                <label className="v6-switch">
                  <span>Гараж</span>
                  <input type="checkbox" checked={garage} onChange={() => setGarage(!garage)} onClick={(e) => e.stopPropagation()} />
                  <span className="v6-slider"></span>
                </label>
                <label className="v6-switch">
                  <span>Терраса</span>
                  <input type="checkbox" checked={terrace} onChange={() => setTerrace(!terrace)} onClick={(e) => e.stopPropagation()} />
                  <span className="v6-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>

      {selectedVariant && (
        <div className="selected-footer">
          <span>Выбран вариант #{selectedVariant}</span>
          <button className="confirm-btn">Применить этот стиль</button>
        </div>
      )}
    </div>
  )
}
