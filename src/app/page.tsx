import { log } from '@logtail/next'
import Image from 'next/image'

import { Caption } from '~/components/atoms/caption.component'
import { Card } from '~/components/atoms/card.component'
import { FeaturedCard } from '~/components/atoms/featured-card.component'
import { Section } from '~/components/atoms/section.component'
import { MicroDashboard } from '~/components/micro-dashboard'
import { PageLayout } from '~/components/page-layout'
import { PricesTable } from '~/components/prices-table'
import { ResetButton } from '~/components/reset-button'
import { WeeklyPriceChart } from '~/components/weekly-price-chart'
import { ApplicationProvider } from '~/lib/application.context-provider'
import { CalculatorResultProvider } from '~/lib/calculator-result.context-provider'
import { Prices } from '~/lib/constants'

const disclaimer = 'Actualizado con información pública. Las cantidades son datos de referencia solamente.'

interface Data {
  today: Prices,
  week: Record<string, Prices>
}

export default async function Home () {
  const data = await getPrices()
  const todayPrices = data.today
  const { banxico } = todayPrices

  return (
    <ApplicationProvider referencePrice={ banxico.buy }>
      <CalculatorResultProvider referencePrice={ banxico.buy }>
        <PageLayout>
          <Section padding="4rem 0 0">
            <MicroDashboard weeklyReport={ data.week }/>
          </Section>

          <Section
            id="precios"
            title="Precios al día"
            action={ <ResetButton/> }
          >
            <PricesTable prices={ todayPrices }/>
            <Caption>{ disclaimer }</Caption>
          </Section>

          <Section
            id="historico"
            backgroundColor="primaryLight"
            title="Histórico semanal"
          >
            <WeeklyPriceChart weeklyReport={ data.week }/>
            <Caption>{ disclaimer }</Caption>
          </Section>

          <Section id="bots" title="Información al momento">
            <FeaturedCard
              body="Recibe el resumen directo a tu smartphone o computador sin tener que instalar nada extra. Consulta
                nuestro bot de Telegram, sólo envía el texto &ldquo;/dolar&rdquo; y recibe el resumen en segundos."
              title="Bot para Telegram"
              imgSrc="/telegram.svg"
              cta={ {
                text: 'Comenzar chat',
                href: 'https://telegram.me/dolarenbancos_bot',
              } }/>
            <FeaturedCard
              body="Obtén la información mas rápidamente desde tu Discord. Agrega nuestro bot de Discord, envía la
                palabra &ldquo;dolar&rdquo; y recibe el resumen en segundos."
              title="Bot para Discord"
              imgSrc="/discord.svg"
              cta={ {
                text: 'Agrega a tu servidor',
                href: 'https://discordapp.com/oauth2/authorize?client_id=615622507222925461&permissions=67584&scope=bot',
              } }/>
            <Caption>Nuestros bots no guardan historial de mensajes. Consulta nuestra política de privacidad
              aquí.</Caption>
          </Section>
        </PageLayout>
      </CalculatorResultProvider>
    </ApplicationProvider>
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
