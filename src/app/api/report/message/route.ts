import { log } from '@logtail/next'

import { BANK, BANKS, Prices } from '~/lib/constants'
import { getNowReport } from '~/lib/data/report-now.data'
import { formatPrice, translateBankIdToDisplay } from '~/lib/utils'

export const dynamic = 'force-dynamic'

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const multiplier = Number(searchParams.get('multiplier') || 1)
  const prices = await getNowReport()

  log.info('report-now-message', prices)

  return new Response(getChatMessage(prices, multiplier))
}

function getChatMessage (prices: Prices, multiplier: number) {
  return `**DÓLAR EN BANCOS**
Precio comparativo: $${ formatPrice(prices.banxico.buy) } ${multiplier !== 1 ? `\nLa tabla muestra el precio para $${multiplier} USD` : ''}
---
${ BANKS.map((bank: BANK) =>
    `- ${ translateBankIdToDisplay(bank) }. Compra: $${ formatPrice(prices[bank].buy * multiplier) }. Venta: $${ formatPrice(prices[bank].sell * multiplier) }`
  ).join('\n') }
---
Fuente: www.dolarenbancos.com
`
}
