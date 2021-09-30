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
  const activeStatistic = findNeededStatistic(activeIssue);

  const sumValues = activeStatistic?.reduce((prev, curr) => (curr.card === 'pass' ? prev : prev + +curr.card), 0);

  useEffect(() => {
    if (sumValues && activeStatistic) {
      let counterPass = 0;
      for (let i = 0; i < activeStatistic.length; i += 1) {
        if (activeStatistic[i].card === 'pass') counterPass += 1;
      }
      setLengthAverageValue(sumValues / (activeStatistic.length - counterPass));
    }
  }, [statistics]);

  return (
    <div className={style.statistics}>
      {activeStatistic?.length ? (
        <>
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
