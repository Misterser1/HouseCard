import { useState } from 'react'
import { Link } from 'react-router-dom'
import './LogoDemo.css'

const logos = [
  {
    id: 1,
    name: 'Изба с резным коньком',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d7a4a"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <path d="M24 6L6 20h4v18h28V20h4L24 6z" fill="url(#g1)"/>
        <path d="M24 6L6 20h4v18h28V20h4L24 6z" stroke="#1a3d24" strokeWidth="1.5" fill="none"/>
        <rect x="18" y="26" width="12" height="12" fill="#f5f0e6" stroke="#1a3d24" strokeWidth="1"/>
        <line x1="24" y1="26" x2="24" y2="38" stroke="#1a3d24" strokeWidth="1"/>
        <line x1="18" y1="32" x2="30" y2="32" stroke="#1a3d24" strokeWidth="1"/>
        <path d="M24 2L22 6h4L24 2z" fill="#c9a86c"/>
        <circle cx="24" cy="4" r="1.5" fill="#c9a86c"/>
        <rect x="12" y="24" width="4" height="5" fill="#f5f0e6" stroke="#1a3d24" strokeWidth="0.75"/>
        <rect x="32" y="24" width="4" height="5" fill="#f5f0e6" stroke="#1a3d24" strokeWidth="0.75"/>
      </svg>
    )
  },
  {
    id: 2,
    name: 'Современный модерн',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E5A3C"/>
            <stop offset="100%" stopColor="#4a9960"/>
          </linearGradient>
        </defs>
        <rect x="6" y="18" width="22" height="24" fill="url(#g2)" rx="2"/>
        <rect x="28" y="24" width="14" height="18" fill="#3d7a4a" rx="2"/>
        <path d="M4 18L17 8l11 10" stroke="#1a3d24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <rect x="10" y="24" width="6" height="6" fill="#a8d4b8" rx="1"/>
        <rect x="10" y="32" width="6" height="6" fill="#a8d4b8" rx="1"/>
        <rect x="18" y="30" width="6" height="12" fill="#f5f0e6" rx="1"/>
        <rect x="32" y="28" width="6" height="10" fill="#a8d4b8" rx="1"/>
        <circle cx="40" cy="12" r="4" fill="#c9a86c" opacity="0.8"/>
      </svg>
    )
  },
  {
    id: 3,
    name: 'Щит с домом',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a9960"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <path d="M24 4C14 4 6 7 6 7v20c0 10 18 17 18 17s18-7 18-17V7s-8-3-18-3z" fill="url(#g3)" stroke="#1a3d24" strokeWidth="2"/>
        <path d="M24 14L14 22v12h20V22L24 14z" fill="#f5f0e6" stroke="#1a3d24" strokeWidth="1.5"/>
        <rect x="20" y="26" width="8" height="8" fill="#2E5A3C"/>
        <path d="M24 14L14 22" stroke="#c9a86c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 14L34 22" stroke="#c9a86c" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 4,
    name: 'Дерево-дом',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5aaa6e"/>
            <stop offset="50%" stopColor="#3d8a50"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <path d="M24 4L10 18h4l-6 10h5l-5 10h32l-5-10h5l-6-10h4L24 4z" fill="url(#g4)" stroke="#1a3d24" strokeWidth="1.5"/>
        <rect x="20" y="38" width="8" height="6" fill="#8b6c42" stroke="#5c4a2e" strokeWidth="1"/>
        <circle cx="18" cy="16" r="1.5" fill="#c9a86c"/>
        <circle cx="28" cy="20" r="1.5" fill="#c9a86c"/>
        <circle cx="22" cy="26" r="1.5" fill="#c9a86c"/>
        <circle cx="30" cy="30" r="1.5" fill="#c9a86c"/>
        <path d="M20 42l4-8 4 8" fill="#f5f0e6" stroke="#1a3d24" strokeWidth="0.75"/>
      </svg>
    )
  },
  {
    id: 5,
    name: 'Русский терем',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g5" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c9a86c"/>
            <stop offset="100%" stopColor="#a08050"/>
          </linearGradient>
        </defs>
        <rect x="10" y="22" width="28" height="22" fill="#8b6c42" stroke="#5c4a2e" strokeWidth="1.5"/>
        <path d="M8 22L24 8L40 22" fill="url(#g5)" stroke="#5c4a2e" strokeWidth="1.5"/>
        <path d="M24 4L22 8h4L24 4z" fill="#2E5A3C"/>
        <path d="M24 4v-2" stroke="#2E5A3C" strokeWidth="2" strokeLinecap="round"/>
        <rect x="18" y="30" width="12" height="14" fill="#5c4a2e"/>
        <path d="M18 30c0-6 6-8 6-8s6 2 6 8" fill="#c9a86c" stroke="#5c4a2e" strokeWidth="1"/>
        <rect x="12" y="26" width="5" height="6" fill="#a8d4b8" stroke="#5c4a2e" strokeWidth="0.75"/>
        <rect x="31" y="26" width="5" height="6" fill="#a8d4b8" stroke="#5c4a2e" strokeWidth="0.75"/>
        <line x1="14.5" y1="26" x2="14.5" y2="32" stroke="#5c4a2e" strokeWidth="0.5"/>
        <line x1="33.5" y1="26" x2="33.5" y2="32" stroke="#5c4a2e" strokeWidth="0.5"/>
      </svg>
    )
  },
  {
    id: 6,
    name: 'Круг с ландшафтом',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g6a" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87ceeb"/>
            <stop offset="100%" stopColor="#e8f4f8"/>
          </linearGradient>
          <linearGradient id="g6b" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a9960"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" fill="url(#g6a)" stroke="#2E5A3C" strokeWidth="2.5"/>
        <path d="M4 28c4-2 8-6 12-4s8 4 12 2 8-4 12-2 4 4 4 4v8H4v-8z" fill="url(#g6b)"/>
        <path d="M20 18L28 26h-4v6h-8v-6h-4L20 18z" fill="#f5f0e6" stroke="#2E5A3C" strokeWidth="1.5"/>
        <rect x="18" y="26" width="4" height="6" fill="#2E5A3C"/>
        <circle cx="36" cy="14" r="3" fill="#c9a86c"/>
      </svg>
    )
  },
  {
    id: 7,
    name: 'Минимал линии',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M8 24L24 10L40 24" stroke="#2E5A3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 24v16h24V24" stroke="#2E5A3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="20" y="30" width="8" height="10" stroke="#2E5A3C" strokeWidth="2" rx="1"/>
        <path d="M24 10V6" stroke="#c9a86c" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="5" r="2" fill="#c9a86c"/>
      </svg>
    )
  },
  {
    id: 8,
    name: 'Горы и дом',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g8" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6baa7d"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <path d="M0 40L16 16l8 12 8-20 16 32H0z" fill="url(#g8)" opacity="0.3"/>
        <path d="M4 40L16 20l6 10" stroke="#2E5A3C" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        <path d="M14 40L28 18l14 22" stroke="#2E5A3C" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        <path d="M26 28L34 38h-4v6h-8v-6h-4L26 28z" fill="#f5f0e6" stroke="#2E5A3C" strokeWidth="1.5"/>
        <rect x="24" y="38" width="4" height="6" fill="#2E5A3C"/>
        <circle cx="10" cy="10" r="4" fill="#c9a86c" opacity="0.8"/>
      </svg>
    )
  },
  {
    id: 9,
    name: 'Буква Р стильная',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g9" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a9960"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <path d="M12 42V8h12c8 0 14 5 14 12s-6 12-14 12h-8" stroke="url(#g9)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M16 32l8 10" stroke="#c9a86c" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="24" cy="20" r="4" fill="#c9a86c"/>
      </svg>
    )
  },
  {
    id: 10,
    name: 'Шестиугольник',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g10" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5aaa6e"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" fill="url(#g10)" stroke="#1a3d24" strokeWidth="2"/>
        <path d="M16 26L24 18l8 8" stroke="#f5f0e6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 26v10h12V26" stroke="#f5f0e6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="22" y="30" width="4" height="6" fill="#c9a86c"/>
      </svg>
    )
  },
  {
    id: 11,
    name: 'Солнце и поле',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g11" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2E5A3C"/>
            <stop offset="100%" stopColor="#6baa7d"/>
          </linearGradient>
        </defs>
        <circle cx="38" cy="12" r="6" fill="#c9a86c"/>
        <path d="M38 4v2M38 18v2M30 12h2M44 12h2M32 6l1.5 1.5M42.5 16.5l1.5 1.5M32 18l1.5-1.5M42.5 7.5l1.5-1.5" stroke="#c9a86c" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 32c6-4 14-4 20 0s14 4 20 0v14H2V32z" fill="url(#g11)"/>
        <path d="M14 24L22 32h-4v10h-8V32H6L14 24z" fill="#f5f0e6" stroke="#2E5A3C" strokeWidth="1.5"/>
        <rect x="12" y="34" width="4" height="8" fill="#2E5A3C"/>
      </svg>
    )
  },
  {
    id: 12,
    name: 'Ключ от дома',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g12" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a86c"/>
            <stop offset="100%" stopColor="#a08050"/>
          </linearGradient>
        </defs>
        <circle cx="14" cy="16" r="10" fill="none" stroke="url(#g12)" strokeWidth="3"/>
        <circle cx="14" cy="16" r="4" fill="#2E5A3C"/>
        <path d="M22 24L42 44" stroke="url(#g12)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M36 38l4 4M32 34l4 4" stroke="url(#g12)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M10 16L14 12l4 4-4 4-4-4z" fill="#2E5A3C"/>
      </svg>
    )
  },
  {
    id: 13,
    name: 'Корни и крона',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g13" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5aaa6e"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="16" r="12" fill="url(#g13)"/>
        <rect x="22" y="26" width="4" height="10" fill="#8b6c42"/>
        <path d="M18 44c2-6 4-8 6-8s4 2 6 8" stroke="#8b6c42" strokeWidth="2" fill="none"/>
        <path d="M14 44c2-8 6-12 10-12s8 4 10 12" stroke="#8b6c42" strokeWidth="2" fill="none"/>
        <path d="M18 20L24 14l6 6" stroke="#f5f0e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20v6h8v-6" stroke="#f5f0e6" strokeWidth="2"/>
        <rect x="22" y="22" width="4" height="4" fill="#c9a86c"/>
      </svg>
    )
  },
  {
    id: 14,
    name: 'Волна и берег',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g14" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a9960"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <path d="M2 36c4-3 8-1 12-4s8-1 12-4 8-1 12-4 8-1 8 2v18H2V36z" fill="url(#g14)" opacity="0.4"/>
        <path d="M2 40c4-2 8 0 12-2s8 0 12-2 8 0 12-2 8 0 8 2" stroke="#2E5A3C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 22L26 30h-4v8h-8v-8h-4L18 22z" fill="#f5f0e6" stroke="#2E5A3C" strokeWidth="1.5"/>
        <rect x="16" y="32" width="4" height="6" fill="#2E5A3C"/>
        <path d="M36 16l-4-8 8 4-4 4z" fill="#c9a86c"/>
      </svg>
    )
  },
  {
    id: 15,
    name: 'Двойная крыша',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g15a" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c9a86c"/>
            <stop offset="100%" stopColor="#a08050"/>
          </linearGradient>
          <linearGradient id="g15b" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a9960"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <path d="M24 6L4 22h8v20h24V22h8L24 6z" fill="url(#g15b)"/>
        <path d="M24 6L4 22h8" fill="url(#g15a)"/>
        <path d="M24 6L44 22h-8" fill="url(#g15a)"/>
        <path d="M4 22L24 6L44 22" stroke="#5c4a2e" strokeWidth="2" fill="none"/>
        <rect x="18" y="30" width="12" height="12" fill="#f5f0e6" stroke="#1a3d24" strokeWidth="1"/>
        <line x1="24" y1="30" x2="24" y2="42" stroke="#1a3d24" strokeWidth="1"/>
        <line x1="18" y1="36" x2="30" y2="36" stroke="#1a3d24" strokeWidth="1"/>
        <rect x="10" y="26" width="5" height="6" fill="#a8d4b8" stroke="#1a3d24" strokeWidth="0.75"/>
        <rect x="33" y="26" width="5" height="6" fill="#a8d4b8" stroke="#1a3d24" strokeWidth="0.75"/>
      </svg>
    )
  },
  {
    id: 16,
    name: 'Арка с колоннами',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="g16" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a9960"/>
            <stop offset="100%" stopColor="#2E5A3C"/>
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="32" height="6" fill="url(#g16)" rx="1"/>
        <rect x="8" y="38" width="32" height="4" fill="url(#g16)" rx="1"/>
        <rect x="10" y="14" width="4" height="24" fill="#f5f0e6" stroke="#2E5A3C" strokeWidth="1"/>
        <rect x="34" y="14" width="4" height="24" fill="#f5f0e6" stroke="#2E5A3C" strokeWidth="1"/>
        <path d="M16 42V28c0-6 8-6 8-6s8 0 8 6v14" fill="none" stroke="#2E5A3C" strokeWidth="2"/>
        <path d="M18 42V30c0-4 6-4 6-4s6 0 6 4v12" fill="#c9a86c" opacity="0.5"/>
        <circle cx="24" cy="6" r="3" fill="#c9a86c"/>
      </svg>
    )
  }
]

export default function LogoDemo() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="logo-demo-page">
      <header className="logo-demo-header">
        <Link to="/constructor" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Назад
        </Link>
        <h1>Выберите логотип для "Родные Края"</h1>
      </header>

      <div className="logo-grid">
        {logos.map(logo => (
          <div
            key={logo.id}
            className={`logo-card ${selectedId === logo.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(logo.id)}
          >
            <div className="logo-preview">
              {logo.svg}
            </div>
            <div className="logo-with-text">
              <div className="logo-icon-small">{logo.svg}</div>
              <span className="logo-brand-text">Родные Края</span>
            </div>
            <div className="logo-name">{logo.name}</div>
            <div className="logo-number">#{logo.id}</div>
          </div>
        ))}
      </div>

      {selectedId && (
        <div className="selected-preview">
          <div className="selected-preview-content">
            <div className="selected-logo-large">
              {logos.find(l => l.id === selectedId)?.svg}
            </div>
            <span className="selected-brand-text">Родные Края</span>
          </div>
          <p>Выбран логотип #{selectedId}: {logos.find(l => l.id === selectedId)?.name}</p>
          <button className="confirm-btn">Подтвердить выбор</button>
        </div>
      )}
    </div>
  )
}
