import React from 'react'
import { Menu, Heart, Activity, Cpu, Box, Settings, Watch } from 'lucide-react'

export default function Sidebar({ active, onSelect }){
  const items = [
    {k:'Dashboard', icon:<Menu/>},
    {k:'3D Twin', icon:<Heart/>},
    {k:'Vitals', icon:<Activity/>},
    {k:'Analytics', icon:<Cpu/>},
    {k:'Predictions', icon:<Box/>},
    {k:'Medications', icon:<Watch/>},
    {k:'Nutrition', icon:<Watch/>},
    {k:'Workouts', icon:<Watch/>},
    {k:'Sleep', icon:<Watch/>},
    {k:'Reports', icon:<Watch/>},
    {k:'Devices', icon:<Watch/>},
    {k:'Settings', icon:<Settings/>},
  ]

  return (
    <aside className="w-60 p-6 bg-[#021425] border-r border-white/5 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center"></div>
        <div>
          <div className="text-white font-semibold"> </div>
          <div className="text-sm text-slate-400"> </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {items.map(it=> (
          <button key={it.k} onClick={()=>onSelect(it.k)} className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-all ${active===it.k? 'bg-white/5 border-l-4 border-cyan-400':'hover:bg-white/2'}`}>
            <div className="text-cyan-300">{it.icon}</div>
            <div className={`text-sm font-medium ${active===it.k? 'text-white':'text-slate-300'}`}>{it.k}</div>
          </button>
        ))}
      </nav>

      <div className="text-sm text-slate-400">Connected Devices</div>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between px-3 py-2 bg-[#011a20] rounded-md">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-md bg-[#073a3f] flex items-center justify-center text-cyan-300">⌚</div><div className="text-sm">Smartwatch</div></div>
          <div className="text-xs text-green-300">100%</div>
        </div>
        <div className="flex items-center justify-between px-3 py-2 bg-[#011a20] rounded-md">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-md bg-[#073a3f] flex items-center justify-center text-cyan-300">📈</div><div className="text-sm">ECG Monitor</div></div>
          <div className="text-xs text-amber-300">75%</div>
        </div>
      </div>
    </aside>
  )
}
