import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { ViewTabs } from './components/ViewTabs'
import { ImageViewer } from './components/ImageViewer'
import { ModelViewer } from './components/ModelViewer'
import { ControlPanel } from './components/ControlPanel'
import { ConstructorPage } from './pages/ConstructorPage'
import { ConstructorV1 } from './pages/ConstructorV1'
import { ConstructorV2 } from './pages/ConstructorV2'
import { ConstructorV3 } from './pages/ConstructorV3'
import { ConstructorV4 } from './pages/ConstructorV4'
import { ConstructorV5 } from './pages/ConstructorV5'
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
import HeroSectionDemo from './pages/HeroSectionDemo'
import FloorPlanDemo from './pages/FloorPlanDemo'
import { RoomButtonsDemo } from './pages/RoomButtonsDemo'
import RoomChipsDemo from './pages/RoomChipsDemo'
import FloorPlanLayoutDemo from './pages/FloorPlanLayoutDemo'
import PricingSectionDemo from './pages/PricingSectionDemo'
import InteriorSectionDemo from './pages/InteriorSectionDemo'
import { InteriorDemo } from './pages/InteriorDemo'
import { SocialDemo } from './pages/SocialDemo'
import { TransitionDemo } from './pages/TransitionDemo'
import { FontDemo } from './pages/FontDemo'
import { InteriorMobileDemo } from './pages/InteriorMobileDemo'
import { TransitionDemoV2 } from './pages/TransitionDemoV2'
import AboutDemoV1 from './pages/AboutDemoV1'
import { TransitionSectionDemo } from './pages/TransitionSectionDemo'
import { DimensionsDemo } from './pages/DimensionsDemo'
import { MaterialsDemo } from './pages/MaterialsDemo'
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
  const isHeroDemo = location.pathname === '/hero-demo'
  const isConstructorV1 = location.pathname === '/constructor-v1'
  const isConstructorV2 = location.pathname === '/constructor-v2'
  const isConstructorV3 = location.pathname === '/constructor-v3'
  const isConstructorV4 = location.pathname === '/constructor-v4'
  const isConstructorV5 = location.pathname === '/constructor-v5'
  const isRoomButtonsDemo = location.pathname === '/room-buttons-demo'

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

  // Для демо hero секций - отдельный layout
  if (isHeroDemo) {
    return <HeroSectionDemo />
  }

  // Для конструктора V1 (тестовая копия)
  if (isConstructorV1) {
    return <ConstructorV1 />
  }

  // Для конструктора V2
  if (isConstructorV2) {
    return <ConstructorV2 />
  }

  // Для конструктора V3
  if (isConstructorV3) {
    return <ConstructorV3 />
  }

  // Для конструктора V4
  if (isConstructorV4) {
    return <ConstructorV4 />
  }

  // Для конструктора V5
  if (isConstructorV5) {
    return <ConstructorV5 />
  }

  // Для демо кнопок списка комнат
  if (isRoomButtonsDemo) {
    return <RoomButtonsDemo />
  }

  // Для демо вариантов chips комнат
  if (location.pathname === '/room-chips-demo') {
    return <RoomChipsDemo />
  }

  // Для демо вариантов layout планировки
  if (location.pathname === '/floor-plan-layout-demo') {
    return <FloorPlanLayoutDemo />
  }

  // Для демо секции стоимости
  if (location.pathname === '/pricing-demo') {
    return <PricingSectionDemo />
  }

  // Для демо секции интерьера
  if (location.pathname === '/interior-demo') {
    return <InteriorSectionDemo />
  }

  // Для демо секции соцсетей
  if (location.pathname === '/social-demo') {
    return <SocialDemo />
  }

  // Для демо переходов между секциями
  if (location.pathname === '/transition-demo') {
    return <TransitionDemo />
  }

  if (location.pathname === '/font-demo') {
    return <FontDemo />
  }

  if (location.pathname === '/interior-mobile-demo') {
    return <InteriorMobileDemo />
  }

  if (location.pathname === '/transition-demo-v2') {
    return <TransitionDemoV2 />
  }

  if (location.pathname === '/about-demo') {
    return <AboutDemoV1 />
  }

  if (location.pathname === '/transition-section-demo') {
    return <TransitionSectionDemo />
  }

  if (location.pathname === '/dimensions-demo') {
    return <DimensionsDemo />
  }

  if (location.pathname === '/materials-demo') {
    return <MaterialsDemo />
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
        <Route path="/hero-demo" element={<HeroSectionDemo />} />
        <Route path="/floor-plan-demo" element={<FloorPlanDemo />} />
        <Route path="/constructor-v1" element={<ConstructorV1 />} />
        <Route path="/constructor-v2" element={<ConstructorV2 />} />
        <Route path="/constructor-v3" element={<ConstructorV3 />} />
        <Route path="/constructor-v4" element={<ConstructorV4 />} />
        <Route path="/constructor-v5" element={<ConstructorV5 />} />
        <Route path="/room-buttons-demo" element={<RoomButtonsDemo />} />
        <Route path="/room-chips-demo" element={<RoomChipsDemo />} />
        <Route path="/floor-plan-layout-demo" element={<FloorPlanLayoutDemo />} />
        <Route path="/pricing-demo" element={<PricingSectionDemo />} />
        <Route path="/interior-demo" element={<InteriorSectionDemo />} />
        <Route path="/interior-variants" element={<InteriorDemo />} />
        <Route path="/social-demo" element={<SocialDemo />} />
        <Route path="/transition-demo" element={<TransitionDemo />} />
        <Route path="/font-demo" element={<FontDemo />} />
        <Route path="/interior-mobile-demo" element={<InteriorMobileDemo />} />
        <Route path="/about-demo" element={<AboutDemoV1 />} />
        <Route path="/transition-section-demo" element={<TransitionSectionDemo />} />
        <Route path="/dimensions-demo" element={<DimensionsDemo />} />
        <Route path="/materials-demo" element={<MaterialsDemo />} />
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
