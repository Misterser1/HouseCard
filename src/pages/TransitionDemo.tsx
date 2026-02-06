import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TransitionDemo.css'

const variants = [
  { id: 1, name: 'Градиент + линия' },
  { id: 2, name: 'Волна SVG' },
  { id: 3, name: 'Многослойные волны' },
  { id: 4, name: 'Ромб-орнамент' },
  { id: 5, name: 'Overlap (наложение)' },
  { id: 6, name: 'Размытие (blur)' },
  { id: 7, name: 'Зигзаг' },
  { id: 8, name: 'Мягкая тень' },
  { id: 9, name: 'Диагональ' },
  { id: 10, name: 'Листья / ветка' },
  { id: 11, name: 'Три точки' },
  { id: 12, name: 'Градиент-полоса' },
  { id: 13, name: 'Арка' },
  { id: 14, name: 'Без перехода' },
  { id: 15, name: 'Зелёный градиент' },
  { id: 16, name: 'Тёплый песочный' },
  { id: 17, name: 'Зелёная полоса' },
  { id: 18, name: 'Туман (мягкий)' },
  { id: 19, name: 'Двухцветный split' },
  { id: 20, name: 'Природный градиент' },
  { id: 21, name: 'Шалфей (sage)' },
  { id: 22, name: 'Льняной крем' },
  { id: 23, name: 'Оливковая роса' },
  { id: 24, name: 'Морозный белый' },
  { id: 25, name: 'Лесная подстилка' },
  { id: 26, name: 'Жемчужный' },
  { id: 27, name: 'Глина (тёплый)' },
  { id: 28, name: 'Эвкалипт' },
  { id: 29, name: 'Секция: мятный крем' },
  { id: 30, name: 'Секция: тёплый лён' },
  { id: 31, name: 'Секция: светлый шалфей' },
  { id: 32, name: 'Секция: слоновая кость' },
  { id: 33, name: 'Секция: прохладный серый' },
  { id: 34, name: 'Секция: оливковый свет' },
  { id: 35, name: 'Секция: пепельная роза' },
  { id: 36, name: 'Секция: лесной туман' },
  { id: 37, name: 'Секция: тёплый камень' },
  { id: 38, name: 'Секция: голубой лёд' },
  { id: 39, name: 'Тёмный лес (dark)' },
  { id: 40, name: 'Мягкий крафт (texture)' },
  { id: 41, name: 'Бетон (concrete)' },
  { id: 42, name: 'Зелёный градиент вниз' },
  { id: 43, name: 'Тёплый дерево' },
  { id: 44, name: 'Ночной зелёный' },
  { id: 45, name: 'Льняная ткань' },
  { id: 46, name: 'Облачный белый' },
  { id: 47, name: 'Мрамор светлый' },
  { id: 48, name: 'Терраццо' },
]

