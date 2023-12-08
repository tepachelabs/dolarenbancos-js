import axios from 'axios'
import { load } from 'cheerio'

import { FetcherResponse } from '~/lib/fetchers/fetcher.type'
import { prettifyRate } from '~/lib/fetchers/fetchers.utils'

const BBVA_DOLLAR = 'https://bbv.infosel.com/bancomerindicators/indexv8.aspx'

export async function fetchFromBbva (): Promise<FetcherResponse> {
  const response = await axios.get(BBVA_DOLLAR)
  const $ = load(response.data)
  const data: FetcherResponse = {
    bank: 'bbva',
    buy: 0,
    sell: 0,
  }
  $('.tbl-info-financiera').last().find('tbody tr').first().find('td').each((index, item) => {
    if (index === 0) {
      return
    }

    const value = $(item).text().replace('$', '').trim()

    if (index === 1) {
      data.buy = prettifyRate(value)
    } else {
      data.sell = prettifyRate(value)
    }
  })

  return data
}
