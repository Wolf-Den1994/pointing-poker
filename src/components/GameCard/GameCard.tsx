import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { editCard, removeCard } from '../../store/settingsReducer';
import style from './GameCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import { TextForUser } from '../../types/types';

interface IGameCardProps {
  children: string;
  enableActions?: boolean;
  small?: boolean;
}

const GameCard: React.FC<IGameCardProps> = ({ children, enableActions, small }: IGameCardProps) => {
  const dispatch = useDispatch();

  const { cardSet } = useTypedSelector((store) => store.settings);

  const [editIsActive, setEditIsActive] = useState(false);
  const [valueView, setValueView] = useState(children);
  const [newValueCard, setNewValueCard] = useState('');
  const [oldValueCard, setOldValueCard] = useState('');

  const viewIsNumber = Number.isNaN(+valueView) ? null : valueView;
  const classNameView = viewIsNumber ? style.number : `${style.scoreType} ${style[children]}`;

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

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueView(e.target.value);
    setNewValueCard(e.target.value);
  };

  return (
    <div className={small ? `${style.card} ${style.small}` : style.card}>
      <div className={style.wrapper}>
        <div className={`${style.additionally} ${style.additionallyTop} ${style[children]}`}>{viewIsNumber}</div>
        {enableActions ? (
          <>
            <div className={style.edit} onClick={handleEditCard}>
              <EditOutlined />
            </div>
            <div className={style.remove} onClick={() => handleRemoveCard(valueView)}>
              <DeleteOutlined />
            </div>
          </>
        ) : null}
        <div className={style.wrapperScoreType}>
          {editIsActive ? (
            <div className={style.editInput}>
              <Input
                maxLength={3}
                placeholder="edit"
                value={valueView}
                className={style.input}
                onChange={handleInputValue}
              />
            </div>
          ) : (
            <div className={classNameView}>{viewIsNumber}</div>
          )}
        </div>
        <div className={style.cost}>{children[0].toUpperCase() + children.slice(1)}</div>
        <div className={`${style.additionally} ${style.additionallyBottom} ${style[children]}`}>{viewIsNumber}</div>
      </div>
    </div>
  );
};

export default GameCard;
