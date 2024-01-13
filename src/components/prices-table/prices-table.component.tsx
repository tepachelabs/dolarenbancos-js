'use client'

import { FC } from 'react'

import { cell, table } from '~/components/prices-table/prices-table.styles'
import { useCalculatorResult } from '~/lib/calculator-result.context-provider'
import { BANK, Prices } from '~/lib/constants'
import { formatPrice, translateBankIdToDisplay } from '~/lib/utils'

interface Props {
  prices: Omit<Prices, 'banxico'>
}

export const PricesTable: FC<Props> = ({ prices }) => {
  const { usd } = useCalculatorResult()
  const {
    highestBuy,
    highestSell,
    lowestBuy,
    lowestSell,
  } = getLowestAndHighestPrices(prices)

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
        { Object.entries(prices).map(([bank, { buy, sell }]) => {
          const isHighestBuy = buy === highestBuy
          const isLowestBuy = buy === lowestBuy
          const isHighestSell = sell === highestSell
          const isLowestSell = sell === lowestSell
          const buyCellColor = isHighestBuy ? 'red' : isLowestBuy ? 'green' : undefined
          const sellCellColor = isHighestSell ? 'red' : isLowestSell ? 'green' : undefined

          return (
            <tr key={ bank }>
              <td className={ cell() }>{ translateBankIdToDisplay(bank as BANK) }</td>
              <td className={ cell({ color: buyCellColor }) }>$ { formatPrice(buy * usd) }</td>
              <td className={ cell({ color: sellCellColor }) }>$ { formatPrice(sell * usd) }</td>
            </tr>
          )
        }) }
      </tbody>
    </table>
  )
}

function getLowestAndHighestPrices (prices: Props['prices']) {
  return Object.entries(prices).reduce((acc, [bank, { buy, sell }]) => {
    if (buy < acc.lowestBuy) {
      acc.lowestBuy = buy
    }

    if (sell < acc.lowestSell) {
      acc.lowestSell = sell
    }

    if (buy > acc.highestBuy) {
      acc.highestBuy = buy
    }

    if (sell > acc.highestSell) {
      acc.highestSell = sell
    }

    return acc
  }, {
    lowestBuy: Infinity,
    lowestSell: Infinity,
    highestBuy: -Infinity,
    highestSell: -Infinity,
  })
}
