import React, { useState } from 'react'
import Sidebar from './Sidebar'
import CenterPanel from './CenterPanel'
import RightPanel from './RightPanel'
import '../../src/styles/tailwind.css'

export default function FuturisticDashboard(){
  const [page, setPage] = useState('Dashboard')
  const history = { hr:[72,74,70,68,75,72,73] }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#031428] to-[#00101a] text-white">
      <Sidebar active={page} onSelect={setPage} />
      <CenterPanel history={history} />
      <RightPanel />
    </div>
  )
}
