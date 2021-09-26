import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { PathRoutes } from '../../types/types';

import style from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.top}>
        <div className="container">
          <h1 className={style.title}>Pointing Poker</h1>
          <Link to={PathRoutes.Home}>
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className={style.bottom}></div>
      <div className={style.underBottom}></div>
    </header>
  );
};

export default Header;
