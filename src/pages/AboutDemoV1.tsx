import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AboutDemoV1.css'

/* ── data ── */
const tabs = ['О нас', 'Наш опыт', 'Наши качества', 'Наша команда']

const stats = [
  { value: '340+', label: 'Построено домов', icon: '🏠' },
  { value: '12', label: 'Лет на рынке', icon: '📅' },
  { value: '98%', label: 'Довольных клиентов', icon: '⭐' },
  { value: '28', label: 'Проектов в работе', icon: '🔨' },
]

const qualities = [
  { title: 'Надёжность', desc: 'Используем только проверенные материалы и технологии строительства', icon: 'shield' },
  { title: 'Прозрачность', desc: 'Детальная смета и фиксированная цена на все этапы работ', icon: 'eye' },
  { title: 'Качество', desc: 'Контроль качества на каждом этапе от фундамента до отделки', icon: 'star' },
  { title: 'Сроки', desc: 'Строгое соблюдение сроков строительства по договору', icon: 'clock' },
  { title: 'Гарантия', desc: '5 лет гарантии на все виды выполненных работ', icon: 'check' },
  { title: 'Поддержка', desc: 'Сопровождение проекта от идеи до заселения', icon: 'heart' },
]

const team = [
  { name: 'Алексей Родин', role: 'Основатель и директор', exp: '15 лет в строительстве', img: null },
  { name: 'Михаил Лесков', role: 'Главный архитектор', exp: '12 лет проектирования', img: null },
  { name: 'Елена Краснова', role: 'Дизайнер интерьеров', exp: '8 лет в дизайне', img: null },
  { name: 'Дмитрий Волков', role: 'Прораб', exp: '10 лет на объектах', img: null },
  { name: 'Ольга Светлова', role: 'Менеджер проектов', exp: '7 лет в управлении', img: null },
  { name: 'Сергей Тихонов', role: 'Инженер-конструктор', exp: '9 лет расчётов', img: null },
]

const experience = [
  { year: '2014', title: 'Основание компании', desc: 'Начали с небольших проектов загородных домов' },
  { year: '2016', title: 'Первые 50 домов', desc: 'Расширили команду и географию строительства' },
  { year: '2018', title: 'Премия «Застройщик года»', desc: 'Признание качества на региональном уровне' },
  { year: '2020', title: '200+ реализованных проектов', desc: 'Запустили собственное производство материалов' },
  { year: '2022', title: 'Цифровая трансформация', desc: '3D-визуализация и онлайн-конструктор домов' },
  { year: '2024', title: '340+ построенных домов', desc: 'Расширение на 5 регионов России' },
]

/* ── SVG Icons ── */
const QualityIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactElement> = {
    shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z"/></svg>,
    eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
    heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  }
  return <span className="q-icon">{icons[type]}</span>
}

/* ====================================================================
   VARIANT 1 — Horizontal Tabs + Morphing Container
   Tabs switch content with a morph/crossfade animation
   ==================================================================== */
function Variant1() {
  const [activeTab, setActiveTab] = useState(0)
  const [animating, setAnimating] = useState(false)

  const switchTab = (idx: number) => {
    if (idx === activeTab) return
    setAnimating(true)
    setTimeout(() => { setActiveTab(idx); setAnimating(false) }, 300)
  }

  return (
    <div className="about-v1">
      <div className="about-v1-tabs">
        {tabs.map((t, i) => (
          <button key={t} className={`about-v1-tab ${activeTab === i ? 'active' : ''}`} onClick={() => switchTab(i)}>
            {t}
          </button>
        ))}
      </div>
      <div className={`about-v1-content ${animating ? 'fade-out' : 'fade-in'}`}>
        {activeTab === 0 && <V1About />}
        {activeTab === 1 && <V1Experience />}
        {activeTab === 2 && <V1Qualities />}
        {activeTab === 3 && <V1Team />}
      </div>
    </div>
  )
}

