import { ACTIVE_BANKS, BANK_META } from '~/config'
import { Bank, Prices } from '~/lib/types'

export function getEmptyPricesObject (): Prices {
  const emptyObject: Prices = {} as Prices

  for (const bank of ACTIVE_BANKS) {
    emptyObject[bank] = { buy: 0, sell: 0 }
  }

  return emptyObject
}

export function prettifyRate (str: string): number {
  return Number(parseFloat(str).toFixed(2))
}

export function formatPrice (price: number): string {
  return price.toFixed(2)
}

export function translateBankIdToDisplay (bankId: Bank): string {
  return BANK_META[bankId].display
}

export function translateBankIdToBackgroundColor (bankId: Bank): string {
  return BANK_META[bankId].color
}

interface ChartFormat {
  label: string,
  backgroundColor: string,
  borderColor: string,
  data: Array<number | null>,
  tension: number,
}

export function convertToChartFormat (week: Record<string, Prices>): ChartFormat[] {
  const chartFormat: ChartFormat[] = []
  const bankWeeklyPrices = new Map<Bank, ChartFormat['data']>()

  for (const date in week) {
    const prices = week[date]

    for (const bankName in prices) {
      const bank = bankName as Bank
      const price = prices[bank as Bank]

      if (!bankWeeklyPrices.has(bank)) {
        bankWeeklyPrices.set(bank, [])
      }

      // returns null to avoid showing 0 values on the chart
      bankWeeklyPrices.get(bank)?.unshift(price.buy || null)
    }
  }

  // creates the options for the chart
  bankWeeklyPrices.forEach(
    (price, bank) => chartFormat.push({
      // label to render in the tooltip
      label: translateBankIdToDisplay(bank),
      // dataset
      data: price,
      // dot's color
      backgroundColor: translateBankIdToBackgroundColor(bank),
      // line's color
      borderColor: translateBankIdToBackgroundColor(bank),
      // how smooth the line is
      tension: 0.5,
    }),
  )

  return chartFormat
}

const month = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
]

export function prettifyDate (date: Date): string {
  return `${ date.getDate() } ${ month[date.getMonth()] }`
}

export function getBaseUrl (): string {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'https://dolarenbancos.com'
  }
}
