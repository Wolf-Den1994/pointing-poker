import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import style from './App.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Lobby from '../../pages/Lobby/Lobby';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className={style.wrapper}>
      <Header />
      <main>
        <div className="container">
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route path="/lobby/:roomId" component={Lobby} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
