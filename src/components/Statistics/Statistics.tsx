import useTypedSelector from '../../hooks/useTypedSelector';
import GameCard from '../GameCard/GameCard';
import style from './Statistics.module.scss';

const Statistics: React.FC = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  return (
    <div className={style.statistics}>
      <p className={style.title}>Statistics:</p>
      <div className={style.wrapper}>
        {statistics.map((item) => (
          <span key={item.card}>
            <div className={style.card}>
              <GameCard valueOnScreen={item.card} />
            </div>
            <div className={style.percent}>{item.averageGrade}</div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