// Mock section - имитирует конец секции Интерьер
function MockInterior() {
  return (
    <div className="mock-section mock-interior">
      <div className="mock-interior-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={`mock-cell mock-cell-${i}`}>
            <img src={`/rooms/${i}.${['Прихожая', 'Гардероб', 'Кухня-столовая', 'Коридор', 'Спальня', 'Спальня'][i-1]}.jpg`} alt="" />
            <div className="mock-cell-label">Комната {i}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Mock section - имитирует начало секции Соцсети
function MockSocial({ bgClass }: { bgClass?: string }) {
  return (
    <div className={`mock-section mock-social ${bgClass || ''}`}>
      <div className="mock-social-content">
        <div className="mock-social-video">
          <div className="mock-video-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        <div className="mock-social-info">
          <div className="mock-stat">1 200+</div>
          <div className="mock-stat-label">построенных домов</div>
          <div className="mock-social-links">
            {['YT', 'TG', 'VK', 'IG'].map(s => (
              <span key={s} className="mock-link">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TransitionDemo() {
  const [activeVariant, setActiveVariant] = useState(1)

  return (
    <div className="transition-demo-page">
      <nav className="demo-nav">
        <Link to="/constructor-v1" className="demo-back">← Назад</Link>
        <h1>Переход между секциями</h1>
        <div className="demo-tabs">
          {variants.map(v => (
            <button
              key={v.id}
              className={`demo-tab ${activeVariant === v.id ? 'active' : ''}`}
              onClick={() => setActiveVariant(v.id)}
            >
              {v.id}
            </button>
          ))}
        </div>
      </nav>

      <div className="transition-demo-label">{variants.find(v => v.id === activeVariant)?.name}</div>

      {/* V1: Gradient + line */}
      {activeVariant === 1 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v1">
            <div className="trans-v1-gradient" />
            <div className="trans-v1-line">
              <span className="trans-v1-dot" />
            </div>
            <div className="trans-v1-gradient trans-v1-gradient-bottom" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V2: Single SVG wave */}
      {activeVariant === 2 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v2">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="trans-v2-wave">
              <path d="M0,40 C320,80 640,0 960,40 C1120,60 1280,20 1440,40 L1440,100 L0,100 Z" />
            </svg>
          </div>
          <MockSocial />
        </div>
      )}

      {/* V3: Multi-layer waves */}
      {activeVariant === 3 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v3">
            <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="trans-v3-waves">
              <path className="trans-v3-wave-1" d="M0,50 C240,100 480,20 720,60 C960,100 1200,30 1440,50 L1440,150 L0,150 Z" />
              <path className="trans-v3-wave-2" d="M0,70 C360,30 720,90 1080,50 C1260,35 1380,65 1440,70 L1440,150 L0,150 Z" />
              <path className="trans-v3-wave-3" d="M0,90 C200,110 500,80 720,95 C940,110 1200,85 1440,90 L1440,150 L0,150 Z" />
            </svg>
          </div>
          <MockSocial />
        </div>
      )}

      {/* V4: Diamond ornament */}
      {activeVariant === 4 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v4">
            <div className="trans-v4-line-left" />
            <div className="trans-v4-diamond">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="trans-v4-line-right" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V5: Overlap (section overlap with rounded top) */}
      {activeVariant === 5 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v5">
            <div className="trans-v5-overlap" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V6: Blur gradient strip */}
      {activeVariant === 6 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v6">
            <div className="trans-v6-blur" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V7: Zigzag */}
      {activeVariant === 7 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v7">
            <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="trans-v7-zigzag">
              <path d="M0,20 L30,0 L60,20 L90,0 L120,20 L150,0 L180,20 L210,0 L240,20 L270,0 L300,20 L330,0 L360,20 L390,0 L420,20 L450,0 L480,20 L510,0 L540,20 L570,0 L600,20 L630,0 L660,20 L690,0 L720,20 L750,0 L780,20 L810,0 L840,20 L870,0 L900,20 L930,0 L960,20 L990,0 L1020,20 L1050,0 L1080,20 L1110,0 L1140,20 L1170,0 L1200,20 L1230,0 L1260,20 L1290,0 L1320,20 L1350,0 L1380,20 L1410,0 L1440,20 L1440,40 L0,40 Z" />
            </svg>
          </div>
          <MockSocial />
        </div>
      )}

      {/* V8: Soft shadow with spacing */}
      {activeVariant === 8 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v8">
            <div className="trans-v8-shadow-top" />
            <div className="trans-v8-space" />
            <div className="trans-v8-shadow-bottom" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V9: Diagonal cut */}
      {activeVariant === 9 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v9">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="trans-v9-svg">
              <polygon points="0,0 1440,80 0,80" className="trans-v9-fill" />
            </svg>
          </div>
          <MockSocial />
        </div>
      )}

      {/* V10: Leaf / branch divider */}
      {activeVariant === 10 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v10">
            <div className="trans-v10-line" />
            <div className="trans-v10-icon">
              <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
                <path d="M20 4 C20 4 8 14 8 24 C8 30 13 36 20 36 C20 36 20 24 20 4 Z" fill="rgba(46, 90, 60, 0.15)" stroke="rgba(46, 90, 60, 0.3)" strokeWidth="1" />
                <path d="M20 4 C20 4 32 14 32 24 C32 30 27 36 20 36 C20 36 20 24 20 4 Z" fill="rgba(46, 90, 60, 0.1)" stroke="rgba(46, 90, 60, 0.3)" strokeWidth="1" />
                <line x1="20" y1="8" x2="20" y2="36" stroke="rgba(46, 90, 60, 0.25)" strokeWidth="1" />
              </svg>
            </div>
            <div className="trans-v10-line" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V11: Three dots */}
      {activeVariant === 11 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v11">
            <span className="trans-v11-dot" />
            <span className="trans-v11-dot" />
            <span className="trans-v11-dot" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V12: Gradient accent strip */}
      {activeVariant === 12 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v12">
            <div className="trans-v12-strip" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V13: Arch */}
      {activeVariant === 13 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v13">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="trans-v13-svg">
              <path d="M0,100 C0,100 720,0 1440,100 L1440,100 L0,100 Z" />
            </svg>
          </div>
          <MockSocial />
        </div>
      )}

      {/* V14: No transition (for comparison) */}
      {activeVariant === 14 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial />
        </div>
      )}

      {/* V15: Green gradient band */}
      {activeVariant === 15 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v15" />
          <MockSocial />
        </div>
      )}

      {/* V16: Warm sand tone */}
      {activeVariant === 16 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v16" />
          <MockSocial />
        </div>
      )}

      {/* V17: Green accent strip */}
      {activeVariant === 17 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v17">
            <div className="trans-v17-line" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V18: Soft fog / mist */}
      {activeVariant === 18 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v18" />
          <MockSocial />
        </div>
      )}

      {/* V19: Two-tone split */}
      {activeVariant === 19 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v19">
            <div className="trans-v19-top" />
            <div className="trans-v19-bottom" />
          </div>
          <MockSocial />
        </div>
      )}

      {/* V20: Nature gradient (earth tones) */}
      {activeVariant === 20 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v20" />
          <MockSocial />
        </div>
      )}

      {/* V21: Sage mist */}
      {activeVariant === 21 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v21" />
          <MockSocial />
        </div>
      )}

      {/* V22: Linen cream */}
      {activeVariant === 22 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v22" />
          <MockSocial />
        </div>
      )}

      {/* V23: Olive dew */}
      {activeVariant === 23 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v23" />
          <MockSocial />
        </div>
      )}

      {/* V24: Frost white */}
      {activeVariant === 24 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v24" />
          <MockSocial />
        </div>
      )}

      {/* V25: Forest floor */}
      {activeVariant === 25 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v25" />
          <MockSocial />
        </div>
      )}

      {/* V26: Pearl shimmer */}
      {activeVariant === 26 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v26" />
          <MockSocial />
        </div>
      )}

      {/* V27: Clay warm */}
      {activeVariant === 27 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v27" />
          <MockSocial />
        </div>
      )}

      {/* V28: Eucalyptus */}
      {activeVariant === 28 && (
        <div className="transition-demo-container">
          <MockInterior />
          <div className="trans-v28" />
          <MockSocial />
        </div>
      )}

      {/* V29-V38: Different section background colors */}
      {activeVariant === 29 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-29" />
        </div>
      )}

      {activeVariant === 30 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-30" />
        </div>
      )}

      {activeVariant === 31 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-31" />
        </div>
      )}

      {activeVariant === 32 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-32" />
        </div>
      )}

      {activeVariant === 33 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-33" />
        </div>
      )}

      {activeVariant === 34 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-34" />
        </div>
      )}

      {activeVariant === 35 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-35" />
        </div>
      )}

      {activeVariant === 36 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-36" />
        </div>
      )}

      {activeVariant === 37 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-37" />
        </div>
      )}

      {activeVariant === 38 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-38" />
        </div>
      )}

      {/* V39: Dark forest */}
      {activeVariant === 39 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-39" />
        </div>
      )}

      {/* V40: Kraft texture */}
      {activeVariant === 40 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-40" />
        </div>
      )}

      {/* V41: Concrete */}
      {activeVariant === 41 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-41" />
        </div>
      )}

      {/* V42: Green gradient down */}
      {activeVariant === 42 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-42" />
        </div>
      )}

      {/* V43: Warm wood */}
      {activeVariant === 43 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-43" />
        </div>
      )}

      {/* V44: Night green */}
      {activeVariant === 44 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-44" />
        </div>
      )}

      {/* V45: Linen fabric */}
      {activeVariant === 45 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-45" />
        </div>
      )}

      {/* V46: Cloud white */}
      {activeVariant === 46 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-46" />
        </div>
      )}

      {/* V47: Light marble */}
      {activeVariant === 47 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-47" />
        </div>
      )}

      {/* V48: Terrazzo */}
      {activeVariant === 48 && (
        <div className="transition-demo-container">
          <MockInterior />
          <MockSocial bgClass="social-bg-48" />
        </div>
      )}
    </div>
  )
}

export default TransitionDemo
