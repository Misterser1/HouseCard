interface FloorType {
  id: number
  type: 'living' | 'garage' | 'attic' | 'basement'
  height: number
  windows: number
  balcony: boolean
}

type RoofStyle = 'gable' | 'hip' | 'flat' | 'mansard'
type WallMaterial = 'brick' | 'wood' | 'stone' | 'stucco' | 'modern'

interface HouseBuilderProps {
  floors: FloorType[]
  roofStyle: RoofStyle
  wallMaterial: WallMaterial
  houseWidth: number
  selectedFloor: number | null
  onSelectFloor: (id: number | null) => void
  onRemoveFloor: (id: number) => void
}

// Реалистичные цвета и текстуры для материалов
const materialStyles: Record<WallMaterial, {
  background: string
  borderColor: string
  windowFrame: string
  shadow: string
}> = {
  brick: {
    background: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 8px,
        rgba(0,0,0,0.1) 8px,
        rgba(0,0,0,0.1) 9px
      ),
      repeating-linear-gradient(
        90deg,
        #b84c3a,
        #b84c3a 25px,
        #8b3a2d 25px,
        #8b3a2d 26px
      ),
      linear-gradient(180deg, #c45c4a 0%, #a04a3a 100%)
    `,
    borderColor: '#6b2a1d',
    windowFrame: '#f5f5f0',
    shadow: 'inset 2px 2px 8px rgba(0,0,0,0.3), inset -2px -2px 8px rgba(255,255,255,0.1)'
  },
  wood: {
    background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(0,0,0,0.05) 20px,
        rgba(0,0,0,0.05) 21px
      ),
      repeating-linear-gradient(
        0deg,
        #c9a876,
        #c9a876 3px,
        #b8956a 3px,
        #b8956a 6px
      )
    `,
    borderColor: '#8b6914',
    windowFrame: '#e8dcc8',
    shadow: 'inset 2px 2px 6px rgba(0,0,0,0.2), inset -1px -1px 4px rgba(255,255,255,0.2)'
  },
  stone: {
    background: `
      radial-gradient(ellipse 40px 30px at 20px 20px, #9a9a9a 0%, transparent 70%),
      radial-gradient(ellipse 35px 25px at 60px 15px, #8a8a8a 0%, transparent 70%),
      radial-gradient(ellipse 45px 35px at 40px 45px, #7a7a7a 0%, transparent 70%),
      radial-gradient(ellipse 30px 25px at 80px 40px, #8a8a8a 0%, transparent 70%),
      linear-gradient(180deg, #858585 0%, #656565 100%)
    `,
    borderColor: '#4a4a4a',
    windowFrame: '#d0d0d0',
    shadow: 'inset 3px 3px 10px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(255,255,255,0.1)'
  },
  stucco: {
    background: `
      url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
      linear-gradient(180deg, #f5f0e6 0%, #e8e0d0 100%)
    `,
    borderColor: '#c5b8a0',
    windowFrame: '#ffffff',
    shadow: 'inset 1px 1px 4px rgba(0,0,0,0.1), inset -1px -1px 4px rgba(255,255,255,0.5)'
  },
  modern: {
    background: `
      linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%),
      linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 50%, #c8c8c8 100%)
    `,
    borderColor: '#888888',
    windowFrame: '#2a2a2a',
    shadow: 'inset 1px 1px 3px rgba(255,255,255,0.5), inset -1px -1px 3px rgba(0,0,0,0.1)'
  }
}

const floorTypeOverlay: Record<FloorType['type'], string> = {
  living: 'transparent',
  garage: 'rgba(60, 60, 60, 0.15)',
  attic: 'rgba(139, 90, 43, 0.1)',
  basement: 'rgba(40, 40, 40, 0.25)'
}

