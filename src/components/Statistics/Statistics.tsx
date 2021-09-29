import { useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import GameCard from '../GameCard/GameCard';
import style from './Statistics.module.scss';

interface IStatisticProps {
  activeIssue: string;
}

const Statistics: React.FC<IStatisticProps> = ({ activeIssue }: IStatisticProps) => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const [lengthAverageValue, setLengthAverageValue] = useState(0);

  const findNeededStatistic = (taskName: string) => statistics.find((el) => el.taskName === taskName)?.statisticValues;

  const averageValue = findNeededStatistic(activeIssue)?.reduce((prev, curr) => {
    if (curr.card === 'pass') return prev;
    return prev + +curr.card;
  }, 0);

  if (averageValue) {
    const obj = findNeededStatistic(activeIssue);
    if (obj) {
      setLengthAverageValue(averageValue / obj.length);
    }
  }

  return (
    <div className={style.statistics}>
      {findNeededStatistic(activeIssue)?.length ? (
        <>
          <p className={style.title}>Statistics:</p>
          <div className={style.wrapper}>
            {findNeededStatistic(activeIssue)?.map((item) => (
              <span key={item.card}>
                <div className={style.card}>
                  <GameCard small>{item.card}</GameCard>
                </div>
                <div className={style.percent}>{item.averageValue}%</div>
              </span>
            ))}
          </div>
          <div>{lengthAverageValue}</div>
        </>
      ) : null}
    </div>
  );
};

export default Statistics;
