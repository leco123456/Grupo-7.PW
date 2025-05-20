import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lista from './Pages/lista'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Lista/>
  </StrictMode>,
)
