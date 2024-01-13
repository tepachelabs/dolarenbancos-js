'use client'

import { log } from '@logtail/next'
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError ({ error }: { error: unknown }) {
  useEffect(() => {
    // @ts-ignore
    log.error(error)
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
