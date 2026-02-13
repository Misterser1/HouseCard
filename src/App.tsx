import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConstructorV1 } from './pages/ConstructorV1'
import { AdminPanel } from './pages/AdminPanel'
import { LogoEffectsDemo } from './pages/LogoEffectsDemo'
import { LogoVisibilityDemo } from './pages/LogoVisibilityDemo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConstructorV1 />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/demo/logo-effects" element={<LogoEffectsDemo />} />
        <Route path="/demo/logo-visibility" element={<LogoVisibilityDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
