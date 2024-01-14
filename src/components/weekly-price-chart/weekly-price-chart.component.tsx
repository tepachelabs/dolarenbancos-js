'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, Legend } from 'chart.js'
import { FC, useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { Card } from '~/components/atoms/card.component'
import { Prices } from '~/lib/types'
import { convertToChartFormat, prettifyDate } from '~/lib/utils'

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

interface Props {
  weeklyReport: Record<string, Prices>
}

export const WeeklyPriceChart: FC<Props> = ({ weeklyReport }) => {
  const labels = useMemo(() =>
    Object.keys(weeklyReport)
      .map((date) => prettifyDate(new Date(date)))
      .reverse(),
  [weeklyReport]
  )
  const datasets = useMemo(() => convertToChartFormat(weeklyReport), [weeklyReport])

  return (
    <Card backgroundColor='white' padding='4em'>
      <Line
        data={{ labels, datasets }}
        options={{
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        }}
      />
    </Card>
  )
}
