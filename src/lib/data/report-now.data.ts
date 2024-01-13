import { BANK, BANKS, Prices } from '~/lib/constants'
import prisma from '~/lib/prisma'
import { getEmptyPricesObject } from '~/lib/utils'

export async function getNowReport () {
  const prices: Prices = getEmptyPricesObject()

  const pricesFromDatabase = await Promise.all(
    BANKS.map((bank: BANK) =>
      prisma.price.findFirst({
        where: { bankId: bank },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    )
  )

  pricesFromDatabase.forEach((priceInstance, index) => {
    const bank = BANKS[index]

    if (!priceInstance) {
      return
    }

    prices[bank] = {
      buy: priceInstance.buy || 0,
      sell: priceInstance.sell || 0,
    }
  })

  return prices
}
