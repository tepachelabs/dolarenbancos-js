import { log } from '@logtail/next'

import { Caption } from '~/components/atoms/caption.component'
import { Card } from '~/components/atoms/card.component'
import { Section } from '~/components/atoms/section.component'
import { MicroDashboard } from '~/components/micro-dashboard'
import { PageLayout } from '~/components/page-layout'
import { PricesTable } from '~/components/prices-table'
import { WeeklyPriceChart } from '~/components/weekly-price-chart'
import { Prices } from '~/lib/constants'
import { formatPrice } from '~/lib/utils'

const disclaimer = 'Actualizado con información pública. Las cantidades son datos de referencia solamente.'

interface Data {
  today: Prices,
  week: Record<string, Prices>
}

export default async function Home () {
  const data = await getPrices()
  const todayPrices = data.today
  const { banxico, ...prices } = todayPrices

  return (
    <PageLayout>
      <Section padding="4rem 0 0">
        <MicroDashboard
          todayPrice={ formatPrice(banxico.buy) }
          weeklyReport={ data.week }
        />
      </Section>

      <Section id="precios">
        <h2>Precios al día</h2>
        <PricesTable prices={ prices }/>
        <Caption>{ disclaimer }</Caption>
      </Section>

      <Section id="historico" backgroundColor="primaryLight">
        <h2>Histórico semanal</h2>
        <WeeklyPriceChart weeklyReport={ data.week }/>
        <Caption>{ disclaimer }</Caption>
      </Section>

      <Section id="bots">
        <h2>Información al momento</h2>
        <Card marginBottom="2rem">
          <h3>Bot para Telegram</h3>
          <p>Recibe el resumen directo a tu smartphone o computador sin tener que instalar nada extra. Consulta nuestro
            bot de Telegram, sólo envía el texto &ldquo;/dolar&rdquo; y recibe el resumen en segundos.</p>
          <a href="#">Comenzar chat</a>
        </Card>
        <Card>
          <h3>Bot para Discord</h3>
          <p>Obtén la información mas rápidamente desde tu Discord. Agrega nuestro bot de Discord, envía la palabra
            &ldquo;dolar&rdquo; y recibe el resumen en segundos.</p>
          <a href="#">Agrega a tu servidor</a>
        </Card>
        <Caption>Nuestros bots no guardan historial de mensajes. Consulta nuestra política de privacidad aquí.</Caption>
      </Section>
    </PageLayout>
  )
}

async function getPrices (): Promise<Data> {
  // takes data from cache if available
  const commonFetchProps = { next: { tags: ['prices'] } }

  try {
    const [today, weekly] = await Promise.all([
      fetch(`${ getBaseUrl() }/api/report/now`, commonFetchProps),
      fetch(`${ getBaseUrl() }/api/report/week`, commonFetchProps),
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
