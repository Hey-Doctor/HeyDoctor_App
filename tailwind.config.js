/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',            // App 파일
    './src/**/*.{js,jsx,ts,tsx}',       // src 폴더 내 모든 js/ts 파일
  ],
  theme: {
    extend: {
      colors: {
        'default-color': '#F1FAF1',
        'component-color': '#82CD7B',
      },
      boxShadow: {
        custom: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  presets: [require('nativewind/preset')], // 반드시 포함해야 NativeWind 작동
  plugins: [],
};