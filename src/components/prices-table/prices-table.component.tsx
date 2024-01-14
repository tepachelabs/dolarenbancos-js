'use client'

import { FC } from 'react'

import { cell, subtitle, table } from '~/components/prices-table/prices-table.styles'
import { useCalculatorResult } from '~/lib/calculator-result.context-provider'
import { BANK, Price, Prices } from '~/lib/constants'
import { formatPrice, translateBankIdToDisplay } from '~/lib/utils'

interface Props {
  prices: Omit<Prices, 'banxico'>
}

export const PricesTable: FC<Props> = ({ prices }) => {
  const { isDirty, usd } = useCalculatorResult()
  const metaPrices = getLowestAndHighestPrices(prices)

  return (
    <>
      { isDirty && (
        <p className={ subtitle }>
          <em>*</em> Mostrando el precio de ${ formatPrice(usd) } USD en los distintos bancos de México
        </p>
      ) }
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
            const { buyColor, sellColor } = getCellColors({ buy, sell }, metaPrices)

            return (
              <tr key={ bank }>
                <td className={ cell() }>{ translateBankIdToDisplay(bank as BANK) }</td>
                <td className={ cell({ color: buyColor }) }>$ { formatPrice(buy * usd) }</td>
                <td className={ cell({ color: sellColor }) }>$ { formatPrice(sell * usd) }</td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    </>
  )
}

interface MetaPrices {
  lowestBuy: number,
  lowestSell: number,
  highestBuy: number,
  highestSell: number,
}

function getLowestAndHighestPrices (prices: Props['prices']): MetaPrices {
  const seed: MetaPrices = {
    lowestBuy: Infinity,
    lowestSell: Infinity,
    highestBuy: -Infinity,
    highestSell: -Infinity,
  }

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
  }, seed)
}

type ColorValue = 'red' | 'green' | undefined

function getCellColors (price: Price, meta: MetaPrices): { buyColor: ColorValue, sellColor: ColorValue } {
  // Extract useful data
  const { highestBuy, highestSell, lowestBuy, lowestSell } = meta
  const { buy, sell } = price

  // Math
  const isHighestBuy = buy === highestBuy
  const isLowestBuy = buy === lowestBuy
  const isHighestSell = sell === highestSell
  const isLowestSell = sell === lowestSell
  const buyCellColor = isHighestBuy ? 'red' : isLowestBuy ? 'green' : undefined
  const sellCellColor = isHighestSell ? 'red' : isLowestSell ? 'green' : undefined

  // Result
  return { buyColor: buyCellColor, sellColor: sellCellColor }
}
