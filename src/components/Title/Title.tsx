import { EditOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { emit } from '../../services/socket';
import useTypedSelector from '../../hooks/useTypedSelector';
import { changeIssue } from '../../store/issuesReducer';
import style from './Title.module.scss';
import { IIssueData, IssuesListMode, SocketTokens, TextForUser } from '../../types/types';
import createElementsPlanning from '../../utils/createElementsPlanning';

interface ITitleProps {
  editAvailable: boolean;
}

const Title: React.FC<ITitleProps> = ({ editAvailable }: ITitleProps) => {
  const dispatch = useDispatch();

  const { issueList } = useTypedSelector((state) => state.issues);
  const { roomId } = useTypedSelector((state) => state.roomData);
  const [issues, setIssues] = useState<IIssueData[]>(issueList);
  const [issuesEdit, setIssuesEdit] = useState(false);

  const handleEditIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const result = newValue.split(',').map((issue) => issue.trim());
    setIssues(result.map((item) => ({ taskName: item, grades: [], isActive: false })));
  };

  const handleRedact = () => {
    if (issuesEdit) {
      const tasks = issues.map((item) => item.taskName);
      const isDuplicate = tasks.some((task, index) => tasks.indexOf(task) !== index);
      if (isDuplicate) {
        message.warning(TextForUser.AboutDublicateInLine);
        setIssues(issueList);
      } else {
        emit(SocketTokens.ChangeIssuesList, {
          newIssue: issues,
          mode: IssuesListMode.All,
          roomId,
        });
        dispatch(changeIssue(issues));
      }
      setIssuesEdit(false);
    } else {
      setIssuesEdit(true);
    }
  };

  const valueDataIssues = issues.map((item) => item.taskName);
  const valueDataIssueList = issueList.map((item) => item.taskName);
  const valueIssues = issues.length ? valueDataIssues.join(',') : valueDataIssueList.join(',');

  return (
    <div className={style.planning}>
      {issuesEdit ? (
        <Input value={valueIssues} onInput={handleEditIssues} />
      ) : (
        <span className={style.tasks}>
          Spring {issueList.length} planning ({createElementsPlanning(issueList)})
        </span>
      )}
      {editAvailable ? (
        <span className={style.edit} onClick={handleRedact}>
          <EditOutlined style={{ fontSize: 24 }} />
        </span>
      ) : null}
    </div>
  );
};

export default Title;
