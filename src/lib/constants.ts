export type BANK =
  | 'inbursa'
  | 'banamex'
  | 'bbva'
  | 'banxico'
  | 'intercam'
  | 'transferwise'

export const BANKS: BANK[] = [
  'inbursa',
  'banamex',
  'bbva',
  'banxico',
  'intercam',
  'transferwise',
]

export type Prices = Record<BANK, {
  buy: number;
  sell: number;
}>
