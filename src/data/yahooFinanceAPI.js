export function getQuotesByTickerURL(ticker) {
  let tickerTemplate = ticker.replace(/,/g, '%2C');
  return `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${tickerTemplate}`;
}

const dataStore = {};

export function loadCurrentTickerData(currentTicker) {
  const currentTickerData = dataStore[currentTicker];

  if (currentTickerData) return currentTickerData;

  const urlByTicker = getQuotesByTickerURL(currentTicker);

  return fetchBySymbol(urlByTicker).then(res => {
    if (res.ok) {
      const result = res.json();
      dataStore[currentTicker] = result;
      return result;
    }

    throw new Error(res.statusText);
  });
}

const fetchBySymbol = url =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.YAHOO_FINANCE_API_KEY,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  });

/* export function getGainersLosersURL(stock) {
  return `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=${stock}&lang=en-US&count=6&start=0`;
} */

/* export const fetchGainersLosers = url =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.YAHOO_FINANCE_API_KEY,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.statusText);
});
 */
