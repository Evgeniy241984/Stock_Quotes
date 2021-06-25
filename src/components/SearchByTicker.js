/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { performSearch } from '../data/stockQuotesData';

export default function SearchByTicker() {
  return (
    <input
      type="text"
      value={window.dataStore.currentTicker}
      onChange={e => performSearch(e.target.value)}
    />
  );
}
