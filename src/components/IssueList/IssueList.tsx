import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Input, Modal, message } from 'antd';
import { useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './IssueList.module.scss';
import { addIssue, editIssue, removeIssue } from '../../store/issuesReducer';
import { IIssueData, IssueStatus, LayoutViews, SocketTokens, TextForUser } from '../../types/types';
import { emit } from '../../services/socket';

interface IIssueListProps {
  view?: string;
  enableHighlight?: boolean;
  onHighlight?: (task: string) => void;
}

const IssueList: React.FC<IIssueListProps> = ({
  onHighlight,
  enableHighlight,
  view = LayoutViews.Horizontal,
}: IIssueListProps) => {
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const { issueList } = useTypedSelector((state) => state.issues);
  const { isDealer } = useTypedSelector((state) => state.roomData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueNewIssue, setValueNewIssue] = useState('');
  const [valueOldIssue, setValueOldIssue] = useState('');
  const [editOrCreate, setEditOrCreate] = useState(IssueStatus.Create);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const isDuplicate = issueList.some((issue) => issue.taskName === valueNewIssue);
    if (isDuplicate) {
      message.warning(TextForUser.AboutDublicate);
    } else if (!isDuplicate && editOrCreate === IssueStatus.Create) {
      dispatch(addIssue(valueNewIssue));
    } else if (!isDuplicate) {
      emit(SocketTokens.ChangeIssuesList, {
        newIssue: valueNewIssue,
        mode: 'change',
        roomId,
        oldIssue: valueOldIssue,
      });
      dispatch(editIssue({ oldTaskName: valueOldIssue, newTaskName: valueNewIssue }));
    }
    setValueNewIssue('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValueNewIssue('');
  };

  const handleEditIssue = (issue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditOrCreate(IssueStatus.Edit);
    setValueNewIssue(issue);
    setValueOldIssue(issue);
    showModal();
  };

  const handleCreateNewIssue = () => {
    setEditOrCreate(IssueStatus.Create);
    showModal();
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => setValueNewIssue(e.target.value);

  const handleRemoveIssue = (issue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(removeIssue(issue));
  };

  const сhoiceOfActive = (issue: IIssueData) => (enableHighlight && issue.isActive ? style.active : '');

  const canActive = () => (enableHighlight && isDealer ? style.dealer : '');

  const handleHighlight = (task: string) => isDealer && onHighlight && onHighlight(task);

  return (
    <div className={style.issuesList}>
      <p className={style.title}>Issues:</p>
      <div className={`${style.wrapper} ${style[view]}`}>
        {issueList.map((issue) => (
          <span
            key={issue.taskName}
            className={`${style.issue} ${style[view]} ${canActive()} ${сhoiceOfActive(issue)}`}
            onClick={() => handleHighlight(issue.taskName)}
          >
            <div>
              <div className={style.current}>current</div>
              <span>{issue.taskName}</span>
            </div>
            <span>
              <span className={style.edit}>
                {isDealer ? (
                  <EditOutlined style={{ fontSize: 20 }} onClick={(event) => handleEditIssue(issue.taskName, event)} />
                ) : null}
              </span>
              <span className={style.delete} onClick={(event) => handleRemoveIssue(issue.taskName, event)}>
                {isDealer ? <DeleteOutlined style={{ fontSize: 20 }} /> : null}
              </span>
            </span>
          </span>
        ))}
        {isDealer ? (
          <span className={`${style.issue} ${style.issueCreate} ${style[view]}`} onClick={handleCreateNewIssue}>
            Create new Issue
            <span className={style.plus}>
              <PlusOutlined />
            </span>
          </span>
        ) : null}
        <Modal title={editOrCreate} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input placeholder={editOrCreate} value={valueNewIssue} onChange={handleInputValue} />
        </Modal>
      </div>
    </div>
  );
};

export default IssueList;
