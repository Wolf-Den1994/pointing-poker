import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { editCard, removeCard } from '../../store/settingsReducer';
import style from './GameCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import { TextForUser } from '../../types/types';

interface IGameCardProps {
  view: string;
}

const GameCard: React.FC<IGameCardProps> = ({ view }: IGameCardProps) => {
  const dispatch = useDispatch();

  const { cardSet } = useTypedSelector((store) => store.settings);

  const [editIsActive, setEditIsActive] = useState(false);
  const [valueView, setValueView] = useState(view);
  const [newValueCard, setNewValueCard] = useState('');
  const [oldValueCard, setOldValueCard] = useState('');

  const viewIsNumber = Number.isNaN(+valueView) ? null : valueView;
  const classNameView = viewIsNumber ? style.number : `${style.scoreType} ${style[view]}`;

  const handleEditCard = () => {
    if (editIsActive) {
      if (newValueCard) {
        const isDuplicate = cardSet.some((card) => card === newValueCard);
        if (isDuplicate) {
          message.warning(TextForUser.AboutDublicate);
          setValueView(oldValueCard);
        } else if (Number.isNaN(+newValueCard)) {
          message.warning(TextForUser.AboutNumber);
          setValueView(oldValueCard);
        } else {
          dispatch(editCard({ oldCard: oldValueCard, newCard: newValueCard }));
        }
      } else {
        message.warning(TextForUser.AboutEmpty);
        setValueView(oldValueCard);
      }
      setEditIsActive(false);
    } else {
      setOldValueCard(valueView);
      setEditIsActive(true);
    }
  };

  const handleRemoveCard = (value: string) => dispatch(removeCard(value));

  const handleInputValue = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setValueView(value);
    setNewValueCard(value);
  };

  return (
    <div className={style.card}>
      <div className={style.wrapper}>
        <div className={`${style.additionally} ${style.additionallyTop} ${style[view]}`}>{viewIsNumber}</div>
        <div className={style.edit} onClick={handleEditCard}>
          <EditOutlined />
        </div>
        <div className={style.remove} onClick={() => handleRemoveCard(valueView)}>
          <DeleteOutlined />
        </div>
        <div className={style.wrapperScoreType}>
          {editIsActive ? (
            <div className={style.editInput}>
              <Input placeholder="edit" value={valueView} className={style.input} onChange={handleInputValue} />
            </div>
          ) : (
            <div className={classNameView}>{viewIsNumber}</div>
          )}
        </div>
        <div className={style.cost}>{view}</div>
        <div className={`${style.additionally} ${style.additionallyBottom} ${style[view]}`}>{viewIsNumber}</div>
      </div>
    </div>
  );
};

export default GameCard;
