import { useState, useEffect, useCallback, useRef } from 'react'
import './FloorPlanDemo.css'

// ─── Room positions (% based, relative to the plan container) ───
// These approximate room center points on the floor-plan SVG.
const roomPositions = [
  { id: 'hallway',        name: 'Прихожая',          x: 50, y: 18, w: 18, h: 14 },
  { id: 'living-room',    name: 'Кухня-гостиная',    x: 30, y: 50, w: 36, h: 30 },
  { id: 'bedroom-parents',name: 'Спальня родителей',  x: 75, y: 30, w: 22, h: 20 },
  { id: 'bedroom-left',   name: 'Спальня',            x: 18, y: 80, w: 20, h: 18 },
  { id: 'bedroom-right',  name: 'Детская',            x: 75, y: 75, w: 20, h: 18 },
  { id: 'bathroom',       name: 'Ванная',             x: 50, y: 80, w: 16, h: 14 },
]

// SVG floor plan rendered as an <object> tag
function FloorPlanSVG() {
  return (
    <object
      type="image/svg+xml"
      data="/floor-plan.svg"
      aria-label="План дома"
    >
      План дома
    </object>
  )
}

// Eye icon SVG used in Variant 6
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   VARIANT 1 — Pulsing Dots
   ═══════════════════════════════════════════════════════════════════ */
