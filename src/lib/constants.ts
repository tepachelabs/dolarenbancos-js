export type BANK =
  | 'inbursa'
  | 'banamex'
  | 'bbva'
  | 'banxico'
  | 'billdotcom'
  | 'intercam'

export const BANKS: BANK[] = [
  'inbursa',
  'banamex',
  'bbva',
  'banxico',
  'billdotcom',
  'intercam',
]

export type Prices = Record<BANK, {
  buy: number;
  sell: number;
}>
