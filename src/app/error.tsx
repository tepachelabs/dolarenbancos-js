'use client'

import {useEffect} from "react"
import {RollbarScript} from "~/components/page-layout/rollbar-script.component";
import {PageLayout} from "~/components/page-layout";

export default function Error({
                                error,
                              }: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Rollbar?.error(error);
    }
  }, [error])
  return (
    <html>
    <RollbarScript />
    <body>
    <PageLayout>
      <h2>Oops!, ocurrió un error!</h2>

      <div>
        <h3>Lo sentimos, ha ocurrido un error pero ya ha sido reportado.</h3>
        <p>Solo vuelve a lo tuyo y aquí no pasó nada 👀</p>
      </div>
    </PageLayout>
    </body>
    </html>
  )
}
