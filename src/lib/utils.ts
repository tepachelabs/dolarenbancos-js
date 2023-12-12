import { BANK, Prices } from '~/lib/constants'

export function getEmptyPricesObject (): Prices {
  return {
    banamex: { buy: 0, sell: 0 },
    banxico: { buy: 0, sell: 0 },
    bbva: { buy: 0, sell: 0 },
    inbursa: { buy: 0, sell: 0 },
    intercam: { buy: 0, sell: 0 },
    transferwise: { buy: 0, sell: 0 },
  }
}

export function prettifyRate (str: string): number {
  return Number(parseFloat(str).toFixed(2))
}

export function formatPrice (price: number): string {
  return price.toFixed(2)
}

export function translateBankIdToDisplay (bankId: BANK): string {
  switch (bankId) {
    case 'inbursa':
      return 'Inbursa'
    case 'banamex':
      return 'Banamex'
    case 'bbva':
      return 'BBVA'
    case 'banxico':
      return 'Banxico'
    case 'intercam':
      return 'Intercam'
    case 'transferwise':
      return 'Transferwise'
    default:
      return '??'
  }
}

export function formatServerDate (date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

interface ChartFormat {
  name: BANK,
  data: number[]
}

export function convertToChartFormat (week: Record<string, Prices>): ChartFormat[] {
  const chartFormat: ChartFormat[] = []
  const bankWeeklyPrices = new Map<BANK, number[]>()

  for (const date in week) {
    const prices = week[date]

    for (const bankName in prices) {
      const bank = bankName as BANK
      const price = prices[bank as BANK]

      if (!bankWeeklyPrices.has(bank)) {
        bankWeeklyPrices.set(bank, [])
      }

      bankWeeklyPrices.get(bank)?.unshift(price.buy)
    }
  }

  bankWeeklyPrices.forEach(
    (price, bank) => chartFormat.push({
      name: bank,
      data: price,
    })
  )

  return chartFormat
}
