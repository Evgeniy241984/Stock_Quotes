import { getQuotesByTickerURL, fetchBySymbol } from './yahooFinanceAPI';
import allowedTickers from '../utils';
import renderApp from '../framework/render';

/* export function getCurrentTickerData() {
  const { currentTicker, tickerProfile } = window.dataStore;
  return tickerProfile[currentTicker];
}

export function isCurrentTickerLoaded() {
  return Boolean(getCurrentTickerData());
}

export function validateAndLoadTickerData() {
  const { currentTicker } = window.dataStore;

  if (!allowedTickers.includes(currentTicker.toLowerCase())) {
    const error = `enter one of the company Tickers: ${allowedTickers.join(',')}.`;
    return Promise.resolve({ error });
  }

  const urlByTicker = getQuotesByTickerURL(currentTicker);

  if (!isCurrentTickerLoaded()) {
    return fetchBySymbol(urlByTicker).then(({ quoteResponse }) => ({
      data: quoteResponse.result,
    }));
  }

  return Promise.resolve({});
}

export function performSearch(ticker) {
  window.dataStore.currentTicker = ticker;
  window.dataStore.error = null;
  window.isSearchDataLoading = true;

  validateAndLoadTickerData()
    .then(({ error, data }) => {
      window.dataStore.isSearchDataLoading = false;
      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.tickerProfile[ticker] = data[0];
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred.';
    })
    .finally(renderApp);
}
 */
