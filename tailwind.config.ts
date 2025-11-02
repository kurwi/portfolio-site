import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff', // light blue
          100: '#d6e6fa',
          200: '#b3cdf7',
          300: '#8ab3f4',
          400: '#5e98f0',
          500: '#357de6', // blueberry
          600: '#2362c7', // whale blue
          700: '#1a4fa3',
          800: '#153b7c',
          900: '#102a5c',
          950: '#0b1a3a', // deep blue
        }
      }
    },
  },
  plugins: [],
}
export default config
