import './globals.css'
import type { Metadata } from 'next'
import { Anton, Courier_Prime, Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

import { PHProvider, PostHogPageview } from '~/app/providers'
import { METADATA } from '~/config'
import { Prices } from '~/lib/types'
import { getBaseUrl } from '~/lib/utils'

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

export async function generateMetadata (): Promise<Metadata> {
  // fetch data
  const today: Prices = await fetch(`${ getBaseUrl() }/api/report/now`).then((res) => res.json())

  return {
    title: METADATA.title,
    description: METADATA.description,
    keywords: METADATA.keywords,
    robots: 'index, follow',
    abstract: METADATA.abstract,
    classification: 'Finances',
    openGraph: {
      title: METADATA.title,
      description: METADATA.description,
      url: METADATA.url,
      type: 'website',
      siteName: METADATA.title,
      images: [`${ getBaseUrl() }/api/og?price=${ today.banxico.buy }`],
    },
  } satisfies Metadata
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={ cx(anton.variable, courier.variable, montserrat.variable) }>
      <PHProvider>
        <body>
          <PostHogPageview/>
          { children }
        </body>
      </PHProvider>
    </html>
  )
}
