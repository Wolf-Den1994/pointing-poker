import { Space } from 'antd';
import useTypedSelector from '../../hooks/useTypedSelector';
import GameCard from '../GameCard/GameCard';
import style from './Statistics.module.scss';

interface IStatisticProps {
  activeIssue: string;
}

const Statistics: React.FC<IStatisticProps> = ({ activeIssue }: IStatisticProps) => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const findActiveIssue = statistics.find((el) => el.taskName === activeIssue);

  const activeStatistic = findActiveIssue?.statisticValues;
  const getTotalValue = findActiveIssue?.lengthAverageValue;

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
              <span className={style.totalTitle}>Total:</span>
              <span className={style.totalValue}>{getTotalValue}</span>
            </Space>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Statistics;
