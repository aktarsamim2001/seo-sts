import localFont from 'next/font/local'

const poppins = localFont({
  src: [
    { path: '../fonts/Poppins-Regular.woff', weight: '400', style: 'normal' },
    { path: '../fonts/Poppins-Medium.woff', weight: '500', style: 'normal' },
  ],
  variable: '--font-poppins',
})

export { poppins }
