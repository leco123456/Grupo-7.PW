import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './Pages/PaginaPrincipal'
import AdminJuegos from './Pages/AdminJuegos'
// ... otros imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/adminjuegos" element={<AdminJuegos />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  )
}

export default App
