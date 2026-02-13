import { useState } from 'react'

const variants = [
  {
    name: '1. Текущее (без изменений)',
    description: 'Как сейчас на сайте',
    filter: 'brightness(1.3) sepia(0.15) saturate(1.2)',
    dropShadow: 'drop-shadow(0 0 12px rgba(255, 200, 100, 0.3))',
    bg: '',
  },
  {
    name: '2. Белая подсветка',
    description: 'brightness + контрастный белый drop-shadow',
    filter: 'brightness(1.8)',
    dropShadow: 'drop-shadow(0 0 8px rgba(255,255,255,0.5)) drop-shadow(0 0 20px rgba(255,255,255,0.2))',
    bg: '',
  },
  {
    name: '3. Золотой контур',
    description: 'Тёплый золотой ореол вокруг контуров лого',
    filter: 'brightness(1.5) sepia(0.1)',
    dropShadow: 'drop-shadow(0 0 6px rgba(255,200,80,0.6)) drop-shadow(0 0 16px rgba(255,180,50,0.3))',
    bg: '',
  },
  {
    name: '4. Яркий + контраст',
    description: 'Увеличенная яркость и контрастность',
    filter: 'brightness(1.6) contrast(1.2) saturate(1.3)',
    dropShadow: 'drop-shadow(0 0 10px rgba(255,220,100,0.35))',
    bg: '',
  },
  {
    name: '5. Светлая подложка',
    description: 'Полупрозрачная светлая подложка за лого',
    filter: 'brightness(1.2)',
    dropShadow: '',
    bg: 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
  },
  {
    name: '6. Инверсия в белое',
    description: 'Лого полностью белое для максимального контраста',
    filter: 'brightness(0) invert(1)',
    dropShadow: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
    bg: '',
  },
  {
    name: '7. Белое + золотой тон',
    description: 'Белое лого с лёгким тёплым оттенком',
    filter: 'brightness(0) invert(1) sepia(0.2) saturate(2) hue-rotate(15deg)',
    dropShadow: 'drop-shadow(0 0 10px rgba(255,200,80,0.35))',
    bg: '',
  },
  {
    name: '8. Мягкое осветление',
    description: 'Деликатное осветление без потери цвета',
    filter: 'brightness(1.4) saturate(0.8)',
    dropShadow: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 12px rgba(255,220,120,0.25))',
    bg: '',
  },
]

export function LogoVisibilityDemo() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f0c',
      padding: '2.5rem 1.5rem',
      fontFamily: "'Manrope', sans-serif",
      color: '#fff',
    }}>
      <style>{`
        .logo-vis-card {
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease;
          border: 2px solid transparent;
          border-radius: 14px;
        }
        .logo-vis-card:hover {
          transform: translateY(-3px);
        }
        .logo-vis-card.picked {
          border-color: rgba(255, 200, 80, 0.6);
        }
      `}</style>

      <h1 style={{
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: 700,
        marginBottom: '0.4rem',
        color: '#fff',
      }}>
        Видимость логотипа
      </h1>
      <p style={{ textAlign: 'center', color: '#6b7f6f', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
        Как лого выглядит на тёмном фоне с фото. Нажмите, чтобы выбрать.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {variants.map((v, i) => (
          <div
            key={i}
            className={`logo-vis-card ${selected === i ? 'picked' : ''}`}
            onClick={() => setSelected(i)}
            style={{
              background: '#111a14',
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Simulated hero background */}
            <div style={{
              width: '100%',
              height: '180px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'url(/houses/brick/natural/house_brick_roof1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              {/* Dark overlay like on the real site */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
              }} />

              {/* Optional background glow */}
              {v.bg && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 160,
                  height: 160,
                  background: v.bg,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }} />
              )}

              {/* Logo */}
              <img
                src="/logo.png"
                alt="Родные Края"
                style={{
                  height: '80px',
                  width: 'auto',
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 1,
                  filter: `${v.filter} ${v.dropShadow}`,
                }}
              />
            </div>

            {/* Label */}
            <div style={{ padding: '1rem 1.25rem' }}>
              <h3 style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                marginBottom: '0.25rem',
                color: '#e0d4a8',
              }}>
                {v.name}
              </h3>
              <p style={{
                fontSize: '0.78rem',
                color: '#5f7563',
                lineHeight: 1.45,
              }}>
                {v.description}
              </p>
            </div>

            {selected === i && (
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'linear-gradient(135deg, #ffd700, #ff9800)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: '#1a2e22',
                zIndex: 2,
              }}>
                ✓
              </div>
            )}
          </div>
        ))}
      </div>

      {selected !== null && (
        <div style={{
          textAlign: 'center',
          padding: '1rem 2rem',
          background: 'rgba(20, 35, 25, 0.9)',
          borderRadius: '12px',
          maxWidth: '500px',
          margin: '2.5rem auto 0',
          border: '1px solid rgba(255, 200, 80, 0.2)',
        }}>
          <p style={{ color: '#f0dca0', fontSize: '1rem', fontWeight: 600 }}>
            Выбран: {variants[selected].name}
          </p>
        </div>
      )}
    </div>
  )
}
