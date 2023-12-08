import { PageLayout } from '~/components/page-layout/page-layout.component'
import { PricesTable } from '~/components/prices-table/prices-table.component'
import { Prices } from '~/lib/constants'

import { css } from '../../styled-system/css'

export default async function Home () {
  const { banxico, ...prices }: Prices = await getPrices()

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

async function getPrices () {
  const response = await fetch('http://localhost:3000/api/prices')
  return await response.json()
}
