import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { generateHouseView } from '../services/api'

type RoofStyle = 'gable' | 'hip' | 'flat' | 'mansard'
type WallMaterial = 'brick' | 'wood' | 'stone' | 'stucco' | 'modern'
type HouseStyle = 'modern' | 'classic' | 'minimalist' | 'european' | 'american'

// SVG Icons
const Icons = {
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
      <path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" opacity="0.6"/>
      <path d="M19 14L20 17L23 18L20 19L19 22L18 19L15 18L18 17L19 14Z" opacity="0.6"/>
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <path d="M9 22V12h6v10"/>
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 2,7 12,12 22,7 12,2"/>
      <polyline points="2,17 12,22 22,17"/>
      <polyline points="2,12 12,17 22,12"/>
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  brick: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="1"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
      <line x1="1" y1="16" x2="23" y2="16"/>
      <line x1="12" y1="4" x2="12" y2="10"/>
      <line x1="6" y1="10" x2="6" y2="16"/>
      <line x1="18" y1="10" x2="18" y2="16"/>
      <line x1="12" y1="16" x2="12" y2="20"/>
    </svg>
  ),
  roof: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12L12 3l10 9"/>
      <path d="M5 10v10h14V10"/>
      <rect x="9" y="14" width="6" height="6"/>
    </svg>
  ),
  roofGable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12L12 4l10 8"/>
      <path d="M4 11v9h16v-9"/>
    </svg>
  ),
  roofHip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14L7 8h10l5 6"/>
      <path d="M12 4L7 8M12 4l5 4"/>
      <path d="M4 13v7h16v-7"/>
    </svg>
  ),
  roofFlat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h20"/>
      <path d="M4 8v12h16V8"/>
      <rect x="8" y="12" width="3" height="4"/>
      <rect x="13" y="12" width="3" height="4"/>
    </svg>
  ),
  roofMansard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14L5 6h14l3 8"/>
      <path d="M8 6V4h8v2"/>
      <path d="M4 13v7h16v-7"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14v-5l-2-4H7l-2 4v5z"/>
      <circle cx="7.5" cy="17.5" r="1.5"/>
      <circle cx="16.5" cy="17.5" r="1.5"/>
      <path d="M5 12h14"/>
      <path d="M7 8l1-3h8l1 3"/>
    </svg>
  ),
  balcony: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="8" rx="1"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="6" y1="12" x2="6" y2="20"/>
      <line x1="10" y1="12" x2="10" y2="20"/>
      <line x1="14" y1="12" x2="14" y2="20"/>
      <line x1="18" y1="12" x2="18" y2="20"/>
      <line x1="4" y1="20" x2="20" y2="20"/>
    </svg>
  ),
  wand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5"/>
      <path d="M9 18l6-6-3-3-6 6 3 3z"/>
      <path d="M3 21l3-3"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

