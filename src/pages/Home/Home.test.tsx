import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Home from './Home';

test('Page Home rendering and not empty', () => {
  const elem = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  expect(elem).not.toBeNull();
});
