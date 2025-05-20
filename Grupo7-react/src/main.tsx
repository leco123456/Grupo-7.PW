import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ListaValor from './Pages/ListaValor'
import ListaVenta from './Pages/ListaVenta'
import SignIn from './Pages/SignIn'
import ResetPass from './Pages/ResetPass'
import SignUp from './Pages/SignUp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <SignUp/>
  </StrictMode>,
)
