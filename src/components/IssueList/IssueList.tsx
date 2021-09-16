import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Input, Modal, message } from 'antd';
import { useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './IssueList.module.scss';
import { addIssue, editIssue, removeIssue } from '../../store/issuesReducer';
import { IssueStatus, SocketTokens, TextForUser } from '../../types/types';
import { emit } from '../../services/socket';

const IssueList: React.FC = () => {
  const dispatch = useDispatch();

  const { issueList } = useTypedSelector((state) => state.issues);
  const roomData = useTypedSelector((state) => state.roomData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueNewIssue, setValueNewIssue] = useState('');
  const [valueOldIssue, setValueOldIssue] = useState('');
  const [editOrCreate, setEditOrCreate] = useState(IssueStatus.Create);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const isDuplicate = issueList.some((issue) => issue === valueNewIssue);
    if (isDuplicate) {
      message.warning(TextForUser.AboutDublicate);
    } else if (!isDuplicate && editOrCreate === IssueStatus.Create) {
      emit(SocketTokens.ChangeIssuesList, { newIssue: valueNewIssue, mode: 'add', roomId: roomData.roomId });
      dispatch(addIssue(valueNewIssue));
    } else if (!isDuplicate) {
      emit(SocketTokens.ChangeIssuesList, {
        newIssue: valueNewIssue,
        mode: 'change',
        roomId: roomData.roomId,
        oldIssue: valueOldIssue,
      });
      dispatch(editIssue({ oldIssue: valueOldIssue, newIssue: valueNewIssue }));
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

  const elements = issueList.map((issue) => (
    <span key={issue} className={style.issue}>
      {issue}
      <span className={style.edit}>
        <EditOutlined style={{ fontSize: 20 }} onClick={() => handleEditIssue(issue)} />
      </span>
      <span className={style.delete} onClick={() => handleRemoveIssue(issue)}>
        <DeleteOutlined style={{ fontSize: 20 }} />
      </span>
    </span>
  ));

  return (
    <div className={style.issuesList}>
      <p className={style.title}>Issues:</p>
      <div className={style.wrapper}>
        {elements}
        <span className={` ${style.addIssue}`} onClick={handleCreateNewIssue}>
          <span className={`${style.issue} ${style.issueCreate}`}>
            Create new Issue
            <span className={style.plus}>
              <PlusOutlined />
            </span>
          </span>
        </span>
        <Modal title={editOrCreate} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input placeholder={editOrCreate} value={valueNewIssue} onChange={handleInputValue} />
        </Modal>
      </div>
    </div>
  );
};

export default IssueList;
