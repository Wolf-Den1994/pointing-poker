import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../pages/Home';
import Lobby from '../pages/Lobby';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby" component={Lobby} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

const AppContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppContainer;
