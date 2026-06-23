import React from 'react'

export default function LiveECG() {
  return (
    <main className="flex-1 p-6">

      <div className="bg-[#031825] rounded-2xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          Live ECG Monitoring
        </h1>

        <div className="bg-[#011521] rounded-xl h-80 flex items-center justify-center">
          ECG Stream Here
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="bg-[#021726] p-4 rounded-xl">
            Heart Rate
            <div className="text-2xl font-bold mt-2">
              72 BPM
            </div>
          </div>

          <div className="bg-[#021726] p-4 rounded-xl">
            Signal Quality
            <div className="text-2xl font-bold mt-2">
              98%
            </div>
          </div>

          <div className="bg-[#021726] p-4 rounded-xl">
            Status
            <div className="text-green-400 text-xl font-bold mt-2">
              Connected
            </div>
          </div>

        </div>

      </div>

    </main>
  )
}