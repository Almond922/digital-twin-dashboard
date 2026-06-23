import React from 'react'

export default function AIDiagnosis() {
  return (
    <main className="flex-1 p-6">

      <div className="bg-[#031825] rounded-2xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          AI Diagnosis
        </h1>

        <div className="grid grid-cols-3 gap-4">

          <Prediction title="Normal" value="96%" />
          <Prediction title="MI" value="2%" />
          <Prediction title="STTC" value="2%" />

        </div>

        <div className="mt-8 bg-[#021726] rounded-xl p-6">

          <div className="text-slate-400">
            Predicted Condition
          </div>

          <div className="text-3xl font-bold text-green-400 mt-3">
            Normal Rhythm
          </div>

          <div className="mt-4 text-slate-300">
            Confidence Score: 96%
          </div>

        </div>

      </div>

    </main>
  )
}

function Prediction({ title, value }) {
  return (
    <div className="bg-[#021726] p-4 rounded-xl">
      <div>{title}</div>
      <div className="text-2xl font-bold mt-2">
        {value}
      </div>
    </div>
  )
}