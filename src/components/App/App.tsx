import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import cl from './App.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../pages/Home';
import Lobby from '../pages/Lobby';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className={cl.app}>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/lobby" component={Lobby} />
          </Switch>
        </div>
      </main>
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
