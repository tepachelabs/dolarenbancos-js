import {getFeatureFlagStatus} from '~/lib/ff'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getFeatureFlagStatus()
  return new Response(JSON.stringify(data))
}
