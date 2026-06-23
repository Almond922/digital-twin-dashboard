
import React from 'react'

export default function RightPanel(){

  // Later this will come from your CNN model
  const prediction = "Normal"

  let insights = []
  let alertTitle = ""
  let alertDesc = ""
  let alertColor = ""

  if(prediction === "Normal"){
    insights = [
      {
        title:'Stress Level Normal',
        desc:'Heart rhythm appears stable with no signs of elevated stress.',
        color:'#7cffc8'
      },
      {
        title:'Hydration Status Good',
        desc:'Maintain your current hydration habits.',
        color:'#60a5fa'
      },
      {
        title:'Sleep Quality Improving',
        desc:'Current cardiac indicators suggest healthy recovery patterns.',
        color:'#a78bfa'
      }
    ]

    alertTitle = "✓ No Cardiac Alerts"
    alertDesc = "Heart rhythm appears normal and ECG signal quality is stable."
    alertColor = "#7cffc8"
  }

  else if(prediction === "MI"){
    insights = [
      {
        title:'Stress Level High',
        desc:'Cardiac condition may be associated with elevated physiological stress.',
        color:'#ff6b6b'
      },
      {
        title:'Hydration Recommended',
        desc:'Maintain adequate fluid intake unless medically advised otherwise.',
        color:'#60a5fa'
      },
      {
        title:'Sleep Recovery Important',
        desc:'Prioritize rest and recovery while seeking medical attention.',
        color:'#a78bfa'
      }
    ]

    alertTitle = "⚠ Possible MI Detected"
    alertDesc = "Immediate medical evaluation is recommended."
    alertColor = "#ff6b6b"
  }

  else if(prediction === "STTC"){
    insights = [
      {
        title:'Stress Monitoring Recommended',
        desc:'Changes in ECG patterns may be influenced by physiological stress.',
        color:'#ffb74d'
      },
      {
        title:'Hydration Monitoring Suggested',
        desc:'Maintain adequate hydration levels.',
        color:'#60a5fa'
      },
      {
        title:'Sleep Quality Assessment',
        desc:'Regular sleep can support cardiovascular health.',
        color:'#a78bfa'
      }
    ]

    alertTitle = "⚠ ST-T Changes Detected"
    alertDesc = "Further cardiac evaluation is recommended."
    alertColor = "#ffb74d"
  }

  return (
    <aside className="w-80 p-6 bg-[#021425] border-l border-white/5 flex flex-col gap-6">

      <div className="text-sm text-slate-300 font-semibold">
        AI Health Insights
      </div>

      <div className="flex flex-col gap-3">
        {insights.map(i => (
          <div
            key={i.title}
            className="p-3 rounded-lg bg-[#081b1d] border border-white/5"
          >
            <div
              className="text-sm font-semibold"
              style={{ color:i.color }}
            >
              {i.title}
            </div>

            <div className="text-xs text-slate-400">
              {i.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-slate-300 font-semibold">
        Alert Center
      </div>

      <div className="p-3 rounded-lg bg-[#081b1d] border border-white/5">

        <div
          className="text-sm font-bold"
          style={{ color:alertColor }}
        >
          {alertTitle}
        </div>

        <div className="text-xs text-slate-400 mt-2">
          {alertDesc}
        </div>

      </div>

      <div className="text-sm text-slate-300 font-semibold">
        Digital Twin Recommendations
      </div>

      <div className="p-3 rounded-lg bg-[#081b1d] border border-white/5 text-xs text-slate-400">

        Maintain regular exercise.

        <br /><br />

        Follow a heart-healthy diet.

        <br /><br />

        Continue periodic ECG monitoring.

      </div>

    </aside>
  )
}

