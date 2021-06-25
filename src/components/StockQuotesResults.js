/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { isCurrentTickerLoaded } from '../data/stockQuotesData';
import { StockQuotesToday } from './StockQuotesToday';
import { getCurrentTickerData } from '../data/stockQuotesData';

function StockQuotesResults() {
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

    const quotesData = getCurrentTickerData();
    return <StockQuotesToday quotesData={quotesData} />;
  }
  return <div>{content}</div>;
}
export default StockQuotesResults;
