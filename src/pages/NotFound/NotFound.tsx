import { Link } from 'react-router-dom';
import style from './NotFound.module.scss';
import imageNotFound from '../../assets/404.svg';
import { PathRoutes, TextForUser } from '../../types/types';

const NotFound: React.FC = () => {
  return (
    <div className={style.error}>
      <div className={style.wrapper}>
        <Link to={PathRoutes.Home} className={style.oops}>
          <img className={style.image} src={imageNotFound} alt="404-error" />
        </Link>
        <div className={style.page}>{TextForUser.PageNotFound}</div>
        <Link to={PathRoutes.Home} className={style.back}>
          {TextForUser.GoBack}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
