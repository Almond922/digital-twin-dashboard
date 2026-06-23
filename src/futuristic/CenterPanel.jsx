import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts'
import HologramHuman from './HologramHuman'

function HealthRing({ value = 86 }) {
  return (
    <div className="w-44 h-44 rounded-full bg-gradient-to-b from-[#021826] to-transparent p-3 flex items-center justify-center shadow-neon-lg">
      <div className="w-full h-full rounded-full bg-[#001420] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-extrabold text-[#7cffc8]">{value}</div>
          <div className="text-sm text-slate-400">/100</div>
        </div>
      </div>
    </div>
  )
}

function ECGCanvas({ height = 80 }) {
  const ref = useRef(null)
  const data = useRef(Array(300).fill(0))

  useEffect(() => {
    const c = ref.current
    if (!c) return

    const ctx = c.getContext('2d')
    let raf
    let t = 0

    const draw = () => {
      t++
      const ecgPattern = [
        0, 0, 0, 0,
        0.2, 0.4, 0.1,
        -0.8,
        2.5,
        -1.0,
        0.5,
        0.2, 0, 0, 0, 0, 0, 0
      ]
      const value =
        ecgPattern[t % ecgPattern.length] +
        (Math.random() - 0.5) * 0.05

      data.current.push(value)

      if (data.current.length > 300)
        data.current.shift()

      const w = c.width
      const h = c.height

      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = '#00e5ff'
      ctx.lineWidth = 2
      ctx.beginPath()

      data.current.forEach((v, i) => {
        const x = (i / (data.current.length - 1)) * w
        const y = h / 2 - v * (h * 0.25)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })

      ctx.stroke()
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={ref}
      width={800}
      height={height}
      style={{ width: '100%', height, borderRadius: 6 }}
    />
  )
}

export default function CenterPanel({ history }) {
  const [prediction, setPrediction] = useState({
    prediction: 'Loading...',
    norm: 0,
    mi: 0,
    sttc: 0
  })

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('http://localhost:5000/data')
      const data = await res.json()
      setPrediction(data)
    }

    loadData()
    const timer = setInterval(loadData, 1000)
    return () => clearInterval(timer)
  }, [])

  const healthScore =
    prediction.prediction === 'NORM'
      ? Math.round(prediction.norm)
      : prediction.prediction === 'STTC'
      ? 60
      : 30

  const predictionData = [
    { name: 'NORM', value: parseFloat(prediction.norm.toFixed(1)) },
    { name: 'MI',   value: parseFloat(prediction.mi.toFixed(1)) },
    { name: 'STTC', value: parseFloat(prediction.sttc.toFixed(1)) }
  ]

  const hrData = history.hr.map((v, i) => ({ name: `D${i + 1}`, value: v }))

  return (
    <main className="flex-1 p-6 overflow-auto">

      {/* Top Row — 3 equal columns */}
      <div className="grid grid-cols-3 gap-6">

        {/* Overview Card */}
        <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-semibold text-white">Overview</div>
            <div className="text-xs text-cyan-400">Live • AI</div>
          </div>

          <div className="flex justify-center">
            <HealthRing value={healthScore} />
          </div>

          <div className="text-center mt-4">
            <div className="text-sm text-slate-400">Cardiac Health Score</div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-[#021726] rounded-xl p-3">
              <div className="text-xs text-slate-400">Diagnosis</div>
              <div className="text-green-400 font-bold mt-2">{prediction.prediction}</div>
            </div>

            <div className="bg-[#021726] rounded-xl p-3">
              <div className="text-xs text-slate-400">Confidence</div>
              <div className="text-white font-bold mt-2">{prediction.norm.toFixed(2)}%</div>
            </div>

            <div className="bg-[#021726] rounded-xl p-3">
              <div className="text-xs text-slate-400">Risk</div>
              <div className={`font-bold mt-2 ${
                prediction.prediction === 'MI'
                  ? 'text-red-400'
                  : prediction.prediction === 'STTC'
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}>
                {prediction.prediction === 'MI' ? 'High'
                  : prediction.prediction === 'STTC' ? 'Medium'
                  : 'Low'}
              </div>
            </div>
          </div>
        </div>

        {/* Holographic Twin Card */}
        <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg">
          <div className="text-sm text-slate-300">Holographic Twin</div>
          <div
            className="mt-4 bg-gradient-to-b from-[#021428] to-transparent rounded-xl p-4 flex items-center justify-center"
            style={{ height: 300 }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden">
              <HologramHuman />
            </div>
          </div>
        </div>

        {/* Prediction Trends Card */}
        <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300">Prediction Trends</div>
            <div className="text-xs text-cyan-400">Live</div>
          </div>

          <div className="flex-1 mt-4" style={{ minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={hrData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#021426" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ background: '#021726', border: '1px solid #0e4060', borderRadius: 8 }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#00e5ff' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00e5ff"
                  strokeWidth={3}
                  dot={{ fill: '#7cffc8', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Row — 2 equal columns */}
      <div className="mt-6 grid grid-cols-2 gap-6">

        {/* Live ECG Card */}
        <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300">Live ECG Monitoring</div>
            <div className="text-xs text-green-400">● Streaming</div>
          </div>

          <div className="mt-4 h-48 bg-[#011521] rounded-xl p-3">
            <ECGCanvas height={168} />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-[#021726] rounded-lg p-3">
              <div className="text-xs text-slate-400">Signal Quality</div>
              <div className="text-green-400 font-bold mt-1">98%</div>
            </div>
            <div className="bg-[#021726] rounded-lg p-3">
              <div className="text-xs text-slate-400">Status</div>
              <div className="text-cyan-400 font-bold mt-1">Active</div>
            </div>
            <div className="bg-[#021726] rounded-lg p-3">
              <div className="text-xs text-slate-400">Prediction</div>
              <div className="text-yellow-400 font-bold mt-1">{prediction.prediction}</div>
            </div>
          </div>
        </div>

        {/* Model Confidence Card */}
        <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-slate-300">Model Confidence</div>
            <div className="text-xs text-cyan-400">Live</div>
          </div>

          <div className="flex flex-col gap-5 mt-2">
            {predictionData.map(({ name, value }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-300">{name}</span>
                  <span className="text-sm font-bold text-white">{value.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[#021726] h-6" style={{ borderRadius: 0 }}>
                  <div
                    className="h-6 transition-all duration-700 ease-out"
                    style={{
                      width: `${value}%`,
                      background: '#00e5ff',
                      borderRadius: 0
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            {predictionData.map(({ name, value }) => (
              <div key={name} className="bg-[#021726] rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400">{name}</div>
                <div className="font-bold mt-1 text-lg text-cyan-400">
                  {value.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}