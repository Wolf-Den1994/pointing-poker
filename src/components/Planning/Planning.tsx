import { EditOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { changeIssue } from '../../store/issuesReducer';
import style from './Planning.module.scss';

const SHOW_ELEMENTS = 5;
const textForUserAboutDublicate = 'There is a duplicate in the line. Check the line!';

const Planning: React.FC = () => {
  const dispatch = useDispatch();

  const { isDealer } = useTypedSelector((state) => state.lobby);
  const { issuesList } = useTypedSelector((state) => state.issues);

  const [issues, setIssues] = useState<string[]>(issuesList);
  const [issuesEdit, setIssuesEdit] = useState(false);

  const createElementsPlanning = () => {
    const elements = [];
    for (let i = 0; i < issuesList.length; i += 1) {
      if (i < SHOW_ELEMENTS) {
        if (i === issuesList.length - 1) {
          elements.push(<span key={issuesList[i]}>{issuesList[i]}</span>);
        } else {
          elements.push(<span key={issuesList[i]}>{issuesList[i]}, </span>);
        }
      } else {
        elements.push(<span key={issuesList[i]}>...</span>);
        break;
      }
    }
    return elements;
  };

  const editIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const result = newValue.split(',').map((issue) => issue.trim());
    setIssues(result);
  };

  const redact = () => {
    if (issuesEdit) {
      const isDuplicate = issues.some((issue, index) => issues.indexOf(issue) !== index);
      if (isDuplicate) {
        message.warning(textForUserAboutDublicate);
        setIssues(issuesList);
      } else {
        dispatch(changeIssue(issues));
      }
      setIssuesEdit(false);
    } else {
      setIssuesEdit(true);
    }
  };

  const valueIssues = issues.length ? issues.join(',') : issuesList.join(',');

  return (
    <div className={style.planning}>
      {issuesEdit ? (
        <Input value={valueIssues} onInput={editIssues} />
      ) : (
        <span className={style.tasks}>
          Spring {issuesList.length} planning ({createElementsPlanning()})
        </span>
      )}
      {isDealer ? (
        <span className={style.edit} onClick={redact}>
          <EditOutlined style={{ fontSize: 24 }} />
        </span>
      ) : null}
    </div>
  );
};

export default Planning;
