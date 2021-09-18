import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Input, Modal, message } from 'antd';
import { useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './IssueList.module.scss';
import { addIssue, editIssue, removeIssue, setActiveIssue } from '../../store/issuesReducer';
import { IssueStatus, LayoutViews, SocketTokens, TextForUser } from '../../types/types';
import { emit } from '../../services/socket';

interface IIssueListProps {
  view?: string;
}

const IssueList: React.FC<IIssueListProps> = ({ view = LayoutViews.Horizontal }: IIssueListProps) => {
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
      dispatch(
        editIssue({ oldIssue: valueOldIssue, newIssue: { taskName: valueNewIssue, grades: {}, isActive: false } }),
      );
    }
    setValueNewIssue('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValueNewIssue('');
  };

  const handleEditIssue = (issue: string) => {
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

  const handleRemoveIssue = (issue: string) => {
    dispatch(removeIssue(issue));
  };

  const handleIssueHiglighte = (task: string) => {
    if (view === LayoutViews.Vertical && isDealer) dispatch(setActiveIssue(task));
  };

  const сhoiceOfActive = (index: number) => {
    if (view === LayoutViews.Vertical) return issueList[index].isActive ? style.active : null;
    return null;
  };

  const canActive = () => (isDealer ? `${style[view]} ${style.dealer}` : style[view]);

  return (
    <div className={style.issuesList}>
      <p className={style.title}>Issues:</p>
      <div className={`${style.wrapper} ${style[view]}`}>
        {issueList.map((issue, index) => (
          <span
            key={issue.taskName}
            className={`${style.issue} ${canActive()} ${сhoiceOfActive(index)}`}
            onClick={() => handleIssueHiglighte(issue.taskName)}
          >
            {issue.taskName}
            <span>
              <span className={style.edit}>
                {isDealer ? (
                  <EditOutlined style={{ fontSize: 20 }} onClick={() => handleEditIssue(issue.taskName)} />
                ) : null}
              </span>
              <span className={style.delete} onClick={() => handleRemoveIssue(issue.taskName)}>
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
