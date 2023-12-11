import { log } from '@logtail/next'

import { getNowReport } from '~/lib/data/report-now.data'

export const dynamic = 'force-dynamic'

export async function GET () {
  const data = await getNowReport()
  log.info('report-now', data)
  return new Response(JSON.stringify(data))
}
