import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './SocialDemo.css'

const socials = [
  { id: 'youtube', name: 'YouTube', icon: '▶', url: '#', color: '#FF0000', followers: '12.5K' },
  { id: 'telegram', name: 'Telegram', icon: '✈', url: '#', color: '#26A5E4', followers: '8.2K' },
  { id: 'vk', name: 'ВКонтакте', icon: 'VK', url: '#', color: '#0077FF', followers: '15.3K' },
  { id: 'instagram', name: 'Instagram', icon: '📷', url: '#', color: '#E4405F', followers: '22.1K' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', url: '#', color: '#25D366', followers: '' },
  { id: 'dzen', name: 'Дзен', icon: 'D', url: '#', color: '#000', followers: '5.7K' },
]

const companyInfo = {
  name: 'HouseCard',
  tagline: 'Дома, в которых хочется жить',
  phone: '+7 (999) 123-45-67',
  email: 'info@housecard.ru',
  address: 'Москва, ул. Архитекторов, 12',
  workHours: 'Пн–Пт: 9:00–18:00',
}

const stats = [
  { label: 'Построено домов', value: '340+' },
  { label: 'Лет на рынке', value: '12' },
  { label: 'Довольных клиентов', value: '98%' },
  { label: 'Проектов в работе', value: '28' },
]

const YOUTUBE_ID = 'dQw4w9WgXcQ'

export function SocialDemo() {
  const [activeVariant, setActiveVariant] = useState(1)

  return (
    <div className="social-demo-page">
      <nav className="social-demo-nav">
        <Link to="/constructor-v1" className="social-demo-back">← Назад</Link>
        <h1>Секция: YouTube + Соцсети + Инфо</h1>
        <div className="social-demo-tabs">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <button
              key={n}
              className={`social-demo-tab ${activeVariant === n ? 'active' : ''}`}
              onClick={() => setActiveVariant(n)}
            >
              V{n}
            </button>
          ))}
        </div>
      </nav>

      {activeVariant === 1 && <SocialV1 />}
      {activeVariant === 2 && <SocialV2 />}
      {activeVariant === 3 && <SocialV3 />}
      {activeVariant === 4 && <SocialV4 />}
      {activeVariant === 5 && <SocialV5 />}
      {activeVariant === 6 && <SocialV6 />}
    </div>
  )
}

