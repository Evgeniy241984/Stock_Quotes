import dataStore from './data/dataStore';
/* import { validateAndLoadTickerData, performSearch } from './data/stockQuotesData'; */
import renderApp from './framework/render';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = dataStore;

renderApp(App, document.getElementById('app-root'));
