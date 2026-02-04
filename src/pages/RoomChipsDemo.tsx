import { useState } from 'react'
import './RoomChipsDemo.css'

const rooms = [
  { name: 'Прихожая', area: 10.87 },
  { name: 'Коридор', area: 9.12 },
  { name: 'Кухня-гостиная', area: 43.6 },
  { name: 'Спальня', area: 13.83 },
  { name: 'Гардероб', area: 6.08 },
  { name: 'Спальня', area: 16.72 },
  { name: 'Ванная', area: 8.47 },
  { name: 'Терраса', area: 26.27 },
]

export default function RoomChipsDemo() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null)

  return (
    <div className="demo-page">
      <h1>Варианты кнопок для списка комнат</h1>

      {/* Variant 1: Minimal Line */}
      <section className="demo-section">
        <h2>1. Минималистичные с линией</h2>
        <div className="chips-variant variant-1">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v1 ${activeRoom === `v1-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v1-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 2: Gradient Cards */}
      <section className="demo-section">
        <h2>2. Карточки с градиентом</h2>
        <div className="chips-variant variant-2">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v2 ${activeRoom === `v2-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v2-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 3: Glass Morphism */}
      <section className="demo-section dark">
        <h2>3. Стеклянный эффект (Glass)</h2>
        <div className="chips-variant variant-3">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v3 ${activeRoom === `v3-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v3-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 4: Outlined with Icon */}
      <section className="demo-section">
        <h2>4. Контурные с иконкой</h2>
        <div className="chips-variant variant-4">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v4 ${activeRoom === `v4-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v4-${i}`)}
            >
              <span className="chip-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
              </span>
              <span className="chip-content">
                <span className="chip-name">{room.name}</span>
                <span className="chip-area">{room.area} м²</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 5: Pill Tags */}
      <section className="demo-section">
        <h2>5. Пилюли (Tags)</h2>
        <div className="chips-variant variant-5">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v5 ${activeRoom === `v5-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v5-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-badge">{room.area}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 6: Modern Flat */}
      <section className="demo-section">
        <h2>6. Современный плоский</h2>
        <div className="chips-variant variant-6">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v6 ${activeRoom === `v6-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v6-${i}`)}
            >
              <span className="chip-dot" />
              <span className="chip-name">{room.name}</span>
              <span className="chip-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 7: Elegant Underline */}
      <section className="demo-section">
        <h2>7. Элегантный с подчёркиванием</h2>
        <div className="chips-variant variant-7">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v7 ${activeRoom === `v7-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v7-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-divider">—</span>
              <span className="chip-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 8: Neumorphism */}
      <section className="demo-section neu-bg">
        <h2>8. Неоморфизм</h2>
        <div className="chips-variant variant-8">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v8 ${activeRoom === `v8-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v8-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 9: Compact Row */}
      <section className="demo-section">
        <h2>9. Компактный список</h2>
        <div className="chips-variant variant-9">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v9 ${activeRoom === `v9-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v9-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-area">{room.area} м²</span>
              <span className="chip-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* Variant 10: Green Theme (Original) */}
      <section className="demo-section">
        <h2>10. Зелёная тема (оригинал)</h2>
        <div className="chips-variant variant-10">
          {rooms.map((room, i) => (
            <button
              key={i}
              className={`chip-v10 ${activeRoom === `v10-${i}` ? 'active' : ''}`}
              onClick={() => setActiveRoom(`v10-${i}`)}
            >
              <span className="chip-name">{room.name}</span>
              <span className="chip-divider">·</span>
              <span className="chip-area">{room.area} м²</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  )
}
