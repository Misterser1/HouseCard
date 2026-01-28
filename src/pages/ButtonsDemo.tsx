import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ButtonsDemo.css'

type ButtonVariant = 1 | 2 | 3 | 4 | 5 | 6

const Icons = {
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22,2 15,22 11,13 2,9 22,2"/>
    </svg>
  )
}

export function ButtonsDemo() {
  const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>(1)

  return (
    <div className="buttons-demo-page">
      <header className="buttons-demo-header">
        <h1>Варианты кнопок презентации</h1>
        <Link to="/constructor" className="back-btn">
          ← Назад к конструктору
        </Link>
      </header>

      <div className="buttons-demo-content">
        {/* Variant Selector */}
        <div className="variant-selector">
          {[1, 2, 3, 4, 5, 6].map(v => (
            <button
              key={v}
              className={`variant-tab ${selectedVariant === v ? 'active' : ''}`}
              onClick={() => setSelectedVariant(v as ButtonVariant)}
            >
              Вариант {v}
            </button>
          ))}
        </div>

        {/* Preview Area */}
        <div className="buttons-preview-area">

          {/* Вариант 1: Gradient Glow */}
          {selectedVariant === 1 && (
            <div className="buttons-variant variant-1">
              <h3>Gradient Glow - Градиентное свечение</h3>
              <p className="variant-desc">Яркие градиенты с мягким свечением при наведении</p>
              <div className="buttons-group">
                <button className="btn-v1 telegram">
                  <span className="btn-glow"></span>
                  <span className="btn-content">
                    <span className="btn-icon">{Icons.telegram}</span>
                    <span className="btn-text">
                      <span className="btn-title">Telegram</span>
                      <span className="btn-subtitle">Получить презентацию</span>
                    </span>
                  </span>
                </button>
                <button className="btn-v1 email">
                  <span className="btn-glow"></span>
                  <span className="btn-content">
                    <span className="btn-icon">{Icons.email}</span>
                    <span className="btn-text">
                      <span className="btn-title">Email</span>
                      <span className="btn-subtitle">Получить презентацию</span>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Вариант 2: Minimal Line */}
          {selectedVariant === 2 && (
            <div className="buttons-variant variant-2">
              <h3>Minimal Line - Минимализм с линией</h3>
              <p className="variant-desc">Тонкая анимированная линия подчёркивания</p>
              <div className="buttons-group">
                <button className="btn-v2 telegram">
                  <span className="btn-icon">{Icons.telegram}</span>
                  <span className="btn-text">Презентация в Telegram</span>
                  <span className="btn-line"></span>
                </button>
                <button className="btn-v2 email">
                  <span className="btn-icon">{Icons.email}</span>
                  <span className="btn-text">Презентация на почту</span>
                  <span className="btn-line"></span>
                </button>
              </div>
            </div>
          )}

          {/* Вариант 3: Glass Morphism */}
          {selectedVariant === 3 && (
            <div className="buttons-variant variant-3">
              <h3>Glass Morphism - Стеклянный эффект</h3>
              <p className="variant-desc">Полупрозрачный фон с размытием</p>
              <div className="buttons-group-glass">
                <button className="btn-v3 telegram">
                  <span className="btn-icon">{Icons.telegram}</span>
                  <span className="btn-text">
                    <span>Получить в Telegram</span>
                    <span className="btn-hint">Моментальная доставка</span>
                  </span>
                  <span className="btn-arrow">{Icons.arrow}</span>
                </button>
                <button className="btn-v3 email">
                  <span className="btn-icon">{Icons.email}</span>
                  <span className="btn-text">
                    <span>Получить на Email</span>
                    <span className="btn-hint">PDF презентация</span>
                  </span>
                  <span className="btn-arrow">{Icons.arrow}</span>
                </button>
              </div>
            </div>
          )}

          {/* Вариант 4: Pill Buttons */}
          {selectedVariant === 4 && (
            <div className="buttons-variant variant-4">
              <h3>Pill Buttons - Капсулы</h3>
              <p className="variant-desc">Компактные кнопки-капсулы с иконками</p>
              <div className="buttons-group-pills">
                <button className="btn-v4 telegram">
                  <span className="btn-icon-circle">{Icons.telegram}</span>
                  <span className="btn-text">Telegram</span>
                </button>
                <button className="btn-v4 email">
                  <span className="btn-icon-circle">{Icons.email}</span>
                  <span className="btn-text">Email</span>
                </button>
              </div>
              <p className="pills-label">Получить презентацию проекта</p>
            </div>
          )}

          {/* Вариант 5: Card Style */}
          {selectedVariant === 5 && (
            <div className="buttons-variant variant-5">
              <h3>Card Style - Карточки</h3>
              <p className="variant-desc">Кнопки в виде информационных карточек</p>
              <div className="buttons-group-cards">
                <button className="btn-v5 telegram">
                  <div className="btn-card-header">
                    <span className="btn-icon">{Icons.telegram}</span>
                    <span className="btn-badge">Быстро</span>
                  </div>
                  <span className="btn-card-title">Telegram</span>
                  <span className="btn-card-desc">Презентация придёт в чат за 1 минуту</span>
                  <span className="btn-card-action">
                    Получить {Icons.send}
                  </span>
                </button>
                <button className="btn-v5 email">
                  <div className="btn-card-header">
                    <span className="btn-icon">{Icons.email}</span>
                    <span className="btn-badge">PDF</span>
                  </div>
                  <span className="btn-card-title">Email</span>
                  <span className="btn-card-desc">Отправим полную презентацию на почту</span>
                  <span className="btn-card-action">
                    Получить {Icons.send}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Вариант 6: Floating Action */}
          {selectedVariant === 6 && (
            <div className="buttons-variant variant-6">
              <h3>Floating Action - Плавающие кнопки</h3>
              <p className="variant-desc">Круглые кнопки с выезжающим текстом</p>
              <div className="buttons-group-floating">
                <button className="btn-v6 telegram">
                  <span className="btn-circle">
                    {Icons.telegram}
                  </span>
                  <span className="btn-label">Telegram</span>
                </button>
                <button className="btn-v6 email">
                  <span className="btn-circle">
                    {Icons.email}
                  </span>
                  <span className="btn-label">Email</span>
                </button>
              </div>
              <p className="floating-hint">Наведите на кнопку</p>
            </div>
          )}

        </div>

        {/* Apply Button */}
        <div className="apply-section">
          <button className="apply-btn">
            Применить вариант {selectedVariant}
          </button>
        </div>
      </div>
    </div>
  )
}
