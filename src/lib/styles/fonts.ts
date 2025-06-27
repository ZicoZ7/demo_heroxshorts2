// src/lib/styles/fonts.ts
import localFont from 'next/font/local';
import { 
  Inter, 
  Roboto_Condensed, 
  Anton, 
  Montserrat, 
  Poppins, 
  Bebas_Neue, 
  Rubik, 
  Open_Sans, 
  Roboto 
} from 'next/font/google';

// Local Fonts
export const pressStart = localFont({
  src: [
    {
      path: '../../../public/fonts/Orbitron.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-press-start',
  preload: true,
  display: 'swap',
});

// Google Fonts
export const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const robotoCondensed = Roboto_Condensed({ 
  subsets: ['latin'],
  display: 'swap',
});

export const anton = Anton({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

export const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
});

export const poppins = Poppins({ 
  weight: ['400', '600'], 
  subsets: ['latin'],
  display: 'swap',
});

export const bebasNeue = Bebas_Neue({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

export const rubik = Rubik({ 
  subsets: ['latin'],
  display: 'swap',
});

export const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
});

export const roboto = Roboto({ 
  weight: ['400', '500', '700'], 
  subsets: ['latin'],
  display: 'swap',
});

// Font map for component usage
export const fontMap = {
  'Inter': inter.className,
  'Roboto Condensed': robotoCondensed.className,
  'Anton': anton.className,
  'Montserrat': montserrat.className,
  'Poppins': poppins.className,
  'Bebas Neue': bebasNeue.className,
  'Rubik': rubik.className,
  'Open Sans': openSans.className,
  'Roboto': roboto.className,
  'Press Start 2P': pressStart.variable,
} as const;

// Available fonts for type safety
export const availableFonts = [
  'Inter',
  'Roboto Condensed',
  'Anton',
  'Montserrat',
  'Poppins',
  'Bebas Neue',
  'Rubik',
  'Open Sans',
  'Roboto',
  'Press Start 2P',
  'Orbitron',
] as const;

export type AvailableFont = typeof availableFonts[number];