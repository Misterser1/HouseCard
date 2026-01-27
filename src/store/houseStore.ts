import { create } from 'zustand'

export type RoofType = 'gable' | 'hip' | 'flat' | 'mansard'
export type MaterialType = 'wooden' | 'brick' | 'stone' | 'stucco' | 'modern'
export type ViewType = 'front' | 'back' | 'left' | 'right'

interface HouseViews {
  front: string | null
  back: string | null
  left: string | null
  right: string | null
}

interface HouseState {
  // Параметры дома
  floors: number
  material: MaterialType
  roofType: RoofType
  style: string

  // Референс
  referenceImage: string | null

  // Сгенерированные виды
  views: HouseViews
  activeView: ViewType

  // Состояние UI
  isGenerating: boolean
  generatingView: ViewType | 'all' | null
  error: string | null

  // Режим редактирования
  isEditing: boolean
  editMask: string | null

  // 3D модель
  modelUrl: string | null
  isGenerating3D: boolean

  // Действия
  setFloors: (floors: number) => void
  setMaterial: (material: MaterialType) => void
  setRoofType: (roofType: RoofType) => void
  setStyle: (style: string) => void
  setReferenceImage: (url: string | null) => void
  setActiveView: (view: ViewType) => void
  setView: (view: ViewType, url: string) => void
  setAllViews: (views: HouseViews) => void
  setIsGenerating: (isGenerating: boolean, view?: ViewType | 'all' | null) => void
  setError: (error: string | null) => void
  setIsEditing: (isEditing: boolean) => void
  setEditMask: (mask: string | null) => void
  setModelUrl: (url: string | null) => void
  setIsGenerating3D: (isGenerating: boolean) => void
  reset: () => void
}

const initialState = {
  floors: 2,
  material: 'wooden' as MaterialType,
  roofType: 'gable' as RoofType,
  style: 'modern',
  referenceImage: null,
  views: {
    front: null,
    back: null,
    left: null,
    right: null
  },
  activeView: 'front' as ViewType,
  isGenerating: false,
  generatingView: null,
  error: null,
  isEditing: false,
  editMask: null,
  modelUrl: null,
  isGenerating3D: false
}

export const useHouseStore = create<HouseState>((set) => ({
  ...initialState,

  setFloors: (floors) => set({ floors: Math.max(1, Math.min(4, floors)) }),
  setMaterial: (material) => set({ material }),
  setRoofType: (roofType) => set({ roofType }),
  setStyle: (style) => set({ style }),
  setReferenceImage: (referenceImage) => set({ referenceImage }),
  setActiveView: (activeView) => set({ activeView }),
  setView: (view, url) => set((state) => ({
    views: { ...state.views, [view]: url }
  })),
  setAllViews: (views) => set({ views }),
  setIsGenerating: (isGenerating, generatingView = null) => set({ isGenerating, generatingView }),
  setError: (error) => set({ error }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setEditMask: (editMask) => set({ editMask }),
  setModelUrl: (modelUrl) => set({ modelUrl }),
  setIsGenerating3D: (isGenerating3D) => set({ isGenerating3D }),
  reset: () => set(initialState)
}))
