import { Bank } from '~/lib/types'

export type FetcherResponse = {
  bank: Bank;
  buy: number;
  sell: number;
} | void
