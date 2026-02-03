import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ConstructorTest.css'

type RoofStyle = 'gable' | 'hip' | 'flat' | 'mansard'
type WallMaterial = 'brick' | 'gasblock'
type HouseStyle = 'modern' | 'classic' | 'minimalist' | 'european' | 'american'

// SVG Icons
const Icons = {
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
      <path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" opacity="0.6"/>
      <path d="M19 14L20 17L23 18L20 19L19 22L18 19L15 18L18 17L19 14Z" opacity="0.6"/>
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <path d="M9 22V12h6v10"/>
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 2,7 12,12 22,7 12,2"/>
      <polyline points="2,17 12,22 22,17"/>
      <polyline points="2,12 12,17 22,12"/>
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  brick: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="1"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
      <line x1="1" y1="16" x2="23" y2="16"/>
      <line x1="12" y1="4" x2="12" y2="10"/>
      <line x1="6" y1="10" x2="6" y2="16"/>
      <line x1="18" y1="10" x2="18" y2="16"/>
      <line x1="12" y1="16" x2="12" y2="20"/>
    </svg>
  ),
  roof: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12L12 3l10 9"/>
      <path d="M5 10v10h14V10"/>
      <rect x="9" y="14" width="6" height="6"/>
    </svg>
  ),
  roofGable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12L12 4l10 8"/>
      <path d="M4 11v9h16v-9"/>
    </svg>
  ),
  roofHip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14L7 8h10l5 6"/>
      <path d="M12 4L7 8M12 4l5 4"/>
      <path d="M4 13v7h16v-7"/>
    </svg>
  ),
  roofFlat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h20"/>
      <path d="M4 8v12h16V8"/>
      <rect x="8" y="12" width="3" height="4"/>
      <rect x="13" y="12" width="3" height="4"/>
    </svg>
  ),
  roofMansard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14L5 6h14l3 8"/>
      <path d="M8 6V4h8v2"/>
      <path d="M4 13v7h16v-7"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14v-5l-2-4H7l-2 4v5z"/>
      <circle cx="7.5" cy="17.5" r="1.5"/>
      <circle cx="16.5" cy="17.5" r="1.5"/>
      <path d="M5 12h14"/>
      <path d="M7 8l1-3h8l1 3"/>
    </svg>
  ),
  balcony: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="8" rx="1"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="6" y1="12" x2="6" y2="20"/>
      <line x1="10" y1="12" x2="10" y2="20"/>
      <line x1="14" y1="12" x2="14" y2="20"/>
      <line x1="18" y1="12" x2="18" y2="20"/>
      <line x1="4" y1="20" x2="20" y2="20"/>
    </svg>
  ),
  wand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5"/>
      <path d="M9 18l6-6-3-3-6 6 3 3z"/>
      <path d="M3 21l3-3"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 01 0 3.4l-2.6 2.6a2.4 2.4 0 01-3.4 0L2.7 8.7a2.4 2.4 0 010-3.4l2.6-2.6a2.4 2.4 0 013.4 0z"/>
      <path d="M14 9l-1 1M11 6l-1 1M8 3l-1 1M17 12l-1 1M20 15l-1 1"/>
    </svg>
  ),
  rooms: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  bathroom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z"/>
      <path d="M6 12V6a2 2 0 012-2h1a1 1 0 011 1v1"/>
      <path d="M6 20v2"/>
      <path d="M18 20v2"/>
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v12M9 9h4.5a1.5 1.5 0 010 3H9h4.5a1.5 1.5 0 110 3H9"/>
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  cube3d: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  terrace: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M5 21V11"/>
      <path d="M19 21V11"/>
      <path d="M3 11h18"/>
      <path d="M12 11V7"/>
      <path d="M8 11V9"/>
      <path d="M16 11V9"/>
      <circle cx="12" cy="5" r="2"/>
    </svg>
  ),
  wardrobe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <circle cx="9" cy="12" r="1" fill="currentColor"/>
      <circle cx="15" cy="12" r="1" fill="currentColor"/>
    </svg>
  )
}

