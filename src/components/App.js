/** @jsx createElement */
/** @jsxFrag createFragment */
import { useTicker } from '../data/customHooks';
import { createElement, createFragment } from '../framework';
import SearchByTicker from './SearchByTicker';
import StockQuotesResults from './StockQuotesResults';

function App() {
  const { currentTicker, setCurrentTicker, error, isLoading, quotesData } = useTicker();

  return (
    <>
      <SearchByTicker value={currentTicker} onChange={setCurrentTicker} />
      <StockQuotesResults
        currentTicker={currentTicker}
        error={error}
        isLoading={isLoading}
        quotesData={quotesData}
      />
    </>
  );
}

export default App;
