import { getWeekReport } from '~/lib/data/report-week.data'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getWeekReport()
  return new Response(JSON.stringify(data))
}
