export type BANK =
  | 'inbursa'
  | 'banamex'
  | 'bbva'
  | 'banxico'
  | 'intercam'

export const BANKS: BANK[] = [
  'inbursa',
  'banamex',
  'bbva',
  'banxico',
  'intercam',
]

export type Prices = Record<BANK, {
  buy: number;
  sell: number;
}>
