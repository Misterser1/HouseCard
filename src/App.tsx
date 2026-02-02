import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { ViewTabs } from './components/ViewTabs'
import { ImageViewer } from './components/ImageViewer'
import { ModelViewer } from './components/ModelViewer'
import { ControlPanel } from './components/ControlPanel'
import { ConstructorPage } from './pages/ConstructorPage'
import { SliderDemo } from './pages/SliderDemo'
import { AnimationDemo } from './pages/AnimationDemo'
import { StyleDemo } from './pages/StyleDemo'
import { ButtonsDemo } from './pages/ButtonsDemo'
import { IncludedDemo } from './pages/IncludedDemo'
import { ConstructorTest } from './pages/ConstructorTest'
import { DesignDemo } from './pages/DesignDemo'
import LogoDemo from './pages/LogoDemo'
import ControlsDemo from './pages/ControlsDemo'
import CardDemo from './pages/CardDemo'
import RoomModalDemo from './pages/RoomModalDemo'
import { useHouseStore } from './store/houseStore'
import './App.css'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="nav-tabs">
      <Link
        to="/"
        className={`nav-tab ${location.pathname === '/' ? 'active' : ''}`}
      >
        AI Генератор
      </Link>
      <Link
        to="/constructor"
        className={`nav-tab ${location.pathname === '/constructor' ? 'active' : ''}`}
      >
        Конструктор
      </Link>
    </nav>
  )
}

function GeneratorPage() {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const { modelUrl, isGenerating3D } = useHouseStore()

  return (
    <main className="main">
      <div className="viewer-section">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${viewMode === '2d' ? 'active' : ''}`}
            onClick={() => setViewMode('2d')}
          >
            2D Виды
          </button>
          <button
            className={`mode-btn ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => setViewMode('3d')}
            disabled={!modelUrl && !isGenerating3D}
          >
            3D Модель
          </button>
        </div>

        {viewMode === '2d' ? (
          <>
            <ViewTabs />
            <ImageViewer />
          </>
        ) : (
          <ModelViewer modelUrl={modelUrl} isGenerating={isGenerating3D} />
        )}
      </div>
      <ControlPanel />
    </main>
  )
}

function AppContent() {
  const { error, setError } = useHouseStore()
  const location = useLocation()
  const isConstructor = location.pathname === '/constructor'
  const isSliderDemo = location.pathname === '/slider-demo'
  const isAnimationDemo = location.pathname === '/animation-demo'
  const isStyleDemo = location.pathname === '/style-demo'
  const isButtonsDemo = location.pathname === '/buttons-demo'
  const isIncludedDemo = location.pathname === '/included-demo'
  const isConstructorTest = location.pathname === '/constructor-test'
  const isDesignDemo = location.pathname === '/design-demo'
  const isLogoDemo = location.pathname === '/logo-demo'
  const isControlsDemo = location.pathname === '/controls-demo'
  const isCardDemo = location.pathname === '/card-demo'

  // Для конструктора - отдельный layout без общего хедера
  if (isConstructor) {
    return (
      <>
        <ConstructorPage />
        {error && (
          <div className="error-toast">
            <span>{error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}
      </>
    )
  }

  // Для демо слайдера - отдельный layout
  if (isSliderDemo) {
    return <SliderDemo />
  }

  // Для демо анимаций - отдельный layout
  if (isAnimationDemo) {
    return <AnimationDemo />
  }

  // Для выбора стилей - отдельный layout
  if (isStyleDemo) {
    return <StyleDemo />
  }

  // Для демо кнопок - отдельный layout
  if (isButtonsDemo) {
    return <ButtonsDemo />
  }

  // Для демо секции "Что входит" - отдельный layout
  if (isIncludedDemo) {
    return <IncludedDemo />
  }

  // Для тестового конструктора - отдельный layout
  if (isConstructorTest) {
    return <ConstructorTest />
  }

  // Для демо дизайна - отдельный layout
  if (isDesignDemo) {
    return <DesignDemo />
  }

  // Для демо логотипа - отдельный layout
  if (isLogoDemo) {
    return <LogoDemo />
  }

  // Для демо контролов - отдельный layout
  if (isControlsDemo) {
    return <ControlsDemo />
  }

  // Для демо вариантов карточки - отдельный layout
  if (isCardDemo) {
    return <CardDemo />
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">HouseBuilder AI</span>
          </div>
          <Navigation />
        </div>
        <p className="tagline">Создайте дом своей мечты с помощью AI</p>
      </header>

      <Routes>
        <Route path="/" element={<GeneratorPage />} />
        <Route path="/constructor" element={<ConstructorPage />} />
        <Route path="/slider-demo" element={<SliderDemo />} />
        <Route path="/animation-demo" element={<AnimationDemo />} />
        <Route path="/style-demo" element={<StyleDemo />} />
        <Route path="/buttons-demo" element={<ButtonsDemo />} />
        <Route path="/included-demo" element={<IncludedDemo />} />
        <Route path="/constructor-test" element={<ConstructorTest />} />
        <Route path="/design-demo" element={<DesignDemo />} />
        <Route path="/logo-demo" element={<LogoDemo />} />
        <Route path="/controls-demo" element={<ControlsDemo />} />
        <Route path="/card-demo" element={<CardDemo />} />
        <Route path="/room-modal-demo" element={<RoomModalDemo />} />
      </Routes>

      {error && (
        <div className="error-toast">
          <span>{error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <footer className="footer">
        <p>Powered by Replicate & Stable Diffusion XL</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
