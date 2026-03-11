/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      colors: {
        primary:   '#1A6BFF',
        'primary-dark': '#0F4FCC',
        'primary-light':'#4F8DFF',
        accent:    '#00C2FF',
        dark:      '#0A0F1E',
        'dark-2':  '#111827',
        light:     '#F8FAFF',
        'light-2': '#EEF3FF',
        'light-3': '#E2EAFF',
        slate:     '#4B5B7C',
        mist:      '#8494B2',
        success:   '#22C55E',
        rust:      '#EF4444',
      },
      boxShadow: {
        'blue-sm':  '0 4px 20px rgba(26,107,255,0.15)',
        'blue-md':  '0 8px 40px rgba(26,107,255,0.2)',
        'blue-lg':  '0 20px 60px rgba(26,107,255,0.25)',
        'card':     '0 2px 20px rgba(10,15,30,0.08)',
        'card-hover':'0 8px 40px rgba(26,107,255,0.18)',
      },
      backgroundImage: {
        'hero-grad': 'linear-gradient(135deg, #0A0F1E 0%, #0D1B3E 50%, #0A0F1E 100%)',
        'blue-grad': 'linear-gradient(135deg, #1A6BFF 0%, #00C2FF 100%)',
        'card-grad': 'linear-gradient(135deg, #F8FAFF 0%, #EEF3FF 100%)',
      },
    },
  },
  plugins: [],
}
