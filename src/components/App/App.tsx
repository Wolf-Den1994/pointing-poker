import { Route, Switch, Redirect } from 'react-router-dom';
import style from './App.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Lobby from '../../pages/Lobby/Lobby';
import Game from '../../pages/Game/Game';

const App: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <main>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/lobby/:roomId" component={Lobby} />
            <Route path="/game/:roomId" component={Game} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
