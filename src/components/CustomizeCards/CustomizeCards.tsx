import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useParams } from 'react-router';
import GameCard from '../GameCard/GameCard';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './CustomizeCards.module.scss';
import { addCard } from '../../store/settingsReducer';
import { TextForUser } from '../../types/types';
import { addCardToLocalStorage } from '../../utils/localStorage.service';

const CustomizeCards: React.FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams<{ roomId: string }>();

  const { cardSet } = useTypedSelector((store) => store.settings);
  const { settings } = useTypedSelector((state) => state.settings);

  const [valueInput, setValueInput] = useState('');
  const [addIsActive, setAddIsActive] = useState(false);

  const handleShowAddCard = () => {
    if (!addIsActive) setAddIsActive(true);
  };

  const handleAddCard = () => {
    const isDuplicate = cardSet.some((card) => card.card === valueInput);
    if (isDuplicate) {
      message.warning(TextForUser.AboutDublicate);
    } else if (Number.isNaN(+valueInput) || !valueInput) {
      message.warning(TextForUser.AboutNumber);
    } else {
      const newCard = { card: valueInput, isActive: false };
      dispatch(addCard(newCard));
      addCardToLocalStorage(roomId, settings.scoreType, newCard);
      setAddIsActive(false);
      setValueInput('');
    }
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => setValueInput(e.target.value);

  return (
    <div className={style.customizeCards}>
      <p className={style.title}>Add card values:</p>
      <div className={style.wrapper}>
        {cardSet.map(({ card }) => (
          <GameCard key={card} enableActions>
            {card}
          </GameCard>
        ))}
        <div className={style.add} onClick={handleShowAddCard}>
          {addIsActive ? (
            <div className={style.addWrapper}>
              <Input placeholder="add" value={valueInput} onChange={handleInputValue} maxLength={3} />
              <Button type="primary" onClick={handleAddCard} className={style.addButton}>
                Add
              </Button>
            </div>
          ) : (
            <PlusCircleOutlined style={{ fontSize: 50 }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizeCards;
