'use client' // Error components must be Client Components

import { Provider, ErrorBoundary } from '@rollbar/react' // Provider imports 'rollbar'
import { useEffect } from 'react'

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'stage',
}

export default function Error ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <div>
          <h2>Something went wrong!</h2>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </ErrorBoundary>
    </Provider>
  )
}
