import { message } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import useTypedSelector from '../../hooks/useTypedSelector';
import { PathRoutes } from '../../types/types';
import disconnectUsers from '../../utils/disconnectUsers';

import style from './Header.module.scss';

const Header: React.FC = () => {
  const { roomId } = useTypedSelector((state) => state.roomData);
  const userName = useTypedSelector((state) => state.userData.name);
  const { isDealer } = useTypedSelector((state) => state.roomData);

  const returnToHomePage = async () => {
    try {
      await disconnectUsers(roomId, isDealer, userName);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  return (
    <header className={style.header}>
      <div className={style.top}>
        <div className="container">
          <h1 className={style.title}>Pointing Poker</h1>
          <Link to={PathRoutes.Home} onClick={returnToHomePage}>
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
