import { FC, useMemo } from 'react'

import { Prices } from '~/lib/constants'
import { prettifyDate } from '~/lib/utils'

import { Calculator } from './components/calculator'
import { TodayPrice } from './components/today-price'
import { WeeklyChart } from './components/weekly-chart'
import { wrapper } from './micro-dashboard.styles'

interface Props {
  weeklyReport: Record<string, Prices>
}

export const MicroDashboard: FC<Props> = ({ weeklyReport }) => {
  const weeklyPrices = Object.values(weeklyReport).map((prices) => prices.banxico.buy).reverse()
  const labels = useMemo(() =>
    Object.keys(weeklyReport)
      .map((date) => prettifyDate(new Date(date)))
      .reverse(),
  [weeklyReport],
  )

  return (
    <div className={ wrapper }>
      <TodayPrice/>
      <WeeklyChart prices={ weeklyPrices } labels={ labels }/>
      <Calculator/>
    </div>
  )
}
