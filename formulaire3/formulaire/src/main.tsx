import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Signup from './Signup.tsx'
import Perso from './Perso.tsx'
import Login from './Login.tsx'
import Sidebar from './Sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Signup />
    <Login/>
    <Perso/>
  </StrictMode>,
)
