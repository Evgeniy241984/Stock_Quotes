/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';
import TickerQuotesItem from './TickerQuotesItem';

export function StockQuotesToday({ quotesData }) {
  if (!quotesData) return null;
  const dataToShow = [
    'longName',
    'fullExchangeName',
    'regularMarketPrice',
    'regularMarketDayRange',
  ];
  return (
    <>
      <div>Stock quotes for {quotesData['symbol']}:</div>
      <ul>
        {dataToShow.map(key => (
          <TickerQuotesItem item={quotesData[key]} />
        ))}
      </ul>
    </>
  );
}
