import axios from "axios";
import { prettifyRate } from "~/lib/fetchers/fetchers.utils";
import { FetcherResponse } from "~/lib/fetchers/fetcher.type";

const USER_AGENT = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0';
const BILL_CURRENCY_URL = 'https://app.bill.com/api/v2/ExternalCurrencyConverter.json';
const POST_DATA = 'data={"fundingAmount" : 1, "localCurrency" : "MXN", "partnerType" : "0"}';

export async function fetchFromBilldotcom(): Promise<FetcherResponse> {
  const { data } = await axios.post(BILL_CURRENCY_URL, POST_DATA, {
    headers: {
      'User-Agent': USER_AGENT,
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });

  const { response_data: values } = data;

  return {
    bank: 'billdotcom',
    buy: prettifyRate(values['exchangeRate']),
    sell: prettifyRate(values['disburseAmount']),
  };
}
