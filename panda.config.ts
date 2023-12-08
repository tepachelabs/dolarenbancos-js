import { defineConfig } from '@pandacss/dev'

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
      },
      fonts: {
        body: { value: 'system-ui, sans-serif' },
      },
    },
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
