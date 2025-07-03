import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Perso from './Perso.tsx'
import Sidebar from './Sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Perso/>
    <Sidebar />
  </StrictMode>,
)
