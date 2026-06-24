import React from 'react'

export default function RightPanel({ prediction }) {

  const insights =
    prediction?.prediction === "MI"
      ? {
          title: "Possible Myocardial Infarction",
          description: "ECG pattern indicates possible myocardial infarction.",
          alert: "⚠ Critical Cardiac Alert",
          alertColor: "text-red-400",
          cards: [
            {
              title: 'Stress Level High',
              desc: 'Cardiac condition may be associated with elevated physiological stress.',
              color: '#ff6b6b'
            },
            {
              title: 'Hydration Recommended',
              desc: 'Maintain adequate fluid intake unless medically advised otherwise.',
              color: '#60a5fa'
            },
            {
              title: 'Sleep Recovery Important',
              desc: 'Prioritize rest and recovery while seeking medical attention.',
              color: '#a78bfa'
            }
          ]
        }
      : prediction?.prediction === "STTC"
      ? {
          title: "ST-T Abnormality Detected",
          description: "ECG pattern shows ST-T segment abnormalities.",
          alert: "⚠ Moderate Risk Alert",
          alertColor: "text-yellow-400",
          cards: [
            {
              title: 'Stress Monitoring Recommended',
              desc: 'Changes in ECG patterns may be influenced by physiological stress.',
              color: '#ffb74d'
            },
            {
              title: 'Hydration Monitoring Suggested',
              desc: 'Maintain adequate hydration levels.',
              color: '#60a5fa'
            },
            {
              title: 'Sleep Quality Assessment',
              desc: 'Regular sleep can support cardiovascular health.',
              color: '#a78bfa'
            }
          ]
        }
      : {
          title: "Normal Cardiac Activity",
          description: "Heart rhythm appears stable and within normal range.",
          alert: "✓ No Cardiac Alerts",
          alertColor: "text-green-400",
          cards: [
            {
              title: 'Stress Level Normal',
              desc: 'Heart rhythm appears stable with no signs of elevated stress.',
              color: '#7cffc8'
            },
            {
              title: 'Hydration Status Good',
              desc: 'Maintain your current hydration habits.',
              color: '#60a5fa'
            },
            {
              title: 'Sleep Quality Improving',
              desc: 'Current cardiac indicators suggest healthy recovery patterns.',
              color: '#a78bfa'
            }
          ]
        }

  const recommendations =
    prediction?.prediction === "MI"
      ? [
          "Seek immediate medical evaluation",
          "Avoid strenuous physical activity",
          "Enable continuous ECG monitoring",
          "Contact emergency services if symptoms worsen"
        ]
      : prediction?.prediction === "STTC"
      ? [
          "Schedule cardiology follow-up",
          "Monitor ECG changes regularly",
          "Reduce high-intensity exercise",
          "Increase monitoring frequency"
        ]
      : [
          "Cardiac rhythm within normal range",
          "Continue regular physical activity",
          "Maintain healthy sleep and hydration",
          "Schedule routine ECG monitoring"
        ]

  return (
    <aside className="w-80 p-6 bg-[#021425] border-l border-white/5 flex flex-col gap-6">

      <div className="text-sm text-slate-300 font-semibold">
        AI Health Insights
      </div>

      <div className="bg-[#021726] rounded-xl p-4">
        <div className="text-cyan-400 font-bold">
          {insights.title}
        </div>
        <div className="text-slate-300 mt-2 text-sm">
          {insights.description}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {insights.cards.map(i => (
          <div
            key={i.title}
            className="p-3 rounded-lg bg-[#081b1d] border border-white/5"
          >
            <div
              className="text-sm font-semibold"
              style={{ color: i.color }}
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
        <div className={`text-sm font-bold ${insights.alertColor}`}>
          {insights.alert}
        </div>
        <div className="text-xs text-slate-400 mt-2">
          {insights.description}
        </div>
      </div>

      <div className="text-sm text-slate-300 font-semibold">
        Digital Twin Recommendations
      </div>

      <div className="p-3 rounded-lg bg-[#081b1d] border border-white/5">
        <div className="space-y-3">
          {recommendations.map((item, index) => (
            <div
              key={index}
              className="text-sm text-slate-300"
            >
              • {item}
            </div>
          ))}
        </div>
      </div>

    </aside>
  )
}