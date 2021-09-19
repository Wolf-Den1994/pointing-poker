import GameCard from '../GameCard/GameCard';
import style from './Statistics.module.scss';

const grades = ['42.8%', '28.5%', '28.5%'];

const Statistics: React.FC = () => {
  return (
    <div className={style.statistics}>
      <p className={style.title}>Statistics:</p>
      <div className={style.wrapper}>
        {['10', '5', 'pass'].map((item, index) => (
          <span key={item}>
            <div className={style.card}>
              <GameCard view={item} layout="statistics" />
            </div>
            <div className={style.percent}>{grades[index]}</div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
