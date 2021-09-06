import React, { useState } from 'react';
import { Button, Form, Input, Modal, Switch } from 'antd';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import { IFormGameData } from '../../types/types';

import style from './Home.module.scss';

const Home: React.FC = () => {
  const [formConnect] = Form.useForm();
  const [formGame] = Form.useForm();
  const [modalActive, setModalActive] = useState(false);

  const onSubmitFormConnect = () => formConnect.resetFields();

  const onSubmitFormFailedConnect = () => {};

  const onSubmitFormGame = (data: IFormGameData) => {
    // Данные после заполнения формы (старт новой игры)
    console.log(data);
    formGame.resetFields();
    setModalActive(false);
  };

  const onClickCancelButton = () => {
    formGame.resetFields();
    setModalActive(false);
  };

  return (
    <>
      <div className={style.wrapper}>
        <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
        <div className={style.row}>
          <h1 className={style.title}>Start your planning:</h1>
          <div className={style.box}>
            <p className={style.session}>Create a session: </p>
            <Button className={style.button} onClick={() => setModalActive(true)} type="primary">
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
            <Form
              className={style.lobby}
              form={formConnect}
              onFinish={onSubmitFormConnect}
              onFinishFailed={onSubmitFormFailedConnect}
            >
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
                <Input className={style.input} type="text" placeholder="URL" onChange={() => {}} />
              </Form.Item>
              <Button className={`${style.button} ${style.button_lobby}`} htmlType="submit" type="primary">
                Connect
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <Modal
        visible={modalActive}
        onOk={() => formGame.submit()}
        onCancel={() => onClickCancelButton()}
        title="Connect to lobby"
        okText="Confirm"
        centered
      >
        <Form form={formGame} onFinish={onSubmitFormGame} layout="vertical" scrollToFirstError>
          <Form.Item name="observer" valuePropName="checked" label="Connect as Observer" initialValue={false}>
            <Switch />
          </Form.Item>

          <Form.Item
            name="name"
            label="Your first name:"
            tooltip="What do you want others to call you?"
            rules={[
              {
                type: 'string',
                message: 'The input is not valid First name!',
              },
              {
                required: true,
                message: 'Please, input your First name!',
              },
            ]}
          >
            <Input placeholder="Rick" />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Your surname name:"
            initialValue={''}
            rules={[
              {
                type: 'string',
              },
            ]}
          >
            <Input placeholder="King" />
          </Form.Item>

          <Form.Item
            name="job"
            label="Your job position (optional):"
            initialValue={''}
            rules={[
              {
                type: 'string',
              },
            ]}
          >
            <Input placeholder="Software Engineer" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Home;