export function ConstructorPage() {
  const [floors, setFloors] = useState(2)
  const [roofStyle, setRoofStyle] = useState<RoofStyle>('gable')
  const [wallMaterial, setWallMaterial] = useState<WallMaterial>('brick')
  const [houseStyle, setHouseStyle] = useState<HouseStyle>('classic')
  const [hasGarage, setHasGarage] = useState(false)
  const [hasBalcony, setHasBalcony] = useState(false)

  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateHouse = useCallback(async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateHouseView({
        floors,
        material: wallMaterial,
        roofType: roofStyle,
        style: houseStyle,
        view: 'front',
        hasGarage,
        hasBalcony
      })

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl)
      } else {
        setError(result.error || 'Ошибка генерации')
      }
    } catch (err) {
      setError(String(err))
    } finally {
      setIsGenerating(false)
    }
  }, [floors, wallMaterial, roofStyle, houseStyle, hasGarage, hasBalcony])

  useEffect(() => {
    generateHouse()
  }, [])

  const roofLabels: Record<RoofStyle, { label: string; icon: JSX.Element }> = {
    gable: { label: 'Двускатная', icon: Icons.roofGable },
    hip: { label: 'Шатровая', icon: Icons.roofHip },
    flat: { label: 'Плоская', icon: Icons.roofFlat },
    mansard: { label: 'Мансардная', icon: Icons.roofMansard }
  }

  const materialLabels: Record<WallMaterial, { label: string; color: string }> = {
    brick: { label: 'Кирпич', color: '#c84c32' },
    wood: { label: 'Дерево', color: '#8B4513' },
    stone: { label: 'Камень', color: '#708090' },
    stucco: { label: 'Штукат.', color: '#F5DEB3' },
    modern: { label: 'Совр.', color: '#4A5568' }
  }

  const styleLabels: Record<HouseStyle, { label: string; desc: string }> = {
    modern: { label: 'Современный', desc: 'Минимализм и стекло' },
    classic: { label: 'Классический', desc: 'Традиционный стиль' },
    minimalist: { label: 'Минимализм', desc: 'Чистые линии' },
    european: { label: 'Европейский', desc: 'Элегантность' },
    american: { label: 'Американский', desc: 'Craftsman стиль' }
  }

  return (
    <div className="premium-constructor">
      {/* Premium Header */}
      <header className="premium-header">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <span className="logo-icon">{Icons.house}</span>
            <span className="logo-text">HouseBuilder AI</span>
          </Link>
          <div className="header-center">
            <h1>Конструктор дома</h1>
            <p>Создайте дом вашей мечты с помощью искусственного интеллекта</p>
          </div>
          <div className="header-actions">
            <Link to="/" className="header-btn secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              AI Генератор
            </Link>
            <div className="header-badge">
              <span className="badge-glow"></span>
              <span className="badge-icon">{Icons.sparkle}</span>
              <span>Premium</span>
            </div>
          </div>
        </div>
      </header>

      <div className="premium-layout">
        {/* Preview Section */}
        <div className="preview-section">
          <div className="preview-card">
            {isGenerating ? (
              <div className="preview-loading">
                <div className="loading-animation">
                  <div className="loading-house">
                    <div className="house-roof"></div>
                    <div className="house-body"></div>
                  </div>
                </div>
                <h3>Создаём ваш дом...</h3>
                <p>{floors} этаж{floors > 1 ? (floors < 5 ? 'а' : 'ей') : ''} • {materialLabels[wallMaterial].label} • {styleLabels[houseStyle].label}</p>
              </div>
            ) : generatedImage ? (
              <div className="preview-image-container">
                <img src={generatedImage} alt="Ваш дом" className="preview-image" />
                <div className="preview-overlay">
                  <button onClick={generateHouse} className="regenerate-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                    </svg>
                    Сгенерировать заново
                  </button>
                </div>
              </div>
            ) : error ? (
              <div className="preview-error">
                <div className="error-icon">{Icons.warning}</div>
                <h3>Что-то пошло не так</h3>
                <p>{error}</p>
                <button onClick={generateHouse} className="retry-button">
                  Попробовать снова
                </button>
              </div>
            ) : null}
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-icon">{Icons.layers}</span>
              <div className="stat-info">
                <span className="stat-value">{floors}</span>
                <span className="stat-label">Этажей</span>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-icon">{Icons.brick}</span>
              <div className="stat-info">
                <span className="stat-value">{materialLabels[wallMaterial].label}</span>
                <span className="stat-label">Материал</span>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-icon">{Icons.palette}</span>
              <div className="stat-info">
                <span className="stat-value">{styleLabels[houseStyle].label}</span>
                <span className="stat-label">Стиль</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          {/* Floors Card */}
          <div className="control-card">
            <div className="card-header">
              <div className="card-icon">{Icons.building}</div>
              <h3>Этажность</h3>
            </div>
            <div className="floors-control">
              <button
                className="floor-change-btn minus"
                onClick={() => setFloors(Math.max(1, floors - 1))}
                disabled={floors <= 1 || isGenerating}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14"/>
                </svg>
              </button>
              <div className="floor-display">
                <span className="floor-number">{floors}</span>
                <span className="floor-text">{floors === 1 ? 'этаж' : floors < 5 ? 'этажа' : 'этажей'}</span>
              </div>
              <button
                className="floor-change-btn plus"
                onClick={() => setFloors(Math.min(4, floors + 1))}
                disabled={floors >= 4 || isGenerating}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
            <div className="floor-presets">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  className={`preset-btn ${floors === n ? 'active' : ''}`}
                  onClick={() => setFloors(n)}
                  disabled={isGenerating}
                >
                  {n} эт.
                </button>
              ))}
            </div>
          </div>

          {/* Style Card */}
          <div className="control-card">
            <div className="card-header">
              <div className="card-icon">{Icons.palette}</div>
              <h3>Архитектурный стиль</h3>
            </div>
            <div className="style-grid">
              {(Object.entries(styleLabels) as [HouseStyle, { label: string; desc: string }][]).map(([key, value]) => (
                <button
                  key={key}
                  className={`style-option ${houseStyle === key ? 'active' : ''}`}
                  onClick={() => setHouseStyle(key)}
                  disabled={isGenerating}
                >
                  <span className="style-name">{value.label}</span>
                  <span className="style-desc">{value.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Material Card */}
          <div className="control-card">
            <div className="card-header">
              <div className="card-icon">{Icons.brick}</div>
              <h3>Материал фасада</h3>
            </div>
            <div className="material-grid">
              {(Object.entries(materialLabels) as [WallMaterial, { label: string; color: string }][]).map(([key, value]) => (
                <button
                  key={key}
                  className={`material-option ${wallMaterial === key ? 'active' : ''}`}
                  onClick={() => setWallMaterial(key)}
                  disabled={isGenerating}
                >
                  <span className="material-swatch" style={{ background: value.color }}></span>
                  <span className="material-name">{value.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Roof Card */}
          <div className="control-card">
            <div className="card-header">
              <div className="card-icon">{Icons.roof}</div>
              <h3>Тип крыши</h3>
            </div>
            <div className="roof-grid">
              {(Object.entries(roofLabels) as [RoofStyle, { label: string; icon: JSX.Element }][]).map(([key, value]) => (
                <button
                  key={key}
                  className={`roof-option ${roofStyle === key ? 'active' : ''}`}
                  onClick={() => setRoofStyle(key)}
                  disabled={isGenerating}
                >
                  <span className="roof-icon">{value.icon}</span>
                  <span className="roof-name">{value.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Extras Card */}
          <div className="control-card">
            <div className="card-header">
              <div className="card-icon">{Icons.plus}</div>
              <h3>Дополнительно</h3>
            </div>
            <div className="extras-grid">
              <label className={`extra-option ${hasGarage ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={hasGarage}
                  onChange={(e) => setHasGarage(e.target.checked)}
                  disabled={isGenerating}
                />
                <span className="extra-icon">{Icons.car}</span>
                <span className="extra-text">Гараж</span>
                <span className="extra-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </span>
              </label>
              <label className={`extra-option ${hasBalcony ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={hasBalcony}
                  onChange={(e) => setHasBalcony(e.target.checked)}
                  disabled={isGenerating}
                />
                <span className="extra-icon">{Icons.balcony}</span>
                <span className="extra-text">Балкон</span>
                <span className="extra-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            className={`generate-button ${isGenerating ? 'loading' : ''}`}
            onClick={generateHouse}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="button-spinner"></span>
                <span>Генерация...</span>
              </>
            ) : (
              <>
                <span className="button-icon">{Icons.wand}</span>
                <span>Сгенерировать дом</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
