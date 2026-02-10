import { useState } from 'react'
import { Link } from 'react-router-dom'
import './DimensionsDemo.css'

const variants = [
  { n: 1, label: 'Карточка с иконкой' },
  { n: 2, label: 'В ряд со статами' },
  { n: 3, label: 'Чертёжные линии' },
  { n: 4, label: 'Pill-бейдж' },
  { n: 5, label: 'Акцент слева' },
  { n: 6, label: 'Крупные цифры' },
  { n: 7, label: 'Минималистичный' },
  { n: 8, label: 'Тёмная плашка' },
]

function Stats() {
  return (
    <div className="dd-stats">
      <div className="dd-stat">
        <span className="dd-stat-val">240</span>
        <span className="dd-stat-lbl">м² общая</span>
      </div>
      <div className="dd-stat">
        <span className="dd-stat-val">14</span>
        <span className="dd-stat-lbl">помещений</span>
      </div>
      <div className="dd-stat">
        <span className="dd-stat-val">1</span>
        <span className="dd-stat-lbl">этаж</span>
      </div>
    </div>
  )
}

function RulerIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={size} height={size} strokeLinecap="round">
      <path d="M21 3H3v18h18V3zM3 9h4M3 15h4M9 21v-4M15 21v-4" />
    </svg>
  )
}

export function DimensionsDemo() {
  const [active, setActive] = useState(1)

  return (
    <div className="dd-page">
      <nav className="dd-nav">
        <Link to="/constructor-v1" className="dd-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <h1>Габариты дома — варианты</h1>
      </nav>

      <div className="dd-tabs">
        {variants.map(t => (
          <button
            key={t.n}
            className={`dd-tab ${active === t.n ? 'active' : ''}`}
            onClick={() => setActive(t.n)}
          >
            <span className="dd-tab-num">{t.n}</span>
            <span className="dd-tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="dd-preview">
        <div className="dd-context">
          {/* V1: Карточка с иконкой */}
          {active === 1 && (
            <div className="dd-left">
              <div className="dd-dim dd-dim-v1">
                <svg className="dd-dim-v1-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" strokeLinecap="round">
                  <path d="M21 3H3v18h18V3zM3 9h4M3 15h4M9 21v-4M15 21v-4" />
                </svg>
                <div className="dd-dim-v1-text">
                  <span className="dd-dim-v1-label">Габариты</span>
                  <span className="dd-dim-v1-value">16.5 × 12.8 <span>м</span></span>
                </div>
              </div>
              <Stats />
            </div>
          )}

          {/* V2: В ряд со статами (4й элемент) */}
          {active === 2 && (
            <div className="dd-left">
              <div className="dd-stats dd-stats-v2">
                <div className="dd-stat">
                  <span className="dd-stat-val">240</span>
                  <span className="dd-stat-lbl">м² общая</span>
                </div>
                <div className="dd-stat">
                  <span className="dd-stat-val">14</span>
                  <span className="dd-stat-lbl">помещений</span>
                </div>
                <div className="dd-stat">
                  <span className="dd-stat-val">1</span>
                  <span className="dd-stat-lbl">этаж</span>
                </div>
                <div className="dd-stat dd-stat-dim">
                  <span className="dd-stat-val">16.5×12.8</span>
                  <span className="dd-stat-lbl">габариты, м</span>
                </div>
              </div>
            </div>
          )}

          {/* V3: Чертёжные линии */}
          {active === 3 && (
            <div className="dd-left">
              <div className="dd-dim dd-dim-v3">
                <div className="dd-dim-v3-row">
                  <div className="dd-dim-v3-line" />
                  <span className="dd-dim-v3-val">16.5 м</span>
                  <div className="dd-dim-v3-line" />
                </div>
                <div className="dd-dim-v3-cross">×</div>
                <div className="dd-dim-v3-row">
                  <div className="dd-dim-v3-line" />
                  <span className="dd-dim-v3-val">12.8 м</span>
                  <div className="dd-dim-v3-line" />
                </div>
                <span className="dd-dim-v3-label">Общие габариты дома</span>
              </div>
              <Stats />
            </div>
          )}

          {/* V4: Pill-бейдж */}
          {active === 4 && (
            <div className="dd-left">
              <div className="dd-dim dd-dim-v4">
                <RulerIcon size={14} />
                <span>16.5 × 12.8 м</span>
              </div>
              <Stats />
            </div>
          )}

          {/* V5: Акцент слева */}
          {active === 5 && (
            <div className="dd-left">
              <div className="dd-dim dd-dim-v5">
                <div className="dd-dim-v5-accent" />
                <div className="dd-dim-v5-body">
                  <span className="dd-dim-v5-label">Общие габариты</span>
                  <span className="dd-dim-v5-value">16.5 × 12.8 м</span>
                </div>
              </div>
              <Stats />
            </div>
          )}

          {/* V6: Крупные цифры */}
          {active === 6 && (
            <div className="dd-left">
              <div className="dd-dim dd-dim-v6">
                <div className="dd-dim-v6-pair">
                  <span className="dd-dim-v6-num">16.5</span>
                  <span className="dd-dim-v6-unit">м</span>
                </div>
                <span className="dd-dim-v6-x">×</span>
                <div className="dd-dim-v6-pair">
                  <span className="dd-dim-v6-num">12.8</span>
                  <span className="dd-dim-v6-unit">м</span>
                </div>
                <span className="dd-dim-v6-label">габариты</span>
              </div>
              <Stats />
            </div>
          )}

          {/* V7: Минималистичный */}
          {active === 7 && (
            <div className="dd-left">
              <div className="dd-dim dd-dim-v7">
                <span className="dd-dim-v7-label">Габариты дома</span>
                <span className="dd-dim-v7-value">16.5 × 12.8 м</span>
              </div>
              <Stats />
            </div>
          )}

          {/* V8: Тёмная плашка */}
          {active === 8 && (
            <div className="dd-left">
              <div className="dd-dim dd-dim-v8">
                <div className="dd-dim-v8-top">
                  <RulerIcon size={16} />
                  <span className="dd-dim-v8-label">Габариты</span>
                </div>
                <div className="dd-dim-v8-nums">
                  <span className="dd-dim-v8-val">16.5</span>
                  <span className="dd-dim-v8-x">×</span>
                  <span className="dd-dim-v8-val">12.8</span>
                  <span className="dd-dim-v8-unit">м</span>
                </div>
              </div>
              <Stats />
            </div>
          )}

          <div className="dd-right">
            <div className="dd-plan-placeholder">
              <img src="/plan.svg" alt="Floor Plan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DimensionsDemo
