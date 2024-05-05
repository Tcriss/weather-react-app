/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/common/utils/codes.list.ts'
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['Poppins']
    }
  },
  plugins: []
}

