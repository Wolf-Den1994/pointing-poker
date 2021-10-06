import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from '../../store/store';
import App from './App';

describe('App component', () => {
  it('should renders without crashing', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>,
    );

    const root = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>,
      root,
    );
    ReactDOM.unmountComponentAtNode(root);
  });
});
