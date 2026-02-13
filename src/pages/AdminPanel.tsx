import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchConfig, saveConfig, adminLogin, uploadFile } from '../services/configService'
import type { SiteConfig } from '../services/configService'
import './AdminPanel.css'

const TABS = [
  { id: 'project', label: 'Проект' },
  { id: 'rooms', label: 'Комнаты' },
  { id: 'quality', label: 'Качество' },
  { id: 'pricing', label: 'Цены' },
  { id: 'videos', label: 'Видео' },
  { id: 'sections', label: 'Секции' },
  { id: 'tooltips', label: 'Тултипы' },
  { id: 'timing', label: 'Тайминги' },
]

// --------------- helpers ---------------

function updateNested<T>(obj: T, path: string, value: unknown): T {
  const clone = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>
  const keys = path.split('.')
  let cur: Record<string, unknown> = clone
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]] as Record<string, unknown>
  }
  cur[keys[keys.length - 1]] = value
  return clone as T
}

// --------------- sub-components ---------------

function Field({ label, value, onChange, type = 'text', textarea = false }: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: string
  textarea?: boolean
}) {
  return (
    <div className="admin-field">
      <label className="admin-field__label">{label}</label>
      {textarea ? (
        <textarea
          className="admin-field__textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          className="admin-field__input"
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

function ListEditor({ items, onChange, placeholder = 'Значение' }: {
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}) {
  const update = (idx: number, val: string) => {
    const next = [...items]
    next[idx] = val
    onChange(next)
  }
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx))
  const add = () => onChange([...items, ''])

  return (
    <div className="admin-list">
      {items.map((item, i) => (
        <div className="admin-list__item" key={i}>
          <input
            className="admin-list__item-input"
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={placeholder}
          />
          <button type="button" className="admin-list__remove-btn" onClick={() => remove(i)} title="Удалить">&times;</button>
        </div>
      ))}
      <button type="button" className="admin-list__add-btn" onClick={add}>+ Добавить</button>
    </div>
  )
}

function FileUpload({ label, value, onChange, accept, token }: {
  label: string
  value: string
  onChange: (url: string) => void
  accept: string
  token: string
}) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isVideo = accept.startsWith('video/')
  const isImage = accept.startsWith('image/')
  const isPreviewable = isVideo || isImage

  const handleFile = useCallback(async (file: File) => {
    setUploading(true)
    try {
      const url = await uploadFile(file, token)
      onChange(url)
    } catch { /* ignore */ }
    setUploading(false)
  }, [token, onChange])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const fileName = value ? value.split('/').pop() : ''

  return (
    <div className="admin-field">
      <label className="admin-field__label">{label}</label>
      <div
        className={`admin-file-upload ${dragging ? 'admin-file-upload--drag' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          isPreviewable ? (
            <div className="admin-file-upload__preview">
              {isVideo ? (
                <video src={value} className="admin-file-upload__video" muted />
              ) : (
                <img src={value} alt="" className="admin-file-upload__img" />
              )}
              <div className="admin-file-upload__overlay">
                {uploading ? 'Загрузка...' : 'Нажмите или перетащите для замены'}
              </div>
            </div>
          ) : (
            <div className="admin-file-upload__file">
              <span className="admin-file-upload__file-icon">📦</span>
              <span className="admin-file-upload__file-name">{fileName}</span>
              <span className="admin-file-upload__file-hint">{uploading ? 'Загрузка...' : 'Нажмите или перетащите для замены'}</span>
            </div>
          )
        ) : (
          <div className="admin-file-upload__empty">
            {uploading ? 'Загрузка...' : 'Нажмите или перетащите файл'}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
        />
      </div>
    </div>
  )
}

function Expandable({ title, defaultOpen = false, children }: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="admin-expandable">
      <button type="button" className="admin-expandable__header" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <span className={`admin-expandable__arrow ${open ? 'admin-expandable__arrow--open' : ''}`}>&#9660;</span>
      </button>
      {open && <div className="admin-expandable__body">{children}</div>}
    </div>
  )
}

// --------------- tab renderers ---------------

function TabProject({ config, setConfig }: { config: SiteConfig; setConfig: (c: SiteConfig) => void }) {
  const p = config.project
  const set = (path: string, val: string | number) => setConfig(updateNested(config, `project.${path}`, val))

  return (
    <>
      <div className="admin-card">
        <h3 className="admin-card__title">Основное</h3>
        <Field label="Название бренда" value={p.brandName} onChange={v => set('brandName', v)} />
        <Field label="Название проекта" value={p.projectName} onChange={v => set('projectName', v)} />
        <Field label="Подзаголовок" value={p.subtitle} onChange={v => set('subtitle', v)} />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Размеры и характеристики</h3>
        <div className="admin-field__row">
          <Field label="Длина (м)" value={p.dimensions.length} onChange={v => set('dimensions.length', Number(v))} type="number" />
          <Field label="Ширина (м)" value={p.dimensions.width} onChange={v => set('dimensions.width', Number(v))} type="number" />
        </div>
        <div className="admin-field__row-3">
          <Field label="Комнаты" value={p.rooms} onChange={v => set('rooms', Number(v))} type="number" />
          <Field label="Санузлы" value={p.bathrooms} onChange={v => set('bathrooms', Number(v))} type="number" />
          <Field label="Этажи" value={p.floors} onChange={v => set('floors', Number(v))} type="number" />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Telegram</h3>
        <Field label="Telegram URL" value={p.telegramUrl} onChange={v => set('telegramUrl', v)} />
        <Field label="Telegram тултип" value={p.telegramTooltip} onChange={v => set('telegramTooltip', v)} />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Кнопки и CTA</h3>
        <div className="admin-field__row">
          <Field label="Текст CTA кнопки" value={p.ctaButtonText} onChange={v => set('ctaButtonText', v)} />
          <Field label="Текст кнопки консультации" value={p.consultButtonText} onChange={v => set('consultButtonText', v)} />
        </div>
      </div>
    </>
  )
}

function TabRooms({ config, setConfig, token }: { config: SiteConfig; setConfig: (c: SiteConfig) => void; token: string }) {
  const rooms = config.rooms

  const updateRoom = (idx: number, field: string, val: unknown) => {
    const next = [...rooms] as Record<string, unknown>[]
    next[idx] = { ...next[idx], [field]: val }
    setConfig({ ...config, rooms: next as SiteConfig['rooms'] })
  }

  return (
    <>
      {rooms.map((room, i) => (
        <Expandable key={room.id || i} title={room.name || `Комната ${i + 1}`}>
          <div className="admin-card" style={{ boxShadow: 'none', border: 'none', padding: 0 }}>
            <Field label="Название" value={room.name} onChange={v => updateRoom(i, 'name', v)} />
            <Field label="Площадь (м²)" value={room.area} onChange={v => updateRoom(i, 'area', Number(v))} type="number" />
            <div className="admin-field__row">
              <FileUpload label="Изображение" value={room.image} onChange={v => updateRoom(i, 'image', v)} accept="image/*" token={token} />
              <FileUpload label="Видео" value={room.video} onChange={v => updateRoom(i, 'video', v)} accept="video/*" token={token} />
            </div>
          </div>
        </Expandable>
      ))}
    </>
  )
}

function TabQuality({ config, setConfig, token }: { config: SiteConfig; setConfig: (c: SiteConfig) => void; token: string }) {
  const steps = config.qualitySteps

  const updateStep = (idx: number, field: string, val: string) => {
    const next = [...steps] as Record<string, unknown>[]
    next[idx] = { ...next[idx], [field]: val }
    setConfig({ ...config, qualitySteps: next as SiteConfig['qualitySteps'] })
  }

  return (
    <>
      {steps.map((step, i) => (
        <div className="admin-card" key={i}>
          <h3 className="admin-card__title">Шаг {i + 1}</h3>
          <Field label="Заголовок" value={step.title} onChange={v => updateStep(i, 'title', v)} />
          <Field label="Описание" value={step.desc} onChange={v => updateStep(i, 'desc', v)} textarea />
          <div className="admin-field__row">
            <FileUpload label="Изображение 1" value={step.img} onChange={v => updateStep(i, 'img', v)} accept="image/*" token={token} />
            <FileUpload label="Изображение 2" value={step.img2} onChange={v => updateStep(i, 'img2', v)} accept="image/*" token={token} />
          </div>
        </div>
      ))}
    </>
  )
}

function TabPricing({ config, setConfig, token }: { config: SiteConfig; setConfig: (c: SiteConfig) => void; token: string }) {
  const packages = config.pricing

  const updatePkg = (idx: number, field: string, val: unknown) => {
    const next = [...packages] as Record<string, unknown>[]
    next[idx] = { ...next[idx], [field]: val }
    setConfig({ ...config, pricing: next as SiteConfig['pricing'] })
  }

  return (
    <>
      {packages.map((pkg, i) => (
        <div className="admin-card" key={i}>
          <h3 className="admin-card__title">{pkg.name || `Пакет ${i + 1}`}</h3>
          <Field label="Название" value={pkg.name} onChange={v => updatePkg(i, 'name', v)} />
          <Field label="Описание" value={pkg.description} onChange={v => updatePkg(i, 'description', v)} textarea />
          <Field label="Цена" value={pkg.price} onChange={v => updatePkg(i, 'price', v)} />
          <FileUpload label="3D модель" value={pkg.modelPath} onChange={v => updatePkg(i, 'modelPath', v)} accept=".glb,.gltf" token={token} />
          <div className="admin-checkbox">
            <input
              type="checkbox"
              id={`popular-${i}`}
              checked={pkg.popular}
              onChange={e => updatePkg(i, 'popular', e.target.checked)}
            />
            <label className="admin-checkbox__label" htmlFor={`popular-${i}`}>Популярный</label>
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Особенности</label>
            <ListEditor items={pkg.features} onChange={f => updatePkg(i, 'features', f)} placeholder="Особенность" />
          </div>
        </div>
      ))}
    </>
  )
}

function extractYouTubeId(input: string): string {
  const trimmed = input.trim()
  // Already an ID (no slashes, no dots)
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed
  try {
    const url = new URL(trimmed)
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1).split('/')[0]
    return url.searchParams.get('v') || trimmed
  } catch {
    return trimmed
  }
}

function TabVideos({ config, setConfig }: { config: SiteConfig; setConfig: (c: SiteConfig) => void }) {
  const videos = config.youtubeVideos

  const updateVideo = (idx: number, field: string, val: string) => {
    const next = [...videos] as Record<string, unknown>[]
    next[idx] = { ...next[idx], [field]: val }
    setConfig({ ...config, youtubeVideos: next as SiteConfig['youtubeVideos'] })
  }

  return (
    <>
      {videos.map((video, i) => (
        <div className="admin-card" key={i}>
          <h3 className="admin-card__title">Видео {i + 1}</h3>
          <Field label="Заголовок" value={video.title} onChange={v => updateVideo(i, 'title', v)} />
          <div className="admin-field">
            <label className="admin-field__label">YouTube ссылка или ID</label>
            <input
              className="admin-field__input"
              value={video.videoId}
              onChange={e => updateVideo(i, 'videoId', extractYouTubeId(e.target.value))}
              placeholder="https://www.youtube.com/watch?v=... или ID"
            />
            {video.videoId && (
              <img
                className="admin-youtube-preview"
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                alt="Превью"
              />
            )}
          </div>
          <Field label="Telegram ссылка" value={video.telegramLink} onChange={v => updateVideo(i, 'telegramLink', v)} />
        </div>
      ))}
    </>
  )
}

function TabSections({ config, setConfig }: { config: SiteConfig; setConfig: (c: SiteConfig) => void }) {
  const s = config.sections
  const set = (path: string, val: string) => setConfig(updateNested(config, `sections.${path}`, val))

  return (
    <>
      <div className="admin-card">
        <h3 className="admin-card__title">План этажа</h3>
        <Field label="Заголовок" value={s.floorPlan.title} onChange={v => set('floorPlan.title', v)} />
        <Field label="Подзаголовок" value={s.floorPlan.subtitle} onChange={v => set('floorPlan.subtitle', v)} />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Интерьер</h3>
        <Field label="Заголовок" value={s.interior.title} onChange={v => set('interior.title', v)} />
        <Field label="Подзаголовок" value={s.interior.subtitle} onChange={v => set('interior.subtitle', v)} />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Качество</h3>
        <Field label="Заголовок" value={s.quality.title} onChange={v => set('quality.title', v)} />
        <Field label="Подзаголовок" value={s.quality.subtitle} onChange={v => set('quality.subtitle', v)} />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">О проекте</h3>
        <Field label="Заголовок" value={s.about.title} onChange={v => set('about.title', v)} />
      </div>
    </>
  )
}

function TabTooltips({ config, setConfig }: { config: SiteConfig; setConfig: (c: SiteConfig) => void }) {
  const tooltips = config.floorPlanTooltips

  const updateTooltip = (idx: number, field: string, val: string | number) => {
    const next = [...tooltips] as Record<string, unknown>[]
    next[idx] = { ...next[idx], [field]: val }
    setConfig({ ...config, floorPlanTooltips: next as SiteConfig['floorPlanTooltips'] })
  }

  const removeTooltip = (idx: number) => {
    setConfig({ ...config, floorPlanTooltips: tooltips.filter((_, i) => i !== idx) })
  }

  const addTooltip = () => {
    setConfig({ ...config, floorPlanTooltips: [...tooltips, { name: '', x: 50, y: 50 }] })
  }

  return (
    <div className="admin-card">
      <h3 className="admin-card__title">Тултипы плана этажа</h3>
      {tooltips.map((tip, i) => (
        <div className="admin-tooltip-row" key={i}>
          <input
            value={tip.name}
            onChange={e => updateTooltip(i, 'name', e.target.value)}
            placeholder="Название"
          />
          <input
            type="number"
            value={tip.x}
            onChange={e => updateTooltip(i, 'x', Number(e.target.value))}
            placeholder="X"
          />
          <input
            type="number"
            value={tip.y}
            onChange={e => updateTooltip(i, 'y', Number(e.target.value))}
            placeholder="Y"
          />
          <button type="button" className="admin-list__remove-btn" onClick={() => removeTooltip(i)} title="Удалить">&times;</button>
        </div>
      ))}
      <button type="button" className="admin-list__add-btn" onClick={addTooltip}>+ Добавить тултип</button>
    </div>
  )
}

function TabTiming({ config, setConfig }: { config: SiteConfig; setConfig: (c: SiteConfig) => void }) {
  const t = config.timing
  const set = (field: string, val: number) => setConfig(updateNested(config, `timing.${field}`, val))

  return (
    <div className="admin-card">
      <h3 className="admin-card__title">Настройки тайминга (мс)</h3>
      <div className="admin-field__row">
        <Field label="Авто-прокрутка" value={t.autoScrollInterval} onChange={v => set('autoScrollInterval', Number(v))} type="number" />
        <Field label="Длительность шага" value={t.stepDuration} onChange={v => set('stepDuration', Number(v))} type="number" />
      </div>
      <div className="admin-field__row">
        <Field label="Пауза" value={t.pauseDuration} onChange={v => set('pauseDuration', Number(v))} type="number" />
        <Field label="Длительность тултипа" value={t.tooltipDuration} onChange={v => set('tooltipDuration', Number(v))} type="number" />
      </div>
    </div>
  )
}

// --------------- main component ---------------

export function AdminPanel() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [token, setToken] = useState('')
  const [activeTab, setActiveTab] = useState('project')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // login state
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch(() => setMessage('Ошибка загрузки конфигурации'))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoggingIn(true)
    try {
      const t = await adminLogin(password)
      setToken(t)
      setPassword('')
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Ошибка входа')
    } finally {
      setLoggingIn(false)
    }
  }

  const handleSave = async () => {
    if (!config) return
    setSaving(true)
    setMessage('')
    try {
      await saveConfig(config, token)
      setMessage('success:Конфигурация сохранена')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ошибка сохранения'
      if (msg.includes('401') || msg.includes('авториз') || msg.includes('Unauthorized')) {
        setToken('')
        setMessage('error:Сессия истекла — войдите заново')
      } else {
        setMessage('error:' + msg)
      }
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 4000)
    }
  }

  const handleLogout = () => {
    setToken('')
    setPassword('')
  }

  // ---- login screen ----
  if (!token) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1 className="admin-login__title">Админ-панель</h1>
          <p className="admin-login__subtitle">Введите пароль для доступа</p>
          <form className="admin-login__form" onSubmit={handleLogin}>
            <input
              className="admin-login__input"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className="admin-login__error">{loginError}</p>}
            <button className="admin-login__btn" type="submit" disabled={loggingIn || !password}>
              {loggingIn ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ---- loading ----
  if (!config) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1 className="admin-login__title">Загрузка...</h1>
        </div>
      </div>
    )
  }

  // ---- tab content ----
  const renderTab = () => {
    switch (activeTab) {
      case 'project': return <TabProject config={config} setConfig={setConfig} />
      case 'rooms': return <TabRooms config={config} setConfig={setConfig} token={token} />
      case 'quality': return <TabQuality config={config} setConfig={setConfig} token={token} />
      case 'pricing': return <TabPricing config={config} setConfig={setConfig} token={token} />
      case 'videos': return <TabVideos config={config} setConfig={setConfig} />
      case 'sections': return <TabSections config={config} setConfig={setConfig} />
      case 'tooltips': return <TabTooltips config={config} setConfig={setConfig} />
      case 'timing': return <TabTiming config={config} setConfig={setConfig} />
      default: return null
    }
  }

  const currentTabLabel = TABS.find(t => t.id === activeTab)?.label ?? ''
  const msgType = message.startsWith('success:') ? 'success' : message.startsWith('error:') ? 'error' : ''
  const msgText = message.replace(/^(success|error):/, '')

  return (
    <div className="admin-panel">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar__brand">
            <h2>Админ-панель</h2>
            <span>Управление сайтом</span>
          </div>
          <nav className="admin-sidebar__nav">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`admin-sidebar__tab ${activeTab === tab.id ? 'admin-sidebar__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <button className="admin-sidebar__logout" onClick={handleLogout}>Выйти</button>
        </aside>

        <main className="admin-main">
          <div className="admin-main__header">
            <h1 className="admin-main__title">{currentTabLabel}</h1>
            <div className="admin-save-bar">
              {msgText && (
                <span className={`admin-save-bar__msg admin-save-bar__msg--${msgType}`}>{msgText}</span>
              )}
              <button className="admin-save-bar__btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>

          {renderTab()}
        </main>
      </div>
    </div>
  )
}
