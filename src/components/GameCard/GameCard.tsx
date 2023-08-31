import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { editCard, removeCard, setActiveCard } from '../../store/settingsReducer';
import style from './GameCard.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import { ICardData, IIssueData, SocketTokens, TextForUser } from '../../types/types';
import { addGrades } from '../../store/issuesReducer';
import { emit } from '../../services/socket';
import { changeGrades } from '../../utils/changedGrades';
import countStatistics from '../../utils/countStatistic';
import { addStatistics } from '../../store/statisticsReducer';
import { deleteCardFromLocalStorage, editCardInLocalStorage } from '../../utils/localStorage';

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

  const findIssue = issueList.find((issue: IIssueData) => issue.isActive);

  const viewIsNumber = Number.isNaN(+valueView) ? null : valueView;
  const classNameView = viewIsNumber ? style.number : `${style.scoreType} ${style[children]}`;

  const handleEditCard = () => {
    if (editIsActive) {
      if (newValueCard) {
        const isDuplicate = cardSet.some((card: ICardData) => card.card === newValueCard);
        if (isDuplicate) {
          message.warning(TextForUser.AboutDublicate);
          setValueView(oldValueCard);
        } else if (Number.isNaN(+newValueCard)) {
          message.warning(TextForUser.AboutNumber);
          setValueView(oldValueCard);
        } else {
          dispatch(editCard({ oldCard: oldValueCard, newCard: newValueCard }));
          editCardInLocalStorage(settings.scoreType, newValueCard, oldValueCard);
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

  const handleRemoveCard = (value: string) => {
    dispatch(removeCard(value));
    deleteCardFromLocalStorage(settings.scoreType, value);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueView(e.target.value);
    setNewValueCard(e.target.value);
  };

  const handleSectCard = () => {
    if (allowSelection && findIssue?.taskName) {
      const newGrade = { name, grade: children };
      const changedGrades = changeGrades(findIssue.grades, newGrade);

      emit(SocketTokens.EditIssueGrade, { roomId, userData: { taskName: findIssue?.taskName, name, grade: children } });
      emit(SocketTokens.SetIssueGrades, {
        roomId,
        taskName: findIssue.taskName,
        grades: changedGrades,
        statistics: countStatistics({ ...findIssue, grades: changedGrades }),
      });

      dispatch(addStatistics(countStatistics({ ...findIssue, grades: changedGrades })));
      dispatch(addGrades({ taskName: findIssue?.taskName, newGrade }));
      dispatch(setActiveCard(children));
    }
  };

  const classNameSmall = small ? style.small : '';
  const classNameAllowSelection = allowSelection && findIssue?.taskName ? style.allowSelection : '';

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
              {editIsActive ? <CheckOutlined /> : <EditOutlined />}
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
        <div className={style.cost}>{children[0]?.toUpperCase() + children.slice(1)}</div>
        <div className={`${style.additionally} ${style.additionallyBottom} ${style[children]}`}>{viewIsNumber}</div>
      </div>
    </div>
  );
};

export default GameCard;
