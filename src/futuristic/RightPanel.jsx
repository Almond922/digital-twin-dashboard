import React from 'react'

export default function RightPanel(){
  const insights = [
    {title:'Stress increased', desc:'Your stress levels increased by 18% compared to last week', color:'#ff6b6b'},
    {title:'Hydration low', desc:'You have consumed 1.2L today. Aim for 2.5L', color:'#60a5fa'},
    {title:'Sleep improving', desc:'Last night: 7h 23m — keep it up', color:'#7cffc8'},
  ]

  return (
    <aside className="w-80 p-6 bg-[#021425] border-l border-white/5 flex flex-col gap-6">
      <div className="text-sm text-slate-300 font-semibold">AI Health Insights</div>
      <div className="flex flex-col gap-3">
        {insights.map(i=> (
          <div key={i.title} className="p-3 rounded-lg bg-[#081b1d] border border-white/2">
            <div className="text-sm font-semibold" style={{color:i.color}}>{i.title}</div>
            <div className="text-xs text-slate-400">{i.desc}</div>
          </div>
        ))}
      </div>

      <div className="text-sm text-slate-300 font-semibold">Alerts & Recommendations</div>
      <div className="p-3 rounded-lg bg-[#081b1d] border border-white/2">
        <div className="text-sm font-bold text-rose-400">Irregular Heartbeat Detected</div>
        <div className="text-xs text-slate-400 mt-2">We detected irregularities in your heart rhythm. Please consult a cardiologist.</div>
        <div className="mt-3 flex gap-2"><button className="px-3 py-2 rounded bg-rose-500 text-white">Contact Doctor</button><button className="px-3 py-2 rounded border border-white/5 text-slate-300">View Details</button></div>
      </div>

      <div className="text-sm text-slate-300 font-semibold">Simulation Outputs</div>
      <div className="p-3 rounded-lg bg-[#081b1d] border border-white/2 text-xs text-slate-400">Run the sleep +30m simulation to see predicted stress and heart rate improvements.</div>
    </aside>
  )
}
