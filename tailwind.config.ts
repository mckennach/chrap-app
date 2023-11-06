import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        neutral: {
          850: '#202020',
        },
      },
    },
  },
  daisyui: {
    themes: [
      // 'forest',
      'dark',
      // 'business',
      // {
      //   mytheme: {
      //     primary: '#fbbf24',
      //     secondary: '#c0c4f9',
      //     accent: '#345091',
      //     neutral: '#28253c',
      //     'base-100': '#404659',
      //     info: '#376ad7',
      //     success: '#3cd37b',
      //     warning: '#f5d870',
      //     error: '#e5746c',
      //   },
      // },
    ],
  },
  plugins: [
    require('tailwindcss-text-fill'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
export default config
