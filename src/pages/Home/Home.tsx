import React from 'react';
import { Button, Form, Input } from 'antd';
import imagePokerPlanning from '../../assets/images/poker-planning.png';

import style from './Home.module.scss';

const Home: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = () => form.resetFields();

  const onFinishFailed = () => {};

  return (
    <div className={style.wrapper}>
      <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
      <div className={style.row}>
        <h1 className={style.title}>Start your planning:</h1>
        <div className={style.box}>
          <p className={style.session}>Create a session: </p>
          <Button type="primary" size="large" className={style.button} onClick={() => {}}>
            Start new game
          </Button>
        </div>
      </div>

      <div className={style.row}>
        <h1 className={`${style.title} ${style.title_lobby}`}>OR:</h1>
        <div className={`${style.box} ${style.box_lobby}`}>
          <p className={style.session}>
            Connect to lobby by <span>URL:</span>
          </p>
          <Form className={style.lobby} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              name="URL"
              hasFeedback
              rules={[
                {
                  required: true,
                },
                {
                  type: 'string',
                  min: 6,
                },
              ]}
            >
              <Input size="large" className={style.input} type="text" placeholder="URL" onChange={() => {}} />
            </Form.Item>
            <Button type="primary" size="large" className={`${style.button}`} htmlType="submit">
              Connect
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
