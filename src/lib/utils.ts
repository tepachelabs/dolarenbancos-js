import { BANK, Prices } from '~/lib/constants'

// TODO: make this empty object dynamically generated from the BANKS array
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

// TODO: next two functions should be data from the database instead
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

export function translateBankIdToBackgroundColor (bankId: BANK): string {
  switch (bankId) {
    case 'inbursa':
      return 'rgb(9,117,243)'
    case 'banamex':
      return 'rgb(168,38,38)'
    case 'bbva':
      return 'rgb(57,219,248)'
    case 'banxico':
      return 'rgb(65,67,72)'
    case 'intercam':
      return 'rgb(50,171,44)'
    case 'transferwise':
      return 'rgb(243,99,9)'
    default:
      return 'rgb(243,212,9)'
  }
}

export function formatServerDate (date: Date): string {
  return `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`
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
  const bankWeeklyPrices = new Map<BANK, ChartFormat['data']>()

  for (const date in week) {
    const prices = week[date]

    for (const bankName in prices) {
      const bank = bankName as BANK
      const price = prices[bank as BANK]

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
