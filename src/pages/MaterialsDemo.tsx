import { useState } from 'react'
import { Link } from 'react-router-dom'
import './MaterialsDemo.css'

const variants = [
  { n: 1, label: 'Кинолента' },
  { n: 2, label: 'Журнальный разворот' },
  { n: 3, label: 'Тёмный премиум' },
  { n: 4, label: 'Карусель карточек' },
  { n: 5, label: 'Цитата + акцент' },
  { n: 6, label: 'Timeline-лента' },
]

const articleText = {
  title: '7 схем как подрядчики обманывают своих клиентов',
  p1: 'Притча на самом деле старая как мир и не сказал бы, что прямо отрываю от сердца какие-то секреты. Но, маркетинг в наше время штука злобная...',
  p2: 'Делимся базовыми вещами, о том на что следует обращать внимание во время строительства. И попросту не быть простофилей, если уж вы всё таки набрались сил и решили зайти к строителям с улицы.',
  p3: 'Чуть ниже также прикреплён файлик с тезисами из видео. И будет у вас ещё одна шпаргалочка.',
  p4: 'Хорошо когда обращаются подготовленные заказчики, с вами всегда приятно работать.',
  cta: 'Хотите, мы разберём ваш проект? Просто напишите в ЛС или комментариях: РАЗБОР — и мы свяжемся.',
}

/* ─── Variant 1: Кинолента ─── */
function V1() {
  return (
    <section className="md-v1">
      <div className="md-v1-film-strip" />
      <div className="md-v1-content">
        <div className="md-v1-badge">Полезные материалы</div>
        <h2>{articleText.title}</h2>
        <div className="md-v1-text">
          <p>{articleText.p1}</p>
          <p>{articleText.p2}</p>
          <p>{articleText.p4}</p>
        </div>
        <div className="md-v1-actions">
          <a href="#" className="md-v1-play-btn">
            <span className="md-v1-play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
            Смотреть на YouTube
          </a>
          <a href="#" className="md-v1-play-btn secondary">
            <span className="md-v1-play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
            Смотреть на Дзен
          </a>
        </div>
        <div className="md-v1-cta">
          <p>{articleText.cta}</p>
          <a href="#" className="md-v1-tg-btn">Написать в Telegram</a>
        </div>
      </div>
      <div className="md-v1-film-strip bottom" />
    </section>
  )
}

