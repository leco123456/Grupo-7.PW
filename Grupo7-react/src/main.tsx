import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import PaginaPrincipal from './Pages/PaginaPrincipal'
import ConfirmarOrden from './Pages/Confirmarorden'
import NotificacionCompra from './Pages/NotificacionCompra'
import Detalle from './Pages/Detalle'
import Reseña from './Pages/Reseña'
import AdminJuegos from './Pages/AdminJuegos'
import AgregarJuego from './Pages/AgregarJuego'
import EditarJuego from './Pages/EditarJuego'
import EliminarJuego from './Pages/EliminarJuego'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Reseña/>
   
  </StrictMode>,
)
