const API_BASE = import.meta.env.DEV ? 'http://localhost:4500' : ''

export interface SiteConfig {
  project: {
    brandName: string
    projectName: string
    subtitle: string
    dimensions: { length: number; width: number }
    rooms: number
    bathrooms: number
    floors: number
    telegramUrl: string
    telegramTooltip: string
    ctaButtonText: string
    consultButtonText: string
    ctaText: string
    ctaTelegramLink: string
  }
  sections: {
    floorPlan: { title: string; subtitle: string }
    interior: { title: string; subtitle: string }
    quality: { title: string; subtitle: string }
    about: { title: string }
  }
  rooms: Array<{
    id: string
    name: string
    area: number
    description: string
    features: string[]
    image: string
    video: string
  }>
  exteriorImages: {
    day: Record<string, Record<string, string[]>>
    night: Record<string, Record<string, string[]>>
  }
  interiorImages: Record<string, string[]>
  videoMappings: {
    exterior: Record<string, string>
    interior: Record<string, string>
  }
  qualitySteps: Array<{
    img: string
    img2: string
    title: string
    desc: string
  }>
  pricing: Array<{
    name: string
    description: string
    price: string
    pricePerM: string
    percent: number
    popular: boolean
    features: string[]
    modelPath: string
  }>
  youtubeVideos: Array<{
    title: string
    videoId: string
    telegramLink: string
    previewVideo?: string
  }>
  floorPlanTooltips: Array<{
    name: string
    x: number
    y: number
  }>
  timing: {
    autoScrollInterval: number
    stepDuration: number
    pauseDuration: number
    tooltipDuration: number
  }
}

export async function fetchConfig(): Promise<SiteConfig> {
  const res = await fetch(`${API_BASE}/api/config`)
  if (!res.ok) throw new Error('Failed to fetch config')
  return res.json()
}

export async function adminLogin(password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) throw new Error('Неверный пароль')
  const data = await res.json()
  return data.token
}

export async function saveConfig(config: SiteConfig, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/config`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(config),
  })
  if (!res.ok) {
    if (res.status === 401) throw new Error('401:Сессия истекла')
    throw new Error('Ошибка сохранения')
  }
}

export async function uploadFile(file: File, token: string): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API_BASE}/api/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
  if (!res.ok) throw new Error('Ошибка загрузки файла')
  const data = await res.json()
  return data.url
}
