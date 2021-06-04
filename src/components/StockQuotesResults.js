import { isCurrentTickerLoaded } from '../data/stockQuotesData';
import StockTickerQuotes from './StockTickerQuotes';

export default function StockQuotesResults() {
  const { currentTicker, isSearchDataLoading, error } = window.dataStore;
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
          ${StockTickerQuotes()}
        `;
    }
  }
  return `
      <div>${content}</div>
      `;
}