export function ConstructorTest() {
  // Основные параметры проекта
  const [_projectName] = useState('Мой проект')
  const [areaLength] = useState(10) // длина по осям (м)
  const [areaWidth] = useState(12) // ширина по осям (м)
  const [rooms] = useState(4)
  const [bathrooms] = useState(2)

  // Параметры дома
  const [floors] = useState(2)
  const [_roofStyle] = useState<RoofStyle>('gable')
  const [wallMaterial] = useState<WallMaterial>('brick')
  const [_houseStyle] = useState<HouseStyle>('classic')
  const [_hasGarage] = useState(false)
  const [_hasBalcony] = useState(false)

  // Suppress unused warnings (these are for future functionality)
  void _projectName; void _roofStyle; void _houseStyle; void _hasGarage; void _hasBalcony

  // Галерея изображений проекта
  const houseImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('about')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  // Данные комнат для планировки (позиции в процентах для наложения на картинку)
  const floorPlanRooms = [
    { id: 'kitchen', name: 'Кухня', area: 11.80, top: 8, left: 5, width: 22, height: 24, description: 'Просторная кухня с выходом в гостиную', features: ['Панорамное окно', 'Место для острова', 'Выход на террасу'], image: '/rooms/kitchen.jpg' },
    { id: 'living', name: 'Гостиная', area: 19.80, top: 8, left: 27, width: 26, height: 24, description: 'Светлая гостиная с высокими потолками', features: ['Камин', 'Панорамные окна', 'Второй свет'], image: '/rooms/living.jpg' },
    { id: 'terrace', name: 'Терраса', area: 22.93, top: 5, left: 53, width: 28, height: 35, description: 'Крытая терраса с видом на сад', features: ['Деревянный настил', 'Зона барбекю', 'Освещение'], image: '/rooms/terrace.jpg' },
    { id: 'storage', name: 'Кладовая', area: 3.09, top: 32, left: 5, width: 14, height: 14, description: 'Вместительная кладовая', features: ['Стеллажи', 'Вентиляция'], image: '/rooms/storage.jpg' },
    { id: 'hall', name: 'Холл', area: 10.84, top: 32, left: 19, width: 20, height: 22, description: 'Просторный холл с лестницей на второй этаж', features: ['Лестница', 'Гардеробная зона'], image: '/rooms/hall.jpg' },
    { id: 'entrance', name: 'Прихожая', area: 7.43, top: 32, left: 39, width: 18, height: 22, description: 'Функциональная прихожая', features: ['Встроенные шкафы', 'Зеркало'], image: '/rooms/entrance.jpg' },
    { id: 'bedroom', name: 'Спальня', area: 15.57, top: 54, left: 5, width: 22, height: 30, description: 'Уютная спальня на первом этаже', features: ['Гардеробная', 'Выход в сад'], image: '/rooms/bedroom.jpg' },
    { id: 'bathroom', name: 'С/У', area: 7.88, top: 54, left: 27, width: 16, height: 22, description: 'Просторный санузел', features: ['Душевая кабина', 'Тёплый пол', 'Окно'], image: '/rooms/bathroom.jpg' },
    { id: 'boiler', name: 'Котельная', area: 7.70, top: 54, left: 43, width: 20, height: 22, description: 'Техническое помещение', features: ['Газовый котёл', 'Бойлер', 'Вентиляция'], image: '/rooms/boiler.jpg' },
  ]


  // Вычисляемые значения
  const totalArea = areaLength * areaWidth * floors
  const pricePerSqm = wallMaterial === 'brick' ? 85000 : 65000 // руб/м²
  const estimatedCost = totalArea * pricePerSqm

  // Навигация по слайдеру
  const goToPrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? houseImages.length - 1 : prev - 1)
  }

  const goToNextImage = () => {
    setCurrentImageIndex(prev => prev === houseImages.length - 1 ? 0 : prev + 1)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const _roofLabels: Record<RoofStyle, { label: string; icon: React.ReactNode }> = {
    gable: { label: 'Двускатная', icon: Icons.roofGable },
    hip: { label: 'Шатровая', icon: Icons.roofHip },
    flat: { label: 'Плоская', icon: Icons.roofFlat },
    mansard: { label: 'Мансардная', icon: Icons.roofMansard }
  }

  const materialLabels: Record<WallMaterial, { label: string; color: string }> = {
    brick: { label: 'Кирпич', color: '#c84c32' },
    gasblock: { label: 'Газобетон', color: '#a8a8a8' }
  }

  const _styleLabels: Record<HouseStyle, { label: string; desc: string }> = {
    modern: { label: 'Современный', desc: 'Минимализм и стекло' },
    classic: { label: 'Классический', desc: 'Традиционный стиль' },
    minimalist: { label: 'Минимализм', desc: 'Чистые линии' },
    european: { label: 'Европейский', desc: 'Элегантность' },
    american: { label: 'Американский', desc: 'Craftsman стиль' }
  }

  // Suppress unused warnings (these are for future functionality)
  void _roofLabels; void _styleLabels

  const navTabs = [
    { id: 'about', label: 'О проекте' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'plans', label: 'Планировки' },
    { id: 'config', label: 'Комплектация' },
    { id: 'video', label: 'Видео' },
  ]

  return (
    <div id="dark-theme-page" className="dark-constructor">
      {/* Clean Navigation Header */}
      <header className="clean-header">
        <div className="clean-header-top">
          <Link to="/" className="clean-logo">
            <span className="logo-icon">{Icons.house}</span>
            <span className="logo-text">HouseBuilder</span>
          </Link>
          <nav className="clean-nav">
            {navTabs.map(tab => (
              <button
                key={tab.id}
                className={`clean-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <Link to="/" className="clean-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Назад
          </Link>
        </div>
      </header>

      <div className="premium-layout">
        {/* Preview Section */}
        <div className="preview-section">
          {/* Variant 3 Slider */}
          <div className="slider-wrapper">
            <div className="slider-container">
              <img key={currentImageIndex} src={houseImages[currentImageIndex]} alt="Ваш дом" className="slider-main-image" />

              {/* Navigation Buttons */}
              <button className="nav-btn nav-prev" onClick={goToPrevImage}>
                {Icons.chevronLeft}
              </button>
              <button className="nav-btn nav-next" onClick={goToNextImage}>
                {Icons.chevronRight}
              </button>

              {/* Fullscreen Button */}
              <button className="fullscreen-btn-v3" onClick={() => setIsFullscreen(true)} title="Полноэкранный просмотр">
                {Icons.expand}
              </button>
            </div>

            {/* Thumbnails Strip */}
            <div className="thumbnails-strip">
              {houseImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-v3 ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img} alt={`Фото ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Info Column - Card + Buttons */}
        <div className="info-column">
          {/* Project Info Section */}
          <div className="project-info-section">
            {/* Left Column - Specs */}
            <div className="info-specs">
              {/* Area */}
              <div className="spec-block">
                <span className="spec-label">Площадь по осям</span>
                <span className="spec-value-large">{totalArea} м<sup>2</sup></span>
              </div>

              {/* Material */}
              <div className="spec-block">
                <span className="spec-label">Материал стен</span>
                <span className="spec-value-medium">{materialLabels[wallMaterial].label}</span>
              </div>

              {/* Stats Icons Row */}
              <div className="spec-icons-row">
                <div className="spec-icon-item">
                  <span className="spec-icon-value">{rooms}</span>
                  <span className="spec-icon-img">{Icons.rooms}</span>
                  <span className="spec-icon-label">Комнат</span>
                </div>
                <div className="spec-icon-item">
                  <span className="spec-icon-value">{bathrooms}</span>
                  <span className="spec-icon-img">{Icons.bathroom}</span>
                  <span className="spec-icon-label">Санузла</span>
                </div>
                <div className="spec-icon-item">
                  <span className="spec-icon-value">1</span>
                  <span className="spec-icon-img">{Icons.terrace}</span>
                  <span className="spec-icon-label">Терраса</span>
                </div>
                <div className="spec-icon-item">
                  <span className="spec-icon-value">1</span>
                  <span className="spec-icon-img">{Icons.wardrobe}</span>
                  <span className="spec-icon-label">Гардеробная</span>
                </div>
              </div>
            </div>

            {/* Right Column - Price */}
            <div className="info-price">
              <div className="price-header">
                <span className="price-label">Цена</span>
                <span className="price-badge">Фиксация цены до 1 марта</span>
              </div>
              <div className="price-current">
                <span className="price-value">{(estimatedCost / 1000000).toFixed(2)} млн ₽</span>
              </div>
              <div className="price-subtext">Успейте заказать по старой цене!</div>
              <div className="price-future">
                <span className="price-future-date">С 01.03.2026</span>
                <span className="price-future-value">{((estimatedCost * 1.1) / 1000000).toFixed(1)} млн ₽</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Below Card */}
          <div className="cta-buttons-section">
            <button className="cta-minimal telegram">
              <span className="cta-icon">{Icons.telegram}</span>
              <span className="cta-text">Презентация в Telegram</span>
              <span className="cta-line"></span>
            </button>
            <button className="cta-minimal email">
              <span className="cta-icon">{Icons.email}</span>
              <span className="cta-text">Презентация на почту</span>
              <span className="cta-line"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Floor Plan Section */}
      <div className="floor-plan-section">
        <div className="floor-plan-header">
          <h2>Планировка 1 этажа</h2>
          <span className="floor-plan-area">105.91 м²</span>
        </div>
        <div className="floor-plan-container">
          <div className="floor-plan-wrapper">
            {/* Realistic Architectural Floor Plan */}
            <svg viewBox="0 0 600 520" className="floor-plan-detailed">
              <defs>
                {/* Wood floor pattern - horizontal planks */}
                <pattern id="woodFloor" width="40" height="8" patternUnits="userSpaceOnUse">
                  <rect width="40" height="8" fill="#e8d4b8"/>
                  <line x1="0" y1="0" x2="40" y2="0" stroke="#d4c4a8" strokeWidth="0.5"/>
                  <line x1="20" y1="0" x2="20" y2="8" stroke="#d4c4a8" strokeWidth="0.3"/>
                </pattern>
                {/* Tile pattern for bathroom */}
                <pattern id="tileFloor" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#f5f5f5"/>
                  <rect x="0.5" y="0.5" width="5" height="5" fill="#e8e8e8"/>
                  <rect x="6.5" y="6.5" width="5" height="5" fill="#e8e8e8"/>
                </pattern>
                {/* Terrace decking pattern */}
                <pattern id="deckPattern" width="12" height="60" patternUnits="userSpaceOnUse">
                  <rect width="12" height="60" fill="#d4a574"/>
                  <rect x="0" y="0" width="5.5" height="60" fill="#c49a6c"/>
                  <line x1="0" y1="0" x2="12" y2="0" stroke="#a67c52" strokeWidth="0.5"/>
                </pattern>
                {/* Wall hatch pattern */}
                <pattern id="wallHatch" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M0,4 L4,0" stroke="#666" strokeWidth="0.5"/>
                </pattern>
              </defs>

              {/* === EXTERIOR WALLS (thick) === */}
              <rect x="30" y="30" width="400" height="440" fill="none" stroke="#2d2d2d" strokeWidth="12"/>

              {/* === TERRACE === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('terrace')} style={{cursor: 'pointer'}}>
                <rect x="430" y="30" width="140" height="200" fill={selectedRoom === 'terrace' ? 'rgba(46,90,60,0.15)' : 'url(#deckPattern)'} stroke="#8B4513" strokeWidth="3"/>
                {/* Terrace railing */}
                <line x1="430" y1="30" x2="570" y2="30" stroke="#8B4513" strokeWidth="4"/>
                <line x1="570" y1="30" x2="570" y2="230" stroke="#8B4513" strokeWidth="4"/>
                {/* Outdoor furniture - round table with chairs */}
                <circle cx="500" cy="100" r="30" fill="none" stroke="#5D4037" strokeWidth="2"/>
                <circle cx="500" cy="100" r="2" fill="#5D4037"/>
                {/* Chairs */}
                <ellipse cx="470" cy="85" rx="10" ry="12" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                <ellipse cx="530" cy="85" rx="10" ry="12" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                <ellipse cx="470" cy="115" rx="10" ry="12" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                <ellipse cx="530" cy="115" rx="10" ry="12" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                <text x="500" y="170" className="room-label" textAnchor="middle">ТЕРРАСА</text>
                <text x="500" y="185" className="room-area-label" textAnchor="middle">22,93 м²</text>
              </g>

              {/* === ROOM FLOORS === */}
              {/* Kitchen floor */}
              <rect x="36" y="36" width="145" height="130" fill="url(#woodFloor)"/>
              {/* Living room floor */}
              <rect x="181" y="36" width="170" height="130" fill="url(#woodFloor)"/>
              {/* Hall floor */}
              <rect x="112" y="166" width="120" height="115" fill="url(#woodFloor)"/>
              {/* Entrance floor */}
              <rect x="232" y="166" width="108" height="115" fill="url(#woodFloor)"/>
              {/* Bedroom floor */}
              <rect x="36" y="281" width="145" height="183" fill="url(#woodFloor)"/>
              {/* Bathroom floor */}
              <rect x="181" y="281" width="80" height="110" fill="url(#tileFloor)"/>
              {/* Boiler room floor */}
              <rect x="261" y="281" width="79" height="110" fill="#f0f0f0"/>
              {/* Storage floor */}
              <rect x="36" y="166" width="76" height="76" fill="#f8f8f8"/>

              {/* === INTERIOR WALLS === */}
              {/* Horizontal walls */}
              <rect x="36" y="163" width="388" height="6" fill="#2d2d2d"/> {/* Main horizontal */}
              <rect x="36" y="278" width="304" height="6" fill="#2d2d2d"/> {/* Lower horizontal */}
              <rect x="181" y="388" width="159" height="6" fill="#2d2d2d"/> {/* Bottom rooms separator */}

              {/* Vertical walls */}
              <rect x="178" y="36" width="6" height="130" fill="#2d2d2d"/> {/* Kitchen-Living */}
              <rect x="109" y="163" width="6" height="121" fill="#2d2d2d"/> {/* Storage-Hall */}
              <rect x="229" y="163" width="6" height="121" fill="#2d2d2d"/> {/* Hall-Entrance */}
              <rect x="178" y="278" width="6" height="116" fill="#2d2d2d"/> {/* Bedroom-Bathroom */}
              <rect x="258" y="278" width="6" height="116" fill="#2d2d2d"/> {/* Bathroom-Boiler */}
              <rect x="348" y="163" width="6" height="231" fill="#2d2d2d"/> {/* Right wall */}

              {/* === WINDOWS (with glass and frame) === */}
              {/* Kitchen window */}
              <g>
                <rect x="60" y="30" width="60" height="12" fill="#fff"/>
                <rect x="62" y="32" width="56" height="8" fill="#b8d4e8"/>
                <line x1="90" y1="32" x2="90" y2="40" stroke="#666" strokeWidth="1"/>
                <line x1="62" y1="36" x2="118" y2="36" stroke="#666" strokeWidth="0.5"/>
              </g>
              {/* Living room window */}
              <g>
                <rect x="220" y="30" width="80" height="12" fill="#fff"/>
                <rect x="222" y="32" width="76" height="8" fill="#b8d4e8"/>
                <line x1="260" y1="32" x2="260" y2="40" stroke="#666" strokeWidth="1"/>
                <line x1="222" y1="36" x2="298" y2="36" stroke="#666" strokeWidth="0.5"/>
              </g>
              {/* Bedroom window */}
              <g>
                <rect x="30" y="340" width="12" height="70" fill="#fff"/>
                <rect x="32" y="342" width="8" height="66" fill="#b8d4e8"/>
                <line x1="32" y1="375" x2="40" y2="375" stroke="#666" strokeWidth="1"/>
              </g>
              {/* Entrance window */}
              <g>
                <rect x="280" y="163" width="50" height="6" fill="#fff"/>
                <rect x="282" y="164" width="46" height="4" fill="#b8d4e8"/>
              </g>

              {/* === DOORS WITH SWING ARCS === */}
              {/* Kitchen to Living door */}
              <g>
                <rect x="178" y="80" width="6" height="40" fill="#fff"/>
                <path d="M 184 80 A 40 40 0 0 1 224 120" fill="none" stroke="#999" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="184" y1="80" x2="224" y2="80" stroke="#333" strokeWidth="2"/>
              </g>
              {/* Living to Terrace door */}
              <g>
                <rect x="350" y="80" width="12" height="50" fill="#fff"/>
                <rect x="352" y="82" width="8" height="46" fill="#b8d4e8" opacity="0.5"/>
                <line x1="356" y1="82" x2="356" y2="128" stroke="#666" strokeWidth="1"/>
              </g>
              {/* Kitchen to Storage door */}
              <g>
                <rect x="60" y="163" width="35" height="6" fill="#fff"/>
                <path d="M 60 169 A 35 35 0 0 0 60 204" fill="none" stroke="#999" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="60" y1="169" x2="60" y2="204" stroke="#333" strokeWidth="2"/>
              </g>
              {/* Hall to Entrance door */}
              <g>
                <rect x="190" y="163" width="35" height="6" fill="#fff"/>
                <path d="M 225 169 A 35 35 0 0 1 225 204" fill="none" stroke="#999" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="225" y1="169" x2="225" y2="204" stroke="#333" strokeWidth="2"/>
              </g>
              {/* Entrance main door */}
              <g>
                <rect x="280" y="274" width="50" height="10" fill="#8B4513"/>
                <circle cx="320" cy="279" r="3" fill="#FFD700"/>
              </g>
              {/* Storage to Bedroom door */}
              <g>
                <rect x="60" y="278" width="35" height="6" fill="#fff"/>
                <path d="M 95 284 A 35 35 0 0 1 95 319" fill="none" stroke="#999" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="95" y1="284" x2="95" y2="319" stroke="#333" strokeWidth="2"/>
              </g>
              {/* Bedroom to Bathroom door */}
              <g>
                <rect x="178" y="320" width="6" height="35" fill="#fff"/>
                <path d="M 184 320 A 35 35 0 0 1 219 320" fill="none" stroke="#999" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="184" y1="320" x2="219" y2="320" stroke="#333" strokeWidth="2"/>
              </g>
              {/* Bathroom to Boiler door */}
              <g>
                <rect x="258" y="320" width="6" height="35" fill="#fff"/>
                <path d="M 264 355 A 35 35 0 0 1 299 355" fill="none" stroke="#999" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="264" y1="355" x2="299" y2="355" stroke="#333" strokeWidth="2"/>
              </g>

              {/* === KITCHEN FURNITURE === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('kitchen')} style={{cursor: 'pointer'}}>
                <rect x="36" y="36" width="145" height="130" fill={selectedRoom === 'kitchen' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* L-shaped counter */}
                <path d="M 40 40 L 40 100 L 55 100 L 55 55 L 130 55 L 130 40 Z" fill="#8B7355" stroke="#5D4037" strokeWidth="1"/>
                {/* Sink */}
                <rect x="70" y="42" width="25" height="12" fill="#ccc" stroke="#999" strokeWidth="1" rx="2"/>
                <ellipse cx="82" cy="48" rx="8" ry="4" fill="#aaa"/>
                {/* Stove/Cooktop */}
                <rect x="100" y="42" width="28" height="12" fill="#333" stroke="#222" strokeWidth="1"/>
                <circle cx="108" cy="48" r="4" fill="none" stroke="#666" strokeWidth="1"/>
                <circle cx="120" cy="48" r="4" fill="none" stroke="#666" strokeWidth="1"/>
                {/* Refrigerator */}
                <rect x="40" y="60" width="14" height="38" fill="#e0e0e0" stroke="#999" strokeWidth="1"/>
                <line x1="40" y1="75" x2="54" y2="75" stroke="#999" strokeWidth="0.5"/>
                {/* Dining table */}
                <ellipse cx="115" cy="115" rx="35" ry="22" fill="none" stroke="#8B7355" strokeWidth="2"/>
                {/* Chairs */}
                <ellipse cx="85" cy="105" rx="8" ry="10" fill="#A0522D" stroke="#8B4513" strokeWidth="1"/>
                <ellipse cx="145" cy="105" rx="8" ry="10" fill="#A0522D" stroke="#8B4513" strokeWidth="1"/>
                <ellipse cx="85" cy="125" rx="8" ry="10" fill="#A0522D" stroke="#8B4513" strokeWidth="1"/>
                <ellipse cx="145" cy="125" rx="8" ry="10" fill="#A0522D" stroke="#8B4513" strokeWidth="1"/>
                <text x="108" y="80" className="room-label">КУХНЯ</text>
                <text x="108" y="93" className="room-area-label">11,80 м²</text>
              </g>

              {/* === LIVING ROOM FURNITURE === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('living')} style={{cursor: 'pointer'}}>
                <rect x="184" y="36" width="164" height="127" fill={selectedRoom === 'living' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* Large sofa */}
                <rect x="195" y="55" width="80" height="35" fill="#8B6914" stroke="#6B4C12" strokeWidth="1" rx="3"/>
                <rect x="198" y="58" width="74" height="8" fill="#A67C00"/>
                {/* Armchair */}
                <rect x="290" y="60" width="35" height="30" fill="#8B6914" stroke="#6B4C12" strokeWidth="1" rx="3"/>
                <rect x="293" y="63" width="29" height="6" fill="#A67C00"/>
                {/* Coffee table */}
                <rect x="215" y="100" width="50" height="30" fill="none" stroke="#5D4037" strokeWidth="2" rx="2"/>
                <rect x="220" y="105" width="40" height="20" fill="#DEB887" stroke="#5D4037" strokeWidth="1"/>
                {/* TV stand */}
                <rect x="195" y="140" width="60" height="15" fill="#4A4A4A" stroke="#333" strokeWidth="1"/>
                <rect x="205" y="130" width="40" height="10" fill="#222" stroke="#111" strokeWidth="1"/>
                <text x="266" y="80" className="room-label">ГОСТИНАЯ</text>
                <text x="266" y="93" className="room-area-label">19,80 м²</text>
              </g>

              {/* === STORAGE ROOM === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('storage')} style={{cursor: 'pointer'}}>
                <rect x="36" y="169" width="73" height="109" fill={selectedRoom === 'storage' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* Shelving units */}
                <rect x="40" y="175" width="65" height="8" fill="#A0A0A0" stroke="#888" strokeWidth="0.5"/>
                <rect x="40" y="190" width="65" height="8" fill="#A0A0A0" stroke="#888" strokeWidth="0.5"/>
                <rect x="40" y="205" width="65" height="8" fill="#A0A0A0" stroke="#888" strokeWidth="0.5"/>
                <rect x="40" y="220" width="65" height="8" fill="#A0A0A0" stroke="#888" strokeWidth="0.5"/>
                {/* Vertical supports */}
                <rect x="40" y="175" width="3" height="53" fill="#888"/>
                <rect x="102" y="175" width="3" height="53" fill="#888"/>
                <text x="72" y="255" className="room-label-small">КЛАДОВАЯ</text>
                <text x="72" y="268" className="room-area-label-small">3,09 м²</text>
              </g>

              {/* === HALL WITH STAIRS === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('hall')} style={{cursor: 'pointer'}}>
                <rect x="115" y="169" width="114" height="109" fill={selectedRoom === 'hall' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* Staircase */}
                <g>
                  {[0,1,2,3,4,5,6,7,8,9].map(i => (
                    <React.Fragment key={i}>
                      <rect x={125 + i*8} y="180" width="7" height="50" fill="#C4A77D" stroke="#8B7355" strokeWidth="0.5"/>
                      <line x1={125 + i*8} y1="180" x2={132 + i*8} y2="180" stroke="#8B7355" strokeWidth="1"/>
                    </React.Fragment>
                  ))}
                  {/* Arrow indicating up direction */}
                  <path d="M 170 175 L 175 165 L 180 175" fill="none" stroke="#666" strokeWidth="1.5"/>
                  <line x1="175" y1="165" x2="175" y2="180" stroke="#666" strokeWidth="1.5"/>
                </g>
                <text x="172" y="255" className="room-label">ХОЛЛ</text>
                <text x="172" y="268" className="room-area-label">10,84 м²</text>
              </g>

              {/* === ENTRANCE === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('entrance')} style={{cursor: 'pointer'}}>
                <rect x="235" y="169" width="105" height="109" fill={selectedRoom === 'entrance' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* Built-in wardrobe */}
                <rect x="295" y="175" width="40" height="60" fill="#8B7355" stroke="#5D4037" strokeWidth="1"/>
                <line x1="315" y1="175" x2="315" y2="235" stroke="#5D4037" strokeWidth="1"/>
                <circle cx="310" cy="205" r="2" fill="#FFD700"/>
                <circle cx="320" cy="205" r="2" fill="#FFD700"/>
                {/* Shoe cabinet */}
                <rect x="245" y="250" width="45" height="18" fill="#A0522D" stroke="#8B4513" strokeWidth="1"/>
                {/* Mirror */}
                <rect x="245" y="180" width="20" height="40" fill="#E8E8E8" stroke="#999" strokeWidth="1"/>
                <text x="287" y="215" className="room-label">ПРИХОЖАЯ</text>
                <text x="287" y="228" className="room-area-label">7,43 м²</text>
              </g>

              {/* === BEDROOM === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('bedroom')} style={{cursor: 'pointer'}}>
                <rect x="36" y="284" width="142" height="180" fill={selectedRoom === 'bedroom' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* Double bed with headboard */}
                <rect x="50" y="340" width="90" height="110" fill="#8B6914" stroke="#6B4C12" strokeWidth="2" rx="3"/>
                <rect x="55" y="345" width="80" height="5" fill="#6B4C12"/>
                <rect x="58" y="355" width="74" height="90" fill="#F5F5DC" stroke="#DDD" strokeWidth="1"/>
                {/* Pillows */}
                <ellipse cx="80" cy="365" rx="18" ry="8" fill="#FFF8DC" stroke="#DDD" strokeWidth="1"/>
                <ellipse cx="115" cy="365" rx="18" ry="8" fill="#FFF8DC" stroke="#DDD" strokeWidth="1"/>
                {/* Nightstands */}
                <rect x="50" y="310" width="25" height="25" fill="#A0522D" stroke="#8B4513" strokeWidth="1"/>
                <circle cx="62" cy="322" r="2" fill="#FFD700"/>
                <rect x="145" y="310" width="25" height="25" fill="#A0522D" stroke="#8B4513" strokeWidth="1"/>
                <circle cx="157" cy="322" r="2" fill="#FFD700"/>
                {/* Wardrobe */}
                <rect x="145" y="390" width="28" height="68" fill="#8B7355" stroke="#5D4037" strokeWidth="1"/>
                <line x1="159" y1="390" x2="159" y2="458" stroke="#5D4037" strokeWidth="1"/>
                <text x="107" y="300" className="room-label">СПАЛЬНЯ</text>
                <text x="107" y="313" className="room-area-label">15,57 м²</text>
              </g>

              {/* === BATHROOM === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('bathroom')} style={{cursor: 'pointer'}}>
                <rect x="184" y="284" width="74" height="104" fill={selectedRoom === 'bathroom' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* Shower cabin */}
                <rect x="190" y="290" width="40" height="40" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="1.5"/>
                <circle cx="225" cy="300" r="8" fill="none" stroke="#00ACC1" strokeWidth="1"/>
                <circle cx="225" cy="300" r="3" fill="#00ACC1"/>
                {/* Toilet */}
                <ellipse cx="240" cy="365" rx="15" ry="20" fill="#FFF" stroke="#00ACC1" strokeWidth="1.5"/>
                <ellipse cx="240" cy="358" rx="12" ry="10" fill="#F5F5F5" stroke="#00ACC1" strokeWidth="1"/>
                {/* Sink with cabinet */}
                <rect x="190" y="345" width="35" height="25" fill="#FFF" stroke="#00ACC1" strokeWidth="1.5" rx="3"/>
                <ellipse cx="207" cy="357" rx="12" ry="8" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="1"/>
                <text x="221" y="300" className="room-label-small">С/У</text>
                <text x="221" y="313" className="room-area-label-small">7,88 м²</text>
              </g>

              {/* === BOILER ROOM === */}
              <g className="room-clickable" onClick={() => setSelectedRoom('boiler')} style={{cursor: 'pointer'}}>
                <rect x="264" y="284" width="76" height="104" fill={selectedRoom === 'boiler' ? 'rgba(46,90,60,0.12)' : 'transparent'}/>
                {/* Boiler */}
                <rect x="275" y="295" width="35" height="50" fill="#E0E0E0" stroke="#999" strokeWidth="1.5" rx="2"/>
                <rect x="280" y="300" width="25" height="15" fill="#333"/>
                <circle cx="292" cy="330" r="8" fill="#FF5722" opacity="0.5"/>
                {/* Water heater */}
                <rect x="320" y="295" width="15" height="45" fill="#E0E0E0" stroke="#999" strokeWidth="1" rx="2"/>
                {/* Pipes */}
                <line x1="275" y1="320" x2="270" y2="320" stroke="#666" strokeWidth="3"/>
                <line x1="270" y1="320" x2="270" y2="380" stroke="#666" strokeWidth="3"/>
                <text x="302" y="365" className="room-label-small">КОТЕЛЬНАЯ</text>
                <text x="302" y="378" className="room-area-label-small">7,70 м²</text>
              </g>

              {/* === DIMENSION LINES === */}
              {/* Horizontal dimension */}
              <g>
                <line x1="30" y1="490" x2="430" y2="490" stroke="#666" strokeWidth="1"/>
                <line x1="30" y1="485" x2="30" y2="495" stroke="#666" strokeWidth="1"/>
                <line x1="430" y1="485" x2="430" y2="495" stroke="#666" strokeWidth="1"/>
                <polygon points="35,490 30,487 30,493" fill="#666"/>
                <polygon points="425,490 430,487 430,493" fill="#666"/>
                <text x="230" y="505" className="dimension-text" textAnchor="middle" fill="#666" fontSize="12">10 900</text>
              </g>
              {/* Vertical dimension */}
              <g>
                <line x1="15" y1="30" x2="15" y2="470" stroke="#666" strokeWidth="1"/>
                <line x1="10" y1="30" x2="20" y2="30" stroke="#666" strokeWidth="1"/>
                <line x1="10" y1="470" x2="20" y2="470" stroke="#666" strokeWidth="1"/>
                <polygon points="15,35 12,30 18,30" fill="#666"/>
                <polygon points="15,465 12,470 18,470" fill="#666"/>
                <text x="10" y="250" className="dimension-text" textAnchor="middle" fill="#666" fontSize="12" transform="rotate(-90, 10, 250)">9 900</text>
              </g>
            </svg>

            {/* Dimensions */}
            <div className="floor-plan-dimensions">
              <span className="dimension-horizontal">10 900</span>
              <span className="dimension-vertical">9 900</span>
            </div>

            {/* Floor indicator */}
            <div className="floor-indicator">
              <span className="floor-label">1 этаж</span>
              <span className="floor-total-area">105.91 м²</span>
            </div>
          </div>

          {/* Room List */}
          <div className="room-list">
            <h3>Помещения</h3>
            {floorPlanRooms.map(room => (
              <button
                key={room.id}
                className={`room-list-item ${selectedRoom === room.id ? 'active' : ''}`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <span className="room-list-name">{room.name}</span>
                <span className="room-list-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Material Options Section */}
      <div className="material-options-section">
        <h2 className="material-options-title">Выберите технологию строительства</h2>
        <div className="material-options-grid">
          {/* Каркасный дом */}
          <div className="material-card">
            <h3 className="material-card-title">Каркасный дом</h3>
            <p className="material-card-description">
              Уютный каркасный дом, готовый для постоянного проживания. В доме будет тепло зимой и комфортно летом. В доме уже есть внешняя и внутренняя отделка.
            </p>
            <div className="material-card-price">от 5.6 ₽ млн</div>
            <button className="material-card-btn">Получить Смету</button>
            <ul className="material-card-features">
              <li>Фундамент - Железобетонные сваи</li>
              <li>Каркас - строганая доска камерной сушки</li>
              <li>Перекрестное утепление 200мм</li>
              <li>Влаговетрозащитные пленки</li>
              <li>Внутренняя отделка</li>
              <li>Внешняя отделка - Имитация бруса</li>
            </ul>
          </div>

          {/* Газобетонный дом */}
          <div className="material-card">
            <h3 className="material-card-title">Газобетонный дом</h3>
            <p className="material-card-description">
              Стены толщиной 400мм не нуждаются в дополнительном утеплении. Теплый контур уже готов к внешней и внутренней отделке.
            </p>
            <div className="material-card-price">от 4.96 ₽ млн</div>
            <button className="material-card-btn">Получить Смету</button>
            <ul className="material-card-features">
              <li>Геология</li>
              <li>Фундамент - монолитная плита</li>
              <li>Закладные под инженерные системы</li>
              <li>Наружные стены - блоки Bonolit 400 мм</li>
              <li>Внутренние стены - блоки Bonolit 250 мм</li>
              <li>Перегородки - блоки Bonolit 100 мм</li>
            </ul>
          </div>

          {/* Керамический дом */}
          <div className="material-card">
            <h3 className="material-card-title">Керамический дом</h3>
            <p className="material-card-description">
              Блоки Porotherm Thermo 380мм подходят для круглогодичного проживания. Уникальная технология обладает повышенными теплотехническими характеристиками.
            </p>
            <div className="material-card-price">от 5.06 ₽ млн</div>
            <button className="material-card-btn">Получить Смету</button>
            <ul className="material-card-features">
              <li>Геология</li>
              <li>Фундамент - монолитная плита</li>
              <li>Закладные под инженерные системы</li>
              <li>Наружные стены - блоки Porotherm Thermo 38</li>
              <li>Внутренние стены - блоки Porotherm 250 мм</li>
              <li>Перегородки - блоки Porotherm Thermo 120/80 мм</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What's Included & Payment Terms Section */}
      <div className="included-payment-section">
        <div className="included-payment-grid">
          {/* Что входит в стоимость */}
          <div className="included-card">
            <h3 className="included-card-title">Что входит в стоимость</h3>
            <div className="included-card-content">
              <div className="included-group">
                <h4 className="included-group-title">Проектирование</h4>
                <ul className="included-list">
                  <li>Архитектурный проект</li>
                  <li>Конструктивный раздел</li>
                  <li>Инженерные разделы (ВК, ОВ, ЭО)</li>
                  <li>3D-визуализация экстерьера</li>
                </ul>
              </div>
              <div className="included-group">
                <h4 className="included-group-title">Строительство</h4>
                <ul className="included-list">
                  <li>Фундамент под ключ</li>
                  <li>Возведение стен и перегородок</li>
                  <li>Кровельные работы</li>
                  <li>Установка окон и дверей</li>
                  <li>Фасадная отделка</li>
                </ul>
              </div>
              <div className="included-group">
                <h4 className="included-group-title">Инженерия</h4>
                <ul className="included-list">
                  <li>Электромонтажные работы</li>
                  <li>Водоснабжение и канализация</li>
                  <li>Система отопления</li>
                  <li>Вентиляция</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Условия оплаты */}
          <div className="payment-card">
            <h3 className="payment-card-title">Условия оплаты</h3>
            <div className="payment-stages">
              <div className="payment-stage">
                <div className="payment-stage-number">1</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">10%</span>
                  <span className="payment-stage-desc">Предоплата при заключении договора</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">2</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">25%</span>
                  <span className="payment-stage-desc">После завершения фундамента</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">3</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">30%</span>
                  <span className="payment-stage-desc">После возведения стен и кровли</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">4</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">25%</span>
                  <span className="payment-stage-desc">После завершения инженерных работ</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">5</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">10%</span>
                  <span className="payment-stage-desc">При сдаче объекта</span>
                </div>
              </div>
            </div>
            <div className="payment-note">
              <span className="payment-note-icon">💡</span>
              <p>Возможна оплата в рассрочку до 12 месяцев без переплат. Также работаем с ипотекой и материнским капиталом.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="room-modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <button className="room-modal-close" onClick={() => setSelectedRoom(null)}>
              {Icons.close}
            </button>
            {(() => {
              const room = floorPlanRooms.find(r => r.id === selectedRoom)
              if (!room) return null
              return (
                <>
                  <div className="room-modal-image">
                    <img src={room.image} alt={room.name} loading="eager" decoding="async" />
                  </div>
                  <div className="room-modal-header">
                    <h2>{room.name}</h2>
                    <span className="room-modal-area">{room.area} м²</span>
                  </div>
                  <p className="room-modal-description">{room.description}</p>
                  <div className="room-modal-features">
                    <h4>Особенности:</h4>
                    <ul>
                      {room.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="room-modal-dimensions">
                    <div className="dimension-item">
                      <span className="dimension-label">Площадь</span>
                      <span className="dimension-value">{room.area} м²</span>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen-modal" onClick={() => setIsFullscreen(false)}>
          <div className="fullscreen-content" onClick={e => e.stopPropagation()}>
            <img src={houseImages[currentImageIndex]} alt="Ваш дом" className="fullscreen-image" />

            {/* Fullscreen Navigation */}
            <button className="fullscreen-nav fullscreen-prev" onClick={goToPrevImage}>
              {Icons.chevronLeft}
            </button>
            <button className="fullscreen-nav fullscreen-next" onClick={goToNextImage}>
              {Icons.chevronRight}
            </button>

            {/* Fullscreen Controls */}
            <div className="fullscreen-controls">
              <span className="fullscreen-counter">
                {currentImageIndex + 1} / {houseImages.length}
              </span>
              <button className="fullscreen-btn" onClick={() => setIsFullscreen(false)} title="Закрыть">
                {Icons.close}
              </button>
            </div>

            {/* Fullscreen Thumbnails */}
            <div className="fullscreen-thumbs">
              {houseImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`fullscreen-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img} alt={`Фото ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
