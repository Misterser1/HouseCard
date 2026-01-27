import { useRef } from 'react'
import { useHouseStore, type RoofType, type MaterialType } from '../store/houseStore'
import { generateHouseView, generate3DModel, fileToBase64 } from '../services/api'

const MATERIALS: { value: MaterialType; label: string }[] = [
  { value: 'wooden', label: 'Дерево' },
  { value: 'brick', label: 'Кирпич' },
  { value: 'stone', label: 'Камень' },
  { value: 'stucco', label: 'Штукатурка' },
  { value: 'modern', label: 'Современный' }
]

const ROOF_TYPES: { value: RoofType; label: string }[] = [
  { value: 'gable', label: 'Двускатная' },
  { value: 'hip', label: 'Шатровая' },
  { value: 'flat', label: 'Плоская' },
  { value: 'mansard', label: 'Мансардная' }
]

const STYLES = [
  { value: 'modern', label: 'Современный' },
  { value: 'classic', label: 'Классический' },
  { value: 'scandinavian', label: 'Скандинавский' },
  { value: 'rustic', label: 'Рустик' },
  { value: 'minimalist', label: 'Минимализм' }
]

export function ControlPanel() {
  const {
    floors,
    material,
    roofType,
    style,
    referenceImage,
    activeView,
    isGenerating,
    isGenerating3D,
    views,
    setFloors,
    setMaterial,
    setRoofType,
    setStyle,
    setReferenceImage,
    setView,
    setIsGenerating,
    setError,
    setIsEditing,
    setModelUrl,
    setIsGenerating3D
  } = useHouseStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const base64 = await fileToBase64(file)
      setReferenceImage(base64)
    } catch (err) {
      setError('Ошибка загрузки изображения')
    }
  }

  const handleGenerate = async () => {
    setError(null)
    setIsGenerating(true, activeView)

    const params = {
      referenceImage,
      floors,
      material,
      roofType,
      style,
      view: activeView
    }

    try {
      const result = await generateHouseView(params)
      if (result.success && result.imageUrl) {
        setView(activeView, result.imageUrl)
      } else {
        setError(result.error || 'Ошибка генерации')
      }
    } catch (err) {
      setError('Ошибка соединения с сервером')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateAll = async () => {
    setError(null)
    setIsGenerating(true, 'all')

    const viewTypes: Array<'front' | 'back' | 'left' | 'right'> = ['front', 'back', 'left', 'right']
    let frontImageUrl: string | null = null

    try {
      for (const view of viewTypes) {
        const params = {
          referenceImage,
          frontImage: view !== 'front' ? frontImageUrl : null, // Передаём передний вид как референс
          floors,
          material,
          roofType,
          style,
          view
        }

        const result = await generateHouseView(params)
        if (result.success && result.imageUrl) {
          setView(view, result.imageUrl)
          // Сохраняем URL переднего вида для использования как референс
          if (view === 'front') {
            frontImageUrl = result.imageUrl
          }
        } else {
          setError(result.error || `Ошибка генерации ${view}`)
          break
        }
      }
    } catch (err) {
      setError('Ошибка соединения с сервером')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerate3D = async () => {
    const frontImage = views.front
    if (!frontImage) {
      setError('Сначала сгенерируйте передний вид дома')
      return
    }

    setError(null)
    setIsGenerating3D(true)

    try {
      // Собираем все доступные ракурсы для лучшего качества
      const allImages = [views.front, views.back, views.left, views.right].filter(Boolean) as string[]
      const result = await generate3DModel(allImages)
      if (result.success && result.modelUrl) {
        setModelUrl(result.modelUrl)
      } else {
        setError(result.error || 'Ошибка создания 3D модели')
      }
    } catch (err) {
      setError('Ошибка соединения с сервером')
    } finally {
      setIsGenerating3D(false)
    }
  }

  const currentImage = views[activeView]

  return (
    <div className="control-panel">
      <div className="panel-section">
        <h3>Референс</h3>
        <div className="reference-upload">
          {referenceImage ? (
            <div className="reference-preview">
              <img src={referenceImage} alt="Reference" />
              <button
                className="btn btn-small btn-remove"
                onClick={() => setReferenceImage(null)}
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              className="btn btn-upload"
              onClick={() => fileInputRef.current?.click()}
            >
              📷 Загрузить фото дома
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <p className="hint">Загрузите фото для стилизации</p>
        </div>
      </div>

      <div className="panel-section">
        <h3>Этажность</h3>
        <div className="floor-selector">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={`floor-btn ${floors === n ? 'active' : ''}`}
              onClick={() => setFloors(n)}
              disabled={isGenerating}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Материал</h3>
        <div className="material-grid">
          {MATERIALS.map(({ value, label }) => (
            <button
              key={value}
              className={`option-btn ${material === value ? 'active' : ''}`}
              onClick={() => setMaterial(value)}
              disabled={isGenerating}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Тип крыши</h3>
        <div className="roof-grid">
          {ROOF_TYPES.map(({ value, label }) => (
            <button
              key={value}
              className={`option-btn ${roofType === value ? 'active' : ''}`}
              onClick={() => setRoofType(value)}
              disabled={isGenerating}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Стиль</h3>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          disabled={isGenerating}
          className="style-select"
        >
          {STYLES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="panel-actions">
        <button
          className="btn btn-primary btn-generate"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Генерация...' : 'Сгенерировать'}
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleGenerateAll}
          disabled={isGenerating || isGenerating3D}
        >
          Сгенерировать все ракурсы
        </button>

        {views.front && (
          <button
            className="btn btn-3d"
            onClick={handleGenerate3D}
            disabled={isGenerating || isGenerating3D}
          >
            {isGenerating3D ? 'Создание 3D...' : '🎮 Создать 3D модель'}
          </button>
        )}

        {currentImage && (
          <button
            className="btn btn-edit"
            onClick={() => setIsEditing(true)}
            disabled={isGenerating}
          >
            ✏️ Редактировать
          </button>
        )}
      </div>
    </div>
  )
}
