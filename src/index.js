import { render } from './framework';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

render(App, document.getElementById('app-root'));
