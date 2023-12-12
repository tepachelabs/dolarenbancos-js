import { PageLayout } from '~/components/page-layout'
import { PricesTable } from '~/components/prices-table'
import { WeeklyPriceChart } from '~/components/weekly-price-chart'
import { Prices } from '~/lib/constants'
import { formatServerDate, getEmptyPricesObject } from '~/lib/utils'

import { css } from '../../styled-system/css'

const sectionStyles = css({ w: '100%', maxW: '65%', m: '0 auto 2em' })

export default async function Home () {
  const weekReport = await getPrices()
  const today = formatServerDate(new Date())
  const todayPrices = weekReport[today]
  const { banxico, ...prices } = todayPrices

  return (
    <PageLayout>
      <h2>Precio del dólar al día</h2>

      <section>
        <h3>Precio de referencia: ${ banxico.sell } MXN</h3>
      </section>

      <section className={ sectionStyles }>
        <h4>Precios actuales</h4>
        <PricesTable prices={ prices }/>
      </section>

      <section className={ sectionStyles }>
        <h4>Vista semanal</h4>
        <WeeklyPriceChart weeklyReport={ weekReport }/>
      </section>
    </PageLayout>
  )
}

async function getPrices (): Promise<Record<string, Prices>> {
  try {
    const response = await fetch(`${ getBaseUrl() }/api/report/week`)

    if (!response.ok) {
      throw new Error('Could not fetch prices')
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return { '': getEmptyPricesObject() }
  }
}

function getBaseUrl () {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'https://dolarenbancos.pozole.dev'
  }
}
