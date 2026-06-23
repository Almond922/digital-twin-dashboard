import React, { useState, useEffect, useRef } from "react";

const CARD_BG = "#071428";
const PANEL_BG = "#021024";
const TEXT = "#e6f7ff";
const MUTED = "#9fb3c8";

function ECGCanvas({ height = 260 }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let t = 0;
    let raf;

    const draw = () => {
      t++;
      const w = c.width;
      const h = c.height;

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let i = 0; i < w; i++) {
        const y =
          h / 2 +
          Math.sin((i + t * 6) * 0.05) * 20 +
          (Math.random() - 0.5) * 8;

        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }

      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      width={900}
      height={height}
      style={{ width: "100%", height }}
    />
  );
}

function MetricCard({ title, value }) {
  return (
    <div style={{ background: CARD_BG, padding: 16, borderRadius: 12 }}>
      <div style={{ color: MUTED, fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

export default function HealthDashboard() {
  const [heartRate, setHeartRate] = useState(78);

  useEffect(() => {
    const id = setInterval(() => {
      setHeartRate(75 + Math.floor(Math.random() * 8));
    }, 1500);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PANEL_BG,
        color: TEXT,
        padding: 20,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ color: "#00e5ff" }}>
        CardioTwin AI — Real-Time Cardiac Monitoring
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <MetricCard title="Heart Rate" value={`${heartRate} BPM`} />
        <MetricCard title="Diagnosis" value="Normal" />
        <MetricCard title="Confidence" value="96%" />
        <MetricCard title="Risk Level" value="Low" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div style={{ background: CARD_BG, padding: 16, borderRadius: 12 }}>
          <div style={{ color: MUTED, marginBottom: 10 }}>
            Live ECG Waveform
          </div>
          <ECGCanvas />
        </div>

        <div style={{ background: CARD_BG, padding: 16, borderRadius: 12 }}>
          <div style={{ color: MUTED }}>AI Diagnosis</div>

          <div style={{ marginTop: 15 }}>
            <div>Normal - 96%</div>
            <progress value="96" max="100" style={{ width: "100%" }} />

            <div style={{ marginTop: 10 }}>MI - 2%</div>
            <progress value="2" max="100" style={{ width: "100%" }} />

            <div style={{ marginTop: 10 }}>STTC - 2%</div>
            <progress value="2" max="100" style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <div style={{ background: CARD_BG, padding: 16, borderRadius: 12 }}>
          <div style={{ color: MUTED, marginBottom: 12 }}>
            Cardiac Metrics
          </div>

          <p>Heart Rate: {heartRate} BPM</p>
          <p>RR Interval: 0.82 sec</p>
          <p>QRS Duration: 0.09 sec</p>
          <p>QT Interval: 0.36 sec</p>
          <p>PR Interval: 0.16 sec</p>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <div
            style={{ background: CARD_BG, padding: 16, borderRadius: 12 }}
          >
            <div style={{ color: MUTED }}>Device Status</div>
            <p>ESP32 Controller — Connected</p>
            <p>AD8232 Sensor — Active</p>
            <p>Signal Quality — 98%</p>
          </div>

          <div
            style={{ background: CARD_BG, padding: 16, borderRadius: 12 }}
          >
            <div style={{ color: MUTED }}>Alert Center</div>
            <p style={{ color: "#4caf50" }}>
              ✓ No abnormalities detected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}