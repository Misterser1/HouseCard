import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Center, Html } from '@react-three/drei'
import * as THREE from 'three'

interface ModelProps {
  url: string
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url)
  const ref = useRef<THREE.Group>(null)

  // Центрируем и масштабируем модель
  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = 2 / maxDim

  return (
    <Center>
      <primitive
        ref={ref}
        object={scene}
        scale={scale}
      />
    </Center>
  )
}

function LoadingSpinner() {
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div className="spinner" />
        <p style={{ color: '#2d5a3d', margin: 0 }}>Загрузка 3D модели...</p>
      </div>
    </Html>
  )
}

interface ModelViewerProps {
  modelUrl: string | null
  isGenerating?: boolean
}

export function ModelViewer({ modelUrl, isGenerating }: ModelViewerProps) {
  if (!modelUrl && !isGenerating) {
    return (
      <div className="model-viewer-placeholder">
        <div className="empty-state">
          <div className="icon">🏠</div>
          <p>Сгенерируйте дом и создайте 3D модель</p>
          <p className="hint">Модель можно будет вращать мышкой</p>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="model-viewer-placeholder">
        <div className="generating">
          <div className="spinner" />
          <p>Создание 3D модели...</p>
          <p className="hint">Это может занять 30-60 секунд</p>
        </div>
      </div>
    )
  }

  return (
    <div className="model-viewer">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #E0F7FA 100%)' }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        {/* Равномерное освещение без теней */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, 10, -5]} intensity={0.6} />
        <directionalLight position={[0, -10, 0]} intensity={0.3} />
        <hemisphereLight args={['#ffffff', '#e0e0e0', 0.6]} />

        <Suspense fallback={<LoadingSpinner />}>
          {modelUrl && <Model url={modelUrl} />}
          <Environment preset="studio" background={false} />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={10}
          autoRotate={false}
        />

        {/* Сетка для ориентации */}
        <gridHelper args={[10, 10, '#ddd', '#f0f0f0']} position={[0, -1, 0]} />
      </Canvas>

      <div className="model-controls-hint">
        <span>🖱️ Вращение</span>
        <span>⚙️ Зум колёсиком</span>
        <span>⌨️ Shift + клик для перемещения</span>
      </div>
    </div>
  )
}
