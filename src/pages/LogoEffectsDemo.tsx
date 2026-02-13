import { useState } from 'react'

const effects = [
  {
    name: '1. Золотой ореол',
    description: 'Мягкое статичное золотое свечение',
    layers: [
      { bg: 'radial-gradient(circle, rgba(255,200,60,0.3) 0%, rgba(255,160,30,0.12) 50%, transparent 75%)', size: 150, animation: '' },
    ],
  },
  {
    name: '2. Тёплый закат',
    description: 'Нежный оранжевый отсвет',
    layers: [
      { bg: 'radial-gradient(circle, rgba(255,120,30,0.3) 0%, rgba(255,80,10,0.12) 50%, transparent 75%)', size: 150, animation: '' },
    ],
  },
  {
    name: '3. Мерцание камина',
    description: 'Деликатная пульсация тёплого тона',
    layers: [
      { bg: 'radial-gradient(circle, rgba(255,170,50,0.3) 0%, rgba(255,130,30,0.1) 50%, transparent 75%)', size: 150, animation: 'fireGlow' },
    ],
  },
  {
    name: '4. Бегущий блик',
    description: 'Лёгкий золотой блик, скользящий за лого',
    layers: [
      { bg: 'radial-gradient(circle, rgba(255,200,80,0.2) 0%, transparent 60%)', size: 140, animation: '' },
      { bg: 'radial-gradient(ellipse 60px 100px at center, rgba(255,220,100,0.3) 0%, transparent 70%)', size: 160, animation: 'shimmer' },
    ],
  },
  {
    name: '5. Тёплая дымка',
    description: 'Рассеянное мягкое сияние',
    layers: [
      { bg: 'radial-gradient(circle, rgba(255,190,80,0.25) 0%, rgba(255,160,50,0.1) 45%, transparent 75%)', size: 160, animation: '' },
    ],
  },
  {
    name: '6. Янтарное дыхание',
    description: 'Тонкая янтарная пульсация',
    layers: [
      { bg: 'radial-gradient(circle, rgba(220,160,30,0.3) 0%, rgba(200,130,20,0.12) 50%, transparent 75%)', size: 150, animation: 'amberBreath' },
    ],
  },
]

export function LogoEffectsDemo() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080e0a',
      padding: '3rem 2rem',
      fontFamily: "'Manrope', sans-serif",
      color: '#fff',
    }}>
      <style>{`
        @keyframes fireGlow {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%,-50%) scale(1.2); opacity: 1; }
        }
        @keyframes fireGlow2 {
          0%, 100% { transform: translate(-50%,-50%) scale(1.1); opacity: 0.6; }
          30% { transform: translate(-50%,-50%) scale(0.9); opacity: 1; }
          70% { transform: translate(-50%,-50%) scale(1.15); opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { transform: translate(-150%,-50%) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(50%,-50%) scale(1); opacity: 0; }
        }
        @keyframes amberBreath {
          0%, 100% { transform: translate(-50%,-50%) scale(0.9); opacity: 0.7; }
          50% { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
        }
        @keyframes amberBreath2 {
          0%, 100% { transform: translate(-50%,-50%) scale(1.1); opacity: 0.5; }
          50% { transform: translate(-50%,-50%) scale(0.85); opacity: 0.9; }
        }

        .logo-fx-card {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 16px;
          border: 2px solid transparent;
        }
        .logo-fx-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        }
        .logo-fx-card.selected {
          border-color: rgba(255, 200, 80, 0.6);
          box-shadow: 0 0 30px rgba(255, 180, 60, 0.15);
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <h1 style={{
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, #ffd700, #ff9800)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Варианты тёплого фона для лого
      </h1>
      <p style={{ textAlign: 'center', color: '#7a8f7f', marginBottom: '3rem', fontSize: '0.95rem' }}>
        Нажмите на вариант, чтобы выбрать
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {effects.map((effect, i) => (
          <div
            key={i}
            className={`logo-fx-card ${selected === i ? 'selected' : ''}`}
            onClick={() => setSelected(i)}
            style={{
              background: '#0d1a12',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Logo area with dark bg for contrast */}
            <div style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'radial-gradient(ellipse at center, rgba(10,20,12,0.9) 0%, #080e0a 100%)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {/* Glow layers */}
              {effect.layers.map((layer, li) => (
                <div
                  key={li}
                  className="logo-glow"
                  style={{
                    background: layer.bg,
                    width: layer.size,
                    height: layer.size,
                    animation: layer.animation ? `${layer.animation} ${layer.animation.includes('shimmer') ? '3s' : '3.5s'} ease-in-out infinite` : undefined,
                    transform: layer.animation ? undefined : 'translate(-50%, -50%)',
                  }}
                />
              ))}
              {/* Logo */}
              <img
                src="/logo.png"
                alt="Родные Края"
                style={{
                  height: '110px',
                  width: 'auto',
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 1,
                  filter: 'brightness(1.1)',
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '0.3rem',
                color: '#f0dca0',
              }}>
                {effect.name}
              </h3>
              <p style={{
                fontSize: '0.82rem',
                color: '#6b8570',
                lineHeight: 1.5,
              }}>
                {effect.description}
              </p>
            </div>

            {selected === i && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'linear-gradient(135deg, #ffd700, #ff9800)',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
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
          padding: '1.25rem 2rem',
          background: 'rgba(20, 35, 25, 0.9)',
          borderRadius: '12px',
          maxWidth: '500px',
          margin: '2.5rem auto 0',
          border: '1px solid rgba(255, 200, 80, 0.2)',
        }}>
          <p style={{ color: '#f0dca0', fontSize: '1rem', fontWeight: 600 }}>
            Выбран: {effects[selected].name}
          </p>
        </div>
      )}
    </div>
  )
}
