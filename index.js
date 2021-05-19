import {
  allowedTickers,
  getQuotesByTickerURL,
  getGainersLosersURL,
  getDateFromUnixTimestamp,
  NEW_YORK_STOCK,
  LONDON_STOCK,
  SINGAPORE_STOCK,
} from './utils';
import { fetchBySymbol, fetchGainersLosers } from './api';
import { topTrendingTickers } from './indicators';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentStock: '',
  stockProfile: {},
  isSearchDataLoading: false,
  isSwitchDataLoading: false,
  error: null,
  currentTicker: '',
  tickerProfile: {},
};

window.renderApp = renderApp;
window.performSearch = performSearch;
window.performSwitch = performSwitch;
window.validateAndLoadTickerData = validateAndLoadTickerData;
window.validateAndLoadStockData = validateAndLoadStockData;

function setCurrentStock(value) {
  window.dataStore.currentStock = value;
  window.performSwitch();
}

function isCurrentTickerLoaded() {
  return Boolean(getCurrentTickerData());
}

function isCurrentStockLoaded() {
  return Boolean(getCurrentStockData());
}

function validateAndLoadTickerData() {
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

function performSearch(ticker) {
  window.dataStore.currentTicker = ticker;
  window.dataStore.error = null;
  window.isSearchDataLoading = true;

  window
    .validateAndLoadTickerData()
    .then(({ error, data }) => {
      window.dataStore.isSearchDataLoading = false;
      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.tickerProfile[ticker] = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred.';
    })
    .finally(window.renderApp);
}

function validateAndLoadStockData() {
  const { currentStock } = window.dataStore;

  const urlGainerslosers = getGainersLosersURL(currentStock);
  if (!isCurrentStockLoaded()) {
    return fetchGainersLosers(urlGainerslosers).then(({ finanse }) => ({
      data: finanse.result,
    }));
  }
  return Promise.resolve({});
}

function performSwitch(stock) {
  window.dataStore.currentStock = stock;
  window.dataStore.error = null;
  window.isSwitchDataLoading = true;

  window
    .validateAndLoadStockData()
    .then(({ error, data }) => {
      window.dataStore.isSwitchDataLoading = false;
      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.stockProfile[stock] = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Error occurred.';
    })
    .finally(window.renderApp);
}

renderApp();

function renderApp() {
  document.querySelector('.app-root').innerHTML = `
  ${StartApp()}`;
}

function StartApp() {
  return `<section>
    ${SearchByTicker()}
    ${Results()}

  </section>`;
}

function Results() {
  const { currentTicker, isSearchDataLoading, error, currentStock } = window.dataStore;
  let content = '';
  if (currentTicker === '') {
    content = 'Search by ticker';
  } else {
    if (isSearchDataLoading) {
      content = 'Loading...';
    }
    if (error !== null) {
      content = error;
    }
    if (isCurrentTickerLoaded()) {
      content += `
        ${QuotesBySearch()}
      `;
    }
  }
  content += `
    ${StockSwitch(currentStock, setCurrentStock)}`;

  if (isCurrentStockLoaded()) {
    content += `
    ${GainersTable()}
    
    ${TopTrendingByStock()}
    `;
  }

  return `
    <div>${content}</div>
    `;
}

function SearchByTicker() {
  return `<input
    type = "text" 
    value = "${window.dataStore.currentTicker}" 
    onchange = "window.performSearch(this.value);"
  />`;
}

function getCurrentTickerData() {
  const { currentTicker, tickerProfile } = window.dataStore;
  return tickerProfile[currentTicker];
}

function prepareItemBySearch(item) {
  return `
    <h4>${item.symbol}</h4>
    <ul>
    <li>${item.longName} </li>
    <li>${item.fullExchangeName} </li>
    <li>${item.regularMarketPrice} </li>
    <li>${item.regularMarketDayRange} </li>
    </ul>
    `;
}

function QuotesBySearch() {
  let quotesData = getCurrentTickerData();
  let domelEments = quotesData.map(prepareItemBySearch).join('');
  return `
    <div>${domelEments}</div>
  `;
}

function StockSwitch(currentStock, setCurrentStock) {
  return `
  <h5>Select Stock Exchange</h5>
  ${[
    { value: NEW_YORK_STOCK, name: 'NewYork SE' },
    { value: LONDON_STOCK, name: 'London SE' },
    { value: SINGAPORE_STOCK, name: 'Singapore SE' },
  ]
    .map(
      ({ value, name }) =>
        `<div>
    <label>
      <input 
        type="radio" 
        value="${value}" 
        ${currentStock === value ? 'checked' : ''}
        onchange="(${setCurrentStock})(this.value)"/>
        <span>${name}</span>
    </label>
  </div>`,
    )
    .join('')}`;
}

function getCurrentStockData() {
  const { currentStock, stockProfile } = window.dataStore;
  return stockProfile[currentStock];
}

function GainersTable() {
  let gainersData = getCurrentStockData().slice(0, 1);
  const domElements = gainersData.qoutes.map(GainersLosersItem).join('');
  return `
  <h3>Top Gainers</h3>
  <ul>
  ${domElements}
  </ul>`;
}

function GainersLosersItem(line) {
  return `<li>
  <div> ${line.symbol} </div>
  <div> ${line.regularMarketPrice} </div>
  <div> ${line.changeInPercent + ' %'}</div>
  <div> ${line.prevClose} </div> 
  </li>`;
}

function TopTrendingByStock() {
  const { currentStock } = window.dataStore;
  let currentDate = '',
    content = '',
    domElements = '',
    quotesData = {};

  if (currentStock) {
    quotesData = topTrendingTickers[currentStock];
    domElements = quotesData.map(TopTrendingItem).join('');
    currentDate = getDateFromUnixTimestamp(quotesData[0].regularMarketTime);
  }

  content += `
  <h3>Top Trending Tickers</h3> 
  <h4>${currentStock} ${currentDate}</h4>
  <ul>${domElements}</ul>`;

  return content ? `<section>${content}</section>` : '';
}

function TopTrendingItem(line) {
  return `<li>
  <div> ${line.symbol} </div>
  <div> ${line.longName} </div>
  <div> ${line.regularMarketPrice} </div>
  <div> ${line.regularMarketPreviousClose} </div>
  <div> ${line.regularMarketChange.toFixed(2) + ' %'} </div> 
  </li>`;
}