/* ─── Variant 2: Журнальный разворот ─── */
function V2() {
  return (
    <section className="md-v2">
      <div className="md-v2-spread">
        <div className="md-v2-left">
          <span className="md-v2-issue">Выпуск #01</span>
          <h2>{articleText.title}</h2>
          <div className="md-v2-divider" />
          <p className="md-v2-lead">{articleText.p1}</p>
        </div>
        <div className="md-v2-right">
          <div className="md-v2-body">
            <p>{articleText.p2}</p>
            <p>{articleText.p3}</p>
            <p>{articleText.p4}</p>
          </div>
          <div className="md-v2-links">
            <a href="#" className="md-v2-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              YouTube
            </a>
            <a href="#" className="md-v2-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Дзен
            </a>
            <a href="#" className="md-v2-link tg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Telegram
            </a>
          </div>
          <div className="md-v2-cta-box">
            <p>{articleText.cta}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Variant 3: Тёмный премиум ─── */
function V3() {
  return (
    <section className="md-v3">
      <div className="md-v3-glow" />
      <div className="md-v3-content">
        <span className="md-v3-label">Полезные материалы</span>
        <h2>{articleText.title}</h2>
        <div className="md-v3-grid">
          <div className="md-v3-text-col">
            <p>{articleText.p1}</p>
            <p>{articleText.p2}</p>
            <p>{articleText.p4}</p>
          </div>
          <div className="md-v3-action-col">
            <a href="#" className="md-v3-btn">
              <div className="md-v3-btn-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div>
                <strong>YouTube</strong>
                <span>Смотреть видео</span>
              </div>
            </a>
            <a href="#" className="md-v3-btn">
              <div className="md-v3-btn-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div>
                <strong>Дзен</strong>
                <span>Смотреть видео</span>
              </div>
            </a>
            <a href="#" className="md-v3-btn tg">
              <div className="md-v3-btn-icon tg">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div>
                <strong>Telegram</strong>
                <span>Написать РАЗБОР</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Variant 4: Карусель карточек ─── */
function V4() {
  return (
    <section className="md-v4">
      <div className="md-v4-header">
        <h2>Полезные материалы</h2>
        <p>Делимся опытом и помогаем разобраться в строительстве</p>
      </div>
      <div className="md-v4-cards">
        <div className="md-v4-card main">
          <div className="md-v4-card-badge">Видео</div>
          <h3>{articleText.title}</h3>
          <p>{articleText.p1}</p>
          <p>{articleText.p2}</p>
          <div className="md-v4-card-links">
            <a href="#" className="md-v4-card-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              YouTube
            </a>
            <a href="#" className="md-v4-card-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Дзен
            </a>
          </div>
        </div>
        <div className="md-v4-card accent">
          <div className="md-v4-card-badge">Шпаргалка</div>
          <h3>Тезисы из видео</h3>
          <p>{articleText.p3}</p>
          <p>{articleText.p4}</p>
        </div>
        <div className="md-v4-card cta">
          <div className="md-v4-card-emoji">💬</div>
          <h3>Разбор проекта</h3>
          <p>{articleText.cta}</p>
          <a href="#" className="md-v4-card-tg">Написать в Telegram</a>
        </div>
      </div>
    </section>
  )
}

/* ─── Variant 5: Цитата + акцент ─── */
function V5() {
  return (
    <section className="md-v5">
      <div className="md-v5-content">
        <div className="md-v5-quote-block">
          <div className="md-v5-quote-mark">"</div>
          <blockquote>Хорошо когда обращаются подготовленные заказчики, с вами всегда приятно работать</blockquote>
        </div>
        <div className="md-v5-main">
          <span className="md-v5-tag">Полезные материалы</span>
          <h2>{articleText.title}</h2>
          <p>{articleText.p1}</p>
          <p>{articleText.p2}</p>
          <p>{articleText.p3}</p>
          <div className="md-v5-buttons">
            <a href="#" className="md-v5-btn yt">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Смотреть на YouTube
            </a>
            <a href="#" className="md-v5-btn dzen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Смотреть на Дзен
            </a>
          </div>
        </div>
        <div className="md-v5-cta-strip">
          <p>{articleText.cta}</p>
          <a href="#" className="md-v5-tg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Variant 6: Timeline-лента ─── */
function V6() {
  return (
    <section className="md-v6">
      <div className="md-v6-header">
        <h2>Полезные материалы</h2>
      </div>
      <div className="md-v6-timeline">
        <div className="md-v6-line" />
        <div className="md-v6-item">
          <div className="md-v6-dot" />
          <div className="md-v6-card">
            <span className="md-v6-step">01</span>
            <h3>{articleText.title}</h3>
            <p>{articleText.p1}</p>
            <p>{articleText.p2}</p>
          </div>
        </div>
        <div className="md-v6-item right">
          <div className="md-v6-dot" />
          <div className="md-v6-card">
            <span className="md-v6-step">02</span>
            <h3>Шпаргалка для заказчика</h3>
            <p>{articleText.p3}</p>
            <p>{articleText.p4}</p>
            <div className="md-v6-links">
              <a href="#" className="md-v6-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                YouTube
              </a>
              <a href="#" className="md-v6-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Дзен
              </a>
            </div>
          </div>
        </div>
        <div className="md-v6-item">
          <div className="md-v6-dot pulse" />
          <div className="md-v6-card cta">
            <span className="md-v6-step">03</span>
            <h3>Разбор вашего проекта</h3>
            <p>{articleText.cta}</p>
            <a href="#" className="md-v6-tg">Написать в Telegram</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const variantComponents = [V1, V2, V3, V4, V5, V6]

export function MaterialsDemo() {
  const [active, setActive] = useState(0)
  const Component = variantComponents[active]

  return (
    <div className="md-demo-page">
      <div className="md-demo-nav">
        <Link to="/v1" className="md-demo-back">← Назад</Link>
        <div className="md-demo-tabs">
          {variants.map((v, i) => (
            <button
              key={i}
              className={`md-demo-tab ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {v.n}. {v.label}
            </button>
          ))}
        </div>
      </div>
      <Component />
    </div>
  )
}
