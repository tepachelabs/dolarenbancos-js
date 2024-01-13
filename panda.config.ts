import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

var globalCss = defineGlobalStyles({
  'html, body': {
    backgroundColor: 'primaryLighter',
    color: 'black',
    fontFamily: 'body',
    lineHeight: '1.5',
    fontSize: '3vw',
    sm: { fontSize: '2.5vw' },
    md: { fontSize: '2vw' },
    lg: { fontSize: '1.3vw' },
  },
  h1: {
    fontFamily: 'heading',
    fontSize: '3rem',
  },
  h2: {
    fontFamily: 'heading',
    fontSize: '3rem',
    md: { fontSize: '2.5rem' },
  },
  h3: {
    fontFamily: 'body',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: '1.25rem',
  },
})

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    // 👇🏻 Define your tokens here
    tokens: {
      colors: {
        primary: { value: '#7DAF47' },
        primaryLight: { value: '#ECF3E5' },
        primaryLighter: { value: '#F4F8F4' },
        secondary: { value: '#FFC5C5' },
        black: { value: 'rgba(0,0,0,0.87)' },
        lightGrey: { value: 'rgba(0,0,0,0.1)' },
      },
      fonts: {
        body: { value: 'var(--font-body)' },
        heading: { value: 'var(--font-heading)' },
        mono: { value: 'var(--font-mono)' },
      },
      sizes: {
        condensedPageWidth: { value: '95%' },
        pageWidth: { value: '90%' },
      },
    },
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Global styles
  globalCss,
})
