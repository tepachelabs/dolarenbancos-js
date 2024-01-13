import { BANK } from '~/lib/constants'

export type FetcherResponse = {
  bank: BANK;
  buy: number;
  sell: number;
} | void
