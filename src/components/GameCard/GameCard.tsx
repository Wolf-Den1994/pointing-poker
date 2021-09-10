import { EditOutlined } from '@ant-design/icons';
import style from './GameCard.module.scss';

const GameCard: React.FC = () => {
  return (
    <div className={style.card}>
      <div className={style.wrapper}>
        <div className={`${style.additionally} ${style.additionallyTop}`}></div>
        <div className={style.edit}>
          <EditOutlined />
        </div>
        <div className={style.wrapperScoreType}>
          <div className={style.scoreType}></div>
        </div>
        <div className={style.cost}>Pass</div>
        <div className={`${style.additionally} ${style.additionallyBottom}`}></div>
      </div>
    </div>
  );
};

export default GameCard;
