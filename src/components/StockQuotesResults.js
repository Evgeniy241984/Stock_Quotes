/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, useState } from '../framework';
import { StockQuotesToday } from './StockQuotesToday';

function StockQuotesResults({ currentTicker, error, isLoading, quotesData }) {
  if (!currentTicker) {
    return <div>Search by ticker</div>;
  }

  if (isLoading) {
    return <div>{error}</div>;
  }

  if (error) {
    return <div>Loading...</div>;
  }

  return <StockQuotesToday quotesData={quotesData} />;
}

export default StockQuotesResults;
