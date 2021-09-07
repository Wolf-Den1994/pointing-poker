import React, { useState } from 'react';
import { Avatar, Button, Form, Input, Modal, Switch } from 'antd';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import defaultAvatar from '../../assets/images/Avatar.png';

import style from './Home.module.scss';

interface IFormGameData {
  observer: boolean;
  name: string;
  surname: string;
  job: string;
}

const Home: React.FC = () => {
  const [formConnect] = Form.useForm();
  const [formGame] = Form.useForm();
  const [modalActive, setModalActive] = useState(false);
  const [imageAvatar, setImageAvatar] = useState('');

  const onSubmitFormConnect = () => {};

  const onSubmitFormFailedConnect = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitFormGame = (data: IFormGameData) => {
    // data => Данные после заполнения формы (старт новой игры)
    // console.log(data);
    formGame.resetFields();
    setModalActive(false);
  };

  const onClickCancelButton = () => {
    formGame.resetFields();
    setModalActive(false);
  };

  const onChangeImage = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageAvatar(`${reader.result}`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className={style.wrapper}>
        <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
        <div className={style.row}>
          <h1 className={style.title}>Start your planning:</h1>
          <div className={style.box}>
            <p className={style.session}>Create a session: </p>
            <Button type="primary" size="large" onClick={() => setModalActive(true)}>
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
                <Input size="large" type="text" placeholder="URL" onChange={() => {}} />
              </Form.Item>
              <Button type="primary" size="large" htmlType="submit">
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
            <Input placeholder="Griffin" />
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

          <Form.Item name="avatar" label="Upload image:">
            <Input type="file" onChange={onChangeImage} value={imageAvatar} />
          </Form.Item>

          {imageAvatar.length ? (
            <Avatar shape="circle" size={64} src={imageAvatar} alt="avatar" />
          ) : (
            <Avatar shape="circle" size={64} src={defaultAvatar} alt="avatar" />
          )}
        </Form>
      </Modal>
    </>
  );
};

export default Home;
