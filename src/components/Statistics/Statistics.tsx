import useTypedSelector from '../../hooks/useTypedSelector';
import GameCard from '../GameCard/GameCard';
import TotalValueStatistics from '../TotalValueStatistics/TotalValueStatistics';
import style from './Statistics.module.scss';

interface IStatisticProps {
  activeIssue: string;
}

const Statistics: React.FC<IStatisticProps> = ({ activeIssue }: IStatisticProps) => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const activeStatistic = statistics.find((stat) => stat.taskName === activeIssue)?.statisticValues;

  return (
    <>
      {activeStatistic?.length ? (
        <div className={style.statistics}>
          <div>
            <p className={style.title}>Statistics:</p>
            <div className={style.wrapper}>
              {activeStatistic?.map((item) => (
                <span key={item.card}>
                  <div className={style.card}>
                    <GameCard small>{item.card}</GameCard>
                  </div>
                  <div className={style.percent}>{item.averageValue}%</div>
                </span>
              ))}
            </div>
          </div>
          <TotalValueStatistics activeIssueTaskName={activeIssue} size="small" />
        </div>
      ) : null}
    </>
  );
};

export default Statistics;
