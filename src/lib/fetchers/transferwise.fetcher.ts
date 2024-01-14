import axios from 'axios'

import { FetcherResponse } from '~/lib/fetchers/fetcher.type'
import { prettifyRate } from '~/lib/utils'

const USER_AGENT = process.env.USER_AGENT
  || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'
const TRANSFERWISE_CURRENCY_URL = 'https://transferwise.com/gateway/v2/quotes/'
const POST_DATA = {
  guaranteedTargetAmount: false,
  preferredPayIn: null,
  sourceAmount: 1,
  sourceCurrency: 'USD',
  targetCurrency: 'MXN',
}

export async function fetchFromTransferwise (): Promise<FetcherResponse> {
  const { data } = await axios.post(
    TRANSFERWISE_CURRENCY_URL,
    POST_DATA,
    {
      headers: {
        'User-Agent': USER_AGENT,
        'Cache-Control': 'no-cache',
      },
    }
  )

  return {
    bank: 'transferwise',
    buy: prettifyRate(data.rate),
    sell: prettifyRate(data.rate),
  }
}
