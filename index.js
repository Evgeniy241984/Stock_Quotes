import {
  allowedTickers,
  getQuotesByTickerURL,
  getDateFromUnixTimestamp,
  NEW_YORK_STOCK,
  LONDON_STOCK,
  SINGAPORE_STOCK,
} from './utils';
import { fetchBySymbol } from './api';
import { dayIndicators } from './indicators';
import { topTrendingTickers } from './indicators';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentStock: '',
  currentTicker: '',
  isDataLoading: false,
  error: null,
  tickerProfile: {},
};

window.renderApp = renderApp;
window.performSearch = performSearch;
window.validateAndLoadData = validateAndLoadData;

function setCurrentStock(value) {
  window.dataStore.currentStock = value;
  window.renderApp();
}

function isCurrentTickerLoaded() {
  return Boolean(getCurrentTickerData());
}

function validateAndLoadData() {
  const { currentTicker } = window.dataStore;

  if (!allowedTickers.includes(currentTicker.toLowerCase())) {
    const error = `enter one of the company Tickers: ${allowedTickers.join(',')}.`;
    return Promise.resolve({ error });
  }

  const url = getQuotesByTickerURL(currentTicker);
  if (!isCurrentTickerLoaded()) {
    return fetchBySymbol(url).then(({ quoteResponse }) => ({
      data: quoteResponse.result,
    }));
  }
  return Promise.resolve({});
}

function performSearch(ticker) {
  window.dataStore.currentTicker = ticker;
  window.dataStore.error = null;
  window.isDataLoading = true;

  window
    .validateAndLoadData()
    .then(({ error, data }) => {
      window.dataStore.isDataLoading = false;

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

renderApp();

function renderApp() {
  document.querySelector('.app-root').innerHTML = `
  ${StartApp()}`;
}

function RenderResults() {
  const { currentTicker, isDataLoading, error } = window.dataStore;
  let content = '';
  if (currentTicker === '') {
    content = 'Search by ticker';
  } else {
    if (isDataLoading) {
      content = 'Loading...';
    }
    if (error !== null) {
      content = error;
    }
    if (isCurrentTickerLoaded()) {
      content = `
        ${RenderQuotesBySearch()}
      `;
    }
  }

  return `<div>
    <div>${content}</div>
    ${RenderGainersTable()}
    ${StockSwitch(window.dataStore.currentStock, setCurrentStock)}
    ${RenderTopTrendingByStock()}
  </div>`;
}

function StartApp() {
  return `<section>
    ${SearchByTicker()}
    ${RenderResults()}

  </section>`;
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

function prepareQuotesBySearchItem(item) {
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

function RenderQuotesBySearch() {
  let quotesData = getCurrentTickerData();
  let domelEments = quotesData.map(prepareQuotesBySearchItem).join('');
  return `
    <div>${domelEments}</div>
  `;
}

function StockSwitch(currentStock, setCurrentStock) {
  return `
  <h3>Top Trending Tickers</h3> 
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

function RenderTopTrendingByStock() {
  const { currentStock } = window.dataStore;
  let currentDate = '',
    content = '',
    domElements = '',
    quotesData = {};

  if (currentStock) {
    quotesData = topTrendingTickers[currentStock];
    domElements = quotesData.map(PrepareTrendingItem).join('');
    currentDate = getDateFromUnixTimestamp(quotesData[0].regularMarketTime);
  }

  content += `
  <h4>${currentStock} ${currentDate}</h4>
  <ul>${domElements}</ul>`;

  return content ? `<section>${content}</section>` : '';
}

function PrepareTrendingItem(line) {
  return `<li>
  <div> ${line.symbol} </div>
  <div> ${line.longName} </div>
  <div> ${line.regularMarketPrice} </div>
  <div> ${line.regularMarketPreviousClose} </div>
  <div> ${line.regularMarketChange.toFixed(2) + ' %'} </div> 
  </li>`;
}

function RenderGainersTable() {
  const { quotes } = dayIndicators.dayGainers;
  const domElements = quotes.map(PrepareGainersLosersItem).join('');
  return `
  <h3>Top Gainers</h3>
  <ul>
  ${domElements}
  </ul>`;
}

function PrepareGainersLosersItem(line) {
  return `<li>
  <div> ${line.symbol} </div>
  <div> ${line.regularMarketPrice} </div>
  <div> ${line.changeInPercent + ' %'}</div>
  <div> ${line.prevClose} </div> 
  </li>`;
}
