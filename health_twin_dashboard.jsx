import React, { useState, useEffect, useRef } from "react";

// Minimal, cleaned Health Twin dashboard focused on ECG-derived features.
const PINK = "#e91e8c";
const CARD_BG = "#071428";
const PANEL_BG = "#021024";
const TEXT_LIGHT = "#e6f7ff";
const MUTED = "#9fb3c8";

function ECGCanvas({ height = 80 }) {
  const ref = useRef(null);
  const data = useRef(Array(300).fill(0));
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    let t = 0;
    const draw = () => {
      t++;
      data.current.push(Math.sin(t * 0.12) * 0.6 + (Math.random() - 0.5) * 0.08);
      if (data.current.length > 300) data.current.shift();
      const w = c.width; const h = c.height;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#00e5ff"; ctx.lineWidth = 2;
      ctx.beginPath();
      data.current.forEach((v, i) => {
        const x = (i / (data.current.length - 1)) * w;
        const y = h / 2 - v * (h * 0.25);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [height]);
  return <canvas ref={ref} width={800} height={height} style={{ width: "100%", height, borderRadius: 6 }} />;
}

function MiniLineChart({ data = [], color = PINK, h = 50 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d');
    const w = c.width, H = c.height; ctx.clearRect(0,0,w,H);
    if (data.length < 2) return;
    const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.beginPath();
    data.forEach((v,i)=>{ const x = (i/(data.length-1))*w; const y = H - ((v-mn)/rng)*H; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
    ctx.stroke();
  }, [data, color]);
  return <canvas ref={ref} width={200} height={h} style={{ width: '100%', height: h }} />;
}

function ProbBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: MUTED }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 800, color }}>{Math.round(value)}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 8, background: '#021425' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 8 }} />
      </div>
    </div>
  );
}

export default function HealthDashboard() {
  const [activePage] = useState('Dashboard');
  const [hrSlider, setHrSlider] = useState(72);
  const [hrvSlider, setHrvSlider] = useState(42);
  const [tick, setTick] = useState(0);
  const [history, setHistory] = useState({ hr: Array.from({length:20},()=>68+Math.random()*12), hrv: Array.from({length:20},()=>35+Math.random()*12) });

  useEffect(() => {
    const t = setInterval(() => {
      setTick(s => s + 1);
      setHistory(h => ({
        hr: [...h.hr.slice(1), Math.max(40, Math.min(140, Math.round(hrSlider + (Math.random()*6-3))))],
        hrv: [...h.hrv.slice(1), Math.max(18, Math.min(120, Math.round(hrvSlider + (Math.random()*4-2))))]
      }));
    }, 1200);
    return () => clearInterval(t);
  }, [hrSlider, hrvSlider]);

  const hr = Math.round(history.hr[history.hr.length-1]);
  const sdnn = Math.round(history.hrv[history.hrv.length-1]);
  const mean_rr = Math.round(60000 / Math.max(30, hr));
  const rmssd = Math.max(12, Math.round(sdnn * 0.7));
  const qrsDuration = 80 + Math.round((100 - sdnn) / 4);
  const qtc = 360 + Math.round((hr - 60) / 2);
  const pWaveAmp = +(0.05 + (sdnn < 30 ? 0.06 : 0)).toFixed(2);

  const p_norm = Math.max(5, 70 - Math.max(0, (hr - 80)) * 0.6 - Math.max(0, (100 - sdnn)) * 0.4);
  const p_mi = Math.max(2, Math.min(40, (qrsDuration > 120 ? 24 : 0) + (qtc > 470 ? 18 : 0)));
  const p_sttc = Math.max(2, Math.min(40, (Math.abs(hr - 70) > 25 ? 18 : 0) + (pWaveAmp > 0.12 ? 12 : 0)));
  const p_cd = Math.max(2, Math.min(40, (qrsDuration > 110 ? 20 : 0) + (sdnn < 25 ? 10 : 0)));
  const p_hyp = Math.max(2, Math.min(40, (pWaveAmp > 0.11 ? 18 : 0) + (sdnn > 60 ? 8 : 0)));
  const total = p_norm + p_mi + p_sttc + p_cd + p_hyp || 1;
  const diseases = [
    { label: 'NORM', value: (p_norm / total) * 100, color: '#4caf50' },
    { label: 'MI', value: (p_mi / total) * 100, color: '#ef5350' },
    { label: 'STTC', value: (p_sttc / total) * 100, color: '#ff9800' },
    { label: 'CD', value: (p_cd / total) * 100, color: '#9c27b0' },
    { label: 'HYP', value: (p_hyp / total) * 100, color: '#7c4dff' }
  ];

  const sorted = [...diseases].sort((a,b)=>b.value-a.value);
  const modelClass = sorted[0].label;
  const modelConfidence = Math.round(sorted[0].value);

  return (
    <div style={{ height: '100vh', fontFamily: 'Inter, sans-serif', background: PANEL_BG, color: TEXT_LIGHT, padding: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>Health Twin — Dashboard</h2>
            <div style={{ fontSize: 12, color: MUTED }}>Tick {tick}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>Heart Rate (Lead II)</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{hr} BPM</div>
            </div>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>SDNN (HRV)</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{sdnn} ms</div>
            </div>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>QRS Duration</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{qrsDuration} ms</div>
            </div>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>QTc</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{qtc} ms</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>P-wave amplitude</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{pWaveAmp} mV</div>
            </div>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>Mean RR</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{mean_rr} ms</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 12, marginBottom: 12 }}>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED, marginBottom: 8 }}>ECG Signal</div>
              <ECGCanvas height={80} />
            </div>

            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED, marginBottom: 8 }}>CNN Prediction</div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{modelClass} <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>({modelConfidence}%)</span></div>
              <div style={{ marginTop: 8 }}>
                {diseases.map(d=> <ProbBar key={d.label} label={d.label} value={d.value} color={d.color} />)}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>History — Heart Rate</div>
              <MiniLineChart data={history.hr} color={PINK} />
            </div>
            <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>History — HRV (SDNN)</div>
              <MiniLineChart data={history.hrv} color={'#7c4dff'} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: CARD_BG, padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: MUTED }}>Simulation Controls</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>Heart Rate</div>
              <input type="range" min={40} max={140} value={hrSlider} onChange={e=>setHrSlider(+e.target.value)} style={{ width: '100%' }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: PINK }}>{hrSlider} BPM</div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, color: MUTED }}>HRV (SDNN)</div>
              <input type="range" min={18} max={120} value={hrvSlider} onChange={e=>setHrvSlider(+e.target.value)} style={{ width: '100%' }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: '#7c4dff' }}>{hrvSlider} ms</div>
            </div>
          </div>

          <div style={{ background: CARD_BG, padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: MUTED }}>AI Insights (PQRST-derived)</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ marginBottom: 8 }}>
                <b>QRS:</b> {qrsDuration > 110 ? 'Prolonged — consider conduction disturbance' : 'Normal'}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>P-wave:</b> {pWaveAmp > 0.11 ? 'Tall P-wave — possible atrial enlargement' : 'Normal amplitude'}
              </div>
              <div>
                <b>ST-segment:</b> {modelClass === 'STTC' ? `Changes suggested (model ${modelConfidence}%)` : 'No acute ST/T change detected'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
