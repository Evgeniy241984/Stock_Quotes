import SearchByTicker from './SearchByTicker';
import Results from './StockQuotesResults';

export default function App() {
  return `<section>
      ${SearchByTicker()}
      ${Results()}
  
    </section>`;
}
