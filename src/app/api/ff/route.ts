import {PostHog} from 'posthog-node'

const posthog = new PostHog(process.env.POSTHOG_KEY!!,
  {
    host: 'https://app.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  }
)

export const dynamic = 'force-dynamic'

export async function GET () {
  return new Response(
    JSON.stringify({ sammy: await posthog.isFeatureEnabled('sammy_banner', 'ff') }),
  )
}
