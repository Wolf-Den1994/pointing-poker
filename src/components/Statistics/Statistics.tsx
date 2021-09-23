import useTypedSelector from '../../hooks/useTypedSelector';
import GameCard from '../GameCard/GameCard';
import style from './Statistics.module.scss';

interface IStatisticProps {
  activeIssue: string;
}

const Statistics: React.FC<IStatisticProps> = ({ activeIssue }: IStatisticProps) => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const findNeededStatistic = (taskName: string) => {
    const result = statistics.find((el) => el.taskName === taskName);
    return result;
  };

  return (
    <div className={style.statistics}>
      <p className={style.title}>Statistics:</p>
      <div className={style.wrapper}>
        {findNeededStatistic(activeIssue)?.statisticValues.map((item) => (
          <span key={item.card}>
            <div className={style.card}>
              <GameCard small>{item.card}</GameCard>
            </div>
            <div className={style.percent}>{item.averageValue}</div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
