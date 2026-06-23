import React from 'react'

export default function AlertCenter() {
  return (
    <main className="flex-1 p-6">

      <div className="bg-[#031825] rounded-2xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          Alert Center
        </h1>

        <div className="bg-[#021726] p-6 rounded-xl">

          <div className="text-green-400 text-xl font-bold">
            ✓ No Active Alerts
          </div>

          <div className="text-slate-400 mt-3">
            Heart rhythm appears normal.
          </div>

        </div>

      </div>

    </main>
  )
}