import React from 'react'

export default function Devices() {
  return (
    <main className="flex-1 p-6">

      <div className="bg-[#031825] rounded-2xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          Connected Devices
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <Device
            name="ESP32 Controller"
            status="Connected"
          />

          <Device
            name="AD8232 ECG Sensor"
            status="Active"
          />

        </div>

      </div>

    </main>
  )
}

function Device({ name, status }) {
  return (
    <div className="bg-[#021726] p-4 rounded-xl">
      <div>{name}</div>
      <div className="text-green-400 mt-2">
        {status}
      </div>
    </div>
  )
}