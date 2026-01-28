import { useState } from 'react'
import { Link } from 'react-router-dom'
import './StyleDemo.css'

type ColorTheme = 'forest' | 'burgundy' | 'ocean' | 'sand' | 'slate' | 'sunset'

const themes: Record<ColorTheme, {
  name: string
  description: string
  colors: {
    primary: string
    primaryLight: string
    accent: string
    bg: string
    bgWarm: string
    text: string
    textMuted: string
    border: string
  }
}> = {
  forest: {
    name: 'Лесной',
    description: 'Глубокий зелёный с белым - родные края',
    colors: {
      primary: '#2E5A3C',
      primaryLight: '#4a8c5c',
      accent: '#4a8c5c',
      bg: '#ffffff',
      bgWarm: '#f5f8f5',
      text: '#1a2e22',
      textMuted: '#5a6b60',
      border: '#e0e8e2'
    }
  },
  burgundy: {
    name: 'Русский имперский',
    description: 'Бордовый с золотом - традиционный стиль',
    colors: {
      primary: '#8B2635',
      primaryLight: '#a83a4a',
      accent: '#c9a227',
      bg: '#faf8f5',
      bgWarm: '#f5f0e8',
      text: '#2d2a28',
      textMuted: '#6b6460',
      border: '#e8e0d5'
    }
  },
  ocean: {
    name: 'Морской',
    description: 'Глубокий синий - спокойствие и надёжность',
    colors: {
      primary: '#1e4a6d',
      primaryLight: '#3a7ab0',
      accent: '#5a9fd4',
      bg: '#ffffff',
      bgWarm: '#f5f8fa',
      text: '#1a2a35',
      textMuted: '#5a6a75',
      border: '#e0e5ea'
    }
  },
  sand: {
    name: 'Песочный',
    description: 'Тёплые бежевые тона - уют и комфорт',
    colors: {
      primary: '#8a6e4e',
      primaryLight: '#b8956a',
      accent: '#c9a86c',
      bg: '#fdfbf8',
      bgWarm: '#f5f0e8',
      text: '#3a3530',
      textMuted: '#7a7065',
      border: '#e5ddd0'
    }
  },
  slate: {
    name: 'Графитовый',
    description: 'Современный тёмно-серый - минимализм',
    colors: {
      primary: '#3a4550',
      primaryLight: '#5a6a78',
      accent: '#6a8a9a',
      bg: '#ffffff',
      bgWarm: '#f5f6f7',
      text: '#2a3035',
      textMuted: '#6a7580',
      border: '#e0e3e6'
    }
  },
  sunset: {
    name: 'Закат',
    description: 'Терракотовый с персиковым - тепло и энергия',
    colors: {
      primary: '#c45c4a',
      primaryLight: '#e07a68',
      accent: '#e8a060',
      bg: '#fffcfa',
      bgWarm: '#faf5f0',
      text: '#3a2e2a',
      textMuted: '#7a6a65',
      border: '#e8ddd8'
    }
  }
}

// SVG Icons
const Icons = {
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  rooms: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 12h18M12 3v18"/>
    </svg>
  ),
  bath: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12h16v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5z"/>
      <path d="M6 12V5a2 2 0 012-2h1"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  )
}

export function StyleDemo() {
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>('forest')

  const currentTheme = themes[selectedTheme]

  return (
    <div className="style-demo-page">
      {/* Header */}
      <header className="style-demo-header">
        <h1>Выбор цветовой темы</h1>
        <Link to="/constructor" className="back-btn">
          ← Назад к конструктору
        </Link>
      </header>

      <div className="style-demo-content">
        {/* Theme Selector */}
        <div className="theme-selector">
          <h2>Варианты стилей</h2>
          <div className="theme-grid">
            {(Object.keys(themes) as ColorTheme[]).map(themeKey => {
              const theme = themes[themeKey]
              return (
                <button
                  key={themeKey}
                  className={`theme-card ${selectedTheme === themeKey ? 'active' : ''}`}
                  onClick={() => setSelectedTheme(themeKey)}
                  style={{
                    '--theme-primary': theme.colors.primary,
                    '--theme-accent': theme.colors.accent,
                    '--theme-bg': theme.colors.bg,
                    '--theme-border': theme.colors.border,
                  } as React.CSSProperties}
                >
                  <div className="theme-colors">
                    <span className="color-dot primary" style={{ background: theme.colors.primary }} />
                    <span className="color-dot accent" style={{ background: theme.colors.accent }} />
                    <span className="color-dot light" style={{ background: theme.colors.primaryLight }} />
                  </div>
                  <span className="theme-name">{theme.name}</span>
                  <span className="theme-desc">{theme.description}</span>
                  {selectedTheme === themeKey && (
                    <span className="theme-check">{Icons.check}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="theme-preview">
          <h2>Предпросмотр: {currentTheme.name}</h2>

          <div
            className="preview-container"
            style={{
              '--preview-primary': currentTheme.colors.primary,
              '--preview-primary-light': currentTheme.colors.primaryLight,
              '--preview-accent': currentTheme.colors.accent,
              '--preview-bg': currentTheme.colors.bg,
              '--preview-bg-warm': currentTheme.colors.bgWarm,
              '--preview-text': currentTheme.colors.text,
              '--preview-text-muted': currentTheme.colors.textMuted,
              '--preview-border': currentTheme.colors.border,
            } as React.CSSProperties}
          >
            {/* Mini Header */}
            <div className="preview-header">
              <div className="preview-logo">
                <span className="preview-logo-icon">{Icons.house}</span>
                <span>HouseBuilder</span>
              </div>
              <nav className="preview-nav">
                <span className="preview-nav-item active">О проекте</span>
                <span className="preview-nav-item">Галерея</span>
                <span className="preview-nav-item">Планировки</span>
              </nav>
            </div>

            {/* Content */}
            <div className="preview-body">
              {/* Image placeholder */}
              <div className="preview-image">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                  alt="House preview"
                />
              </div>

              {/* Info Panel */}
              <div className="preview-info">
                <div className="preview-spec">
                  <span className="preview-label">ПЛОЩАДЬ ПО ОСЯМ</span>
                  <span className="preview-value-large">240 м²</span>
                </div>

                <div className="preview-spec">
                  <span className="preview-label">МАТЕРИАЛ СТЕН</span>
                  <span className="preview-value">Кирпич</span>
                </div>

                <div className="preview-icons-row">
                  <div className="preview-icon-item">
                    <span className="preview-icon-value">4</span>
                    <span className="preview-icon">{Icons.rooms}</span>
                    <span className="preview-icon-label">Комнат</span>
                  </div>
                  <div className="preview-icon-item">
                    <span className="preview-icon-value">2</span>
                    <span className="preview-icon">{Icons.bath}</span>
                    <span className="preview-icon-label">Санузла</span>
                  </div>
                </div>

                <div className="preview-price-section">
                  <div className="preview-price-header">
                    <span className="preview-label">ЦЕНА</span>
                    <span className="preview-badge">✓ Фиксация цены</span>
                  </div>
                  <span className="preview-price">20.40 млн ₽</span>
                </div>

                <button className="preview-cta">
                  Получить презентацию
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="apply-section">
          <p className="apply-hint">
            Выбранная тема: <strong>{currentTheme.name}</strong>
          </p>
          <button className="apply-btn" style={{ background: currentTheme.colors.primary }}>
            Применить тему "{currentTheme.name}"
          </button>
        </div>
      </div>
    </div>
  )
}
