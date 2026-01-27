import { useHouseStore, type ViewType } from '../store/houseStore'

const VIEWS: { id: ViewType; label: string }[] = [
  { id: 'front', label: 'Передний' },
  { id: 'back', label: 'Задний' },
  { id: 'left', label: 'Левый боковой' },
  { id: 'right', label: 'Правый боковой' }
]

export function ViewTabs() {
  const { activeView, setActiveView, isGenerating, generatingView } = useHouseStore()

  return (
    <div className="view-tabs">
      {VIEWS.map(({ id, label }) => (
        <button
          key={id}
          className={`view-tab ${activeView === id ? 'active' : ''} ${generatingView === id || generatingView === 'all' ? 'generating' : ''}`}
          onClick={() => setActiveView(id)}
          disabled={isGenerating}
        >
          {label}
          {(generatingView === id || generatingView === 'all') && (
            <span className="loading-dot" />
          )}
        </button>
      ))}
    </div>
  )
}
