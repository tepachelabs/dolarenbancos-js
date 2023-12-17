import './globals.css'
import type { Metadata } from 'next'
import { Anton, Courier_Prime, Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

import { meta } from '~/lib/constants'

import { cx } from '../../styled-system/css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
})

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '400',
})

const courier = Courier_Prime({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400',
})

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  robots: 'index, follow',
  abstract: meta.abstract,
  classification: 'Finances',
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    type: 'website',
    siteName: meta.title,
  },
}

export default function RootLayout ({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" className={ cx(anton.variable, courier.variable, montserrat.variable) }>
      <body>
        { children }
      </body>
    </html>
  )
}

