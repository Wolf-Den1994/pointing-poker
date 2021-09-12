import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import style from './App.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
// import Lobby from '../../pages/Lobby/Lobby';
import User from '../../pages/User/User';
import Admin from '../../pages/Admin/Admin';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className={style.wrapper}>
      <Header />
      <main>
        <div className="container">
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/lobby" component={Lobby} /> */}
            <Route path="/user" component={User} />
            <Route path="/admin" component={Admin} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
