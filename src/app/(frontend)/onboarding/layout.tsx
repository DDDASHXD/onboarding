import React from 'react'

import '../[[...slugs]]/globals.css'
import { Inter, Roboto_Serif, Roboto_Mono, Playfair_Display, Caveat } from 'next/font/google'
import { cn } from 'src/utilities/cn'
import { ThemeConfig } from '@/globals/ThemeConfig/Component'
import localization from '@/localization.config'
import { InitTheme } from '@/providers/Theme/InitTheme'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const robotoSerif = Roboto_Serif({ subsets: ['latin'], variable: '--font-serif' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

const OnboardingLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      className={cn(
        inter.variable,
        robotoSerif.variable,
        robotoMono.variable,
        playfair.variable,
        caveat.variable,
        'bg-background text-foreground',
      )}
      lang={localization.defaultLocale}
      suppressHydrationWarning
    >
      <head>
        <ThemeConfig publicContext={{ locale: localization.defaultLocale, isNotFound: false }} />
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default OnboardingLayout
