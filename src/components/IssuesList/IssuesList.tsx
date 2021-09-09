import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Input, Modal, message } from 'antd';
import { useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './IssuesList.module.scss';
import { addIssue, editIssue, removeIssue } from '../../store/issuesReducer';
import { IssueStatus } from '../../types/types';

const textForUserAboutDublicate = 'This is duplicate!';

const IssuesList: React.FC = () => {
  const dispatch = useDispatch();

  const { issuesList } = useTypedSelector((state) => state.issues);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueNewIssue, setValueNewIssue] = useState('');
  const [valueOldIssue, setValueOldIssue] = useState('');
  const [editOrCreate, setEditOrCreate] = useState(IssueStatus.Create);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const isDuplicate = issuesList.some((issue) => issue === valueNewIssue);
    if (isDuplicate) {
      message.warning(textForUserAboutDublicate);
    } else if (!isDuplicate && editOrCreate === IssueStatus.Create) {
      dispatch(addIssue(valueNewIssue));
    } else if (!isDuplicate) {
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

  const hanleInputValue = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setValueNewIssue(value);
  };

  const handleRemoveIssue = (issue: string) => {
    dispatch(removeIssue(issue));
  };

  const elements = issuesList.map((issue) => (
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
          <Input placeholder={editOrCreate} value={valueNewIssue} onChange={hanleInputValue} />
        </Modal>
      </div>
    </div>
  );
};

export default IssuesList;
