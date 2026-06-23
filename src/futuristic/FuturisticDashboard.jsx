
import React, { useState } from 'react'

import Sidebar from './Sidebar'
import CenterPanel from './CenterPanel'
import RightPanel from './RightPanel'

import PatientProfile from '../../pages/PatientProfile'
import LiveECG from '../../pages/LiveECG'
import CardiacMetrics from '../../pages/CardiacMetrics'
import AIDiagnosis from '../../pages/AIDiagnosis'
import AlertCenter from '../../pages/AlertCenter'
import Devices from '../../pages/Devices'
import Settings from '../../pages/Settings'

import '../../src/styles/tailwind.css'

export default function FuturisticDashboard() {

  const [page, setPage] = useState('Dashboard')

  const history = {
    hr: [72, 74, 70, 68, 75, 72, 73]
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#031428] to-[#00101a] text-white">

      <Sidebar
        active={page}
        onSelect={setPage}
      />

      {page === 'Dashboard' && (
        <>
          <CenterPanel history={history} />
          <RightPanel />
        </>
      )}

      {page === 'Patient Profile' && (
        <PatientProfile />
      )}

      {page === 'Live ECG' && (
        <LiveECG />
      )}

      {page === 'Cardiac Metrics' && (
        <CardiacMetrics />
      )}

      {page === 'AI Diagnosis' && (
        <AIDiagnosis />
      )}

      {page === 'Alert Center' && (
        <AlertCenter />
      )}

      {page === 'Devices' && (
        <Devices />
      )}

      {page === 'Settings' && (
        <Settings />
      )}

    </div>
  )
}

