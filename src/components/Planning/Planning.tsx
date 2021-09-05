import { EditOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import style from './Planning.module.scss';

const SHOW_ELEMENTS = 5;

// data from BE:
const testArray = ['issues 13', '533', '5623', '3252', '6623', '2511', '1001', '666'];

const createElementsPlanning = () => {
  const elements = [];
  for (let i = 0; i < testArray.length; i += 1) {
    if (i < SHOW_ELEMENTS) {
      elements.push(<span key={testArray[i] + i}>{testArray[i]},</span>);
      if (i === testArray.length - 1) {
        elements.push(<span key={testArray[i] + i}>{testArray[i]}</span>);
      }
    } else {
      elements.push(<span key={testArray[i] + i}>...</span>);
      break;
    }
  }
  return elements;
};

const Planning: FC = () => {
  return (
    <div className={style.planning}>
      <span className={style.tasks}>
        Spring {testArray.length} planning ({createElementsPlanning()})
      </span>
      <EditOutlined style={{ fontSize: 24 }} />
    </div>
  );
};

export default Planning;
