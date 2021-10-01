import { Card, Space } from 'antd';
import style from './IssueCard.module.scss';
import { IStatisticData } from '../../types/types';
import GameCard from '../GameCard/GameCard';
import useTypedSelector from '../../hooks/useTypedSelector';

interface IUserCardProps {
  data: IStatisticData;
}

const IssueCard: React.FC<IUserCardProps> = ({ data }: IUserCardProps) => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const findActiveIssue = statistics.find((el) => el.taskName === data.taskName);

  const getTotalValue = findActiveIssue?.lengthAverageValue;

  return (
    <>
      <Card className={style.issueCard} bodyStyle={{ padding: 10 }}>
        <div className={style.wrapper}>
          <div className={style.issue}>
            <p className={style.name}>{`Issue:  ${data.taskName}`}</p>
          </div>
        </div>
      </Card>
      <div className={style.total}>
        <Space>
          <span className={style.totalTitle}>Total:</span>
          <span className={style.totalValue}>{getTotalValue}</span>
        </Space>
      </div>
      <div className={style.game}>
        {data.statisticValues.map((el) => {
          return (
            <div key={el.card} className={style.item}>
              <GameCard>{el.card}</GameCard>
              <p className={style.text}>{`${el.averageValue}%`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default IssueCard;
