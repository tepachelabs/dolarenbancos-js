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

export const meta = {
  title: 'El Dólar en Bancos de México',
  // eslint-disable-next-line max-len
  description: 'El precio del dólar en diferentes bancos de México. Calculadora de dólares a pesos mexicanos. Bot de Telegram y Discord para consultar el precio del dólar al instante.',
  keywords: 'dolar, precio, pesos, mexicanos, bancos, mxn, precios',
  abstract: 'El precio del dólar en los distintos bancos de México',
  url: 'https://dolarenbancos.com',
  image: (price: string | number) => `/api/og?price=${ price }`,
}
