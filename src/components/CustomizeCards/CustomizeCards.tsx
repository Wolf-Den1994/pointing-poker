import GameCard from '../GameCard/GameCard';
import style from './CustomizeCards.module.scss';

const CustomizeCards: React.FC = () => {
  return (
    <div className={style.customizeCards}>
      <p className={style.title}>Add card values:</p>
      <div className={style.wrapper}>
        <div className={style.card}>
          <GameCard />
        </div>
      </div>
    </div>
  );
};

export default CustomizeCards;
