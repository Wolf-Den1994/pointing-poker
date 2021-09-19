import useTypedSelector from '../../hooks/useTypedSelector';
import { LayoutViews } from '../../types/types';
import GameCard from '../GameCard/GameCard';
import style from './Statistics.module.scss';

const Statistics: React.FC = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  return (
    <div className={style.statistics}>
      <p className={style.title}>Statistics:</p>
      <div className={style.wrapper}>
        {statistics.map((item, index) => (
          <span key={item.card}>
            <div className={style.card}>
              <GameCard view={item.card} layout={LayoutViews.Statistics} />
            </div>
            <div className={style.percent}>{statistics[index].grades}</div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
