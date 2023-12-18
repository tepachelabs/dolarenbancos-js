import { log } from '@logtail/next'

import { BANK, BANKS, Prices } from '~/lib/constants'
import { getNowReport } from '~/lib/data/report-now.data'
import { formatPrice, translateBankIdToDisplay } from '~/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET () {
  const prices = await getNowReport()
  log.info('report-now-message', prices)
  return new Response(getChatMessage(prices))
}

function getChatMessage (prices: Prices) {
  return `**DÓLAR EN BANCOS**
Precio comparativo: $${ formatPrice(prices.banxico.buy) }
---
${ BANKS.map((bank: BANK) =>
    `- ${ translateBankIdToDisplay(bank) }. Compra: $${ formatPrice(prices[bank].buy) }. Venta: $${ formatPrice(prices[bank].sell) }`
  ).join('\n') }
---
Fuente: www.dolarenbancos.com
    `
}
