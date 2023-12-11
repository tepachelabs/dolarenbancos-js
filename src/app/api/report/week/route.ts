import { getWeekReport } from '~/lib/data/report-week.data'
import { log } from "@logtail/next";

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getWeekReport()
  log.info('report-week', data)
  return new Response(JSON.stringify(data))
}
