import { Link } from 'react-router-dom';
import style from './NotFound.module.scss';
import { PathRoutes, TextForUser } from '../../types/types';
import NotFoundSvg from '../../components/NotFoundSvg/NotFoundSvg';

const NotFound: React.FC = () => {
  return (
    <div className={style.error}>
      <div className={style.wrapper}>
        <NotFoundSvg />
        <div className={style.page}>{TextForUser.PageNotFound}</div>
        <Link to={PathRoutes.Home} className={style.back}>
          {TextForUser.GoBack}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
