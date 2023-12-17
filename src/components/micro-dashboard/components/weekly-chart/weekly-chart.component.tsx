'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { FC } from 'react'
import { Line } from 'react-chartjs-2'

import { Card } from '~/components/atoms/card.component'
import { widget } from '~/components/micro-dashboard/components/common.styles'
import { translateBankIdToBackgroundColor } from '~/lib/utils'

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

interface Props {
  labels: string[]
  prices: number[]
}

export const WeeklyChart: FC<Props> = ({ labels, prices }) => {
  const datasets = [
    {
      // label to render in the tooltip
      label: 'behavior',
      // dataset
      data: prices,
      // dot's color
      backgroundColor: translateBankIdToBackgroundColor('banxico'),
      // line's color
      borderColor: translateBankIdToBackgroundColor('banxico'),
      // how smooth the line is
      tension: 0.5,
    },
  ]

  return (
    <Card backgroundColor="white" width="100%">
      <div className={ widget }>
        <h3>Comportamiento últimos 7 días</h3>
        <Line
          data={ { labels, datasets } }
          options={ {
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          } }
        />
      </div>
    </Card>
  )
}
