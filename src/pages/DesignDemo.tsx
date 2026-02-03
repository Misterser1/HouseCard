import { useState } from 'react'
import { Link } from 'react-router-dom'
import './DesignDemo.css'

export function DesignDemo() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [selectedButton, setSelectedButton] = useState<number | null>(null)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  return (
    <div className="design-demo">
      {/* Header */}
      <header className="demo-header">
        <Link to="/" className="demo-back">← Назад</Link>
        <h1>Выберите понравившийся дизайн</h1>
        <p>Кликните на элемент, чтобы выбрать его</p>
      </header>

      {/* Card Variants */}
      <section className="demo-section">
        <h2 className="demo-section-title">Карточки материалов</h2>
        <div className="demo-grid cards-grid">

          {/* Card Variant 1 - Clean White */}
          <div
            className={`demo-card-wrapper ${selectedCard === 1 ? 'selected' : ''}`}
            onClick={() => setSelectedCard(1)}
          >
            <span className="variant-label">Вариант 1: Чистый белый</span>
            <div className="card-v1">
              <div className="card-v1-badge">Популярный</div>
              <h3 className="card-v1-title">Каркасный дом</h3>
              <p className="card-v1-desc">Современная технология с отличной теплоизоляцией</p>
              <div className="card-v1-price">от 2.5 млн ₽</div>
              <button className="card-v1-btn">Выбрать</button>
              <ul className="card-v1-features">
                <li>✓ Быстрый монтаж</li>
                <li>✓ Энергоэффективность</li>
                <li>✓ Экологичность</li>
              </ul>
            </div>
          </div>

          {/* Card Variant 2 - Gradient Glass */}
          <div
            className={`demo-card-wrapper ${selectedCard === 2 ? 'selected' : ''}`}
            onClick={() => setSelectedCard(2)}
          >
            <span className="variant-label">Вариант 2: Градиент + стекло</span>
            <div className="card-v2">
              <div className="card-v2-accent"></div>
              <h3 className="card-v2-title">Каркасный дом</h3>
              <p className="card-v2-desc">Современная технология с отличной теплоизоляцией</p>
              <div className="card-v2-price">от 2.5 млн ₽</div>
              <button className="card-v2-btn">Выбрать</button>
              <ul className="card-v2-features">
                <li>Быстрый монтаж</li>
                <li>Энергоэффективность</li>
                <li>Экологичность</li>
              </ul>
            </div>
          </div>

          {/* Card Variant 3 - Dark Premium */}
          <div
            className={`demo-card-wrapper ${selectedCard === 3 ? 'selected' : ''}`}
            onClick={() => setSelectedCard(3)}
          >
            <span className="variant-label">Вариант 3: Тёмный премиум</span>
            <div className="card-v3">
              <div className="card-v3-glow"></div>
              <h3 className="card-v3-title">Каркасный дом</h3>
              <p className="card-v3-desc">Современная технология с отличной теплоизоляцией</p>
              <div className="card-v3-price">от 2.5 млн ₽</div>
              <button className="card-v3-btn">Выбрать</button>
              <ul className="card-v3-features">
                <li>Быстрый монтаж</li>
                <li>Энергоэффективность</li>
                <li>Экологичность</li>
              </ul>
            </div>
          </div>

          {/* Card Variant 4 - Minimal Outline */}
          <div
            className={`demo-card-wrapper ${selectedCard === 4 ? 'selected' : ''}`}
            onClick={() => setSelectedCard(4)}
          >
            <span className="variant-label">Вариант 4: Минимализм</span>
            <div className="card-v4">
              <h3 className="card-v4-title">Каркасный дом</h3>
              <p className="card-v4-desc">Современная технология с отличной теплоизоляцией</p>
              <div className="card-v4-divider"></div>
              <div className="card-v4-price">от 2.5 млн ₽</div>
              <button className="card-v4-btn">Выбрать →</button>
              <ul className="card-v4-features">
                <li>— Быстрый монтаж</li>
                <li>— Энергоэффективность</li>
                <li>— Экологичность</li>
              </ul>
            </div>
          </div>

          {/* Card Variant 5 - Neon Glow */}
          <div
            className={`demo-card-wrapper ${selectedCard === 5 ? 'selected' : ''}`}
            onClick={() => setSelectedCard(5)}
          >
            <span className="variant-label">Вариант 5: Неоновое свечение</span>
            <div className="card-v5">
              <h3 className="card-v5-title">Каркасный дом</h3>
              <p className="card-v5-desc">Современная технология с отличной теплоизоляцией</p>
              <div className="card-v5-price">от 2.5 млн ₽</div>
              <button className="card-v5-btn">Выбрать</button>
              <ul className="card-v5-features">
                <li>◆ Быстрый монтаж</li>
                <li>◆ Энергоэффективность</li>
                <li>◆ Экологичность</li>
              </ul>
            </div>
          </div>

          {/* Card Variant 6 - Soft Neumorphism */}
          <div
            className={`demo-card-wrapper ${selectedCard === 6 ? 'selected' : ''}`}
            onClick={() => setSelectedCard(6)}
          >
            <span className="variant-label">Вариант 6: Неоморфизм</span>
            <div className="card-v6">
              <h3 className="card-v6-title">Каркасный дом</h3>
              <p className="card-v6-desc">Современная технология с отличной теплоизоляцией</p>
              <div className="card-v6-price">от 2.5 млн ₽</div>
              <button className="card-v6-btn">Выбрать</button>
              <ul className="card-v6-features">
                <li>✓ Быстрый монтаж</li>
                <li>✓ Энергоэффективность</li>
                <li>✓ Экологичность</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Button Variants */}
      <section className="demo-section">
        <h2 className="demo-section-title">Кнопки CTA</h2>
        <div className="demo-grid buttons-grid">

          {/* Button Variant 1 */}
          <div
            className={`demo-btn-wrapper ${selectedButton === 1 ? 'selected' : ''}`}
            onClick={() => setSelectedButton(1)}
          >
            <span className="variant-label">Вариант 1: Градиент</span>
            <button className="btn-v1">
              <span>Заказать презентацию</span>
            </button>
          </div>

          {/* Button Variant 2 */}
          <div
            className={`demo-btn-wrapper ${selectedButton === 2 ? 'selected' : ''}`}
            onClick={() => setSelectedButton(2)}
          >
            <span className="variant-label">Вариант 2: Outline</span>
            <button className="btn-v2">
              <span>Заказать презентацию</span>
            </button>
          </div>

          {/* Button Variant 3 */}
          <div
            className={`demo-btn-wrapper ${selectedButton === 3 ? 'selected' : ''}`}
            onClick={() => setSelectedButton(3)}
          >
            <span className="variant-label">Вариант 3: Glass</span>
            <button className="btn-v3">
              <span>Заказать презентацию</span>
            </button>
          </div>

          {/* Button Variant 4 */}
          <div
            className={`demo-btn-wrapper ${selectedButton === 4 ? 'selected' : ''}`}
            onClick={() => setSelectedButton(4)}
          >
            <span className="variant-label">Вариант 4: Neon</span>
            <button className="btn-v4">
              <span>Заказать презентацию</span>
            </button>
          </div>

          {/* Button Variant 5 */}
          <div
            className={`demo-btn-wrapper ${selectedButton === 5 ? 'selected' : ''}`}
            onClick={() => setSelectedButton(5)}
          >
            <span className="variant-label">Вариант 5: Minimal</span>
            <button className="btn-v5">
              Заказать презентацию →
            </button>
          </div>

          {/* Button Variant 6 */}
          <div
            className={`demo-btn-wrapper ${selectedButton === 6 ? 'selected' : ''}`}
            onClick={() => setSelectedButton(6)}
          >
            <span className="variant-label">Вариант 6: 3D</span>
            <button className="btn-v6">
              <span>Заказать презентацию</span>
            </button>
          </div>

        </div>
      </section>

      {/* Info Section Variants */}
      <section className="demo-section">
        <h2 className="demo-section-title">Информационные секции</h2>
        <div className="demo-grid sections-grid">

          {/* Section Variant 1 */}
          <div
            className={`demo-section-wrapper ${selectedSection === 1 ? 'selected' : ''}`}
            onClick={() => setSelectedSection(1)}
          >
            <span className="variant-label">Вариант 1: Glass Dark</span>
            <div className="section-v1">
              <h3>Что входит в стоимость</h3>
              <div className="section-v1-content">
                <div className="section-v1-col">
                  <h4>Конструкция</h4>
                  <ul>
                    <li>Фундамент на сваях</li>
                    <li>Каркас из бруса</li>
                    <li>Утепление 200мм</li>
                  </ul>
                </div>
                <div className="section-v1-col">
                  <h4>Отделка</h4>
                  <ul>
                    <li>Фасадная отделка</li>
                    <li>Кровля металлочерепица</li>
                    <li>Водосточная система</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section Variant 2 */}
          <div
            className={`demo-section-wrapper ${selectedSection === 2 ? 'selected' : ''}`}
            onClick={() => setSelectedSection(2)}
          >
            <span className="variant-label">Вариант 2: White Cards</span>
            <div className="section-v2">
              <h3>Что входит в стоимость</h3>
              <div className="section-v2-content">
                <div className="section-v2-card">
                  <h4>Конструкция</h4>
                  <ul>
                    <li>✓ Фундамент на сваях</li>
                    <li>✓ Каркас из бруса</li>
                    <li>✓ Утепление 200мм</li>
                  </ul>
                </div>
                <div className="section-v2-card">
                  <h4>Отделка</h4>
                  <ul>
                    <li>✓ Фасадная отделка</li>
                    <li>✓ Кровля металлочерепица</li>
                    <li>✓ Водосточная система</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section Variant 3 */}
          <div
            className={`demo-section-wrapper ${selectedSection === 3 ? 'selected' : ''}`}
            onClick={() => setSelectedSection(3)}
          >
            <span className="variant-label">Вариант 3: Gradient Border</span>
            <div className="section-v3">
              <h3>Что входит в стоимость</h3>
              <div className="section-v3-content">
                <div className="section-v3-item">
                  <span className="section-v3-icon">🏗️</span>
                  <div>
                    <h4>Конструкция</h4>
                    <p>Фундамент, каркас, утепление</p>
                  </div>
                </div>
                <div className="section-v3-item">
                  <span className="section-v3-icon">🎨</span>
                  <div>
                    <h4>Отделка</h4>
                    <p>Фасад, кровля, водосток</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Selection Summary */}
      <div className="demo-summary">
        <h3>Ваш выбор:</h3>
        <div className="demo-summary-items">
          <span>Карточка: {selectedCard ? `Вариант ${selectedCard}` : 'не выбрано'}</span>
          <span>Кнопка: {selectedButton ? `Вариант ${selectedButton}` : 'не выбрано'}</span>
          <span>Секция: {selectedSection ? `Вариант ${selectedSection}` : 'не выбрано'}</span>
        </div>
      </div>
    </div>
  )
}
