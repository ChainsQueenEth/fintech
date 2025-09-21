module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#60A5FA'
        },
        accent: '#22D3EE',
        surface: '#0F172A',
        muted: '#94A3B8'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glass: '0 20px 45px rgba(59, 130, 246, 0.2)'
      }
    }
  },
  plugins: []
};
