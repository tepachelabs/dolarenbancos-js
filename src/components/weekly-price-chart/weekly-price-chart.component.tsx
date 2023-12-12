import dynamic from 'next/dynamic'
import { FC, useMemo } from 'react'

// import Chart from 'react-apexcharts'
import { Prices } from '~/lib/constants'
import { convertToChartFormat } from '~/lib/utils'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  week: Record<string, Prices>
}

export const WeeklyPriceChart: FC<Props> = ({ week }) => {
  const categories = useMemo(() => Object.keys(week).reverse(), [week])
  const series = useMemo(() => convertToChartFormat(week), [week])

  return (
    <div>
      { (typeof window !== 'undefined') && (
        <Chart
          id="weekly-prices"
          options={ {} }
          xaxis={ { categories } }
          series={ series }
          type="line"
          width="100%"
        />
      )}
    </div>
  )
}
