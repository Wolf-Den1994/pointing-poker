import { useState } from 'react';
import { useParams } from 'react-router';
import { Input, Space } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './TotalValueStatistics.module.scss';
import { editStatisticTotal } from '../../store/statisticsReducer';
import { emit } from '../../services/socket';
import { SocketTokens } from '../../types/types';

interface ITotalValueProps {
  activeIssueTaskName: string;
  enableEdit?: boolean;
  size?: string;
}

const TotalValueStatistics: React.FC<ITotalValueProps> = ({
  activeIssueTaskName,
  enableEdit,
  size = 'big',
}: ITotalValueProps) => {
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const { statistics } = useTypedSelector((state) => state.statistics);
  const { isDealer } = useTypedSelector((state) => state.roomData);

  const findActiveIssue = statistics.find((stat) => stat.taskName === activeIssueTaskName);
  const getTotalValue = findActiveIssue?.total;

  const [editIsActive, setEditIsActive] = useState(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editStatisticTotal({ taskName: activeIssueTaskName, newTotal: e.target.value }));
  };

  const handleEditCard = () => {
    if (editIsActive) {
      if (getTotalValue) dispatch(editStatisticTotal({ taskName: activeIssueTaskName, newTotal: getTotalValue }));
      emit(SocketTokens.EditTotalValue, { roomId, newTotal: getTotalValue, taskName: activeIssueTaskName });
      setEditIsActive(false);
    } else {
      setEditIsActive(true);
    }
  };

  return (
    <div className={style.total}>
      <Space wrap>
        <span className={style.totalTitle}>Total:</span>
        {editIsActive ? (
          <>
            <div className={style.editInput}>
              <Input
                maxLength={3}
                placeholder="edit"
                value={getTotalValue}
                className={style.input}
                onChange={handleInputValue}
              />
            </div>
            <span className={style.edit} onClick={handleEditCard}>
              <CheckOutlined style={{ fontSize: 16 }} />
            </span>
          </>
        ) : (
          <>
            <span className={`${style.totalValue} ${style[size]}`}>{getTotalValue}</span>
            {enableEdit && isDealer ? (
              <span className={style.edit} onClick={handleEditCard}>
                <EditOutlined style={{ fontSize: 16 }} />
              </span>
            ) : null}
          </>
        )}
      </Space>
    </div>
  );
};

export default TotalValueStatistics;
