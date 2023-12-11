import { log } from '@logtail/next'

import { getWeekReport } from '~/lib/data/report-week.data'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getWeekReport()
  log.info('report-week', data)
  return new Response(JSON.stringify(data))
}
