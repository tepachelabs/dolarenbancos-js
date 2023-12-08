import axios from "axios";
import { load } from "cheerio";
import { prettifyRate } from "~/lib/fetchers/fetchers.utils";
import { FetcherResponse } from "~/lib/fetchers/fetcher.type";

const INBURSA_DOLLAR = 'https://www.inbursa.com/portal/';

export async function fetchFromInbursa(): Promise<FetcherResponse> {
  const response = await axios.get(INBURSA_DOLLAR);
  const $ = load(response.data);
  const data: FetcherResponse = {
    bank: 'inbursa',
    buy: 0,
    sell: 0,
  };
  $('#Divisas tbody tr').first().find('td').each((index, item) => {
    if (index === 0) return;

    const value = $(item).text().replace('$', '').trim();

    if (index === 1) {
      data.buy = prettifyRate(value);
    } else {
      data.sell = prettifyRate(value);
    }
  });

  return data;
}
