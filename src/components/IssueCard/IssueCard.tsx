import { Card } from 'antd';
import style from './IssueCard.module.scss';
import { IStatisticData } from '../../types/types';
import GameCard from '../GameCard/GameCard';

interface IUserCardProps {
  data: IStatisticData;
}

const IssueCard: React.FC<IUserCardProps> = ({ data }: IUserCardProps) => {
  return (
    <>
      <Card className={style.issueCard} bodyStyle={{ padding: 10 }}>
        <div className={style.wrapper}>
          <div className={style.issue}>
            <p className={style.name}>{`Issue  ${data.taskName}`}</p>
          </div>
        </div>
      </Card>
      <div className={style.game}>
        {data.statisticValues.map((el) => {
          return (
            <div key={el.card} className={style.item}>
              <GameCard>{String(el.card)}</GameCard>
              <p className={style.text}>{`${el.averageValue}%`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default IssueCard;
