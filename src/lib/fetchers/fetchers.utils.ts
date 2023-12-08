export function prettifyRate (str: string): number {
  return Number(parseFloat(str).toFixed(2))
}
