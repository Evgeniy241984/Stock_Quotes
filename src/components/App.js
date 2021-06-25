/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import SearchByTicker from './SearchByTicker';
import StockQuotesResults from './StockQuotesResults';

export default function App() {
  return (
    <>
      <SearchByTicker />
      <StockQuotesResults />
    </>
  );
}
