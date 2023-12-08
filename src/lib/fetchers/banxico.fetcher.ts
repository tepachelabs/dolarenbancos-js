import axios from 'axios'

import { FetcherResponse } from '~/lib/fetchers/fetcher.type'
import { prettifyRate } from '~/lib/fetchers/fetchers.utils'

const tokenBmx = process.env.TOKEN_BMX

if (!tokenBmx) {
  console.error('TOKEN_BMX not available')
}

const BANXICO_DOLLAR = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno'

interface BanxicoResponse {
  data: {
    bmx: {
      series: {
        datos: {
          dato: string;
        }[];
      }[];
    };
  };
}

export function fetchFromBanxico (): Promise<FetcherResponse> {
  return axios.get(BANXICO_DOLLAR, {
    headers: {
      'Bmx-Token': tokenBmx,
    },
  })
    .then(function (response: BanxicoResponse) {
      // handle success
      const data = response.data['bmx']['series'][0]['datos'][0]

      return {
        bank: 'banxico',
        buy: prettifyRate(data.dato),
        sell: prettifyRate(data.dato),
      } satisfies FetcherResponse
    })
    .catch(function (error: any) {
      // handle error
      console.error(error)
    })
}
