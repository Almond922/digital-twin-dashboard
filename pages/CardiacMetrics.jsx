import React from 'react'

export default function CardiacMetrics() {
  return (
    <main className="flex-1 p-6">

      <div className="bg-[#031825] rounded-2xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          Cardiac Metrics
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <Metric title="Heart Rate" value="72 BPM" />
          <Metric title="RR Interval" value="0.82 sec" />
          <Metric title="QRS Duration" value="0.09 sec" />
          <Metric title="QT Interval" value="0.36 sec" />
          <Metric title="PR Interval" value="0.16 sec" />
          <Metric title="Signal Quality" value="98%" />

        </div>

      </div>

    </main>
  )
}

function Metric({ title, value }) {
  return (
    <div className="bg-[#021726] p-4 rounded-xl">
      <div className="text-slate-400">
        {title}
      </div>

      <div className="text-2xl font-bold mt-2">
        {value}
      </div>
    </div>
  )
}