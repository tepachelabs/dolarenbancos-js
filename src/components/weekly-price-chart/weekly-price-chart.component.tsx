'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement } from 'chart.js'
import { FC, useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { Prices } from '~/lib/constants'
import { convertToChartFormat, prettifyDate } from '~/lib/utils'

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

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

  return <Line data={{ labels, datasets }}/>
}
