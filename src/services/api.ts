const API_BASE = 'http://localhost:4500/api'

interface GenerateParams {
  referenceImage?: string | null
  frontImage?: string | null  // Передний вид для консистентности
  floors: number
  material: string
  roofType: string
  style: string
  view?: string
  hasGarage?: boolean
  hasBalcony?: boolean
}

interface GenerateResponse {
  success: boolean
  imageUrl?: string
  error?: string
}

interface InpaintParams {
  image: string
  mask: string
  prompt: string
  action: 'add' | 'remove'
}

export async function generateHouseView(params: GenerateParams): Promise<GenerateResponse> {
  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function inpaintImage(params: InpaintParams): Promise<GenerateResponse> {
  try {
    const response = await fetch(`${API_BASE}/inpaint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function uploadImage(file: File): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function generate3DModel(imageUrls: string | string[]): Promise<{ success: boolean; modelUrl?: string; error?: string }> {
  try {
    // Поддерживаем как одно изображение, так и массив для лучшего качества
    const images = Array.isArray(imageUrls) ? imageUrls : [imageUrls]
    const response = await fetch(`${API_BASE}/generate-3d`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrls: images })
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}