export function HouseBuilder({
  floors,
  roofStyle,
  wallMaterial,
  houseWidth,
  selectedFloor,
  onSelectFloor,
  onRemoveFloor
}: HouseBuilderProps) {
  const styles = materialStyles[wallMaterial]
  const baseWidth = houseWidth * 22

  // Рендер крыши
  const renderRoof = () => {
    const roofWidth = baseWidth + 50
    const roofHeight = roofStyle === 'flat' ? 20 : roofStyle === 'mansard' ? 90 : 70
    const roofColor1 = '#4a3728'
    const roofColor2 = '#5d4037'
    const roofColor3 = '#6d4c41'

    switch (roofStyle) {
      case 'gable':
        return (
          <div className="roof" style={{ width: roofWidth, position: 'relative' }}>
            <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={{ width: '100%', height: roofHeight }}>
              <defs>
                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={roofColor1} />
                  <stop offset="100%" stopColor={roofColor2} />
                </linearGradient>
                <pattern id="tiles" patternUnits="userSpaceOnUse" width="10" height="8">
                  <rect width="10" height="8" fill={roofColor2}/>
                  <path d="M0,8 L5,4 L10,8" fill="none" stroke={roofColor1} strokeWidth="0.5"/>
                </pattern>
              </defs>
              <polygon points="0,45 50,2 100,45" fill="url(#roofGrad)" />
              <polygon points="0,45 50,2 100,45" fill="url(#tiles)" opacity="0.5" />
              <polygon points="3,45 50,5 97,45" fill={roofColor3} opacity="0.3" />
              {/* Тень под крышей */}
              <rect x="0" y="43" width="100" height="2" fill="rgba(0,0,0,0.3)" />
            </svg>
            {/* Труба */}
            <div style={{
              position: 'absolute',
              right: '25%',
              top: '20%',
              width: 20,
              height: 35,
              background: 'linear-gradient(90deg, #8b4513, #a0522d, #8b4513)',
              borderRadius: '2px 2px 0 0',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                position: 'absolute',
                top: -5,
                left: -3,
                right: -3,
                height: 8,
                background: 'linear-gradient(180deg, #654321, #8b4513)',
                borderRadius: '2px'
              }} />
            </div>
          </div>
        )
      case 'hip':
        return (
          <div className="roof" style={{ width: roofWidth }}>
            <svg viewBox="0 0 100 45" preserveAspectRatio="none" style={{ width: '100%', height: roofHeight }}>
              <defs>
                <linearGradient id="hipRoofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={roofColor1} />
                  <stop offset="50%" stopColor={roofColor2} />
                  <stop offset="100%" stopColor={roofColor1} />
                </linearGradient>
              </defs>
              <polygon points="8,45 25,12 75,12 92,45" fill="url(#hipRoofGrad)" />
              <polygon points="25,12 50,0 75,12" fill={roofColor1} />
              <polygon points="12,45 30,14 70,14 88,45" fill={roofColor3} opacity="0.4" />
              <line x1="25" y1="12" x2="8" y2="45" stroke={roofColor1} strokeWidth="1" />
              <line x1="75" y1="12" x2="92" y2="45" stroke={roofColor1} strokeWidth="1" />
            </svg>
          </div>
        )
      case 'flat':
        return (
          <div className="roof" style={{
            width: roofWidth,
            height: roofHeight,
            background: `linear-gradient(180deg, #555 0%, #444 50%, #555 100%)`,
            borderRadius: '3px 3px 0 0',
            boxShadow: '0 -2px 4px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.1)',
            position: 'relative'
          }}>
            {/* Парапет */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              background: 'linear-gradient(180deg, #666, #444)',
              borderRadius: '3px 3px 0 0'
            }} />
          </div>
        )
      case 'mansard':
        return (
          <div className="roof" style={{ width: roofWidth, position: 'relative' }}>
            <svg viewBox="0 0 100 55" preserveAspectRatio="none" style={{ width: '100%', height: roofHeight }}>
              <defs>
                <linearGradient id="mansardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={roofColor1} />
                  <stop offset="60%" stopColor={roofColor2} />
                  <stop offset="100%" stopColor={roofColor3} />
                </linearGradient>
              </defs>
              <polygon points="0,55 3,20 50,0 97,20 100,55" fill="url(#mansardGrad)" />
              <polygon points="5,55 8,22 50,4 92,22 95,55" fill={roofColor3} opacity="0.3" />
              {/* Мансардные окна */}
              <rect x="18" y="28" width="18" height="24" rx="2" fill="#2a4a6a" />
              <rect x="19" y="29" width="16" height="22" rx="1" fill="#87ceeb" opacity="0.8" />
              <line x1="27" y1="29" x2="27" y2="51" stroke="#fff" strokeWidth="1" />
              <line x1="19" y1="40" x2="35" y2="40" stroke="#fff" strokeWidth="1" />

              <rect x="64" y="28" width="18" height="24" rx="2" fill="#2a4a6a" />
              <rect x="65" y="29" width="16" height="22" rx="1" fill="#87ceeb" opacity="0.8" />
              <line x1="73" y1="29" x2="73" y2="51" stroke="#fff" strokeWidth="1" />
              <line x1="65" y1="40" x2="81" y2="40" stroke="#fff" strokeWidth="1" />
            </svg>
          </div>
        )
    }
  }

  // Рендер окна
  const renderWindow = (floorType: FloorType['type'], floorHeight: number, isGarageDoor: boolean = false) => {
    if (isGarageDoor) {
      return (
        <div style={{
          width: 55,
          height: floorHeight - 20,
          background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
          borderRadius: '3px 3px 0 0',
          border: '3px solid #555',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: 4
        }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              flex: 1,
              background: 'linear-gradient(180deg, #4a4a4a, #3a3a3a)',
              borderRadius: 1
            }} />
          ))}
        </div>
      )
    }

    const windowHeight = floorType === 'basement' ? floorHeight * 0.35 : floorHeight * 0.55
    const windowWidth = floorType === 'basement' ? 35 : 28

    return (
      <div style={{
        width: windowWidth,
        height: windowHeight,
        background: 'linear-gradient(180deg, #6ba3c7 0%, #87ceeb 30%, #a8d8ea 100%)',
        border: `3px solid ${styles.windowFrame}`,
        borderRadius: floorType === 'basement' ? 2 : 3,
        boxShadow: `
          inset 0 0 20px rgba(255,255,255,0.3),
          0 2px 4px rgba(0,0,0,0.3),
          inset 0 -10px 20px rgba(135,206,235,0.5)
        `,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Рама окна */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 2,
          background: styles.windowFrame,
          transform: 'translateY(-50%)'
        }} />
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 2,
          background: styles.windowFrame,
          transform: 'translateX(-50%)'
        }} />
        {/* Отражение */}
        <div style={{
          position: 'absolute',
          top: 5,
          left: 3,
          width: '30%',
          height: '40%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
          borderRadius: 2
        }} />
      </div>
    )
  }

  // Рендер этажа
  const renderFloor = (floor: FloorType, index: number) => {
    const floorHeight = floor.height * 32
    const isSelected = selectedFloor === floor.id
    const isBasement = floor.type === 'basement'

    return (
      <div
        key={floor.id}
        className={`floor floor-${floor.type} ${isSelected ? 'selected' : ''}`}
        style={{
          width: baseWidth,
          height: floorHeight,
          background: styles.background,
          borderLeft: `6px solid ${styles.borderColor}`,
          borderRight: `6px solid ${styles.borderColor}`,
          position: 'relative',
          cursor: 'pointer',
          boxShadow: isSelected
            ? `0 0 0 4px #2d5a3d, ${styles.shadow}`
            : styles.shadow,
          opacity: isBasement ? 0.85 : 1,
          transition: 'box-shadow 0.2s, transform 0.2s',
          transform: isSelected ? 'scale(1.01)' : 'scale(1)'
        }}
        onClick={() => onSelectFloor(isSelected ? null : floor.id)}
      >
        {/* Оверлей типа этажа */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: floorTypeOverlay[floor.type],
          pointerEvents: 'none'
        }} />

        {/* Окна */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '100%',
          padding: '0 25px'
        }}>
          {Array.from({ length: floor.windows }).map((_, i) => (
            <div key={i}>
              {renderWindow(
                floor.type,
                floorHeight,
                floor.type === 'garage' && i === Math.floor(floor.windows / 2)
              )}
            </div>
          ))}
        </div>

        {/* Балкон */}
        {floor.balcony && floor.type === 'living' && (
          <div style={{
            position: 'absolute',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 70,
            height: 35,
            background: 'linear-gradient(180deg, #f5f5f5, #e0e0e0)',
            border: '2px solid #888',
            borderTop: 'none',
            borderRadius: '0 0 5px 5px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.3)'
          }}>
            {/* Перила */}
            <div style={{
              position: 'absolute',
              top: -4,
              left: -6,
              right: -6,
              height: 6,
              background: 'linear-gradient(180deg, #777, #555)',
              borderRadius: 3,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }} />
            {/* Стойки перил */}
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: 2,
                left: `${10 + i * 20}%`,
                width: 3,
                height: '85%',
                background: 'linear-gradient(90deg, #666, #888, #666)',
                borderRadius: 1
              }} />
            ))}
          </div>
        )}

        {/* Подпись этажа */}
        <div style={{
          position: 'absolute',
          left: -60,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '12px',
          color: '#555',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
        }}>
          {floor.type === 'basement' ? 'Подвал' :
           floor.type === 'attic' ? 'Мансарда' :
           floor.type === 'garage' ? 'Гараж' :
           `Этаж ${index + 1 - (floors.some(f => f.type === 'basement') ? 1 : 0)}`}
        </div>

        {/* Кнопка удаления */}
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemoveFloor(floor.id)
            }}
            style={{
              position: 'absolute',
              right: -40,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, #ff5555, #cc3333)',
              color: 'white',
              border: '2px solid #aa2222',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s'
            }}
          >
            ×
          </button>
        )}
      </div>
    )
  }

  // Фундамент
  const renderFoundation = () => (
    <div style={{
      width: baseWidth + 30,
      height: 25,
      background: 'linear-gradient(180deg, #5a5a5a 0%, #3a3a3a 50%, #4a4a4a 100%)',
      borderRadius: '0 0 6px 6px',
      marginTop: -2,
      boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)',
      position: 'relative'
    }}>
      {/* Текстура бетона */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 31px)
        `,
        borderRadius: '0 0 6px 6px'
      }} />
    </div>
  )

  // Земля с травой
  const renderGround = () => (
    <div style={{
      width: baseWidth + 150,
      height: 45,
      background: 'linear-gradient(180deg, #4a8c4e 0%, #3d7340 30%, #2d5a30 100%)',
      borderRadius: '60% 60% 0 0',
      marginTop: -8,
      boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Текстура травы */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 3px 8px at 10% 20%, #5a9c5e 0%, transparent 100%),
          radial-gradient(ellipse 2px 6px at 30% 15%, #5a9c5e 0%, transparent 100%),
          radial-gradient(ellipse 3px 7px at 50% 25%, #4a8c4e 0%, transparent 100%),
          radial-gradient(ellipse 2px 8px at 70% 18%, #5a9c5e 0%, transparent 100%),
          radial-gradient(ellipse 3px 6px at 90% 22%, #4a8c4e 0%, transparent 100%)
        `
      }} />
    </div>
  )

  return (
    <div className="house-builder">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 70px',
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
      }}>
        {renderRoof()}

        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse'
        }}>
          {floors.map((floor, index) => renderFloor(floor, index))}
        </div>

        {renderFoundation()}
        {renderGround()}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '25px',
        color: '#555',
        fontSize: '14px',
        padding: '10px 20px',
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        Кликните на этаж для редактирования
      </div>
    </div>
  )
}