function V1About() {
  return (
    <div className="v1-about-block">
      <div className="v1-about-hero">
        <h2>Родные Края</h2>
        <p className="v1-about-tagline">Строим дома, в которых хочется жить</p>
        <p className="v1-about-desc">
          Мы — команда профессионалов, которая уже более 12 лет создаёт комфортные и надёжные загородные дома.
          Каждый проект — это индивидуальный подход, современные технологии и внимание к каждой детали.
        </p>
      </div>
      <div className="v1-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="v1-stat-card">
            <span className="v1-stat-value">{s.value}</span>
            <span className="v1-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function V1Experience() {
  return (
    <div className="v1-timeline">
      {experience.map((e, i) => (
        <div key={i} className="v1-timeline-item" style={{ '--i': i } as React.CSSProperties}>
          <div className="v1-timeline-year">{e.year}</div>
          <div className="v1-timeline-dot" />
          <div className="v1-timeline-info">
            <h4>{e.title}</h4>
            <p>{e.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function V1Qualities() {
  return (
    <div className="v1-qualities-grid">
      {qualities.map((q, i) => (
        <div key={i} className="v1-quality-card" style={{ '--i': i } as React.CSSProperties}>
          <QualityIcon type={q.icon} />
          <h4>{q.title}</h4>
          <p>{q.desc}</p>
        </div>
      ))}
    </div>
  )
}

function V1Team() {
  return (
    <div className="v1-team-grid">
      {team.map((m, i) => (
        <div key={i} className="v1-team-card" style={{ '--i': i } as React.CSSProperties}>
          <div className="v1-team-avatar">{m.name.split(' ').map(n => n[0]).join('')}</div>
          <h4>{m.name}</h4>
          <span className="v1-team-role">{m.role}</span>
          <span className="v1-team-exp">{m.exp}</span>
        </div>
      ))}
    </div>
  )
}

/* ====================================================================
   VARIANT 2 — Vertical Scroll Storytelling (single page, no tabs)
   All sections visible with parallax-like stagger on scroll
   ==================================================================== */
function Variant2() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const els = root.querySelectorAll('.v2-reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('v2-visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="about-v2" ref={containerRef}>
      {/* Hero */}
      <div className="v2-hero v2-reveal">
        <h2>Родные Края</h2>
        <p>Более 12 лет строим дома мечты</p>
      </div>

      {/* Stats ribbon */}
      <div className="v2-stats-ribbon v2-reveal">
        {stats.map((s, i) => (
          <div key={i} className="v2-stat" style={{ '--i': i } as React.CSSProperties}>
            <span className="v2-stat-val">{s.value}</span>
            <span className="v2-stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Experience timeline — horizontal */}
      <div className="v2-section v2-reveal">
        <h3 className="v2-section-title">Наш опыт</h3>
        <div className="v2-horizontal-timeline">
          {experience.map((e, i) => (
            <div key={i} className="v2-ht-item" style={{ '--i': i } as React.CSSProperties}>
              <div className="v2-ht-year">{e.year}</div>
              <div className="v2-ht-line" />
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Qualities — hexagon grid */}
      <div className="v2-section v2-reveal">
        <h3 className="v2-section-title">Наши качества</h3>
        <div className="v2-hex-grid">
          {qualities.map((q, i) => (
            <div key={i} className="v2-hex-card" style={{ '--i': i } as React.CSSProperties}>
              <QualityIcon type={q.icon} />
              <h4>{q.title}</h4>
              <p>{q.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team — overlap cards */}
      <div className="v2-section v2-reveal">
        <h3 className="v2-section-title">Наша команда</h3>
        <div className="v2-team-stack">
          {team.map((m, i) => (
            <div key={i} className="v2-team-card" style={{ '--i': i } as React.CSSProperties}>
              <div className="v2-team-avatar">{m.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="v2-team-info">
                <h4>{m.name}</h4>
                <span>{m.role}</span>
                <small>{m.exp}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   VARIANT 3 — Card Stack / Tinder-style swipe through sections
   Each section is a full card, swipe/click to navigate
   ==================================================================== */
function Variant3() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const goTo = (idx: number) => {
    if (idx === current) return
    setDirection(idx > current ? 'left' : 'right')
    setTimeout(() => { setCurrent(idx); setDirection(null) }, 400)
  }

  const next = () => goTo(Math.min(current + 1, 3))
  const prev = () => goTo(Math.max(current - 1, 0))

  return (
    <div className="about-v3">
      <div className="v3-progress">
        {tabs.map((t, i) => (
          <button key={t} className={`v3-dot ${current === i ? 'active' : ''} ${i < current ? 'done' : ''}`} onClick={() => goTo(i)}>
            <span className="v3-dot-label">{t}</span>
          </button>
        ))}
      </div>
      <div className={`v3-card-container ${direction ? `v3-slide-${direction}` : ''}`}>
        {current === 0 && (
          <div className="v3-card v3-card-about">
            <div className="v3-card-accent" />
            <h2>Родные Края</h2>
            <p className="v3-card-tagline">Строим дома, в которых хочется жить</p>
            <p className="v3-card-text">Более 12 лет опыта в загородном строительстве. Индивидуальный подход к каждому проекту.</p>
            <div className="v3-mini-stats">
              {stats.map((s, i) => (
                <div key={i} className="v3-mini-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {current === 1 && (
          <div className="v3-card v3-card-exp">
            <div className="v3-card-accent" />
            <h3>Наш опыт</h3>
            <div className="v3-exp-list">
              {experience.map((e, i) => (
                <div key={i} className="v3-exp-row" style={{ '--i': i } as React.CSSProperties}>
                  <span className="v3-exp-year">{e.year}</span>
                  <div>
                    <strong>{e.title}</strong>
                    <p>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {current === 2 && (
          <div className="v3-card v3-card-qual">
            <div className="v3-card-accent" />
            <h3>Наши качества</h3>
            <div className="v3-qual-grid">
              {qualities.map((q, i) => (
                <div key={i} className="v3-qual-item" style={{ '--i': i } as React.CSSProperties}>
                  <QualityIcon type={q.icon} />
                  <div>
                    <strong>{q.title}</strong>
                    <p>{q.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {current === 3 && (
          <div className="v3-card v3-card-team">
            <div className="v3-card-accent" />
            <h3>Наша команда</h3>
            <div className="v3-team-grid">
              {team.map((m, i) => (
                <div key={i} className="v3-team-member" style={{ '--i': i } as React.CSSProperties}>
                  <div className="v3-member-avatar">{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="v3-nav">
        <button onClick={prev} disabled={current === 0} className="v3-nav-btn">← Назад</button>
        <button onClick={next} disabled={current === 3} className="v3-nav-btn v3-nav-next">Далее →</button>
      </div>
    </div>
  )
}

/* ====================================================================
   VARIANT 4 — Magazine / Editorial Layout
   Mixed grid with large hero blocks and smaller info cards
   ==================================================================== */
function Variant4() {
  return (
    <div className="about-v4">
      {/* Hero row */}
      <div className="v4-hero">
        <div className="v4-hero-text">
          <span className="v4-label">О компании</span>
          <h2>Родные Края</h2>
          <p>Строим дома, в которых хочется жить. Более 12 лет опыта, 340+ реализованных проектов и команда из 50 профессионалов.</p>
        </div>
        <div className="v4-hero-stats">
          {stats.map((s, i) => (
            <div key={i} className="v4-stat" style={{ '--i': i } as React.CSSProperties}>
              <span className="v4-stat-val">{s.value}</span>
              <span className="v4-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience — horizontal scroll cards */}
      <div className="v4-section">
        <h3 className="v4-section-title">
          <span className="v4-section-num">01</span>
          Наш опыт
        </h3>
        <div className="v4-exp-scroll">
          {experience.map((e, i) => (
            <div key={i} className="v4-exp-card" style={{ '--i': i } as React.CSSProperties}>
              <span className="v4-exp-year">{e.year}</span>
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Qualities — bento grid */}
      <div className="v4-section">
        <h3 className="v4-section-title">
          <span className="v4-section-num">02</span>
          Наши качества
        </h3>
        <div className="v4-qual-bento">
          {qualities.map((q, i) => (
            <div key={i} className={`v4-qual-cell v4-qual-cell-${i + 1}`} style={{ '--i': i } as React.CSSProperties}>
              <QualityIcon type={q.icon} />
              <h4>{q.title}</h4>
              <p>{q.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team — horizontal cards with flip on hover */}
      <div className="v4-section">
        <h3 className="v4-section-title">
          <span className="v4-section-num">03</span>
          Наша команда
        </h3>
        <div className="v4-team-row">
          {team.map((m, i) => (
            <div key={i} className="v4-team-flip" style={{ '--i': i } as React.CSSProperties}>
              <div className="v4-team-front">
                <div className="v4-team-initials">{m.name.split(' ').map(n => n[0]).join('')}</div>
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>
              <div className="v4-team-back">
                <h4>{m.name}</h4>
                <p>{m.role}</p>
                <p className="v4-team-exp">{m.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   VARIANT 5 — Interactive 3D-ish Cards with Tilt + Glass Morphism
   ==================================================================== */
function Variant5() {
  const [activeSection, setActiveSection] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)'
  }

  return (
    <div className="about-v5">
      {/* Floating nav pills */}
      <div className="v5-nav-pills">
        {tabs.map((t, i) => (
          <button key={t} className={`v5-pill ${activeSection === i ? 'active' : ''}`} onClick={() => setActiveSection(i)}>
            {t}
          </button>
        ))}
      </div>

      {/* Glass card */}
      <div className="v5-glass-card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="v5-glass-bg" />
        <div className="v5-glass-content">
          {activeSection === 0 && (
            <div className="v5-about-inner">
              <h2>Родные Края</h2>
              <p className="v5-tagline">Строим дома, в которых хочется жить</p>
              <p className="v5-desc">Команда профессионалов с 12-летним опытом в загородном строительстве. Индивидуальный подход, современные технологии, внимание к деталям.</p>
              <div className="v5-stats-row">
                {stats.map((s, i) => (
                  <div key={i} className="v5-stat-bubble" style={{ '--i': i } as React.CSSProperties}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 1 && (
            <div className="v5-exp-inner">
              <h3>Наш путь</h3>
              <div className="v5-exp-flow">
                {experience.map((e, i) => (
                  <div key={i} className="v5-exp-node" style={{ '--i': i } as React.CSSProperties}>
                    <div className="v5-exp-circle">{e.year}</div>
                    <div className="v5-exp-text">
                      <strong>{e.title}</strong>
                      <p>{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 2 && (
            <div className="v5-qual-inner">
              <h3>Почему мы</h3>
              <div className="v5-qual-list">
                {qualities.map((q, i) => (
                  <div key={i} className="v5-qual-row" style={{ '--i': i } as React.CSSProperties}>
                    <div className="v5-qual-icon-wrap"><QualityIcon type={q.icon} /></div>
                    <div>
                      <strong>{q.title}</strong>
                      <p>{q.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 3 && (
            <div className="v5-team-inner">
              <h3>Команда</h3>
              <div className="v5-team-hex">
                {team.map((m, i) => (
                  <div key={i} className="v5-team-hex-item" style={{ '--i': i } as React.CSSProperties}>
                    <div className="v5-hex-avatar">{m.name.split(' ').map(n => n[0]).join('')}</div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   VARIANT 6 — Accordion Cascade with counter animation
   Full-width sections that expand/collapse with smooth cascade
   ==================================================================== */
function Variant6() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="about-v6">
      {/* Section 0: About */}
      <div className={`v6-panel ${open === 0 ? 'v6-open' : ''}`} onClick={() => setOpen(open === 0 ? null : 0)}>
        <div className="v6-panel-header">
          <span className="v6-panel-num">01</span>
          <h3>О нас</h3>
          <span className="v6-panel-toggle">{open === 0 ? '−' : '+'}</span>
        </div>
        <div className="v6-panel-body">
          <div className="v6-about-content">
            <div className="v6-about-text">
              <h2>Родные Края</h2>
              <p>Строим дома, в которых хочется жить. Более 12 лет создаём комфортные и надёжные загородные дома с индивидуальным подходом к каждому проекту.</p>
            </div>
            <div className="v6-about-stats">
              {stats.map((s, i) => (
                <div key={i} className="v6-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Experience */}
      <div className={`v6-panel ${open === 1 ? 'v6-open' : ''}`} onClick={() => setOpen(open === 1 ? null : 1)}>
        <div className="v6-panel-header">
          <span className="v6-panel-num">02</span>
          <h3>Наш опыт</h3>
          <span className="v6-panel-toggle">{open === 1 ? '−' : '+'}</span>
        </div>
        <div className="v6-panel-body">
          <div className="v6-exp-grid">
            {experience.map((e, i) => (
              <div key={i} className="v6-exp-card" style={{ '--i': i } as React.CSSProperties}>
                <div className="v6-exp-year">{e.year}</div>
                <strong>{e.title}</strong>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Qualities */}
      <div className={`v6-panel ${open === 2 ? 'v6-open' : ''}`} onClick={() => setOpen(open === 2 ? null : 2)}>
        <div className="v6-panel-header">
          <span className="v6-panel-num">03</span>
          <h3>Наши качества</h3>
          <span className="v6-panel-toggle">{open === 2 ? '−' : '+'}</span>
        </div>
        <div className="v6-panel-body">
          <div className="v6-qual-grid">
            {qualities.map((q, i) => (
              <div key={i} className="v6-qual-card" style={{ '--i': i } as React.CSSProperties}>
                <QualityIcon type={q.icon} />
                <strong>{q.title}</strong>
                <p>{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Team */}
      <div className={`v6-panel ${open === 3 ? 'v6-open' : ''}`} onClick={() => setOpen(open === 3 ? null : 3)}>
        <div className="v6-panel-header">
          <span className="v6-panel-num">04</span>
          <h3>Наша команда</h3>
          <span className="v6-panel-toggle">{open === 3 ? '−' : '+'}</span>
        </div>
        <div className="v6-panel-body">
          <div className="v6-team-row">
            {team.map((m, i) => (
              <div key={i} className="v6-team-card" style={{ '--i': i } as React.CSSProperties}>
                <div className="v6-team-av">{m.name.split(' ').map(n => n[0]).join('')}</div>
                <strong>{m.name}</strong>
                <span>{m.role}</span>
                <small>{m.exp}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   VARIANT 7 — Split Screen with sliding panels
   Left: navigation + stats, Right: content area
   ==================================================================== */
function Variant7() {
  const [section, setSection] = useState(0)

  return (
    <div className="about-v7">
      <div className="v7-left">
        <div className="v7-brand">
          <h2>Родные Края</h2>
          <p>Строим дома мечты с 2014 года</p>
        </div>
        <nav className="v7-nav">
          {tabs.map((t, i) => (
            <button key={t} className={`v7-nav-item ${section === i ? 'active' : ''}`} onClick={() => setSection(i)}>
              <span className="v7-nav-line" />
              <span>{t}</span>
            </button>
          ))}
        </nav>
        <div className="v7-mini-stats">
          {stats.map((s, i) => (
            <div key={i} className="v7-mini-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="v7-right">
        {section === 0 && (
          <div className="v7-content v7-anim">
            <h3>О компании</h3>
            <p className="v7-big-text">Мы — команда профессионалов, которая уже более 12 лет создаёт комфортные и надёжные загородные дома.</p>
            <p className="v7-sub-text">Каждый проект — это индивидуальный подход, современные технологии и внимание к каждой детали. От фундамента до последнего штриха в интерьере.</p>
          </div>
        )}
        {section === 1 && (
          <div className="v7-content v7-anim">
            <h3>Наш путь</h3>
            <div className="v7-timeline">
              {experience.map((e, i) => (
                <div key={i} className="v7-tl-item" style={{ '--i': i } as React.CSSProperties}>
                  <span className="v7-tl-year">{e.year}</span>
                  <div className="v7-tl-dot" />
                  <div>
                    <strong>{e.title}</strong>
                    <p>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {section === 2 && (
          <div className="v7-content v7-anim">
            <h3>Почему мы</h3>
            <div className="v7-qual-list">
              {qualities.map((q, i) => (
                <div key={i} className="v7-qual-item" style={{ '--i': i } as React.CSSProperties}>
                  <QualityIcon type={q.icon} />
                  <div>
                    <strong>{q.title}</strong>
                    <p>{q.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {section === 3 && (
          <div className="v7-content v7-anim">
            <h3>Команда</h3>
            <div className="v7-team-grid">
              {team.map((m, i) => (
                <div key={i} className="v7-tm-card" style={{ '--i': i } as React.CSSProperties}>
                  <div className="v7-tm-av">{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ====================================================================
   VARIANT 8 — Mega Bento Grid (all info visible at once in a grid)
   ==================================================================== */
function Variant8() {
  return (
    <div className="about-v8">
      {/* Hero cell */}
      <div className="v8-cell v8-hero">
        <span className="v8-label">О компании</span>
        <h2>Родные Края</h2>
        <p>Строим дома, в которых хочется жить</p>
      </div>

      {/* Stats cells */}
      {stats.map((s, i) => (
        <div key={i} className={`v8-cell v8-stat v8-stat-${i + 1}`}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}

      {/* Experience cell */}
      <div className="v8-cell v8-exp">
        <h4>Наш путь</h4>
        <div className="v8-exp-list">
          {experience.map((e, i) => (
            <div key={i} className="v8-exp-item">
              <span className="v8-exp-yr">{e.year}</span>
              <span>{e.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Qualities cell */}
      <div className="v8-cell v8-qual">
        <h4>Наши качества</h4>
        <div className="v8-qual-wrap">
          {qualities.map((q, i) => (
            <div key={i} className="v8-qual-chip">
              <QualityIcon type={q.icon} />
              <span>{q.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team cell */}
      <div className="v8-cell v8-team">
        <h4>Команда</h4>
        <div className="v8-team-list">
          {team.map((m, i) => (
            <div key={i} className="v8-tm">
              <div className="v8-tm-av">{m.name.split(' ').map(n => n[0]).join('')}</div>
              <div>
                <strong>{m.name}</strong>
                <small>{m.role}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact cell */}
      <div className="v8-cell v8-contact">
        <strong>Связаться</strong>
        <a href="tel:+79991234567">+7 (999) 123-45-67</a>
        <span>info@housecard.ru</span>
      </div>
    </div>
  )
}

/* ====================================================================
   VARIANT 9 — Horizontal Scroll Cinematic (sections scroll sideways)
   ==================================================================== */
function Variant9() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="about-v9">
      <div className="v9-track" ref={scrollRef}>
        {/* Slide 1: Hero */}
        <div className="v9-slide v9-slide-hero">
          <div className="v9-slide-inner">
            <span className="v9-chip">О компании</span>
            <h2>Родные Края</h2>
            <p>Строим дома, в которых хочется жить. Более 12 лет опыта в загородном строительстве.</p>
            <div className="v9-hero-stats">
              {stats.map((s, i) => (
                <div key={i} className="v9-hero-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 2: Experience */}
        <div className="v9-slide v9-slide-exp">
          <div className="v9-slide-inner">
            <span className="v9-chip">Наш опыт</span>
            <div className="v9-exp-cols">
              {experience.map((e, i) => (
                <div key={i} className="v9-exp-item">
                  <div className="v9-exp-yr">{e.year}</div>
                  <strong>{e.title}</strong>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 3: Qualities */}
        <div className="v9-slide v9-slide-qual">
          <div className="v9-slide-inner">
            <span className="v9-chip">Наши качества</span>
            <div className="v9-qual-grid">
              {qualities.map((q, i) => (
                <div key={i} className="v9-qual-card">
                  <QualityIcon type={q.icon} />
                  <strong>{q.title}</strong>
                  <p>{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 4: Team */}
        <div className="v9-slide v9-slide-team">
          <div className="v9-slide-inner">
            <span className="v9-chip">Наша команда</span>
            <div className="v9-team-grid">
              {team.map((m, i) => (
                <div key={i} className="v9-tm-card">
                  <div className="v9-tm-av">{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                  <small>{m.exp}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="v9-hint">← Скролль горизонтально →</div>
    </div>
  )
}

/* ====================================================================
   VARIANT 10 — Dark Cinema with floating cards
   Dark background, floating glass cards for each section
   ==================================================================== */
function Variant10() {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="about-v10">
      <div className="v10-bg-lines" />
      <div className="v10-header">
        <h2>Родные Края</h2>
        <p>Строим дома, в которых хочется жить</p>
      </div>

      <div className="v10-cards">
        {/* Stats card */}
        <div className={`v10-card v10-card-stats ${hover === 0 ? 'v10-hover' : ''}`}
          onMouseEnter={() => setHover(0)} onMouseLeave={() => setHover(null)}>
          <h4>Цифры</h4>
          <div className="v10-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="v10-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience card */}
        <div className={`v10-card v10-card-exp ${hover === 1 ? 'v10-hover' : ''}`}
          onMouseEnter={() => setHover(1)} onMouseLeave={() => setHover(null)}>
          <h4>Опыт</h4>
          <div className="v10-exp-list">
            {experience.slice(0, 4).map((e, i) => (
              <div key={i} className="v10-exp-row">
                <span className="v10-yr">{e.year}</span>
                <span>{e.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Qualities card */}
        <div className={`v10-card v10-card-qual ${hover === 2 ? 'v10-hover' : ''}`}
          onMouseEnter={() => setHover(2)} onMouseLeave={() => setHover(null)}>
          <h4>Качества</h4>
          <div className="v10-qual-tags">
            {qualities.map((q, i) => (
              <span key={i} className="v10-tag">
                <QualityIcon type={q.icon} />
                {q.title}
              </span>
            ))}
          </div>
        </div>

        {/* Team card */}
        <div className={`v10-card v10-card-team ${hover === 3 ? 'v10-hover' : ''}`}
          onMouseEnter={() => setHover(3)} onMouseLeave={() => setHover(null)}>
          <h4>Команда</h4>
          <div className="v10-team-list">
            {team.map((m, i) => (
              <div key={i} className="v10-tm">
                <div className="v10-tm-av">{m.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <strong>{m.name}</strong>
                  <small>{m.role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   MAIN DEMO PAGE
   ==================================================================== */
const variants = [
  { id: 1, name: 'Табы + Морфинг', desc: 'Горизонтальные табы с плавной сменой контента' },
  { id: 2, name: 'Сторителлинг', desc: 'Вертикальный скролл — все блоки на одной странице' },
  { id: 3, name: 'Карточки-слайды', desc: 'Пошаговая навигация с анимацией карточек' },
  { id: 4, name: 'Журнальная вёрстка', desc: 'Editorial layout с нумерацией секций и бенто-сеткой' },
  { id: 5, name: 'Glass Morphism', desc: 'Стеклянная карточка с 3D-тилтом и навигацией' },
  { id: 6, name: 'Аккордеон', desc: 'Раскрывающиеся панели с каскадной анимацией' },
  { id: 7, name: 'Split Screen', desc: 'Левая навигация + правая зона контента' },
  { id: 8, name: 'Mega Bento', desc: 'Всё в одной бенто-сетке без переключения' },
  { id: 9, name: 'Горизонтальный скролл', desc: 'Кинематографичные слайды, скролл вбок' },
  { id: 10, name: 'Тёмное кино', desc: 'Тёмный фон с парящими glass-карточками' },
]

export default function AboutDemoV1() {
  const [active, setActive] = useState(1)

  return (
    <div className="about-demo-page">
      <nav className="about-demo-nav">
        <Link to="/constructor-v1" className="about-demo-back">← Назад</Link>
        <h1>Секция «О нас» — Варианты</h1>
      </nav>

      <div className="about-demo-tabs">
        {variants.map(v => (
          <button
            key={v.id}
            className={`about-demo-tab ${active === v.id ? 'active' : ''}`}
            onClick={() => setActive(v.id)}
          >
            <span className="about-demo-tab-num">{v.id}</span>
            <span className="about-demo-tab-name">{v.name}</span>
            <span className="about-demo-tab-desc">{v.desc}</span>
          </button>
        ))}
      </div>

      <div className="about-demo-preview">
        {active === 1 && <Variant1 />}
        {active === 2 && <Variant2 />}
        {active === 3 && <Variant3 />}
        {active === 4 && <Variant4 />}
        {active === 5 && <Variant5 />}
        {active === 6 && <Variant6 />}
        {active === 7 && <Variant7 />}
        {active === 8 && <Variant8 />}
        {active === 9 && <Variant9 />}
        {active === 10 && <Variant10 />}
      </div>
    </div>
  )
}
