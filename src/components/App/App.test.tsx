import { render } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from '../../store/store';
import App from './App';

describe('App component', () => {
  const rootDiv = document.createElement('div');
  rootDiv.setAttribute('id', 'root');

  it('should renders without crashing', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>,
    );

    const container = document.getElementById('root');
    if (!container) throw new Error('Failed to find the root element');
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>,
    );
    root.unmount();
  });
});
