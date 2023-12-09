'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError ({ error }: { error: unknown }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        {/*@ts-ignore*/ }
        <Error/>
      </body>
    </html>
  )
}
