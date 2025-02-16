import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Order from './Order.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Order/>
  </StrictMode>,
)
