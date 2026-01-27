import { useRef, useState, useCallback, useEffect } from 'react'
import { useHouseStore } from '../store/houseStore'

export function ImageViewer() {
  const {
    views,
    activeView,
    isGenerating,
    isEditing,
    setIsEditing,
    setEditMask
  } = useHouseStore()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(30)
  const [imageError, setImageError] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)

  const currentImage = views[activeView]

  // Reset error when image changes
  useEffect(() => {
    if (currentImage) {
      setImageError(null)
      setImageLoading(true)
      console.log('Current image URL:', currentImage)
    }
  }, [currentImage])

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEditing) return
    setIsDrawing(true)
    draw(e)
  }, [isEditing])

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isEditing || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    ctx.beginPath()
    ctx.arc(x, y, brushSize, 0, Math.PI * 2)
    ctx.fill()
  }, [isDrawing, isEditing, brushSize])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const clearMask = useCallback(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    setEditMask(null)
  }, [setEditMask])

  const saveMask = useCallback(() => {
    if (!canvasRef.current) return
    const maskData = canvasRef.current.toDataURL('image/png')
    setEditMask(maskData)
  }, [setEditMask])

  return (
    <div className="image-viewer">
      {currentImage ? (
        <div className="image-container">
          {imageLoading && !imageError && (
            <div className="generating" style={{ position: 'absolute' }}>
              <div className="spinner" />
              <p>Загрузка изображения...</p>
            </div>
          )}
          <img
            src={currentImage}
            alt={`${activeView} view`}
            className="house-image"
            style={{ opacity: imageLoading && !imageError ? 0.3 : 1 }}
            onLoad={() => {
              setImageLoading(false)
              setImageError(null)
              console.log('Image loaded successfully')
            }}
            onError={(e) => {
              console.error('Image load error:', e, 'URL:', currentImage)
              setImageLoading(false)
              setImageError('Ошибка загрузки изображения')
            }}
          />
          {imageError && (
            <div style={{
              color: '#ff4444',
              textAlign: 'center',
              marginTop: '1rem',
              padding: '1rem',
              background: '#fff',
              borderRadius: '8px'
            }}>
              <p>{imageError}</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', wordBreak: 'break-all' }}>
                URL: {currentImage}
              </p>
              <a
                href={currentImage}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2d5a3d', marginTop: '0.5rem', display: 'inline-block' }}
              >
                Открыть напрямую в браузере
              </a>
            </div>
          )}

          {isEditing && (
            <canvas
              ref={canvasRef}
              width={1024}
              height={768}
              className="edit-canvas"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          )}

          {isEditing && (
            <div className="edit-toolbar">
              <label>
                Размер кисти:
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                />
                {brushSize}px
              </label>
              <button className="btn btn-small" onClick={clearMask}>
                Очистить
              </button>
              <button className="btn btn-small btn-primary" onClick={saveMask}>
                Применить маску
              </button>
              <button className="btn btn-small" onClick={() => setIsEditing(false)}>
                Отмена
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="placeholder">
          {isGenerating ? (
            <div className="generating">
              <div className="spinner" />
              <p>Генерация изображения...</p>
              <p className="hint">Это может занять 20-40 секунд</p>
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon">🏠</div>
              <p>Настройте параметры дома и нажмите "Сгенерировать"</p>
              <p className="hint">Или загрузите референсное изображение для стилизации</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
