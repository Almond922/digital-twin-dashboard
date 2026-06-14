Futuristic Personal Health Digital Twin — Setup

This is a standalone futuristic dashboard scaffold using React, Tailwind CSS, Framer Motion, Recharts, Lucide React, and React Three Fiber.

Install

```bash
npm install
```

Install the optional peer deps (Tailwind build plugins will be installed by npm script above):

```bash
# if you need to add them manually
npm install tailwindcss postcss autoprefixer framer-motion recharts lucide-react @react-three/fiber three
```

Run dev server

```bash
npm run dev
```

Open http://localhost:5173/

Notes

- The new dashboard lives under `src/futuristic/` and does not reuse existing components.
- Tailwind is configured via `tailwind.config.cjs` and `postcss.config.cjs`.
- The 3D holographic human is left as a React Three Fiber placeholder — you can expand it in `CenterPanel.jsx` using `@react-three/fiber` and `three`.
