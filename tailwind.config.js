/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    screens: {
      'm': { 'max': '639px' },
      'sm':{'min':'640px', 'max':'767px'},
      'md':{'min':'768px', 'max':'1023px'},
      'lg':{'min':'1024px', 'max':'1279px'},
      'xl':{'min':'1280px'}
    }
  },

  plugins: [
    //require('@tailwindcss/forms')
  ],
}

