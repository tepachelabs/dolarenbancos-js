import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

var globalCss = defineGlobalStyles({
  'html, body': {
    color: 'black',
    lineHeight: '1.5',
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
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
        primary: { value: '#89B9AD' },
        secondary: { value: '#FFC5C5' },
        primaryLight: { value: '#C7DCA7' },
        black: { value: 'rgba(0,0,0,0.87)' },
        lightGrey: { value: 'rgba(0,0,0,0.1)' },
      },
      fonts: {
        body: { value: 'var(--font-montserrat)' },
      },
      sizes: {
        pageWidth: { value: '960px' },
      },
    },
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Global styles
  globalCss,
})
