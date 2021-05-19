export const NEW_YORK_STOCK = 'US';
export const LONDON_STOCK = 'GB';
export const SINGAPORE_STOCK = 'SG';
export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
}

export const allowedTickers = ['amd', 'ibm', 'aapl'];

export function getQuotesByTickerURL(ticker) {
  let tickerTemplate = ticker.replace(/,/g, '%2C');
  return `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${tickerTemplate}`;
}

export function getGainersLosersURL(exchange) {
  return `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=${exchange}&lang=en-US&count=10&start=0`;
}
