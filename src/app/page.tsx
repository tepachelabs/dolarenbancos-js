import { log } from '@logtail/next'

import { PageLayout } from '~/components/page-layout'
import { PricesTable } from '~/components/prices-table'
import { WeeklyPriceChart } from '~/components/weekly-price-chart'
import { Prices } from '~/lib/constants'

import { css } from '../../styled-system/css'

interface Data {
  today: Prices,
  week: Record<string, Prices>
}

const sectionStyles = css({ w: '100%', maxW: '65%', m: '0 auto 2em' })

export default async function Home () {
  const data = await getPrices()
  const todayPrices = data.today
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
        <WeeklyPriceChart weeklyReport={ data.week }/>
      </section>
    </PageLayout>
  )
}

async function getPrices (): Promise<Data> {
  try {
    const [today, weekly] = await Promise.all([
      fetch(`${ getBaseUrl() }/api/report/now`),
      fetch(`${ getBaseUrl() }/api/report/week`),
    ])

    if (!today.ok || !weekly.ok) {
      throw new Error('Could not fetch prices')
    }

    return {
      today: await today.json(),
      week: await weekly.json(),
    }
  } catch (error) {
    // @ts-ignore
    log.error(error)
    throw new Error('Could not fetch prices')
  }
}

function getBaseUrl () {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'https://dolarenbancos.pozole.dev'
  }
}
