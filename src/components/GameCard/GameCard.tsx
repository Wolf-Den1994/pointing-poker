import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { editCard, removeCard, setActiveCard } from '../../store/settingsReducer';
import style from './GameCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import { SocketTokens, TextForUser } from '../../types/types';
import { addGrades } from '../../store/issuesReducer';
import { emit } from '../../services/socket';
import countStatistics from '../../utils/countStatistic';
import { addStatistics } from '../../store/statisticsReducer';

interface IGameCardProps {
  children: string;
  enableActions?: boolean;
  small?: boolean;
  allowSelection?: boolean;
  active?: string;
}

const GameCard: React.FC<IGameCardProps> = ({
  children,
  enableActions,
  small,
  allowSelection,
  active = 'notActive',
}: IGameCardProps) => {
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const { cardSet, settings } = useTypedSelector((store) => store.settings);
  const { issueList } = useTypedSelector((state) => state.issues);
  const { name } = useTypedSelector((state) => state.userData);

  const [editIsActive, setEditIsActive] = useState(false);
  const [valueView, setValueView] = useState(children);
  const [newValueCard, setNewValueCard] = useState('');
  const [oldValueCard, setOldValueCard] = useState('');

  const taskName = issueList.find((issue) => issue.isActive)?.taskName;

  const viewIsNumber = Number.isNaN(+valueView) ? null : valueView;
  const classNameView = viewIsNumber ? style.number : `${style.scoreType} ${style[children]}`;

  const handleEditCard = () => {
    if (editIsActive) {
      if (newValueCard) {
        const isDuplicate = cardSet.some((card) => card.card === newValueCard);
        if (isDuplicate) {
          message.warning(TextForUser.AboutDublicate);
          setValueView(oldValueCard);
        } else if (Number.isNaN(+newValueCard)) {
          message.warning(TextForUser.AboutNumber);
          setValueView(oldValueCard);
        } else {
          dispatch(editCard({ oldCard: oldValueCard, newCard: { card: newValueCard, isActive: false } }));
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

  const findIssue = issueList.find((issue) => issue.isActive);

  // console.log('Приходит children', children);
  const activeCard = cardSet.find((card) => card.isActive)?.card;
  console.log('asd', activeCard);

  const handleSectCard = () => {
    if (allowSelection && taskName) {
      emit(SocketTokens.EditIssueGrade, { roomId, userData: { taskName, name, grade: children } });
      dispatch(addGrades({ taskName, newGrade: { name, grade: children } }));
      dispatch(setActiveCard(children));

      // ниже удалить
      console.log('handleSectCard', children);
      if (findIssue && settings.voteAfterRoundEnd) {
        emit(SocketTokens.OffProgress, {
          roomId,
          progress: false,
          taskName: findIssue.taskName,
          grades: findIssue.grades,
          statistics: countStatistics(findIssue),
        });
        dispatch(addStatistics(countStatistics(findIssue)));
      }
    }
  };

  const classNameSmall = small ? style.small : '';
  const classNameAllowSelection = allowSelection && taskName ? style.allowSelection : '';

  return (
    <div
      className={`${style.card} ${classNameSmall} ${classNameAllowSelection} ${style[active]}`}
      onClick={handleSectCard}
    >
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
