import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Input, message } from 'antd';
import GameCard from '../GameCard/GameCard';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './CustomizeCards.module.scss';
import { addCard } from '../../store/cardSetReducer';
import { TextForUser } from '../../types/types';

const CustomizeCards: React.FC = () => {
  const dispatch = useDispatch();

  const { cardSet } = useTypedSelector((store) => store.cardSet);

  const [valueInput, setValueInput] = useState('');
  const [addIsActive, setAddIsActive] = useState(false);

  const elements = cardSet.map((item) => <GameCard key={item} view={item} />);

  const showAddCard = () => {
    if (!addIsActive) setAddIsActive(true);
  };

  const handleAddCard = () => {
    const isDuplicate = cardSet.some((card) => card === valueInput);
    if (isDuplicate) {
      message.warning(TextForUser.AboutDublicate);
    } else if (Number.isNaN(+valueInput)) {
      message.warning(TextForUser.AboutNumber);
    } else {
      dispatch(addCard(valueInput));
      setAddIsActive(false);
      setValueInput('');
    }
  };

  const handleInputValue = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setValueInput(value);
  };

  return (
    <div className={style.customizeCards}>
      <p className={style.title}>Add card values:</p>
      <div className={style.wrapper}>
        {elements}
        <div className={style.add} onClick={showAddCard}>
          {addIsActive ? (
            <div className={style.addWrapper}>
              <Input placeholder="add" value={valueInput} onChange={handleInputValue} />
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