function Variant1() {
  return (
    <div className="fpc-plan-container">
      <FloorPlanSVG />
      <div className="fpc-v1-dots">
        {roomPositions.map((room) => (
          <div
            key={room.id}
            className="fpc-v1-dot"
            style={{ left: `${room.x}%`, top: `${room.y}%` }}
          >
            <span className="fpc-v1-dot-label">{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   VARIANT 2 — Highlight on load (wave)
   ═══════════════════════════════════════════════════════════════════ */
function Variant2() {
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const [done, setDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runAnimation = useCallback(() => {
    setDone(false)
    setHighlightIdx(-1)
    let i = 0
    const next = () => {
      if (i < roomPositions.length) {
        setHighlightIdx(i)
        i++
        timerRef.current = setTimeout(next, 500)
      } else {
        setHighlightIdx(-1)
        setDone(true)
      }
    }
    timerRef.current = setTimeout(next, 400)
  }, [])

  useEffect(() => {
    runAnimation()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [runAnimation])

  return (
    <div className="fpc-plan-container">
      <FloorPlanSVG />
      <div className="fpc-v2-overlays">
        {roomPositions.map((room, idx) => (
          <div
            key={room.id}
            className={`fpc-v2-room-overlay ${
              highlightIdx === idx ? 'fpc-v2-highlight' : ''
            } ${done ? 'fpc-v2-done' : ''}`}
            style={{
              left: `${room.x - room.w / 2}%`,
              top: `${room.y - room.h / 2}%`,
              width: `${room.w}%`,
              height: `${room.h}%`,
            }}
          >
            <span className="fpc-v2-label">{room.name}</span>
          </div>
        ))}
      </div>
      <button className="fpc-v2-replay" onClick={runAnimation}>
        Повторить
      </button>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   VARIANT 3 — Finger + tap animation
   ═══════════════════════════════════════════════════════════════════ */
function Variant3() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isTapping, setIsTapping] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null)
  const rippleKey = useRef(0)

  useEffect(() => {
    let moveTimeout: ReturnType<typeof setTimeout>
    let tapTimeout: ReturnType<typeof setTimeout>
    let rippleTimeout: ReturnType<typeof setTimeout>
    let nextTimeout: ReturnType<typeof setTimeout>

    const cycle = () => {
      // Wait for finger to arrive, then tap
      moveTimeout = setTimeout(() => {
        setIsTapping(true)
        const room = roomPositions[currentIdx]
        rippleKey.current++
        setRipple({ x: room.x, y: room.y, key: rippleKey.current })

        tapTimeout = setTimeout(() => {
          setIsTapping(false)
        }, 400)

        rippleTimeout = setTimeout(() => {
          setRipple(null)
        }, 900)

        nextTimeout = setTimeout(() => {
          setCurrentIdx((prev) => (prev + 1) % roomPositions.length)
        }, 2000)
      }, 1400)
    }

    cycle()

    return () => {
      clearTimeout(moveTimeout)
      clearTimeout(tapTimeout)
      clearTimeout(rippleTimeout)
      clearTimeout(nextTimeout)
    }
  }, [currentIdx])

  const room = roomPositions[currentIdx]

  return (
    <div className="fpc-plan-container">
      <FloorPlanSVG />
      <div className="fpc-v3-finger-layer">
        <div
          className={`fpc-v3-finger ${isTapping ? 'fpc-v3-tapping' : ''}`}
          style={{ left: `${room.x}%`, top: `${room.y}%` }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M18 4a2 2 0 0 0-4 0v12l-3.4-3.4a2 2 0 0 0-2.83 2.83L15 22.66V28h8l3-8V10a2 2 0 0 0-4 0V8a2 2 0 0 0-4 0V4z" fill="#1a2e22" stroke="#f5f2ed" strokeWidth="1"/>
          </svg>
        </div>
        {ripple && (
          <div
            key={ripple.key}
            className="fpc-v3-ripple fpc-v3-ripple-active"
            style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
          />
        )}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   VARIANT 4 — Dashed room borders
   ═══════════════════════════════════════════════════════════════════ */
function Variant4() {
  return (
    <div className="fpc-plan-container">
      <FloorPlanSVG />
      <div className="fpc-v4-borders">
        {roomPositions.map((room) => (
          <div
            key={room.id}
            className="fpc-v4-border-zone"
            style={{
              left: `${room.x - room.w / 2}%`,
              top: `${room.y - room.h / 2}%`,
              width: `${room.w}%`,
              height: `${room.h}%`,
            }}
          >
            <span className="fpc-v4-room-tag">{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   VARIANT 5 — Floating tooltip
   ═══════════════════════════════════════════════════════════════════ */
function Variant5() {
  const [tooltipIdx, setTooltipIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTooltipIdx((prev) => (prev + 1) % roomPositions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const room = roomPositions[tooltipIdx]

  return (
    <div className="fpc-plan-container">
      <FloorPlanSVG />
      <div className="fpc-v5-tooltip-layer">
        <div
          className="fpc-v5-tooltip"
          style={{ left: `${room.x}%`, top: `${room.y - room.h / 2 - 8}%` }}
        >
          Нажмите на комнату
          <span className="fpc-v5-tooltip-room">{room.name}</span>
        </div>
        <div
          className="fpc-v5-target-ring"
          style={{ left: `${room.x}%`, top: `${room.y}%` }}
        />
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   VARIANT 6 — Eye icons in rooms
   ═══════════════════════════════════════════════════════════════════ */
function Variant6() {
  const [hiddenRooms, setHiddenRooms] = useState<Set<string>>(new Set())

  const handleClick = (roomId: string) => {
    setHiddenRooms((prev) => {
      const next = new Set(prev)
      next.add(roomId)
      return next
    })
  }

  return (
    <div className="fpc-plan-container">
      <FloorPlanSVG />
      <div className="fpc-v6-icons-layer">
        {roomPositions.map((room) => (
          <div
            key={room.id}
            className={`fpc-v6-icon-wrapper ${hiddenRooms.has(room.id) ? 'fpc-v6-hidden' : ''}`}
            style={{ left: `${room.x}%`, top: `${room.y}%` }}
            onClick={() => handleClick(room.id)}
          >
            <div className="fpc-v6-icon-circle">
              <EyeIcon />
            </div>
            <span className="fpc-v6-icon-label">{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */

interface VariantInfo {
  id: number
  title: string
  subtitle: string
  Component: React.FC
}

const variants: VariantInfo[] = [
  {
    id: 1,
    title: 'Пульсирующие точки',
    subtitle: 'Цветные точки с мягкой анимацией пульсации',
    Component: Variant1,
  },
  {
    id: 2,
    title: 'Подсветка при загрузке',
    subtitle: 'Комнаты подсвечиваются волной при загрузке',
    Component: Variant2,
  },
  {
    id: 3,
    title: 'Палец + анимация тапа',
    subtitle: 'Анимированный палец нажимает на комнаты',
    Component: Variant3,
  },
  {
    id: 4,
    title: 'Границы комнат',
    subtitle: 'Пунктирные границы с мягким свечением',
    Component: Variant4,
  },
  {
    id: 5,
    title: 'Всплывающая подсказка',
    subtitle: 'Подсказка перемещается между комнатами',
    Component: Variant5,
  },
  {
    id: 6,
    title: 'Иконки в комнатах',
    subtitle: 'Иконки-глаза исчезают после первого клика',
    Component: Variant6,
  },
]

export default function FloorPlanDemo() {
  return (
    <div className="fpc-page">
      <div className="fpc-header">
        <h1>Индикация кликабельности комнат</h1>
        <p>6 вариантов для интерактивной планировки дома</p>
      </div>

      <div className="fpc-grid">
        {variants.map(({ id, title, subtitle, Component }) => (
          <div key={id} className="fpc-card">
            <div className="fpc-card-header">
              <div className="fpc-card-number">{id}</div>
              <div>
                <div className="fpc-card-title">{title}</div>
                <div className="fpc-card-subtitle">{subtitle}</div>
              </div>
            </div>
            <Component />
          </div>
        ))}
      </div>
    </div>
  )
}
