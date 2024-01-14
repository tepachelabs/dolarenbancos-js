import { ACTIVE_BANKS } from '~/config'

/*
 * Individual bank, e.g. 'banamex', 'bbva', etc.
 * This type is defined from the values of ACTIVE_BANKS in config.ts
 * Equivalent to: 'banamex' | 'bbva' | etc...
 */
export type Bank = typeof ACTIVE_BANKS[number]

/*
 * All banks array, bank names as string values.
 */
export const BANKS: Bank[] = [...ACTIVE_BANKS]

/*
 * A single price object, with buy and sell properties.
 * This is usually keyed by a BANK.
 */
export type Price = {
  buy: number;
  sell: number;
}

/*
 * All banks with their respective prices.
 */
export type Prices = Record<Bank, Price>
