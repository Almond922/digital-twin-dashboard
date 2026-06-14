import React from 'react'
import { createRoot } from 'react-dom/client'
import FuturisticDashboard from './src/futuristic/FuturisticDashboard.jsx'

function App(){
  return <FuturisticDashboard />
}

const root = document.getElementById('root')
createRoot(root).render(<App />)