/* ============================================
   V1: Cinematic Split — видео слева, glass-карточки справа
============================================ */
function SocialV1() {
  return (
    <section className="sv1">
      <div className="sv1-video">
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube"
        />
        <div className="sv1-video-glow" />
      </div>
      <div className="sv1-right">
        <div className="sv1-info-card">
          <h2>{companyInfo.name}</h2>
          <p className="sv1-tagline">{companyInfo.tagline}</p>
          <div className="sv1-stats">
            {stats.map(s => (
              <div key={s.label} className="sv1-stat">
                <span className="sv1-stat-value">{s.value}</span>
                <span className="sv1-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sv1-socials">
          {socials.map((s, i) => (
            <a
              key={s.id}
              href={s.url}
              className="sv1-social-card"
              style={{ '--delay': `${i * 0.08}s`, '--accent': s.color } as React.CSSProperties}
            >
              <span className="sv1-social-icon">{s.icon}</span>
              <div className="sv1-social-info">
                <span className="sv1-social-name">{s.name}</span>
                {s.followers && <span className="sv1-social-count">{s.followers}</span>}
              </div>
              <span className="sv1-social-arrow">→</span>
            </a>
          ))}
        </div>
        <div className="sv1-contact">
          <a href={`tel:${companyInfo.phone}`} className="sv1-phone">{companyInfo.phone}</a>
          <span className="sv1-hours">{companyInfo.workHours}</span>
        </div>
      </div>
    </section>
  )
}

/* ============================================
   V2: Immersive Bento — бенто-сетка с видео, соцсетями и статистикой
============================================ */
function SocialV2() {
  return (
    <section className="sv2">
      <div className="sv2-bento">
        {/* YouTube - большая ячейка */}
        <div className="sv2-cell sv2-video-cell">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube"
          />
        </div>

        {/* Company Info */}
        <div className="sv2-cell sv2-info-cell">
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.tagline}</p>
          <div className="sv2-contact-line">
            <span>{companyInfo.phone}</span>
            <span>{companyInfo.email}</span>
          </div>
        </div>

        {/* Stats */}
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="sv2-cell sv2-stat-cell"
            style={{ '--i': i } as React.CSSProperties}
          >
            <span className="sv2-stat-value">{s.value}</span>
            <span className="sv2-stat-label">{s.label}</span>
          </div>
        ))}

        {/* Social links */}
        <div className="sv2-cell sv2-socials-cell">
          <h3>Мы в соцсетях</h3>
          <div className="sv2-social-grid">
            {socials.map(s => (
              <a
                key={s.id}
                href={s.url}
                className="sv2-social-btn"
                style={{ '--accent': s.color } as React.CSSProperties}
              >
                <span className="sv2-social-icon">{s.icon}</span>
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="sv2-cell sv2-address-cell">
          <span className="sv2-address-icon">📍</span>
          <span>{companyInfo.address}</span>
          <span className="sv2-hours">{companyInfo.workHours}</span>
        </div>
      </div>
    </section>
  )
}

/* ============================================
   V3: Marquee Neon — неоновые акценты, бегущая строка соцсетей
============================================ */
function SocialV3() {
  return (
    <section className="sv3">
      <div className="sv3-bg-grid" />
      <div className="sv3-content">
        <div className="sv3-top">
          <div className="sv3-video-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube"
            />
            <div className="sv3-video-border" />
          </div>
          <div className="sv3-info-panel">
            <h2>
              <span className="sv3-accent">House</span>Card
            </h2>
            <p className="sv3-tagline">{companyInfo.tagline}</p>
            <div className="sv3-stats-row">
              {stats.map(s => (
                <div key={s.label} className="sv3-stat">
                  <span className="sv3-stat-val">{s.value}</span>
                  <span className="sv3-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="sv3-contacts">
              <a href={`tel:${companyInfo.phone}`} className="sv3-phone">{companyInfo.phone}</a>
              <span>{companyInfo.address}</span>
            </div>
          </div>
        </div>

        {/* Marquee social bar */}
        <div className="sv3-marquee-wrap">
          <div className="sv3-marquee">
            {[...socials, ...socials, ...socials].map((s, i) => (
              <a
                key={`${s.id}-${i}`}
                href={s.url}
                className="sv3-marquee-item"
                style={{ '--accent': s.color } as React.CSSProperties}
              >
                <span className="sv3-m-icon">{s.icon}</span>
                <span className="sv3-m-name">{s.name}</span>
                {s.followers && <span className="sv3-m-count">{s.followers}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================
   V4: Orbital — видео в центре, карточки по орбите
============================================ */
function SocialV4() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  return (
    <section className="sv4">
      <div className="sv4-scene">
        {/* Orbiting social cards */}
        <div className="sv4-orbit" ref={orbitRef}>
          {socials.map((s, i) => {
            const angle = (i * 360) / socials.length
            return (
              <a
                key={s.id}
                href={s.url}
                className={`sv4-planet ${hoveredId === s.id ? 'hovered' : ''}`}
                style={{
                  '--angle': `${angle}deg`,
                  '--accent': s.color,
                  '--i': i,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span className="sv4-planet-icon">{s.icon}</span>
                <span className="sv4-planet-name">{s.name}</span>
                {s.followers && <span className="sv4-planet-count">{s.followers}</span>}
              </a>
            )
          })}
        </div>

        {/* Center video */}
        <div className="sv4-center">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube"
          />
        </div>

        {/* Floating info */}
        <div className="sv4-info-float sv4-info-tl">
          <h2>{companyInfo.name}</h2>
          <p>{companyInfo.tagline}</p>
        </div>
        <div className="sv4-info-float sv4-info-br">
          <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
          <span>{companyInfo.workHours}</span>
        </div>

        {/* Stats bottom bar */}
        <div className="sv4-stats-bar">
          {stats.map(s => (
            <div key={s.label} className="sv4-stat">
              <span className="sv4-stat-val">{s.value}</span>
              <span className="sv4-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================
   V5: Stacked Layers — слои с параллакс-эффектом
============================================ */
function SocialV5() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }

  return (
    <section className="sv5" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className="sv5-bg-blobs">
        <div
          className="sv5-blob sv5-blob-1"
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        />
        <div
          className="sv5-blob sv5-blob-2"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
        <div
          className="sv5-blob sv5-blob-3"
          style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)` }}
        />
      </div>

      <div className="sv5-layers">
        {/* Layer 1: Video */}
        <div
          className="sv5-layer sv5-layer-video"
          style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube"
          />
        </div>

        {/* Layer 2: Info card */}
        <div
          className="sv5-layer sv5-layer-info"
          style={{ transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)` }}
        >
          <h2>{companyInfo.name}</h2>
          <p className="sv5-tagline">{companyInfo.tagline}</p>
          <div className="sv5-stats">
            {stats.map(s => (
              <div key={s.label} className="sv5-stat">
                <span className="sv5-stat-val">{s.value}</span>
                <span className="sv5-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="sv5-contact-row">
            <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
            <span>{companyInfo.email}</span>
          </div>
        </div>

        {/* Layer 3: Social cards */}
        <div
          className="sv5-layer sv5-layer-socials"
          style={{ transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 16}px)` }}
        >
          {socials.map((s, i) => (
            <a
              key={s.id}
              href={s.url}
              className="sv5-social"
              style={{ '--accent': s.color, '--i': i } as React.CSSProperties}
            >
              <span className="sv5-s-icon">{s.icon}</span>
              <span className="sv5-s-name">{s.name}</span>
              {s.followers && <span className="sv5-s-count">{s.followers}</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================
   V6: Magazine — редакционный макет с крупной типографикой
============================================ */
function SocialV6() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % socials.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="sv6">
      <div className="sv6-layout">
        {/* Left: huge typography + info */}
        <div className="sv6-left">
          <div className="sv6-brand">
            <span className="sv6-brand-line">House</span>
            <span className="sv6-brand-line sv6-brand-accent">Card</span>
          </div>
          <p className="sv6-tagline">{companyInfo.tagline}</p>

          <div className="sv6-stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className="sv6-stat" style={{ '--i': i } as React.CSSProperties}>
                <span className="sv6-stat-num">{s.value}</span>
                <span className="sv6-stat-txt">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="sv6-contact-block">
            <a href={`tel:${companyInfo.phone}`} className="sv6-cta-phone">{companyInfo.phone}</a>
            <div className="sv6-meta">
              <span>{companyInfo.address}</span>
              <span>{companyInfo.workHours}</span>
            </div>
          </div>
        </div>

        {/* Right: video + rotating social showcase */}
        <div className="sv6-right">
          <div className="sv6-video-frame">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube"
            />
          </div>

          <div className="sv6-social-carousel">
            <div className="sv6-social-track">
              {socials.map((s, i) => (
                <a
                  key={s.id}
                  href={s.url}
                  className={`sv6-social-slide ${i === activeIndex ? 'active' : ''}`}
                  style={{ '--accent': s.color } as React.CSSProperties}
                  onClick={(e) => { e.preventDefault(); setActiveIndex(i) }}
                >
                  <span className="sv6-sl-icon">{s.icon}</span>
                  <div className="sv6-sl-info">
                    <span className="sv6-sl-name">{s.name}</span>
                    {s.followers && <span className="sv6-sl-count">{s.followers} подписчиков</span>}
                  </div>
                  <span className="sv6-sl-arrow">↗</span>
                </a>
              ))}
            </div>
            <div className="sv6-social-dots">
              {socials.map((_, i) => (
                <button
                  key={i}
                  className={`sv6-dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
