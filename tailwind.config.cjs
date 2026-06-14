module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: '#00e5ff',
        cyber: '#071428',
        glass: 'rgba(255,255,255,0.03)'
      },
      boxShadow: {
        'neon-lg': '0 20px 60px rgba(0,229,255,0.12)'
      }
    }
  },
  plugins: []
}
