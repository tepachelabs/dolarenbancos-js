import { log } from '@logtail/next'
import Link from 'next/link'
import { posthog } from 'posthog-js'

import { Caption } from '~/components/atoms/caption.component'
import { FeaturedCard } from '~/components/atoms/featured-card.component'
import { Section } from '~/components/atoms/section.component'
import { MicroDashboard } from '~/components/micro-dashboard'
import { PageLayout } from '~/components/page-layout'
import { PricesTable } from '~/components/prices-table'
import { ResetButton } from '~/components/reset-button'
import { SammyBanner } from '~/components/sammy-banner'
import { WeeklyPriceChart } from '~/components/weekly-price-chart'
import { ApplicationProvider } from '~/lib/application.context-provider'
import { CalculatorResultProvider } from '~/lib/calculator-result.context-provider'
import { Prices } from '~/lib/types'
import { getBaseUrl } from '~/lib/utils'

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
          <Section size='compact'>
            <MicroDashboard weeklyReport={ data.week }/>
          </Section>

          {
            posthog.isFeatureEnabled('sammy_banner') ? (
              <Section
                id="sammy"
                title=""
                backgroundColor="primaryLight"
              >
                <SammyBanner />
              </Section>
            ) : null
          }

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
            <Caption>
              Nuestros bots no guardan historial de mensajes.
              Consulta nuestra <Link href="/privacidad">política de privacidad aquí</Link>.
            </Caption>
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

