import { BANK, BANKS, Prices } from '~/lib/constants'
import prisma from '~/lib/prisma'
import { formatPrice, getEmptyPricesObject, translateBankIdToDisplay } from '~/lib/utils'

// @deprecated
export async function GET () {
  const prices: Prices = getEmptyPricesObject()

  try {
    const pricesFromDatabase = await Promise.all(
      BANKS.map(async (bank: BANK) => {
        return prisma.price.findFirst({
          where: {
            bankId: bank,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      }),
    )

    pricesFromDatabase.forEach((priceInstance, index) => {
      if (!priceInstance) {
        return
      }

      const bank = BANKS[index]

      prices[bank] = {
        buy: priceInstance?.buy || 0,
        sell: priceInstance?.sell || 0,
      }
    })

    return new Response(`**DÓLAR EN BANCOS**
Precio comparativo: $${ formatPrice(prices.banxico.buy) }
---
${ BANKS.map((bank: BANK) =>
    `- ${ translateBankIdToDisplay(bank) }. Compra: $${ formatPrice(prices[bank].buy) }. Venta: $${ formatPrice(prices[bank].sell) }`
  ).join('\n') }
---
Fuente: www.dolarenbancos.com
    `)
  } catch (e) {
    throw e
  }
}
