import { getCurrentTickerData } from '../data/stockQuotesData';

export default function StockTickerQuotes() {
  let quotesData = getCurrentTickerData();
  let domelEments = quotesData.map(getPreparedItem).join('');

  function getPreparedItem(item) {
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

  return `
      <div>${domelEments}</div>
    `;
}
