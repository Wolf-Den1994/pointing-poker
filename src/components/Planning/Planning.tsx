import { EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { FC, useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './Planning.module.scss';

const SHOW_ELEMENTS = 5;

const Planning: FC = () => {
  const { isDealer } = useTypedSelector((state) => state.lobby);

  // issues data from BE:
  const [issues, setIssues] = useState(['issues 11', '222', '3333', '4444', '5555', '6666', '7777', '888']);
  const [issuesEdit, setIssuesEdit] = useState(false);

  const createElementsPlanning = () => {
    const elements = [];
    for (let i = 0; i < issues.length; i += 1) {
      if (i < SHOW_ELEMENTS) {
        elements.push(<span key={issues[i]}>{issues[i]},</span>);
        if (i === issues.length - 1) {
          elements.push(<span key={issues[i]}>{issues[i]}</span>);
        }
      } else {
        elements.push(<span key={issues[i]}>...</span>);
        break;
      }
    }
    return elements;
  };

  const editIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setIssues(() => {
      return newValue.split(',');
    });
  };

  const redact = () => {
    if (issuesEdit) {
      setIssuesEdit(false);
    } else {
      setIssuesEdit(true);
    }
  };

  return (
    <div className={style.planning}>
      {issuesEdit ? (
        <Input value={issues.join(',')} onChange={editIssues} />
      ) : (
        <span className={style.tasks}>
          Spring {issues.length} planning ({createElementsPlanning()})
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
