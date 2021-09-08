import { Route, Switch } from 'react-router-dom';
import style from './App.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Lobby from '../../pages/Lobby/Lobby';

const App: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <main>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/lobby" component={Lobby} />
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
