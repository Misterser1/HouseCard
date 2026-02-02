import { useState } from 'react'
import './RoomModalDemo.css'

const demoRoom = {
  name: 'Гардероб',
  area: 9.12,
  description: 'Вместительный гардероб с продуманной системой хранения',
  features: ['Системы хранения', 'Освещение', 'Зеркало', 'Полки для обуви'],
  image: '/rooms/2.Гардероб.jpg'
}

export default function RoomModalDemo() {
  const [activeVariant, setActiveVariant] = useState<number | null>(null)

  const closeModal = () => setActiveVariant(null)

  return (
    <div className="room-modal-demo">
      <h1>Варианты модального окна комнаты</h1>
      <p className="demo-subtitle">Нажмите на карточку, чтобы увидеть модальное окно</p>

      <div className="demo-grid">
        {/* Variant 1 - Fullscreen с blur фоном */}
        <div className="demo-card" onClick={() => setActiveVariant(1)}>
          <div className="demo-card-preview v1-preview">
            <div className="preview-blur"></div>
            <div className="preview-content"></div>
          </div>
          <h3>Вариант 1</h3>
          <p>Полноэкранный с blur-фоном</p>
        </div>

        {/* Variant 2 - Split screen */}
        <div className="demo-card" onClick={() => setActiveVariant(2)}>
          <div className="demo-card-preview v2-preview">
            <div className="preview-left"></div>
            <div className="preview-right"></div>
          </div>
          <h3>Вариант 2</h3>
          <p>Split-screen (50/50)</p>
        </div>

        {/* Variant 3 - Карточка с большим фото */}
        <div className="demo-card" onClick={() => setActiveVariant(3)}>
          <div className="demo-card-preview v3-preview">
            <div className="preview-image"></div>
            <div className="preview-info"></div>
          </div>
          <h3>Вариант 3</h3>
          <p>Большое фото сверху</p>
        </div>

        {/* Variant 4 - Минималистичный */}
        <div className="demo-card" onClick={() => setActiveVariant(4)}>
          <div className="demo-card-preview v4-preview">
            <div className="preview-minimal"></div>
          </div>
          <h3>Вариант 4</h3>
          <p>Минимализм + типографика</p>
        </div>

        {/* Variant 5 - Glassmorphism */}
        <div className="demo-card" onClick={() => setActiveVariant(5)}>
          <div className="demo-card-preview v5-preview">
            <div className="preview-glass"></div>
          </div>
          <h3>Вариант 5</h3>
          <p>Glassmorphism</p>
        </div>

        {/* Variant 6 - Slide panel */}
        <div className="demo-card" onClick={() => setActiveVariant(6)}>
          <div className="demo-card-preview v6-preview">
            <div className="preview-slide"></div>
          </div>
          <h3>Вариант 6</h3>
          <p>Боковая панель</p>
        </div>
      </div>

      {/* Variant 1 Modal - Fullscreen blur */}
      {activeVariant === 1 && (
        <div className="modal-v1-overlay" onClick={closeModal}>
          <div className="modal-v1" onClick={e => e.stopPropagation()}>
            <button className="modal-close-v1" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-v1-image">
              <img src={demoRoom.image} alt={demoRoom.name} />
            </div>
            <div className="modal-v1-content">
              <div className="modal-v1-header">
                <h2>{demoRoom.name}</h2>
                <span className="modal-v1-area">{demoRoom.area} м²</span>
              </div>
              <p className="modal-v1-description">{demoRoom.description}</p>
              <div className="modal-v1-features">
                {demoRoom.features.map((f, i) => (
                  <span key={i} className="feature-tag">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variant 2 Modal - Split screen */}
      {activeVariant === 2 && (
        <div className="modal-v2-overlay" onClick={closeModal}>
          <div className="modal-v2" onClick={e => e.stopPropagation()}>
            <div className="modal-v2-left">
              <img src={demoRoom.image} alt={demoRoom.name} />
            </div>
            <div className="modal-v2-right">
              <button className="modal-close-v2" onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <div className="modal-v2-content">
                <span className="modal-v2-label">Помещение</span>
                <h2>{demoRoom.name}</h2>
                <div className="modal-v2-area">
                  <span className="area-number">{demoRoom.area}</span>
                  <span className="area-unit">м²</span>
                </div>
                <p className="modal-v2-description">{demoRoom.description}</p>
                <div className="modal-v2-features">
                  <h4>Особенности</h4>
                  <ul>
                    {demoRoom.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variant 3 Modal - Big image card */}
      {activeVariant === 3 && (
        <div className="modal-v3-overlay" onClick={closeModal}>
          <div className="modal-v3" onClick={e => e.stopPropagation()}>
            <button className="modal-close-v3" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-v3-image">
              <img src={demoRoom.image} alt={demoRoom.name} />
              <div className="modal-v3-image-overlay">
                <h2>{demoRoom.name}</h2>
                <span className="modal-v3-area">{demoRoom.area} м²</span>
              </div>
            </div>
            <div className="modal-v3-content">
              <p className="modal-v3-description">{demoRoom.description}</p>
              <div className="modal-v3-features">
                {demoRoom.features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variant 4 Modal - Minimal */}
      {activeVariant === 4 && (
        <div className="modal-v4-overlay" onClick={closeModal}>
          <div className="modal-v4" onClick={e => e.stopPropagation()}>
            <button className="modal-close-v4" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-v4-image">
              <img src={demoRoom.image} alt={demoRoom.name} />
            </div>
            <div className="modal-v4-content">
              <div className="modal-v4-header">
                <span className="modal-v4-area-big">{demoRoom.area}</span>
                <span className="modal-v4-area-unit">м²</span>
              </div>
              <h2>{demoRoom.name}</h2>
              <p>{demoRoom.description}</p>
              <div className="modal-v4-divider"></div>
              <div className="modal-v4-features">
                {demoRoom.features.map((f, i) => (
                  <span key={i}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variant 5 Modal - Glassmorphism */}
      {activeVariant === 5 && (
        <div className="modal-v5-overlay" onClick={closeModal}>
          <div className="modal-v5-bg" style={{ backgroundImage: `url(${demoRoom.image})` }}></div>
          <div className="modal-v5" onClick={e => e.stopPropagation()}>
            <button className="modal-close-v5" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-v5-image">
              <img src={demoRoom.image} alt={demoRoom.name} />
            </div>
            <div className="modal-v5-content">
              <h2>{demoRoom.name}</h2>
              <div className="modal-v5-area">{demoRoom.area} м²</div>
              <p>{demoRoom.description}</p>
              <div className="modal-v5-features">
                {demoRoom.features.map((f, i) => (
                  <span key={i} className="glass-tag">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variant 6 Modal - Side panel */}
      {activeVariant === 6 && (
        <div className="modal-v6-overlay" onClick={closeModal}>
          <div className="modal-v6" onClick={e => e.stopPropagation()}>
            <button className="modal-close-v6" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-v6-image">
              <img src={demoRoom.image} alt={demoRoom.name} />
            </div>
            <div className="modal-v6-content">
              <div className="modal-v6-badge">Помещение</div>
              <h2>{demoRoom.name}</h2>
              <div className="modal-v6-stats">
                <div className="stat-item">
                  <span className="stat-value">{demoRoom.area}</span>
                  <span className="stat-label">м²</span>
                </div>
              </div>
              <p className="modal-v6-description">{demoRoom.description}</p>
              <div className="modal-v6-features">
                <h4>Включено:</h4>
                {demoRoom.features.map((f, i) => (
                  <div key={i} className="feature-row">
                    <span className="feature-dot"></span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
