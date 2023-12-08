import { NextApiRequest } from 'next'

import { BANK, BANKS, Prices } from '~/lib/constants'
import { fetchFromBanamex } from '~/lib/fetchers/banamex.fetcher'
import { fetchFromBanxico } from '~/lib/fetchers/banxico.fetcher'
import { fetchFromBbva } from '~/lib/fetchers/bbva.fetcher'
import { fetchFromBilldotcom } from '~/lib/fetchers/billdotcom.fetcher'
import { fetchFromInbursa } from '~/lib/fetchers/inbursa.fetcher'
import { fetchFromIntercam } from '~/lib/fetchers/intercam.fetcher'
import prisma from '~/lib/prisma'

export async function GET (request: NextApiRequest) {
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

  const prices: Prices = {
    banxico: {
      buy: 0,
      sell: 0,
    },
    banamex: {
      buy: 0,
      sell: 0,
    },
    bbva: {
      buy: 0,
      sell: 0,
    },
    billdotcom: {
      buy: 0,
      sell: 0,
    },
    inbursa: {
      buy: 0,
      sell: 0,
    },
    intercam: {
      buy: 0,
      sell: 0,
    },
  }

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
