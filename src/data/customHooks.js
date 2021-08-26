import { useState, useEffect } from '../framework';
import { loadCurrentTickerData } from '../data/yahooFinanceAPI';

export const useTicker = () => {
  const { currentTicker, setCurrentTicker } = useState('');
  const { error, setError } = useState(null);
  const { isLoading, setIsLoading } = useState(false);
  const { quotesData, setQuotesData } = useState({});

  useEffect(() => {
    if (currentTicker) {
      loadCurrentTickerData(currentTicker)
        .then(({ quoteResponse }) => ({
          data: quoteResponse.result,
        }))
        .then(data => {
          const { message, code } = data;
          if (code !== '200' && message) throw Error(message);

          setError(null);
          setQuotesData(data);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [currentTicker]);

  return {
    currentTicker,
    setCurrentTicker,
    error,
    isLoading,
    quotesData,
  };
};
