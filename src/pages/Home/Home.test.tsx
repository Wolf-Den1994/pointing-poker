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

describe('Home page', () => {
  it('should not rendering epmty page', () => {
    const elem = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(elem).not.toBeNull();
  });

  it('should render ModalRegistration after click on the button', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Start new game'));
    expect(screen.getByText('First name:')).toBeInTheDocument();
    expect(screen.getByText('Last name:')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toHaveTextContent('Confirm');
  });

  it('should not show "Upload avatar:" before click on "Start new game" button', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(screen.queryByText('Upload avatar:')).not.toBeInTheDocument();
  });

  it('should show "Upload avatar:" after click on "Start new game" button', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Start new game'));
    expect(screen.getByText('Upload avatar:')).toBeInTheDocument();
  });
});
