import { PageLayout } from '~/components/page-layout/page-layout.component'
import { PricesTable } from '~/components/prices-table/prices-table.component'
import { Prices } from '~/lib/constants'
import { getEmptyPricesObject } from '~/lib/utils'

import { css } from '../../styled-system/css'

export default async function Home () {
  const { banxico, ...prices } = await getPrices()

  return (
    <PageLayout>
      <h2>Precio del dólar al día</h2>

      <div>
        <h3>Precio de referencia: ${ banxico.sell } MXN</h3>
      </div>

      <div className={ css({ w: '100%', maxW: '65%', m: '0 auto' }) }>
        <PricesTable prices={ prices }/>
      </div>
    </PageLayout>
  )
}

async function getPrices (): Promise<Prices> {
  try {
    const response = await fetch(`${ getBaseUrl() }/api/prices`)
    return await response.json()
  } catch (error) {
    console.error(error)
    return getEmptyPricesObject()
  }
}

function getBaseUrl () {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'https://dolarenbancos.pozole.dev'
  }
}
