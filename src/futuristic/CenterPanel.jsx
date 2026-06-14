import React from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer, Tooltip, Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import HologramHuman from './HologramHuman'

function HealthRing({value=86}){
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

export default function CenterPanel({ history }){
  const vitals = [
    {label:'Heart Rate', value:'72 bpm', color:'#7cffc8'},
    {label:'Blood Pressure', value:'120/80', color:'#a78bfa'},
    {label:'SpO2', value:'98%', color:'#60a5fa'},
    {label:'Resp Rate', value:'18 rpm', color:'#fb7185'},
  ]

  const data = history.hr.map((v,i)=>({name:`D${i+1}`, value: v}))

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-[#031825] rounded-2xl p-6 shadow-neon-lg flex flex-col gap-4">
          <div className="flex items-center justify-between"><div className="text-sm text-slate-300">Health Score</div><div className="text-xs text-slate-400">Live · AI</div></div>
          <div className="flex items-center gap-4"><HealthRing value={86} />
            <div className="flex-1">
              <div className="text-sm text-slate-300">Overall status</div>
              <div className="text-lg font-bold text-white mt-2">Good</div>
              <div className="text-sm text-slate-400 mt-2">AI-driven recommendations active. Sleep improving.</div>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-[#031825] rounded-2xl p-6 shadow-neon-lg">
          <div className="text-sm text-slate-300">Holographic Twin</div>
          <div className="mt-4 bg-gradient-to-b from-[#021428] to-transparent rounded-xl p-4 flex items-center justify-center" style={{height:300}}>
            <div className="w-full h-full rounded-lg overflow-hidden">
              <HologramHuman />
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-[#031825] rounded-2xl p-6 shadow-neon-lg flex flex-col gap-4">
          <div className="flex items-center justify-between"><div className="text-sm text-slate-300">Live Vitals</div><div className="text-xs text-slate-400">Streaming</div></div>
          <div className="grid grid-cols-2 gap-3">
            {vitals.map(v=> (
              <div key={v.label} className="p-3 rounded-lg bg-[#021726]">
                <div className="text-xs text-slate-400">{v.label}</div>
                <div className="text-lg font-bold text-white">{v.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="text-xs text-slate-400">ECG Simulation</div>
            <div className="mt-2 h-20 bg-[#011521] rounded-lg p-2"><canvas id="ecg-sim"/></div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg">
          <div className="text-sm text-slate-300">Organ Monitoring</div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {['Heart','Lungs','Brain','Stomach','Liver','Kidneys'].map(o=> (
              <div key={o} className="p-3 bg-[#021726] rounded-lg text-sm text-slate-300">{o}<div className="text-white font-bold mt-2">Status</div></div>
            ))}
          </div>
        </div>

        <div className="bg-[#031825] rounded-2xl p-6 shadow-neon-lg">
          <div className="text-sm text-slate-300">Health Trends</div>
          <div style={{height:180}} className="mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#021426"/>
                <XAxis dataKey="name" stroke="#6b7280"/>
                <YAxis stroke="#6b7280"/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#00e5ff" strokeWidth={2} dot={{fill:'#7cffc8'}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  )
}
