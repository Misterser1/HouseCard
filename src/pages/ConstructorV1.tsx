import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
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

export function ConstructorV1() {
  // Основные параметры проекта
  const [areaLength] = useState(10)
  const [areaWidth] = useState(12)
  const [rooms] = useState(4)
  const [bathrooms] = useState(2)

  // Floor plan state
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const svgRef = useRef<HTMLObjectElement>(null)

  // Обработка кликов на комнаты в SVG
  const handleSvgRoomClick = useCallback((roomId: string) => {
    setSelectedRoom(roomId)
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
          ;(room as SVGRectElement).style.fill = 'rgba(255, 255, 255, 0.15)'
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
  }, [handleSvgRoomClick])

  // Параметры дома
  const [isExterior, setIsExterior] = useState(true)
  const [roofStyle, setRoofStyle] = useState<RoofStyle>('natural')
  const [_wallMaterial] = useState<WallMaterial>('brick')
  const [facadeStyle, setFacadeStyle] = useState<FacadeStyle>('brick')
  const [isDay, setIsDay] = useState(true)

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

  // Выбор изображений
  const houseImagesByConfig = isDay ? houseImagesByConfigDay : houseImagesByConfigNight
  const houseImages = isExterior
    ? houseImagesByConfig[facadeStyle][roofStyle]
    : interiorImagesByFacade[facadeStyle]

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

  const getCurrentVideo = (imagePath: string): string | undefined => {
    if (!isExterior) {
      return interiorVideos[imagePath]
    }
    return houseVideos[imagePath]
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Touch swipe state
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartTime = useRef<number | null>(null)
  const touchTarget = useRef<EventTarget | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
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
        el.classList.contains('cinematic-controls') ||
        el.classList.contains('cinematic-header') ||
        el.classList.contains('cinematic-nav') ||
        el.classList.contains('cinematic-progress') ||
        el.classList.contains('cinematic-fullscreen-btn') ||
        el.classList.contains('animated-image-badge')
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
    <div className="cinematic-page">
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
            localVideo={getCurrentVideo(houseImages[safeImageIndex])}
            alt={`Вид ${safeImageIndex + 1}`}
            enableAnimation={true}
          />
        </div>

        {/* Dark Overlay */}
        <div className="cinematic-overlay" />

        {/* Header */}
        <header className="cinematic-header">
          <Link to="/" className="cinematic-logo">
            <span className="cinematic-logo-text">Родные Края</span>
          </Link>
          <div className="cinematic-header-right">
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

        {/* Fullscreen Button */}
        <button className="cinematic-fullscreen-btn" onClick={() => setIsFullscreen(true)}>
          {Icons.expand}
        </button>

        {/* Main Content */}
        <div className="cinematic-content">
          {/* Left - Info */}
          <div className="cinematic-info">
            <span className="cinematic-tag">Премиум класс</span>
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

          {/* Right - Controls */}
          <div className="cinematic-controls">
            <div className="cinematic-controls-title">Настройки</div>

            <div className="cinematic-control-row">
              <label className="cinematic-control-label">Фасад</label>
              <select
                className="cinematic-select"
                value={facadeStyle}
                onChange={(e) => setFacadeStyle(e.target.value as FacadeStyle)}
              >
                <option value="brick">Кирпичный</option>
                <option value="combined">Комбинированный</option>
                <option value="ventilated">Вентилируемый</option>
              </select>
            </div>

            <div className="cinematic-control-row">
              <label className="cinematic-control-label">Кровля</label>
              <select
                className="cinematic-select"
                value={roofStyle}
                onChange={(e) => setRoofStyle(e.target.value as RoofStyle)}
              >
                <option value="natural">Натуральная черепица</option>
                <option value="soft">Мягкая черепица</option>
                <option value="flat">Плоская кровля</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="cinematic-toggle-row" onClick={() => setIsExterior(!isExterior)}>
              <div className="cinematic-toggle-info">
                <span className="cinematic-toggle-icon">
                  {isExterior ? Icons.exterior : Icons.interior}
                </span>
                <span className="cinematic-toggle-label">{isExterior ? 'Снаружи' : 'Внутри'}</span>
              </div>
              <div className={`cinematic-toggle ${isExterior ? 'active' : ''}`}>
                <div className="cinematic-toggle-thumb" />
              </div>
            </div>

            <div className="cinematic-toggle-row" onClick={() => setIsDay(!isDay)}>
              <div className="cinematic-toggle-info">
                <span className="cinematic-toggle-icon">
                  {isDay ? Icons.sun : Icons.moon}
                </span>
                <span className="cinematic-toggle-label">{isDay ? 'День' : 'Ночь'}</span>
              </div>
              <div className={`cinematic-toggle ${isDay ? 'active' : ''}`}>
                <div className="cinematic-toggle-thumb" />
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
              localVideo={getCurrentVideo(houseImages[safeImageIndex])}
              alt="Полноэкранный просмотр"
              enableAnimation={true}
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
        <div className="floor-plan-container">
          <div className="floor-plan-left">
            <div className="floor-plan-header">
              <span className="floor-plan-tag">ПЛАНИРОВКА</span>
              <h2>Продуманное пространство</h2>
              <p>Каждый метр используется максимально эффективно</p>
            </div>
            <div className="floor-plan-stats">
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
            <div className="floor-plan-rooms chips-style">
              {floorPlanRooms.map(room => (
                <button
                  key={room.id}
                  className={`floor-plan-chip ${selectedRoom === room.id ? 'active' : ''}`}
                  onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                >
                  <span className="chip-name">{room.name}</span>
                  <span className="chip-divider">·</span>
                  <span className="chip-area">{room.area} м²</span>
                </button>
              ))}
            </div>
          </div>
          <div className="floor-plan-right">
            <div className="floor-plan-image">
              <object
                ref={svgRef}
                type="image/svg+xml"
                data="/floor-plan.svg"
                aria-label="План дома"
              >
                План дома
              </object>
              <div className="floor-plan-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* Room Detail Modal - используем оригинальные классы */}
      {selectedRoom && (
        <div className="room-modal-overlay-v2" onClick={() => setSelectedRoom(null)}>
          <div className="room-modal-v2" onClick={e => e.stopPropagation()}>
            {(() => {
              const room = floorPlanRooms.find(r => r.id === selectedRoom)
              if (!room) return null
              return (
                <>
                  <div className="room-modal-v2-left">
                    <img src={room.image} alt={room.name} />
                  </div>
                  <div className="room-modal-v2-right">
                    <button className="room-modal-close-v2" onClick={() => setSelectedRoom(null)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <div className="room-modal-v2-content">
                      <span className="room-modal-v2-label">Помещение</span>
                      <h2>{room.name}</h2>
                      <div className="room-modal-v2-area">
                        <span className="area-number">{room.area}</span>
                        <span className="area-unit">м²</span>
                      </div>
                      <p className="room-modal-v2-description">{room.description}</p>
                      <div className="room-modal-v2-features">
                        <h4>Особенности</h4>
                        <ul>
                          {room.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
