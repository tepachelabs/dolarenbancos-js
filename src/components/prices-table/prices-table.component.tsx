'use client'

import { FC } from 'react'

import { table } from '~/components/prices-table/prices-table.styles'
import { useCalculatorResult } from '~/lib/calculator-result.context-provider'
import { BANK, Prices } from '~/lib/constants'
import { formatPrice, translateBankIdToDisplay } from '~/lib/utils'

interface Props {
  prices: Omit<Prices, 'banxico'>
}

export const PricesTable: FC<Props> = ({ prices }) => {
  const { usd } = useCalculatorResult()

  return (
    <table className={ table }>
      <thead>
        <tr>
          <th>Banco</th>
          <th>Compra</th>
          <th>Venta</th>
        </tr>
      </thead>
      <tbody>
        { Object.entries(prices).map(([bank, { buy, sell }]) => (
          <tr key={ bank }>
            <td>{ translateBankIdToDisplay(bank as BANK) }</td>
            <td>$ { formatPrice(buy * usd) }</td>
            <td>$ { formatPrice(sell* usd) }</td>
          </tr>
        )) }
      </tbody>
    </table>
  )
}
