import { NextRequest } from 'next/server'

import { BANK, BANKS, Prices } from '~/lib/constants'
import { fetchFromBanamex } from '~/lib/fetchers/banamex.fetcher'
import { fetchFromBanxico } from '~/lib/fetchers/banxico.fetcher'
import { fetchFromBbva } from '~/lib/fetchers/bbva.fetcher'
import { fetchFromBilldotcom } from '~/lib/fetchers/billdotcom.fetcher'
import { fetchFromInbursa } from '~/lib/fetchers/inbursa.fetcher'
import { fetchFromIntercam } from '~/lib/fetchers/intercam.fetcher'
import prisma from '~/lib/prisma'
import { getEmptyPricesObject } from '~/lib/utils'

export async function GET (request: NextRequest) {
  const { url } = request
  const query = url?.split('?')[1] || ''
  const params = new URLSearchParams(query)

  if (params.has('refetch')) {
    const fetchedPrices = await fetchPricesFromBanks()

    await Promise.all(
      Object.keys(fetchedPrices).map((bank) => {
        const prop = bank as keyof typeof fetchedPrices
        const price = fetchedPrices[prop]!
        return prisma.price.create({
          data: {
            bankId: prop,
            sell: price.sell,
            buy: price.buy,
          },
        })
      })
    )
  }

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
      })
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

    return new Response(JSON.stringify(prices))
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify(e), { status: 500 })
  }
}

async function fetchPricesFromBanks () {
  const [
    banxico,
    banamex,
    bbva,
    billdotcom,
    inbursa,
    intercam,
  ] = await Promise.all([
    fetchFromBanxico(),
    fetchFromBanamex(),
    fetchFromBbva(),
    fetchFromBilldotcom(),
    fetchFromInbursa(),
    fetchFromIntercam(),
  ])

  return {
    banxico,
    banamex,
    bbva,
    billdotcom,
    inbursa,
    intercam,
  }
}
