import dataStore from './data/dataStore';
import { validateAndLoadTickerData, performSearch } from './data/stockQuotesData';
import renderApp from './framework/render';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = dataStore;

window.renderApp = renderApp;
window.performSearch = performSearch;
window.validateAndLoadTickerData = validateAndLoadTickerData;

renderApp(App, 'app-root');
