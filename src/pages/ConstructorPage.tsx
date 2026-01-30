import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedImage } from '../components/AnimatedImage'

type RoofStyle = 'natural' | 'soft' | 'flat'
type WallMaterial = 'brick' | 'gasblock'
type FacadeStyle = 'brick' | 'combined' | 'ventilated'

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

export function ConstructorPage() {
  // Основные параметры проекта
  const [_projectName] = useState('Мой проект')
  const [areaLength] = useState(10) // длина по осям (м)
  const [areaWidth] = useState(12) // ширина по осям (м)
  const [rooms, setRooms] = useState(4)
  const [bathrooms, setBathrooms] = useState(2)

  // Параметры дома
  const [floors, setFloors] = useState(2)
  const [roofStyle, setRoofStyle] = useState<RoofStyle>('natural')
  const [wallMaterial, setWallMaterial] = useState<WallMaterial>('brick')
  const [facadeStyle, setFacadeStyle] = useState<FacadeStyle>('brick')
  const [hasGarage, setHasGarage] = useState(false)
  const [hasTerrace, setHasTerrace] = useState(true)
  const [isSummer, setIsSummer] = useState(true) // Сезонность: лето/зима
  const [isDay, setIsDay] = useState(true) // Время суток: день/ночь

  // Suppress unused warnings (these are for future functionality)
  void _projectName; void wallMaterial; void setWallMaterial; void hasGarage; void setHasGarage; void hasTerrace; void setHasTerrace

  // Галерея изображений проекта по комбинации фасад + кровля
  const houseImagesByConfig: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/brick/natural/house_brick_roof1.jpg',
        '/houses/brick/natural/house_brick_roof2.jpg',
        '/houses/brick/natural/house_brick_roof3.jpg',
        '/houses/brick/natural/house_brick_roof4.jpg',
        '/houses/brick/natural/house_brick_roof5.jpg',
      ],
      soft: [
        '/houses/brick/soft/1.jpg',
        '/houses/brick/soft/2.jpg',
        '/houses/brick/soft/3.jpg',
        '/houses/brick/soft/4.jpg',
        '/houses/brick/soft/5.jpg',
      ],
      flat: [
        '/houses/brick/flat/house_brick1.jpg',
        '/houses/brick/flat/house_brick2.jpg',
        '/houses/brick/flat/house_brick3.jpg',
        '/houses/brick/flat/house_brick4.jpg',
        '/houses/brick/flat/house_brick5.jpg',
      ],
    },
    combined: {
      natural: [
        '/houses/combined/natural/house_roof1.jpg',
        '/houses/combined/natural/house_roof2.jpg',
        '/houses/combined/natural/house_roof3.jpg',
        '/houses/combined/natural/house_roof4.jpg',
        '/houses/combined/natural/house_roof5.jpg',
      ],
      soft: [
        '/houses/combined/soft/1.jpg',
        '/houses/combined/soft/2.jpg',
        '/houses/combined/soft/3.jpg',
        '/houses/combined/soft/4.jpg',
        '/houses/combined/soft/5.jpg',
      ],
      flat: [
        '/houses/combined/flat/house1.jpg',
        '/houses/combined/flat/house2.jpg',
        '/houses/combined/flat/house3.jpg',
        '/houses/combined/flat/house4.jpg',
        '/houses/combined/flat/house5.jpg',
      ],
    },
    ventilated: {
      natural: [
        '/houses/ventilated/natural/house_vent_roof1.jpg',
        '/houses/ventilated/natural/house_vent_roof2.jpg',
        '/houses/ventilated/natural/house_vent_roof3.jpg',
        '/houses/ventilated/natural/house_vent_roof4.jpg',
        '/houses/ventilated/natural/house_vent_roof5.jpg',
      ],
      soft: [
        '/houses/ventilated/soft/1.jpg',
        '/houses/ventilated/soft/2.jpg',
        '/houses/ventilated/soft/3.jpg',
        '/houses/ventilated/soft/4.jpg',
        '/houses/ventilated/soft/5.jpg',
      ],
      flat: [
        '/houses/ventilated/flat/house_vent1.jpg',
        '/houses/ventilated/flat/house_vent2.jpg',
        '/houses/ventilated/flat/house_vent3.jpg',
        '/houses/ventilated/flat/house_vent4.jpg',
        '/houses/ventilated/flat/house_vent5.jpg',
      ],
    },
  }

  // Текущие изображения на основе выбранного фасада и кровли
  const houseImages = houseImagesByConfig[facadeStyle][roofStyle]

  // Внешние URL для API анимации (Cloudinary - без сжатия, оригинальное качество)
  const houseImagesExternal: Record<string, string> = {
    // Комбинированный фасад
    '/houses/house1.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house1_qys0gs.jpg',
    '/houses/house2.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house2_lsg8yf.jpg',
    '/houses/house3.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house3_btut5t.jpg',
    '/houses/house4.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691540/house4_tigzup.jpg',
    '/houses/house5.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house5_ow5onz.jpg',
    // TODO: добавить URL для кирпичного и вентилируемого фасадов
  }

  // Pre-generated local videos (from scripts/generate-animations.js)
  const houseVideos: Record<string, string | undefined> = {
    '/houses/house1.jpg': '/videos/house1.mp4',
    '/houses/house2.jpg': undefined,
    '/houses/house3.jpg': undefined,
    '/houses/house4.jpg': undefined,
    '/houses/house5.jpg': undefined,
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('about')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const svgRef = useRef<HTMLObjectElement>(null)

  // Сброс индекса изображения при смене фасада или кровли
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [facadeStyle, roofStyle])

  // Обработка кликов на комнаты в SVG
  useEffect(() => {
    const svgObject = svgRef.current
    if (!svgObject) return

    const handleLoad = () => {
      const svgDoc = svgObject.contentDocument
      if (!svgDoc) return

      const clickableRooms = svgDoc.querySelectorAll('.room-clickable')
      clickableRooms.forEach((room) => {
        const roomId = room.getAttribute('data-room')

        room.addEventListener('click', (e: Event) => {
          e.stopPropagation()
          if (roomId) setSelectedRoom(roomId)
        })

        room.addEventListener('mouseenter', () => {
          ;(room as SVGRectElement).style.fill = 'rgba(46, 90, 60, 0.2)'
        })

        room.addEventListener('mouseleave', () => {
          ;(room as SVGRectElement).style.fill = 'transparent'
        })
      })
    }

    svgObject.addEventListener('load', handleLoad)
    // Если уже загружен
    if (svgObject.contentDocument) handleLoad()

    return () => svgObject.removeEventListener('load', handleLoad)
  }, [])

  // Данные комнат для планировки согласно plan.pdf
  // Позиции в процентах относительно изображения плана (viewBox: 230 175 680 480)
  const floorPlanRooms = [
    // Верхний ряд (слева направо)
    { id: 'boiler', name: 'Котельная', area: 6.92, description: 'Техническое помещение', features: ['Газовый котёл', 'Бойлер', 'Вентиляция'], image: '/rooms/boiler.jpg' },
    { id: 'bedroom-parents', name: 'Спальня', area: 13.83, description: 'Спальня родителей', features: ['Большое окно', 'Гардеробная зона'], image: '/rooms/bedroom.jpg' },

    // Второй ряд
    { id: 'wardrobe', name: 'Гардероб', area: 9.12, description: 'Вместительный гардероб', features: ['Системы хранения', 'Освещение', 'Зеркало'], image: '/rooms/hall.jpg' },
    { id: 'bathroom-small', name: 'С/У', area: 6.08, description: 'Гостевой санузел', features: ['Унитаз', 'Раковина', 'Зеркало'], image: '/rooms/bathroom.jpg' },
    { id: 'kitchen', name: 'Кухня', area: 11.88, description: 'Функциональная кухня', features: ['Современная техника', 'Рабочая зона', 'Кухонный остров'], image: '/rooms/kitchen.jpg' },
    { id: 'storage', name: 'Кладовая', area: 6.08, description: 'Кладовая для хранения', features: ['Стеллажи', 'Вентиляция'], image: '/rooms/storage.jpg' },

    // Средний ряд
    { id: 'porch', name: 'Крыльцо', area: 8.07, description: 'Входная группа', features: ['Навес', 'Освещение'], image: '/rooms/entrance.jpg' },
    { id: 'hallway', name: 'Прихожая', area: 10.87, description: 'Просторная прихожая', features: ['Встроенные шкафы', 'Зеркало', 'Банкетка'], image: '/rooms/entrance.jpg' },
    { id: 'living-room', name: 'Кухня-гостиная', area: 43.60, description: 'Просторная кухня-гостиная - сердце дома', features: ['Открытая планировка', 'Зона отдыха', 'Обеденная зона', 'Выход на террасу'], image: '/rooms/living.jpg' },
    { id: 'corridor', name: 'Коридор', area: 4.63, description: 'Коридор', features: ['Освещение'], image: '/rooms/hall.jpg' },
    { id: 'bathroom-large', name: 'С/У', area: 8.47, description: 'Основной санузел', features: ['Ванна', 'Душевая', 'Раковина', 'Тёплый пол'], image: '/rooms/bathroom.jpg' },

    // Нижний ряд
    { id: 'bedroom-left', name: 'Спальня', area: 16.72, description: 'Главная спальня', features: ['Большое окно', 'Гардеробная зона', 'Выход на террасу'], image: '/rooms/bedroom.jpg' },
    { id: 'terrace', name: 'Терраса', area: 26.27, description: 'Просторная терраса для отдыха', features: ['Зона барбекю', 'Мебель для отдыха', 'Освещение'], image: '/rooms/terrace.jpg' },
    { id: 'bedroom-right', name: 'Спальня', area: 16.72, description: 'Вторая спальня', features: ['Большое окно', 'Рабочая зона'], image: '/rooms/bedroom.jpg' },
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

  const _roofLabels: Record<RoofStyle, { label: string }> = {
    natural: { label: 'Натуральная черепица' },
    soft: { label: 'Мягкая черепица' },
    flat: { label: 'Плоская кровля' }
  }

  const materialLabels: Record<WallMaterial, { label: string; color: string }> = {
    brick: { label: 'Кирпич', color: '#c84c32' },
    gasblock: { label: 'Газобетон', color: '#a8a8a8' }
  }

  const _facadeLabels: Record<FacadeStyle, { label: string; desc: string }> = {
    brick: { label: 'Кирпичный', desc: 'Классический кирпичный фасад' },
    combined: { label: 'Комбинированный', desc: 'С отделкой под дерево' },
    ventilated: { label: 'Вентилируемый', desc: 'Вентилируемый фасад' }
  }

  // Suppress unused warnings (these are for future functionality)
  void _roofLabels; void _facadeLabels

  const navTabs = [
    { id: 'about', label: 'О проекте' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'plans', label: 'Планировки' },
    { id: 'config', label: 'Комплектация' },
    { id: 'video', label: 'Видео' },
  ]

  return (
    <div className={`premium-constructor ${darkMode ? 'dark-theme' : ''}`}>
      {/* Clean Navigation Header */}
      <header className="clean-header">
        <div className="clean-header-top">
          <Link to="/" className="clean-logo">
            <span className="logo-icon">{Icons.house}</span>
            <span className="logo-text">Родные Края</span>
          </Link>

          {/* Theme Toggle */}
          <button
            className={`theme-toggle-btn ${darkMode ? 'dark' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Переключить тему"
          >
            <div className="theme-toggle-track">
              <span className="theme-icon sun">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              </span>
              <span className="theme-icon moon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              </span>
              <div className="theme-toggle-thumb"></div>
            </div>
          </button>

          {/* Desktop Back Button */}
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
              <AnimatedImage
                key={currentImageIndex}
                src={houseImages[currentImageIndex]}
                externalSrc={houseImagesExternal[houseImages[currentImageIndex]]}
                localVideo={houseVideos[houseImages[currentImageIndex]]}
                alt="Ваш дом"
                className="slider-main-image"
                enableAnimation={true}
              />

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
              {/* Area + Material Row */}
              <div className="spec-row-double">
                <div className="spec-block">
                  <span className="spec-label">Площадь по осям</span>
                  <span className="spec-value-large">{totalArea} м<sup>2</sup></span>
                </div>
                <div className="spec-block">
                  <span className="spec-label">Материал стен</span>
                  <span className="spec-value-medium">{materialLabels[wallMaterial].label}</span>
                </div>
              </div>

              {/* Параметры настройки */}
              <div className="config-params">
                {/* Фасад */}
                <div className="config-row">
                  <span className="config-label">Фасад</span>
                  <div className="custom-select-wrapper">
                    <select
                      className="custom-select"
                      value={facadeStyle}
                      onChange={(e) => setFacadeStyle(e.target.value as FacadeStyle)}
                    >
                      <option value="brick">Кирпичный</option>
                      <option value="combined">Комбинированный</option>
                      <option value="ventilated">Вентилируемый</option>
                    </select>
                    <span className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Кровля */}
                <div className="config-row">
                  <span className="config-label">Кровля</span>
                  <div className="custom-select-wrapper">
                    <select
                      className="custom-select"
                      value={roofStyle}
                      onChange={(e) => setRoofStyle(e.target.value as RoofStyle)}
                    >
                      <option value="natural">Натуральная черепица</option>
                      <option value="soft">Мягкая черепица</option>
                      <option value="flat">Плоская кровля</option>
                    </select>
                    <span className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Этажность */}
                <div className="config-row">
                  <span className="config-label">Этажность</span>
                  <div className="config-stepper">
                    <button onClick={() => setFloors(Math.max(1, floors - 1))}>−</button>
                    <span>{floors}</span>
                    <button onClick={() => setFloors(Math.min(4, floors + 1))}>+</button>
                  </div>
                </div>

                {/* Сезон */}
                <div className="config-toggle-row" onClick={() => setIsSummer(!isSummer)}>
                  <div className="toggle-info">
                    <span className="toggle-icon-box">
                      {isSummer ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="5"/>
                          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                        </svg>
                      )}
                    </span>
                    <span className="toggle-label">{isSummer ? 'Лето' : 'Зима'}</span>
                  </div>
                  <div className="toggle-right">
                    <div className={`custom-toggle ${isSummer ? 'active' : ''}`}>
                      <div className="toggle-track-inner"></div>
                      <div className="toggle-thumb-inner"></div>
                    </div>
                  </div>
                </div>

                {/* Время суток */}
                <div className="config-toggle-row" onClick={() => setIsDay(!isDay)}>
                  <div className="toggle-info">
                    <span className="toggle-icon-box">
                      {isDay ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="5"/>
                          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                        </svg>
                      )}
                    </span>
                    <span className="toggle-label">{isDay ? 'День' : 'Ночь'}</span>
                  </div>
                  <div className="toggle-right">
                    <div className={`custom-toggle ${isDay ? 'active' : ''}`}>
                      <div className="toggle-track-inner"></div>
                      <div className="toggle-thumb-inner"></div>
                    </div>
                  </div>
                </div>
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
              </div>
              <div className="price-current">
                <span className="price-value">{(estimatedCost / 1000000).toFixed(2)} млн ₽</span>
              </div>
            </div>

          </div>

          {/* CTA Buttons - Outside card */}
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
          <span className="floor-plan-area">189.26 м²</span>
        </div>
        <div className="floor-plan-container">
          <div className="floor-plan-wrapper">
            {/* Floor Plan SVG with Clickable Areas */}
            <div className="floor-plan-image-container">
              <object
                ref={svgRef}
                data="/floor-plan.svg"
                type="image/svg+xml"
                className="floor-plan-image"
                aria-label="План этажа"
              />
            </div>

            {/* Floor indicator */}
            <div className="floor-indicator">
              <span className="floor-label">1 этаж</span>
              <span className="floor-total-area">189.05 м²</span>
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
