export type BANK =
  | "inbursa"
  | "banamex"
  | "bbva"
  | "banxico"
  | "billdotcom";

export const BANKS: BANK[] = [
  "inbursa",
  "banamex",
  "bbva",
  "banxico",
  "billdotcom"
];

export type Prices = Record<BANK, {
  buy: number;
  sell: number;
}>;
