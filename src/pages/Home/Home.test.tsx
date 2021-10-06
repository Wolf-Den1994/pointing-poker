import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Home from './Home';

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  ModalRegistration: jest.fn(() => <label>Upload avatar:</label>),
}));

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test('Page Home rendering and not empty', () => {
  const elem = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  expect(elem).not.toBeNull();
});

describe('Home page', () => {
  it('renders ModalRegistration after click on the button', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    const handleStartNewGame = jest.fn();
    fireEvent.click(screen.getByTestId('start-btn'));
    handleStartNewGame.mockResolvedValue(true);
    expect(screen.getByText('First name:')).toBeInTheDocument();
    expect(screen.getByText('Last name:')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toHaveTextContent('Confirm');
  });

  it('shows no "Upload avatar:"', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(screen.queryByText('Upload avatar:')).not.toBeInTheDocument();
  });

  it('clicking on "Start new game" Button shows "Upload avatar:"', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('start-btn'));
    expect(screen.getByText('Upload avatar:')).toBeInTheDocument();
  });
});
