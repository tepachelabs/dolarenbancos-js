import { getNowReport } from '~/lib/data/report-now.data'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getNowReport()
  return new Response(JSON.stringify(data))
}
