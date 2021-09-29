import { useState, useEffect } from 'react';
import { Space } from 'antd';
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

  const sumValues = findNeededStatistic(activeIssue)?.reduce(
    (prev, curr) => (curr.card === 'pass' ? prev : prev + +curr.card),
    0,
  );

  useEffect(() => {
    if (sumValues) {
      const arrValues = findNeededStatistic(activeIssue);
      if (arrValues) {
        let counterPass = 0;
        for (let i = 0; i < arrValues.length; i += 1) if (arrValues[i].card === 'pass') counterPass += 1;
        setLengthAverageValue(sumValues / (arrValues.length - counterPass));
      }
    }
  }, [statistics]);

  return (
    <div className={style.statistics}>
      {findNeededStatistic(activeIssue)?.length ? (
        <>
          <div>
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
          </div>
          <div className={style.total}>
            <Space>
              <span className={style.totalTitle}>Total</span>
              <span className={style.totalValue}>{lengthAverageValue}</span>
            </Space>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Statistics;
