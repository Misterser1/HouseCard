import { useState } from 'react'
import './RoomButtonsDemo.css'

const rooms = [
  { name: 'Прихожая', area: 10.87 },
  { name: 'Коридор', area: 9.12 },
  { name: 'Кухня-гостиная', area: 43.6 },
  { name: 'Спальня', area: 13.83 },
  { name: 'Гардероб', area: 6.08 },
  { name: 'Спальня', area: 16.72 },
  { name: 'Спальня', area: 11.88 },
  { name: 'Ванная', area: 8.47 },
  { name: 'С/У', area: 4.63 },
  { name: 'Котельная', area: 6.92 },
  { name: 'Кладовая', area: 8.07 },
  { name: 'Терраса', area: 26.27 },
  { name: 'Крыльцо', area: 4.5 },
  { name: 'Кухня', area: 12.04 },
]

export function RoomButtonsDemo() {
  const [activeRoom, setActiveRoom] = useState<number | null>(null)

  return (
    <div className="room-buttons-demo">
      <h1>Варианты кнопок комнат</h1>

      {/* Вариант 1: Минималистичные карточки */}
      <section className="demo-section">
        <h2>1. Минималистичные карточки</h2>
        <p className="demo-description">Чистый дизайн с акцентом на типографику</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v1">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v1 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-name">{room.name}</span>
                <span className="room-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 2: Градиентная подсветка */}
      <section className="demo-section">
        <h2>2. Градиентная подсветка</h2>
        <p className="demo-description">Плавный градиент при наведении</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v2">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v2 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-name">{room.name}</span>
                <span className="room-area">{room.area} м²</span>
                <div className="gradient-overlay" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 3: Линия слева */}
      <section className="demo-section">
        <h2>3. Акцентная линия</h2>
        <p className="demo-description">Вертикальная линия-индикатор</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v3">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v3 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <div className="line-indicator" />
                <div className="room-content">
                  <span className="room-name">{room.name}</span>
                  <span className="room-area">{room.area} м²</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 4: Числовая нумерация */}
      <section className="demo-section">
        <h2>4. С нумерацией</h2>
        <p className="demo-description">Номер комнаты как декоративный элемент</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v4">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v4 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-number">{String(idx + 1).padStart(2, '0')}</span>
                <div className="room-info">
                  <span className="room-name">{room.name}</span>
                  <span className="room-area">{room.area} м²</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 5: Иконки комнат */}
      <section className="demo-section">
        <h2>5. С иконками</h2>
        <p className="demo-description">Визуальные маркеры типа помещения</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v5">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v5 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <div className="room-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <div className="room-info">
                  <span className="room-name">{room.name}</span>
                  <span className="room-area">{room.area} м²</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 6: Тег + площадь крупно */}
      <section className="demo-section">
        <h2>6. Акцент на площади</h2>
        <p className="demo-description">Площадь как главный элемент</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v6">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v6 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-area">{room.area}</span>
                <span className="room-unit">м²</span>
                <span className="room-name">{room.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 7: Компактные чипы */}
      <section className="demo-section">
        <h2>7. Компактные чипы</h2>
        <p className="demo-description">Минимальный размер, максимальная информативность</p>
        <div className="demo-container light-bg">
          <div className="rooms-flex v7">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v7 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-name">{room.name}</span>
                <span className="room-divider">·</span>
                <span className="room-area">{room.area}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 8: Элегантные с рамкой */}
      <section className="demo-section">
        <h2>8. Элегантные с рамкой</h2>
        <p className="demo-description">Утонченный стиль с двойной рамкой</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v8">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v8 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <div className="inner-frame">
                  <span className="room-name">{room.name}</span>
                  <span className="room-area">{room.area} м²</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 9: Hover-анимация слайд */}
      <section className="demo-section">
        <h2>9. Анимация слайд</h2>
        <p className="demo-description">Площадь появляется при наведении</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v9">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v9 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-name">{room.name}</span>
                <span className="room-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 10: Неоморфизм */}
      <section className="demo-section">
        <h2>10. Неоморфизм</h2>
        <p className="demo-description">Мягкие тени, 3D-эффект</p>
        <div className="demo-container neu-bg">
          <div className="rooms-grid v10">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v10 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-name">{room.name}</span>
                <span className="room-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 11: Строгий корпоративный */}
      <section className="demo-section">
        <h2>11. Строгий корпоративный</h2>
        <p className="demo-description">Деловой стиль с чёткими линиями</p>
        <div className="demo-container light-bg">
          <div className="rooms-list v11">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v11 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-name">{room.name}</span>
                <span className="room-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Вариант 12: Точки-маркеры */}
      <section className="demo-section">
        <h2>12. С точками-маркерами</h2>
        <p className="demo-description">Цветовые индикаторы типа помещения</p>
        <div className="demo-container light-bg">
          <div className="rooms-grid v12">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                className={`room-btn-v12 ${activeRoom === idx ? 'active' : ''}`}
                onClick={() => setActiveRoom(idx)}
              >
                <span className="room-dot" />
                <span className="room-name">{room.name}</span>
                <span className="room-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
