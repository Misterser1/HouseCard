import { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { AnimatedImage } from '../components/AnimatedImage'
import './ConstructorV1.css'

type RoofStyle = 'natural' | 'soft' | 'flat'
type WallMaterial = 'brick' | 'gasblock'
type FacadeStyle = 'brick' | 'combined' | 'ventilated'

// SVG Icons
const Icons = {
  house: (
    <svg viewBox="0 274.42 22.58 22.58" fill="currentColor">
      <path d="m 15.948527,281.05091 v -0.33156 c 1.3e-5,-0.54755 -0.449703,-0.99985 -0.997257,-0.99985 h -1.33206 v -0.32895 c 0,-0.15838 -0.06741,-0.23325 -0.197346,-0.30828 -2.161878,-0.97188 -4.3264716,-1.94673 -6.4883466,-2.91966 -0.1046928,-0.43891 -0.5019052,-0.77036 -0.9833047,-0.77025 -0.5045157,0.0128 -0.9123895,0.39071 -0.976154,0.86932 l -3.9272051,4.91674 c -0.0815351,0.0999 -0.0980014,0.23799 -0.042256,0.3543 l 1.0005075,1.99777 c 0.056291,0.11259 0.1712492,0.18374 0.2970941,0.18398 h 1.3314093 v 0.9979 c 0,0.61617 0.4263307,1.13897 0.997908,1.28851 v 6.0336 c -0.5475553,0 -0.9979212,0.4523 -0.997908,0.99985 v 0.99726 h -0.33415 c -0.3637344,0 -0.6657013,0.30264 -0.6657046,0.66636 v 0.6657 H 1.3023444 c -0.1840839,3.7e-4 -0.33292228,0.15007 -0.33220332,0.33415 6.6575e-4,0.18307 0.14913462,0.3312 0.33220332,0.33155 H 21.273484 c 0.18383,7.3e-4 0.333435,-0.14772 0.334152,-0.33155 7.33e-4,-0.18484 -0.149306,-0.33488 -0.334152,-0.33415 h -0.332202 v -1.66361 c 0.363719,0 0.66636,-0.30199 0.666354,-0.66571 v -0.66571 c 6e-6,-0.36373 -0.30262,-0.66635 -0.666354,-0.66635 v -1.66295 c 0.363703,0 0.66636,-0.30265 0.666354,-0.66637 v -0.66569 c 6e-6,-0.36372 -0.30262,-0.66571 -0.666354,-0.66571 v -1.66361 h 0.332202 c 0.184846,7.3e-4 0.334876,-0.14931 0.334152,-0.33416 -7.32e-4,-0.18382 -0.150322,-0.33227 -0.334152,-0.33155 h -0.332202 v -0.6657 c 7.32e-4,-0.18383 -0.147723,-0.33344 -0.331552,-0.33416 -0.184847,-7.2e-4 -0.334876,0.14931 -0.334153,0.33416 v 0.6657 h -3.329173 v -0.6657 c 7.32e-4,-0.18383 -0.147723,-0.33344 -0.331553,-0.33416 -0.184846,-7.2e-4 -0.334876,0.14931 -0.334152,0.33416 v 0.99725 1.99777 h -5.324988 c -0.363719,0 -0.665709,0.30199 -0.665704,0.66571 v 0.66569 c -5e-6,0.36372 0.301985,0.66637 0.665704,0.66637 v 1.66295 c -0.363719,0 -0.665709,0.30262 -0.665704,0.66635 v 0.66571 c -5e-6,0.36372 0.30197,0.66571 0.665704,0.66571 v 1.66361 H 9.2927501 v -0.6657 c -2.5e-6,-0.36372 -0.3026204,-0.66636 -0.6663543,-0.66636 H 8.2922431 v -0.99726 c 1.39e-5,-0.54755 -0.4497035,-0.99985 -0.9972575,-0.99985 2.14e-5,-2.01976 2.5e-6,-4.21583 0,-5.99071 H 7.626538 c 0.3637213,0 0.6657101,-0.30197 0.6657051,-0.6657 8.68e-5,-0.55533 0,-1.10893 0,-1.66361 h 3.3298239 v 0.6657 c -0.363722,0 -0.666356,0.30264 -0.666356,0.66636 v 1.66296 c 0,0.36372 0.302634,0.66635 0.666356,0.66635 h 3.329173 c 0.36372,0 0.665705,-0.30263 0.665705,-0.66635 v -1.66296 c 0,-0.36372 -0.301985,-0.66636 -0.665705,-0.66636 v -0.6657 h 4.32708 c 0.306731,0 0.433317,-0.24411 0.275072,-0.51819 l -1.329459,-1.99777 c -0.0627,-0.10857 -0.172813,-0.14759 -0.276343,-0.14759 z M 5.9628634,276.0582 c 0.187769,0 0.3322028,0.14637 0.3322015,0.33415 -2.5e-6,0.18778 -0.144425,0.33156 -0.3322015,0.33156 -0.1877728,0 -0.3315511,-0.14381 -0.3315511,-0.33156 -3.8e-6,-0.18779 0.1437783,-0.33415 0.3315511,-0.33415 z m 0.883488,0.79572 6.1070596,2.74734 v 0.11838 h -1.331408 c -0.547556,0 -0.997921,0.4523 -0.997907,0.99985 v 0.33156 H 7.8371074 c -0.1539885,-0.135 -0.3386136,-0.23558 -0.5421847,-0.28865 v -2.04068 c 0,-0.3637 -0.3019712,-0.66569 -0.6657051,-0.66569 H 6.2950649 v -0.72357 c 0.2374345,-0.0848 0.434728,-0.25768 0.5512865,-0.47847 z m -1.6402087,0.18528 c 0.1128574,0.13169 0.2590889,0.23392 0.4251696,0.2932 v 0.72357 h -0.334154 c -0.3637342,0 -0.6657045,0.30198 -0.6657045,0.66569 v 1.99777 h -0.331551 c -0.242373,0 -0.4575388,0.13439 -0.5740404,0.33155 H 1.9952898 Z m 0.091018,1.68246 H 6.62922 v 0.15408 l -1.3320593,0.88675 z m 1.3320593,0.95435 v 1.04342 H 5.2971608 v -0.15472 z m 4.992785,0.70928 h 1.662961 1.666212 c 0.187775,0 0.331557,0.14637 0.331552,0.33414 v 0.33155 h -3.994878 v -0.33155 c -5e-6,-0.18777 0.146378,-0.33414 0.334153,-0.33414 z m -7.3220998,0.99985 h 2.6608647 c 0.2498286,0 0.464591,0.13218 0.5785907,0.33155 H 5.9628634 c -0.1830602,7.3e-4 -0.3311788,0.14914 -0.3315511,0.33221 v 1.66556 c 0,0.54754 0.4503564,0.9979 0.9979053,0.9979 h 0.9972575 v 0.66571 H 4.9656075 c -0.371603,0 -0.6657047,-0.29411 -0.6657047,-0.66571 z m -2.4573889,0.33155 h 1.1682351 l -0.6676551,1.0018 z m 6.407408,0 h 1.0856715 l -0.88869,1.33206 H 8.2921815 v -0.99141 c 0,-0.12278 -0.014731,-0.23466 -0.042257,-0.34065 z m 2.3286667,0 h 1.420473 l -0.709911,1.06487 z m 2.663469,0 h 1.417873 l -0.708612,1.06292 z m 2.663468,0 h 1.417873 l -0.708611,1.06292 z m -12.2719798,0.26654 v 1.06552 H 2.9236375 Z m 6.3235457,6.7e-4 0.7105611,1.06486 H 9.2465315 Z m 2.6634681,0 0.709261,1.06486 h -1.419822 z m 2.662168,0.003 0.709912,1.06292 h -1.419176 z m 2.66347,0 0.709911,1.06292 h -1.419174 z m -11.6511327,0.39722 h 1.3314102 v 1.66241 h -0.99726 c -0.1877715,0 -0.3341527,-0.14378 -0.3341527,-0.33156 z m 5.9926427,1.33141 h 1.997764 v 0.66571 H 12.28771 Z m -0.665705,1.33206 h 3.329173 v 1.66296 h -3.329173 z m -6.3248443,0.99726 H 6.62922 v 1.04276 l -1.3320618,-0.8886 z m 11.6491813,0.33414 h 3.329173 v 1.66361 h -3.329173 z m -11.6491813,0.62085 1.0648675,0.70992 -1.0648675,0.70991 z m 1.3320593,1.33142 v 1.41851 l -1.0648687,-0.70861 z m 4.326431,0.37705 h 9.98557 v 0.66571 h -9.98557 z m -5.6584903,0.95501 1.0629163,0.7086 -0.581191,0.38812 c -0.1537986,0.10152 -0.1957688,0.30879 -0.09361,0.46222 0.1017867,0.15357 0.3089721,0.19525 0.4622196,0.093 l 0.4817266,-0.32049 v 1.04081 H 5.2971633 Z m 6.3248443,0.37705 h 3.329173 v 1.66296 h -3.329173 z m 3.994878,0 h 0.663754 v 1.66296 h -0.663754 z m 1.329459,0 h 3.329173 v 1.66296 h -3.329173 z m -5.990691,2.32932 h 9.98557 v 0.6657 h -9.98557 z m -6.3241948,0.33156 h 2.663469 c 0.1877741,0 0.3315562,0.14637 0.3315524,0.33414 v 0.99726 H 6.96077 v -0.33155 c 7.322e-4,-0.18384 -0.1477223,-0.33344 -0.3315524,-0.33416 -0.1848466,-7.3e-4 -0.3348761,0.1493 -0.3341527,0.33416 v 0.33155 H 5.6313123 v -0.33155 c 6.654e-4,-0.18486 -0.1493074,-0.33488 -0.334154,-0.33416 -0.1838275,7.3e-4 -0.3322697,0.15032 -0.3315508,0.33416 v 0.33155 H 4.2999028 v -0.99726 c -6.7e-6,-0.18777 0.1437756,-0.33414 0.331551,-0.33414 z m 6.9905488,0.99985 h 3.329173 v 1.66361 h -3.329173 z m 3.994878,0 h 0.663754 v 1.66361 h -0.663754 z m 1.329459,0 h 3.329173 v 1.66361 H 16.94634 Z m -13.6469468,0.99735 h 5.3269364 v 0.66571 H 3.2993953 Z"/>
    </svg>
  ),
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9"/>
      <polyline points="9 21 3 21 3 15"/>
      <line x1="21" y1="3" x2="14" y2="10"/>
      <line x1="3" y1="21" x2="10" y2="14"/>
    </svg>
  ),
  exterior: (
    <svg viewBox="0 0 256 256" fill="currentColor">
      <path d="M239.98828,210h-18V115.53882a14.03222,14.03222,0,0,0-4.582-10.35889L137.40039,32.44458a13.94491,13.94491,0,0,0-18.83594.001L38.57031,105.17969a14.02742,14.02742,0,0,0-4.582,10.35888V210h-18a6,6,0,0,0,0,12h224a6,6,0,1,0,0-12Zm-194-94.46143a2.00429,2.00429,0,0,1,.6543-1.48l79.99414-72.73437a1.99291,1.99291,0,0,1,2.6914-.00049L209.333,114.05786a2.00817,2.00817,0,0,1,.65527,1.481V210H157.98242V151.9917a6.00014,6.00014,0,0,0-6-6h-48a6.00015,6.00015,0,0,0-6,6V210H45.98828ZM145.98242,210h-36V157.9917h36Z"/>
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M23,30H21V28a3.0033,3.0033,0,0,0-3-3H14a3.0033,3.0033,0,0,0-3,3v2H9V28a5.0059,5.0059,0,0,1,5-5h4a5.0059,5.0059,0,0,1,5,5Z"/>
      <path d="M16,13a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,16,11Z"/>
      <path d="M30,30H28V14.4639L16,4.31,4,14.4639V30H2V14a1,1,0,0,1,.354-.7634l13-11a1,1,0,0,1,1.292,0l13,11A1,1,0,0,1,30,14Z"/>
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
}

// Room data for floor plan (14 помещений по схеме)
const floorPlanRooms = [
  { id: 'hallway', name: 'Прихожая', area: 10.87, description: 'Просторная прихожая с местом для верхней одежды и обуви', features: ['Встроенные шкафы', 'Зеркало в полный рост', 'Банкетка'], image: '/rooms/1.%20Прихожая.jpg' },
  { id: 'corridor', name: 'Коридор', area: 9.12, description: 'Связующее пространство между комнатами', features: ['Освещение', 'Доступ ко всем комнатам'], image: '/rooms/1.%20Прихожая.jpg' },
  { id: 'living-room', name: 'Кухня-гостиная', area: 43.60, description: 'Просторная кухня-гостиная — сердце дома для семейных встреч', features: ['Открытая планировка', 'Зона отдыха', 'Обеденная зона', 'Выход на террасу'], image: '/rooms/3.Кухня-столовая.jpg' },
  { id: 'bedroom-parents', name: 'Спальня', area: 13.83, description: 'Уютная спальня с выходом в гардеробную', features: ['Большое окно', 'Гардеробная зона', 'Спальное место'], image: '/rooms/5.%20Спальня.jpg' },
  { id: 'wardrobe', name: 'Гардероб', area: 6.08, description: 'Вместительная гардеробная комната', features: ['Системы хранения', 'Освещение', 'Зеркало'], image: '/rooms/2.Гардероб.jpg' },
  { id: 'bedroom-left', name: 'Спальня', area: 16.72, description: 'Главная спальня с панорамным видом', features: ['Большое окно', 'Рабочая зона', 'Выход на террасу'], image: '/rooms/5.%20Спальня.jpg' },
  { id: 'bedroom-right', name: 'Спальня', area: 11.88, description: 'Гостевая спальня или детская комната', features: ['Естественное освещение', 'Место для кровати', 'Рабочий уголок'], image: '/rooms/6.Спальня.jpg' },
  { id: 'bathroom-large', name: 'Ванная', area: 8.47, description: 'Основная ванная комната с современным оснащением', features: ['Ванна', 'Душевая кабина', 'Раковина', 'Тёплый пол'], image: '/rooms/7.Ванная.jpg' },
  { id: 'bathroom-small', name: 'С/У', area: 4.63, description: 'Компактный гостевой санузел', features: ['Унитаз', 'Раковина', 'Зеркало'], image: '/rooms/9.Сан.узел.jpg' },
  { id: 'boiler', name: 'Котельная', area: 6.92, description: 'Техническое помещение для инженерных систем', features: ['Газовый котёл', 'Бойлер', 'Вентиляция'], image: '/rooms/8.Кладовая.jpg' },
  { id: 'storage', name: 'Кладовая', area: 8.07, description: 'Помещение для хранения вещей и инвентаря', features: ['Стеллажи', 'Освещение', 'Вентиляция'], image: '/rooms/8.Кладовая.jpg' },
  { id: 'terrace', name: 'Терраса', area: 26.27, description: 'Просторная терраса для отдыха на свежем воздухе', features: ['Зона барбекю', 'Мебель для отдыха', 'Освещение'], image: '/rooms/10.%20Терраса.jpg' },
  { id: 'porch', name: 'Крыльцо', area: 4.50, description: 'Входная группа с навесом', features: ['Навес', 'Освещение', 'Ступени'], image: '/rooms/11.Крыльцо.jpg' },
  { id: 'kitchen', name: 'Кухня', area: 12.04, description: 'Функциональная рабочая зона кухни', features: ['Современная техника', 'Рабочая поверхность', 'Кухонный остров'], image: '/rooms/4.%20Кухня.jpg' },
]

// Video mapping for rooms
const roomVideos: Record<string, string> = {
  'hallway': '/videos/rooms/1. Прихожая.mp4',
  'corridor': '/videos/rooms/1. Прихожая.mp4',
  'living-room': '/videos/rooms/3.Кухня-столовая.mp4',
  'bedroom-parents': '/videos/rooms/5. Спальня.mp4',
  'wardrobe': '/videos/rooms/2.Гардероб.mp4',
  'bedroom-left': '/videos/rooms/5. Спальня.mp4',
  'bedroom-right': '/videos/rooms/6.Спальня.mp4',
  'bathroom-large': '/videos/rooms/7.Ванная.mp4',
  'bathroom-small': '/videos/rooms/9.Сан.узел.mp4',
  'boiler': '/videos/rooms/8.Кладовая.mp4',
  'storage': '/videos/rooms/8.Кладовая.mp4',
  'terrace': '/videos/rooms/9.Терраса.mp4',
  'porch': '/videos/rooms/11.Крыльцо.mp4',
  'kitchen': '/videos/rooms/4. Кухня.mp4',
}

function FloorPlan3DModel() {
  const { scene } = useGLTF('/floor-plan.glb')
  return <primitive object={scene} scale={1} position={[-8.5, 0, 0]} />
}

export function ConstructorV1() {
  // Основные параметры проекта
  const [areaLength] = useState(10)
  const [areaWidth] = useState(12)
  const [rooms] = useState(4)
  const [bathrooms] = useState(2)

  // Interior stories state (mobile)
  const [storyIndex, setStoryIndex] = useState<number | null>(null)
  const [storyProgress, setStoryProgress] = useState(0)

  // Floor plan state
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  const [is3DView, setIs3DView] = useState(false)

  // Swipe for floor plan 2D/3D toggle on mobile
  const floorPlanTouchStartX = useRef(0)
  const floorPlanTouchStartY = useRef(0)

  const handleFloorPlanSwipeStart = (e: React.TouchEvent) => {
    floorPlanTouchStartX.current = e.touches[0].clientX
    floorPlanTouchStartY.current = e.touches[0].clientY
  }

  const handleFloorPlanSwipeEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - floorPlanTouchStartX.current
    const deltaY = touch.clientY - floorPlanTouchStartY.current

    // Horizontal swipe → switch view
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0 && !is3DView) {
        setIs3DView(true)
      } else if (deltaX > 0 && is3DView) {
        setIs3DView(false)
      }
      return
    }

    // Tap (no significant movement) → pass click through to SVG room
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && !is3DView) {
      const svgObject = svgRef.current
      if (!svgObject?.contentDocument) return

      const rect = svgObject.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      const element = svgObject.contentDocument.elementFromPoint(x, y)
      if (element) {
        const roomEl = (element.closest('.room-clickable') || element) as SVGElement
        const roomId = roomEl.getAttribute('data-room')
        if (roomId) {
          handleSvgRoomClick(roomId)
        }
      }
    }
  }

  // Story auto-progress (mobile interior)
  useEffect(() => {
    if (storyIndex === null) return
    setStoryProgress(0)
    const timer = setInterval(() => {
      setStoryProgress(prev => {
        if (prev >= 100) {
          setStoryIndex(i => {
            if (i === null) return null
            return i < floorPlanRooms.length - 1 ? i + 1 : null
          })
          return 0
        }
        return prev + 2
      })
    }, 60)
    return () => clearInterval(timer)
  }, [storyIndex])

  const svgRef = useRef<HTMLObjectElement>(null)

  // Обработка кликов на комнаты в SVG
  const handleSvgRoomClick = useCallback((roomId: string) => {
    setSelectedRoom(roomId)
  }, [])

  // Функция подсветки комнаты на SVG (при hover на кнопку слева)
  const highlightRoom = useCallback((roomId: string, highlight: boolean) => {
    const svgObject = svgRef.current
    if (!svgObject?.contentDocument) return

    const room = svgObject.contentDocument.querySelector(`[data-room="${roomId}"]`) as SVGRectElement | null
    if (room) {
      room.style.fill = highlight ? 'rgba(46, 90, 60, 0.2)' : 'transparent'
    }
  }, [])

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
          if (roomId) handleSvgRoomClick(roomId)
        })

        room.addEventListener('mouseenter', () => {
          ;(room as SVGRectElement).style.fill = 'rgba(46, 90, 60, 0.2)'
          if (roomId) setHoveredRoom(roomId)
        })

        room.addEventListener('mouseleave', () => {
          ;(room as SVGRectElement).style.fill = 'transparent'
          setHoveredRoom(null)
        })
      })
    }

    svgObject.addEventListener('load', handleLoad)
    // Если уже загружен
    if (svgObject.contentDocument) handleLoad()

    return () => svgObject.removeEventListener('load', handleLoad)
  }, [handleSvgRoomClick, is3DView])

  // Параметры дома
  const [isExterior, _setIsExterior] = useState(true)
  const [roofStyle, setRoofStyle] = useState<RoofStyle>('natural')
  const [_wallMaterial] = useState<WallMaterial>('brick')
  const [facadeStyle, setFacadeStyle] = useState<FacadeStyle>('brick')
  const [isDay, setIsDay] = useState(true)

  // Custom dropdown states
  const [facadeDropdownOpen, setFacadeDropdownOpen] = useState(false)
  const [roofDropdownOpen, setRoofDropdownOpen] = useState(false)

  // Галерея изображений (ДЕНЬ)
  const houseImagesByConfigDay: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/brick/natural/house_brick_roof1.jpg',
        '/houses/brick/natural/house_brick_roof2.jpg',
        '/houses/brick/natural/house_brick_roof3.jpg',
        '/houses/brick/natural/house_brick_roof4.jpg',
        '/houses/brick/natural/house_brick_roof5.jpg',
      ],
      soft: [
        '/houses/brick/soft/house_brick_soft1.jpg',
        '/houses/brick/soft/house_brick_soft2.jpg',
        '/houses/brick/soft/house_brick_soft3.jpg',
        '/houses/brick/soft/house_brick_soft4.jpg',
        '/houses/brick/soft/house_brick_soft5.jpg',
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
        '/houses/combined/soft/house_combined_soft1.jpg',
        '/houses/combined/soft/house_combined_soft2.jpg',
        '/houses/combined/soft/house_combined_soft3.jpg',
        '/houses/combined/soft/house_combined_soft4.jpg',
        '/houses/combined/soft/house_combined_soft5.jpg',
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
        '/houses/ventilated/soft/house_vent_soft1.jpg',
        '/houses/ventilated/soft/house_vent_soft2.jpg',
        '/houses/ventilated/soft/house_vent_soft3.jpg',
        '/houses/ventilated/soft/house_vent_soft4.jpg',
        '/houses/ventilated/soft/house_vent_soft5.jpg',
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

  // Галерея изображений (НОЧЬ)
  const houseImagesByConfigNight: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/night/brick/natural/house_brick_roof_night1.jpg',
        '/houses/night/brick/natural/house_brick_roof_night2.jpg',
        '/houses/night/brick/natural/house_brick_roof_night3.jpg',
        '/houses/night/brick/natural/house_brick_roof_night4.jpg',
        '/houses/night/brick/natural/house_brick_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/brick/soft/house_brick_soft_night1.jpg',
        '/houses/night/brick/soft/house_brick_soft_night2.jpg',
        '/houses/night/brick/soft/house_brick_soft_night3.jpg',
        '/houses/night/brick/soft/house_brick_soft_night4.jpg',
        '/houses/night/brick/soft/house_brick_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/brick/flat/house_brick_night1.jpg',
        '/houses/night/brick/flat/house_brick_night2.jpg',
        '/houses/night/brick/flat/house_brick_night3.jpg',
        '/houses/night/brick/flat/house_brick_night4.jpg',
        '/houses/night/brick/flat/house_brick_night5.jpg',
      ],
    },
    combined: {
      natural: [
        '/houses/night/combined/natural/house_roof_night1.jpg',
        '/houses/night/combined/natural/house_roof_night2.jpg',
        '/houses/night/combined/natural/house_roof_night3.jpg',
        '/houses/night/combined/natural/house_roof_night4.jpg',
        '/houses/night/combined/natural/house_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/combined/soft/house_combined_soft_night1.jpg',
        '/houses/night/combined/soft/house_combined_soft_night2.jpg',
        '/houses/night/combined/soft/house_combined_soft_night3.jpg',
        '/houses/night/combined/soft/house_combined_soft_night4.jpg',
        '/houses/night/combined/soft/house_combined_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/combined/flat/house_combined_night1.jpg',
        '/houses/night/combined/flat/house_combined_night2.jpg',
        '/houses/night/combined/flat/house_combined_night3.jpg',
        '/houses/night/combined/flat/house_combined_night4.jpg',
        '/houses/night/combined/flat/house_combined_night5.jpg',
      ],
    },
    ventilated: {
      natural: [
        '/houses/night/ventilated/natural/house_vent_roof_night1.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night2.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night3.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night4.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/ventilated/soft/house_vent_soft_night1.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night2.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night3.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night4.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/ventilated/flat/house_vent_night1.jpg',
        '/houses/night/ventilated/flat/house_vent_night2.jpg',
        '/houses/night/ventilated/flat/house_vent_night3.jpg',
        '/houses/night/ventilated/flat/house_vent_night4.jpg',
        '/houses/night/ventilated/flat/house_vent_night5.jpg',
      ],
    },
  }

  // Интерьерные изображения по типу фасада
  const interiorImagesByFacade: Record<FacadeStyle, string[]> = {
    brick: [
      '/houses/interior/brick/1. Прихожая.jpg',
      '/houses/interior/brick/2.Гардероб.jpg',
      '/houses/interior/brick/3.Кухня-столовая.jpg',
      '/houses/interior/brick/4. Кухня.jpg',
      '/houses/interior/brick/5. Спальня.jpg',
      '/houses/interior/brick/6.Спальня.jpg',
      '/houses/interior/brick/7.Ванная.jpg',
      '/houses/interior/brick/8.Кладовая.jpg',
      '/houses/interior/brick/9.Сан.узел.jpg',
      '/houses/interior/brick/9.Терраса.jpg',
      '/houses/interior/brick/10. Терраса.jpg',
      '/houses/interior/brick/11.Крыльцо.jpg',
    ],
    combined: [
      '/houses/interior/combined/1. Прихожая.jpg',
      '/houses/interior/combined/2.Гардероб.jpg',
      '/houses/interior/combined/3.Кухня-столовая.jpg',
      '/houses/interior/combined/4. Кухня.jpg',
      '/houses/interior/combined/5. Спальня.jpg',
      '/houses/interior/combined/6.Спальня.jpg',
      '/houses/interior/combined/7.Ванная.jpg',
      '/houses/interior/combined/8.Кладовая.jpg',
      '/houses/interior/combined/9.Сан.узел.jpg',
      '/houses/interior/combined/9.Терраса.jpg',
      '/houses/interior/combined/10. Терраса.jpg',
      '/houses/interior/combined/11.Крыльцо.jpg',
    ],
    ventilated: [
      '/houses/interior/ventilated/1. Прихожая.jpg',
      '/houses/interior/ventilated/2.Гардероб.jpg',
      '/houses/interior/ventilated/3.Кухня-столовая.jpg',
      '/houses/interior/ventilated/4. Кухня.jpg',
      '/houses/interior/ventilated/5. Спальня.jpg',
      '/houses/interior/ventilated/6.Спальня.jpg',
      '/houses/interior/ventilated/7.Ванная.jpg',
      '/houses/interior/ventilated/8.Кладовая.jpg',
      '/houses/interior/ventilated/9.Сан.узел.jpg',
      '/houses/interior/ventilated/9.Терраса.jpg',
      '/houses/interior/ventilated/10. Терраса.jpg',
      '/houses/interior/ventilated/11.Крыльцо.jpg',
    ],
  }

  // Выбор изображений (только экстерьер в первой секции)
  const houseImagesByConfig = isDay ? houseImagesByConfigDay : houseImagesByConfigNight
  const houseImages = houseImagesByConfig[facadeStyle][roofStyle]

  // Видео для экстерьера
  const houseVideos: Record<string, string> = {
    '/houses/brick/natural/house_brick_roof1.jpg': '/videos/brick/natural/house_brick_roof1.mp4',
    '/houses/brick/natural/house_brick_roof2.jpg': '/videos/brick/natural/house_brick_roof2.mp4',
    '/houses/brick/natural/house_brick_roof3.jpg': '/videos/brick/natural/house_brick_roof3.mp4',
    '/houses/brick/natural/house_brick_roof4.jpg': '/videos/brick/natural/house_brick_roof4.mp4',
    '/houses/brick/natural/house_brick_roof5.jpg': '/videos/brick/natural/house_brick_roof5.mp4',
  }

  // Видео для интерьера
  const interiorVideos: Record<string, string> = {
    '/houses/interior/brick/1. Прихожая.jpg': '/videos/rooms/1. Прихожая.mp4',
    '/houses/interior/brick/2.Гардероб.jpg': '/videos/rooms/2.Гардероб.mp4',
    '/houses/interior/brick/3.Кухня-столовая.jpg': '/videos/rooms/3.Кухня-столовая.mp4',
    '/houses/interior/brick/4. Кухня.jpg': '/videos/rooms/4. Кухня.mp4',
    '/houses/interior/brick/5. Спальня.jpg': '/videos/rooms/5. Спальня.mp4',
    '/houses/interior/brick/6.Спальня.jpg': '/videos/rooms/6.Спальня.mp4',
    '/houses/interior/brick/7.Ванная.jpg': '/videos/rooms/7.Ванная.mp4',
    '/houses/interior/brick/9.Терраса.jpg': '/videos/rooms/9.Терраса.mp4',
  }

  // @ts-expect-error Reserved for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _getCurrentVideo = (imagePath: string): string | undefined => {
    if (!isExterior) {
      return interiorVideos[imagePath]
    }
    return houseVideos[imagePath]
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobilePanelHidden, setIsMobilePanelHidden] = useState(false)

  // Touch swipe state
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartTime = useRef<number | null>(null)
  const touchTarget = useRef<EventTarget | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [activePricingPackage, setActivePricingPackage] = useState(1)

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.custom-dropdown')) {
        setFacadeDropdownOpen(false)
        setRoofDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Безопасный индекс (всегда в пределах массива)
  const safeImageIndex = Math.min(currentImageIndex, houseImages.length - 1)

  // Сброс индекса при смене параметров
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [facadeStyle, roofStyle, isExterior, isDay])

  // Собираем все изображения для предзагрузки
  const allImages = useMemo(() => {
    const images: string[] = []
    // Экстерьер - день
    Object.values(houseImagesByConfigDay).forEach(roofTypes => {
      Object.values(roofTypes).forEach(imgs => {
        images.push(...imgs)
      })
    })
    // Экстерьер - ночь
    Object.values(houseImagesByConfigNight).forEach(roofTypes => {
      Object.values(roofTypes).forEach(imgs => {
        images.push(...imgs)
      })
    })
    // Интерьер
    Object.values(interiorImagesByFacade).forEach(imgs => {
      images.push(...imgs)
    })
    return images
  }, [])

  // Предзагрузка всех изображений при монтировании
  useEffect(() => {
    allImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [allImages])

  // Scroll reveal animations
  const pageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = pageRef.current
    if (!root) return
    const els = root.querySelectorAll('.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-left')
    if (!els.length) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Вычисляемые значения
  const totalArea = areaLength * areaWidth * 2

  // Навигация
  const goToPrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? houseImages.length - 1 : prev - 1)
  }

  const goToNextImage = () => {
    setCurrentImageIndex(prev => prev === houseImages.length - 1 ? 0 : prev + 1)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Check if element is interactive (button, select, link, etc.)
  const isInteractiveElement = (element: EventTarget | null): boolean => {
    if (!element || !(element instanceof HTMLElement)) return false

    // Check if the element or any parent is interactive
    let el: HTMLElement | null = element
    while (el) {
      const tagName = el.tagName.toLowerCase()
      if (
        tagName === 'button' ||
        tagName === 'a' ||
        tagName === 'select' ||
        tagName === 'input' ||
        tagName === 'label' ||
        el.classList.contains('cinematic-header') ||
        el.classList.contains('header-controls') ||
        el.classList.contains('cinematic-nav') ||
        el.classList.contains('cinematic-progress') ||
        el.classList.contains('cinematic-fullscreen-btn') ||
        el.classList.contains('animated-image-badge') ||
        el.classList.contains('mobile-controls-panel') ||
        el.classList.contains('mobile-panel-toggle')
      ) {
        return true
      }
      el = el.parentElement
    }
    return false
  }

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
    touchStartTime.current = Date.now()
    touchTarget.current = e.target
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (openFullscreenOnTap = false) => {
    const touchDuration = touchStartTime.current ? Date.now() - touchStartTime.current : 0
    const diff = touchStartX.current && touchEndX.current
      ? touchStartX.current - touchEndX.current
      : 0
    const minSwipeDistance = 50
    const maxTapDuration = 300

    // Check if tap was on an interactive element
    const tappedOnInteractive = isInteractiveElement(touchTarget.current)

    // If it was a swipe (and not on interactive element)
    if (Math.abs(diff) > minSwipeDistance && !tappedOnInteractive) {
      if (diff > 0) {
        goToNextImage()
      } else {
        goToPrevImage()
      }
    }
    // If it was a tap (short touch without movement) - open fullscreen on mobile
    // But only if NOT on an interactive element
    else if (
      openFullscreenOnTap &&
      isTouchDevice &&
      touchDuration < maxTapDuration &&
      !touchEndX.current &&
      !tappedOnInteractive
    ) {
      setIsFullscreen(true)
    }

    // Reset
    touchStartX.current = null
    touchEndX.current = null
    touchStartTime.current = null
    touchTarget.current = null
  }

  // Fullscreen touch handlers (swipe only, no tap to close)
  const handleFullscreenTouchEnd = () => {
    handleTouchEnd(false)
  }

  // Main area touch handler (tap opens fullscreen)
  const handleMainTouchEnd = () => {
    handleTouchEnd(true)
  }

  return (
    <div className="cinematic-page" ref={pageRef}>
      <div
        className="cinematic-hero"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMainTouchEnd}
      >
        {/* Background Slide - only render current */}
        <div className="cinematic-slide active" key={`${facadeStyle}-${roofStyle}-${isExterior}-${isDay}-${safeImageIndex}`}>
          <AnimatedImage
            src={houseImages[safeImageIndex]}
            alt={`Вид ${safeImageIndex + 1}`}
            enableAnimation={false}
          />
        </div>

        {/* Dark Overlay */}
        <div className="cinematic-overlay" />

        {/* Header */}
        <header className="cinematic-header">
          <Link to="/" className="cinematic-logo">
            <img src="/logo.png" alt="Родные Края" className="cinematic-logo-img" />
          </Link>

          {/* Header Controls */}
          <div className="header-controls">
            {/* Facade Dropdown */}
            <div className="custom-dropdown">
              <button
                className={`custom-dropdown-trigger ${facadeDropdownOpen ? 'open' : ''}`}
                onClick={() => {
                  setFacadeDropdownOpen(!facadeDropdownOpen)
                  setRoofDropdownOpen(false)
                }}
              >
                <span className="dropdown-label">
                  {facadeStyle === 'brick' ? 'Кирпич' : facadeStyle === 'combined' ? 'Комби' : 'Вент. фасад'}
                </span>
                <span className="dropdown-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>
              <div className={`custom-dropdown-menu ${facadeDropdownOpen ? 'open' : ''}`}>
                <div className="dropdown-menu-inner">
                  {[
                    { value: 'brick', label: 'Кирпич' },
                    { value: 'combined', label: 'Комби' },
                    { value: 'ventilated', label: 'Вент. фасад' }
                  ].map((option, index) => (
                    <button
                      key={option.value}
                      className={`dropdown-option ${facadeStyle === option.value ? 'active' : ''}`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => {
                        setFacadeStyle(option.value as FacadeStyle)
                        setFacadeDropdownOpen(false)
                      }}
                    >
                      <span className="option-check">
                        {facadeStyle === option.value && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Roof Dropdown */}
            <div className="custom-dropdown">
              <button
                className={`custom-dropdown-trigger ${roofDropdownOpen ? 'open' : ''}`}
                onClick={() => {
                  setRoofDropdownOpen(!roofDropdownOpen)
                  setFacadeDropdownOpen(false)
                }}
              >
                <span className="dropdown-label">
                  {roofStyle === 'natural' ? 'Натуральная' : roofStyle === 'soft' ? 'Мягкая' : 'Плоская'}
                </span>
                <span className="dropdown-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>
              <div className={`custom-dropdown-menu ${roofDropdownOpen ? 'open' : ''}`}>
                <div className="dropdown-menu-inner">
                  {[
                    { value: 'natural', label: 'Натуральная' },
                    { value: 'soft', label: 'Мягкая' },
                    { value: 'flat', label: 'Плоская' }
                  ].map((option, index) => (
                    <button
                      key={option.value}
                      className={`dropdown-option ${roofStyle === option.value ? 'active' : ''}`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => {
                        setRoofStyle(option.value as RoofStyle)
                        setRoofDropdownOpen(false)
                      }}
                    >
                      <span className="option-check">
                        {roofStyle === option.value && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className={`header-toggle-btn ${isDay ? 'day' : 'night'}`}
              onClick={() => setIsDay(!isDay)}
            >
              <span className="header-toggle-icon">
                {isDay ? Icons.sun : Icons.moon}
              </span>
            </button>
          </div>

          <div className="cinematic-header-right">
            <button className="cinematic-fullscreen-btn-header" onClick={() => setIsFullscreen(true)}>
              {Icons.expand}
            </button>
            <button className="cinematic-btn-header">
              Заказать звонок
            </button>
          </div>
        </header>

        {/* Navigation Buttons */}
        <div className="cinematic-nav">
          <button className="cinematic-nav-btn" onClick={goToPrevImage}>
            {Icons.chevronLeft}
          </button>
          <button className="cinematic-nav-btn" onClick={goToNextImage}>
            {Icons.chevronRight}
          </button>
        </div>

        {/* Main Content */}
        <div className="cinematic-content">
          {/* Left - Info */}
          <div className="cinematic-info">
            <h1 className="cinematic-title">Родные Края</h1>
            <p className="cinematic-subtitle">Дом площадью {totalArea} м² в окружении природы</p>
            <div className="cinematic-stats">
              <div className="cinematic-stat">
                <span className="cinematic-stat-value">{rooms}</span>
                <span className="cinematic-stat-label">комнаты</span>
              </div>
              <div className="cinematic-stat">
                <span className="cinematic-stat-value">{bathrooms}</span>
                <span className="cinematic-stat-label">санузла</span>
              </div>
              <div className="cinematic-stat">
                <span className="cinematic-stat-value">{totalArea}</span>
                <span className="cinematic-stat-label">м²</span>
              </div>
            </div>
          </div>

        </div>

        {/* Progress Dots */}
        <div className="cinematic-progress">
          {houseImages.map((_, idx) => (
            <button
              key={idx}
              className={`cinematic-dot ${idx === safeImageIndex ? 'active' : ''}`}
              onClick={() => selectImage(idx)}
            />
          ))}
        </div>

        {/* Thumbnails (visible on hover) */}
        <div className="cinematic-thumbs">
          {houseImages.map((img, idx) => (
            <button
              key={idx}
              className={`cinematic-thumb ${idx === safeImageIndex ? 'active' : ''}`}
              onClick={() => selectImage(idx)}
            >
              <img src={img} alt={`Миниатюра ${idx + 1}`} />
            </button>
          ))}
        </div>

        {/* Mobile Controls Panel */}
        <div
          className={`mobile-controls-panel ${isMobilePanelHidden ? 'hidden' : ''}`}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <button
            className="mobile-panel-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobilePanelHidden(!isMobilePanelHidden);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobilePanelHidden ? (
                <path d="M15 19l-7-7 7-7" />
              ) : (
                <path d="M9 5l7 7-7 7" />
              )}
            </svg>
          </button>
          <div className="mobile-panel-content">
            <div className="mobile-control-group">
              <span className="mobile-control-label">Фасад</span>
              <div className="mobile-control-options">
                <button
                  className={`mobile-control-btn ${facadeStyle === 'brick' ? 'active' : ''}`}
                  onClick={() => setFacadeStyle('brick')}
                >
                  Кирпич
                </button>
                <button
                  className={`mobile-control-btn ${facadeStyle === 'combined' ? 'active' : ''}`}
                  onClick={() => setFacadeStyle('combined')}
                >
                  Комби
                </button>
                <button
                  className={`mobile-control-btn ${facadeStyle === 'ventilated' ? 'active' : ''}`}
                  onClick={() => setFacadeStyle('ventilated')}
                >
                  Вент.
                </button>
              </div>
            </div>
            <div className="mobile-control-group">
              <span className="mobile-control-label">Кровля</span>
              <div className="mobile-control-options">
                <button
                  className={`mobile-control-btn ${roofStyle === 'natural' ? 'active' : ''}`}
                  onClick={() => setRoofStyle('natural')}
                >
                  Натур.
                </button>
                <button
                  className={`mobile-control-btn ${roofStyle === 'soft' ? 'active' : ''}`}
                  onClick={() => setRoofStyle('soft')}
                >
                  Мягкая
                </button>
                <button
                  className={`mobile-control-btn ${roofStyle === 'flat' ? 'active' : ''}`}
                  onClick={() => setRoofStyle('flat')}
                >
                  Плоская
                </button>
              </div>
            </div>
            <div className="mobile-control-group">
              <div className="mobile-toggles">
                <button
                  className={`mobile-toggle-btn ${isDay ? 'active' : ''}`}
                  onClick={() => setIsDay(!isDay)}
                >
                  <span className="mobile-toggle-icon">
                    {isDay ? Icons.sun : Icons.moon}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="cinematic-modal">
          <button className="cinematic-modal-close" onClick={() => setIsFullscreen(false)}>
            ✕
          </button>
          <div
            className="cinematic-modal-main"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleFullscreenTouchEnd}
          >
            <AnimatedImage
              src={houseImages[safeImageIndex]}
              alt="Полноэкранный просмотр"
              enableAnimation={false}
            />
          </div>
          <div className="cinematic-modal-thumbs">
            {houseImages.map((img, idx) => (
              <button
                key={idx}
                className={`cinematic-modal-thumb ${idx === safeImageIndex ? 'active' : ''}`}
                onClick={() => selectImage(idx)}
              >
                <img src={img} alt={`Миниатюра ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floor Plan Section - Cinematic Split */}
      <section className="floor-plan-section original-theme">
        {/* Centered Header */}
        <div className="floor-plan-header-top scroll-reveal">
          <h2>Планировка</h2>
          <p>Каждый метр используется максимально эффективно</p>
        </div>

        <div className="floor-plan-container">
          <div className={`floor-plan-left ${is3DView ? 'hidden-desktop' : ''}`}>
              <div className="floor-plan-stats scroll-reveal">
                <div className="floor-plan-stat">
                  <span className="floor-plan-stat-value">{totalArea}</span>
                  <span className="floor-plan-stat-label">м² общая</span>
                </div>
                <div className="floor-plan-stat">
                  <span className="floor-plan-stat-value">{floorPlanRooms.length}</span>
                  <span className="floor-plan-stat-label">помещений</span>
                </div>
                <div className="floor-plan-stat">
                  <span className="floor-plan-stat-value">1</span>
                  <span className="floor-plan-stat-label">этаж</span>
                </div>
              </div>
              <div className="floor-plan-rooms chips-style scroll-reveal" style={{ '--i': 1 } as React.CSSProperties}>
                {floorPlanRooms.map(room => (
                  <button
                    key={room.id}
                    className={`floor-plan-chip ${selectedRoom === room.id ? 'active' : ''} ${hoveredRoom === room.id ? 'hovered' : ''}`}
                    onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                    onMouseEnter={() => highlightRoom(room.id, true)}
                    onMouseLeave={() => highlightRoom(room.id, false)}
                  >
                    <span className="chip-name">{room.name}</span>
                    <span className="chip-divider">·</span>
                    <span className="chip-area">{room.area} м²</span>
                  </button>
                ))}
              </div>
            </div>
          <div
            className={`floor-plan-right ${is3DView ? 'full-width' : ''}`}
            onTouchStart={handleFloorPlanSwipeStart}
            onTouchEnd={handleFloorPlanSwipeEnd}
          >
            {is3DView ? (
              <div className="floor-plan-3d-container">
                <button
                  className={`floor-plan-view-toggle ${is3DView ? 'is-3d' : ''}`}
                  onClick={() => setIs3DView(!is3DView)}
                >
                  <span className={`view-toggle-option ${!is3DView ? 'active' : ''}`}>2D</span>
                  <span className={`view-toggle-option ${is3DView ? 'active' : ''}`}>3D</span>
                  <span className="view-toggle-slider" />
                </button>
                <Canvas
                  camera={{ position: [0, 10, -25], fov: 50 }}
                  style={{ background: 'transparent' }}
                >
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 15, 10]} intensity={1} castShadow />
                  <directionalLight position={[-5, 5, -5]} intensity={0.3} />
                  <Suspense fallback={null}>
                    <FloorPlan3DModel />
                    <Environment preset="apartment" />
                  </Suspense>
                  <OrbitControls
                    enablePan
                    enableZoom
                    enableRotate
                    minDistance={3}
                    maxDistance={30}
                    maxPolarAngle={Math.PI / 2.1}
                    target={[0, 0, 0]}
                  />
                </Canvas>
                <div className="floor-plan-3d-hint desktop-hint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
                    <path d="M12 8v4M12 16h.01"/>
                  </svg>
                  Зажмите ЛКМ для вращения, колёсико для масштаба
                </div>
                <div className="floor-plan-3d-hint mobile-hint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
                    <path d="M12 8v4M12 16h.01"/>
                  </svg>
                  Проведите пальцем для вращения, двумя — для масштаба
                </div>
                <div className="floor-plan-swipe-hint swipe-hint-right">
                  <span>2D</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="floor-plan-image">
                <button
                  className={`floor-plan-view-toggle ${is3DView ? 'is-3d' : ''}`}
                  onClick={() => setIs3DView(!is3DView)}
                >
                  <span className={`view-toggle-option ${!is3DView ? 'active' : ''}`}>2D</span>
                  <span className={`view-toggle-option ${is3DView ? 'active' : ''}`}>3D</span>
                  <span className="view-toggle-slider" />
                </button>
                <object
                  ref={svgRef}
                  type="image/svg+xml"
                  data="/floor-plan.svg"
                  aria-label="План дома"
                >
                  План дома
                </object>
                <div className="floor-plan-overlay" />
                <div className="floor-plan-swipe-layer" />
                <div className="floor-plan-swipe-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span>3D</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section - Split Comparison with House Image */}
      <section className="pricing-section pricing-split">
        <div className="pricing-split-container">
          {/* Background house image */}
          <div className="pricing-split-house-bg">
            <img
              src={houseImages[safeImageIndex]}
              alt="Дом"
              className="pricing-split-house-img"
            />
            <div className="pricing-split-house-overlay" />
          </div>

          {/* Package panels */}
          <div className="pricing-split-panels scroll-reveal">
            {[
              {
                name: 'Холодный контур',
                description: 'Базовая комплектация',
                price: '8.5',
                pricePerM: '35 400',
                percent: 33,
                popular: false,
                features: [
                  'Фундамент монолитная плита',
                  'Стены из газобетона 400мм',
                  'Кровля с утеплением',
                  'Окна ПВХ двухкамерные',
                  'Входная дверь',
                ],
              },
              {
                name: 'Тёплый контур',
                description: 'Рекомендуемый выбор',
                price: '12.5',
                pricePerM: '52 000',
                percent: 66,
                popular: true,
                features: [
                  'Всё из "Холодного контура"',
                  'Электрика полный монтаж',
                  'Отопление газовый котёл',
                  'Водоснабжение и канализация',
                  'Черновая отделка',
                ],
              },
              {
                name: 'Вайт бокс',
                description: 'Максимальная комплектация',
                price: '18.9',
                pricePerM: '78 750',
                percent: 100,
                popular: false,
                features: [
                  'Всё из "Тёплого контура"',
                  'Чистовая отделка премиум',
                  'Сантехника и освещение',
                  'Межкомнатные двери',
                  'Готов к заселению',
                ],
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`pricing-split-panel ${activePricingPackage === i ? 'expanded' : ''} ${pkg.popular ? 'featured' : ''}`}
                onClick={() => setActivePricingPackage(i)}
              >
                <div className="pricing-split-panel-glass" />
                <div className="pricing-split-panel-content">
                  <div className="pricing-split-panel-header">
                    {pkg.popular && <span className="pricing-split-badge">Рекомендуем</span>}
                    <span className="pricing-split-number">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{pkg.name}</h3>
                    <p>{pkg.description}</p>
                  </div>

                  <div className="pricing-split-panel-price">
                    <span className="pricing-split-price-value">{pkg.price}</span>
                    <span className="pricing-split-price-unit">млн ₽</span>
                  </div>

                  <div className="pricing-split-panel-details">
                    <ul className="pricing-split-features">
                      {pkg.features.map((f, j) => (
                        <li key={j}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="pricing-split-btn">
                      Выбрать комплектацию
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Completion indicator */}
                <div className="pricing-split-completion">
                  <div className="pricing-split-completion-bar">
                    <div
                      className="pricing-split-completion-fill"
                      style={{ height: `${pkg.percent}%` }}
                    />
                  </div>
                  <span className="pricing-split-completion-text">{pkg.percent}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Floor plan overlay */}
          <div className={`pricing-split-floorplan ${activePricingPackage === 2 ? 'show' : ''}`}>
            <img src="/floor-plan.png" alt="План дома" />
          </div>
        </div>
      </section>

      {/* Interior Section - Bento Grid Layout with All Rooms */}
      <section className="interior-section">
        <div className="interior-header scroll-reveal">
          <h2>Интерьер</h2>
          <p>Визуализация всех {floorPlanRooms.length} помещений вашего будущего дома</p>
        </div>

        {/* Stories row - visible only on mobile */}
        <div className="interior-stories-row scroll-reveal" style={{ '--i': 1 } as React.CSSProperties}>
          {floorPlanRooms.map((room, i) => (
            <button
              key={room.id}
              className={`interior-story-btn ${storyIndex === i ? 'active' : ''}`}
              onClick={() => setStoryIndex(i)}
            >
              <div className="interior-story-ring">
                <img src={room.image} alt={room.name} />
              </div>
              <span>{room.name}</span>
            </button>
          ))}
        </div>

        <div className="interior-bento-full scroll-reveal-scale" style={{ '--i': 2 } as React.CSSProperties}>
          {floorPlanRooms.map((room, index) => (
            <div
              key={room.id}
              className={`bento-cell bento-cell-${index + 1}`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <img src={room.image} alt={room.name} />
              <div className="bento-overlay">
                <span className="bento-label">{room.name}</span>
                <span className="bento-area">{room.area} м²</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Story Viewer (mobile interior) */}
      {storyIndex !== null && (
        <div className="interior-story-fullscreen" onClick={() => setStoryIndex(null)}>
          <div className="interior-story-progress-bars">
            {floorPlanRooms.map((_, i) => (
              <div key={i} className="interior-story-track">
                <div
                  className="interior-story-fill"
                  style={{
                    width: i < storyIndex ? '100%' : i === storyIndex ? `${storyProgress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>
          <img src={floorPlanRooms[storyIndex].image} alt={floorPlanRooms[storyIndex].name} />
          <div className="interior-story-info">
            <h3>{floorPlanRooms[storyIndex].name}</h3>
            <span>{floorPlanRooms[storyIndex].area} м²</span>
          </div>
          <button className="interior-story-close" onClick={() => setStoryIndex(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="interior-story-nav">
            <div
              className="interior-story-prev"
              onClick={(e) => { e.stopPropagation(); setStoryIndex(i => i !== null && i > 0 ? i - 1 : i) }}
            />
            <div
              className="interior-story-next"
              onClick={(e) => { e.stopPropagation(); setStoryIndex(i => i !== null && i < floorPlanRooms.length - 1 ? i + 1 : null) }}
            />
          </div>
        </div>
      )}

      {/* Social / YouTube / Contacts Section */}
      <SocialSection />

      {/* Room Detail Modal - Animated */}
      {selectedRoom && (
        <div className="room-modal-fullscreen" onClick={() => setSelectedRoom(null)}>
          {(() => {
            const room = floorPlanRooms.find(r => r.id === selectedRoom)
            if (!room) return null
            return (
              <div className="room-modal-container" onClick={(e) => e.stopPropagation()}>
                <AnimatedImage
                  src={room.image}
                  alt={room.name}
                  enableAnimation={true}
                  localVideo={roomVideos[selectedRoom]}
                  autoPlay={true}
                />
                <button className="room-modal-close-btn" onClick={() => setSelectedRoom(null)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="room-modal-info">
                  <h2>{room.name}</h2>
                  <span className="room-modal-area">{room.area} м²</span>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

/* ============================================
   Social Section — Stacked Layers + Parallax
============================================ */
const SocialIcons: Record<string, React.ReactNode> = {
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  vk: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.675 2.863 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.88 0 1.441 1.441 0 0 1 2.88 0z"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
  dzen: (
    <svg viewBox="0 0 169 169" fill="currentColor" width="20" height="20">
      <path d="M148.369 82.73c0-.64-.52-1.17-1.16-1.2-22.963-.87-36.938-3.8-46.715-13.576-9.797-9.797-12.716-23.783-13.586-46.795-.02-.64-.55-1.16-1.2-1.16h-2.679c-.64 0-1.17.52-1.2 1.16-.87 23.003-3.789 36.999-13.586 46.795-9.787 9.787-23.752 12.706-46.715 13.576-.64.02-1.16.55-1.16 1.2v2.679c0 .64.52 1.17 1.16 1.2 22.963.87 36.938 3.799 46.715 13.576 9.777 9.777 12.696 23.723 13.576 46.645.02.64.55 1.16 1.2 1.16h2.689c.64 0 1.17-.52 1.2-1.16.88-22.922 3.799-36.868 13.576-46.645 9.787-9.787 23.752-12.706 46.715-13.576.64-.02 1.16-.55 1.16-1.2v-2.679z"/>
    </svg>
  ),
}

const socialLinks = [
  { id: 'youtube', name: 'YouTube', url: '#', color: '#FF0000', followers: '12.5K' },
  { id: 'telegram', name: 'Telegram', url: '#', color: '#26A5E4', followers: '8.2K' },
  { id: 'vk', name: 'ВКонтакте', url: '#', color: '#0077FF', followers: '15.3K' },
  { id: 'instagram', name: 'Instagram', url: '#', color: '#E4405F', followers: '22.1K' },
  { id: 'whatsapp', name: 'WhatsApp', url: '#', color: '#25D366' },
  { id: 'dzen', name: 'Дзен', url: '#', color: '#000', followers: '5.7K' },
]

const companyStats = [
  { label: 'Построено домов', value: '340+' },
  { label: 'Лет на рынке', value: '12' },
  { label: 'Довольных клиентов', value: '98%' },
  { label: 'Проектов в работе', value: '28' },
]

function SocialSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }, [])

  return (
    <section className="social-parallax" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className="social-parallax-blobs">
        <div
          className="social-parallax-blob social-parallax-blob-1"
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        />
        <div
          className="social-parallax-blob social-parallax-blob-2"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
        <div
          className="social-parallax-blob social-parallax-blob-3"
          style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)` }}
        />
      </div>

      <div className="social-parallax-layers">
        {/* Layer 1: Video */}
        <div
          className="social-parallax-layer social-parallax-video scroll-reveal"
          style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}
        >
          <video
            className="social-parallax-player"
            controls
            playsInline
            preload="metadata"
            poster="https://rodniekraya.ru/wp-content/uploads/youtube/8680/0-1-e1724787007971.jpg"
            src="https://rodniekraya.ru/wp-content/uploads/youtube/8680/videoplayback-2.mp4"
          />
        </div>

        {/* Layer 2: Info card */}
        <div
          className="social-parallax-layer social-parallax-info scroll-reveal"
          style={{ '--i': 1, transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)` } as React.CSSProperties}
        >
          <h2>HouseCard</h2>
          <p className="social-parallax-tagline">Дома, в которых хочется жить</p>
          <div className="social-parallax-stats">
            {companyStats.map(s => (
              <div key={s.label} className="social-parallax-stat">
                <span className="social-parallax-stat-val">{s.value}</span>
                <span className="social-parallax-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="social-parallax-contact">
            <a href="tel:+79991234567">+7 (999) 123-45-67</a>
            <span>info@housecard.ru</span>
          </div>
        </div>

        {/* Layer 3: Social cards */}
        <div
          className="social-parallax-layer social-parallax-socials scroll-reveal"
          style={{ '--i': 2, transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 16}px)` } as React.CSSProperties}
        >
          {socialLinks.map((s, i) => (
            <a
              key={s.id}
              href={s.url}
              className="social-parallax-link"
              style={{ '--accent': s.color, '--i': i } as React.CSSProperties}
            >
              <span className="social-parallax-link-icon" style={{ color: s.color }}>{SocialIcons[s.id]}</span>
              <span className="social-parallax-link-name">{s.name}</span>
              {s.followers && <span className="social-parallax-link-count">{s.followers}</span>}
            </a>
          ))}
        </div>
      </div>
      <div className="social-copyright">&copy; 2026 HouseCard. Все права защищены.</div>
    </section>
  )
}
