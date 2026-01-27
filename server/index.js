import express from 'express'
import cors from 'cors'
import multer from 'multer'
import Replicate from 'replicate'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 4500

app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage })

// Статика для загруженных файлов
app.use('/uploads', express.static(join(__dirname, 'uploads')))

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})

// Функция для генерации изображения через Google Nano Banana
async function generateImage(prompt, negativePrompt, referenceImage = null) {
  const input = {
    prompt,
    aspect_ratio: "4:3",
    number_of_images: 1,
    output_format: "png",
    safety_filter_level: "block_low_and_above"
  }

  // Если есть референсное изображение - используем для редактирования
  if (referenceImage) {
    input.image = referenceImage
  }

  // Создаём prediction и ждём результат
  const prediction = await replicate.predictions.create({
    version: "google/nano-banana",
    input
  })

  // Ждём завершения
  let result = await replicate.predictions.get(prediction.id)

  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise(resolve => setTimeout(resolve, 1000))
    result = await replicate.predictions.get(prediction.id)
    console.log('Status:', result.status)
  }

  if (result.status === 'failed') {
    throw new Error(result.error || 'Generation failed')
  }

  console.log('Result output:', result.output)
  // Nano Banana возвращает строку, другие модели - массив
  if (Array.isArray(result.output)) {
    return result.output[0]
  }
  return result.output
}

// Генерация изображения дома
app.post('/api/generate', async (req, res) => {
  try {
    const {
      referenceImage,
      frontImage, // Передний вид для консистентности
      floors = 2,
      material = 'wooden',
      roofType = 'gable',
      style = 'modern',
      view = 'front',
      hasGarage = false,
      hasBalcony = false
    } = req.body

    // Детальные описания для каждого ракурса
    const viewPrompts = {
      front: 'front facade view, main entrance visible, centered composition',
      back: 'rear facade view from backyard, back of the same house, no front door visible, back windows and back porch',
      left: 'left side elevation view, side profile of the house, no front entrance',
      right: 'right side elevation view, side profile of the house, no front entrance'
    }

    const materialPrompts = {
      wooden: 'wooden house with horizontal wood siding, timber frame construction, natural wood color',
      wood: 'wooden house with horizontal wood siding, timber frame construction, natural wood color',
      brick: 'brick house with red clay brick facade, visible mortar lines, traditional brickwork',
      stone: 'stone house with natural stone facade, rustic stonework',
      stucco: 'stucco house with smooth plastered walls, painted exterior',
      modern: 'modern house with glass panels, concrete elements, minimalist design'
    }

    const roofPrompts = {
      gable: 'symmetrical gable roof with triangular ends',
      hip: 'hip roof with four sloped sides',
      flat: 'flat roof with modern parapet',
      mansard: 'mansard roof with dormer windows'
    }

    const stylePrompts = {
      modern: 'modern contemporary',
      classic: 'classic traditional',
      minimalist: 'minimalist clean lines',
      european: 'European villa style',
      american: 'American craftsman style'
    }

    // Дополнительные элементы
    const extras = []
    if (hasGarage) extras.push('attached garage with garage door')
    if (hasBalcony) extras.push('balcony on upper floor')
    const extrasStr = extras.length > 0 ? `, ${extras.join(', ')}` : ''

    // Базовое описание дома для консистентности
    const materialDesc = materialPrompts[material] || materialPrompts.brick
    const roofDesc = roofPrompts[roofType] || roofPrompts.gable
    const styleDesc = stylePrompts[style] || stylePrompts.classic

    const houseDescription = `exact same ${floors}-story ${styleDesc} house, ${materialDesc}, ${roofDesc}${extrasStr}, consistent architectural design`

    // Формируем промпт в зависимости от ракурса
    let prompt
    if (view === 'front') {
      prompt = `Professional architectural photograph of a ${houseDescription}, ${viewPrompts[view]}, photorealistic, high quality, detailed exterior, sunny day, manicured lawn, 8k resolution`
    } else {
      // Для других ракурсов подчёркиваем что это тот же дом
      prompt = `Professional architectural photograph showing the ${viewPrompts[view]} of the ${houseDescription}, same building different angle, consistent windows and roof style, photorealistic, high quality, 8k resolution`
    }

    const negativePrompt = 'cartoon, anime, drawing, sketch, painting, low quality, blurry, distorted, deformed, different house, inconsistent design, front door on side view, wrong perspective'

    console.log('Generating with prompt:', prompt)

    // Используем frontImage как референс для других ракурсов если он есть
    const refImage = (view !== 'front' && frontImage) ? frontImage : referenceImage

    const imageUrl = await generateImage(prompt, negativePrompt, refImage)

    res.json({
      success: true,
      imageUrl,
      prompt
    })
  } catch (error) {
    console.error('Generation error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Inpainting - редактирование части изображения
app.post('/api/inpaint', async (req, res) => {
  try {
    const {
      image,
      mask,
      prompt,
      action = 'add'
    } = req.body

    const fullPrompt = action === 'remove'
      ? `${prompt}, seamless blend, same architectural style, matching materials`
      : `${prompt}, high quality architectural detail, photorealistic, matching style`

    const input = {
      prompt: fullPrompt,
      image,
      mask,
      num_outputs: 1,
      guidance_scale: 7.5,
      num_inference_steps: 25
    }

    const prediction = await replicate.predictions.create({
      version: "95b7223104132402a9ae91cc677285bc5eb997834bd2349fa486f53910fd68b3",
      input
    })

    let result = await replicate.predictions.get(prediction.id)

    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      result = await replicate.predictions.get(prediction.id)
    }

    if (result.status === 'failed') {
      throw new Error(result.error || 'Inpainting failed')
    }

    res.json({ success: true, imageUrl: result.output[0] })
  } catch (error) {
    console.error('Inpainting error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Генерация 3D модели через Trellis
app.post('/api/generate-3d', async (req, res) => {
  try {
    const { imageUrl, imageUrls } = req.body

    // Поддерживаем и старый формат (imageUrl) и новый (imageUrls)
    const images = imageUrls || (imageUrl ? [imageUrl] : null)

    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, error: 'imageUrl or imageUrls is required' })
    }

    console.log(`Generating 3D model with Trellis from ${images.length} image(s)`)

    // Используем Trellis для генерации 3D
    const prediction = await replicate.predictions.create({
      version: "e8f6c45206993f297372f5436b90350817bd9b4a0d52d2a76df50c1c8afa2b3c",
      input: {
        images: images,
        texture_size: 2048,
        mesh_simplify: 0.9,
        generate_model: true,
        generate_color: true,
        generate_normal: true,
        randomize_seed: true
      }
    })

    // Ждём завершения
    let result = await replicate.predictions.get(prediction.id)
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 2000))
      result = await replicate.predictions.get(prediction.id)
      console.log('Trellis Status:', result.status)
    }

    if (result.status === 'failed') {
      throw new Error(result.error || '3D generation failed')
    }

    console.log('Trellis output:', result.output)

    const modelUrl = result.output?.model_file || result.output

    res.json({
      success: true,
      modelUrl: modelUrl,
      message: '3D модель успешно создана'
    })
  } catch (error) {
    console.error('3D generation error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Загрузка референсного изображения
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' })
  }

  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`
  res.json({ success: true, imageUrl })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
