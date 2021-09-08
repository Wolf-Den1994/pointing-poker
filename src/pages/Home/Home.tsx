import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Form, Input, Modal, Switch } from 'antd';
import { useHistory } from 'react-router';
import useTypedSelector from '../../hooks/useTypedSelector';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import style from './Home.module.scss';
import { changeAvatar } from '../../store/homeReducer';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { changeUsername } from '../../store/lobbyReducer';
import { PathRoutes } from '../../types/types';

interface IFormGameData {
  observer: boolean;
  name: string;
  surname: string;
  job: string;
  avatar: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  const [fullname, setFullname] = useState(['', '']);
  const [modalActive, setModalActive] = useState(false);

  const [formConnect] = Form.useForm();
  const [formGame] = Form.useForm();
  const dispatch = useDispatch();
  const { imageAvatar } = useTypedSelector((state) => state.home);
  const { user } = useTypedSelector((state) => state.lobby);

  const onSubmitFormConnect = () => {};

  const onSubmitFormFailedConnect = () => {};

  const onChangeName = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setFullname((state) => [value, state[1]]);
    dispatch(changeUsername({ name: `${fullname.join(' ')}`, jobStatus: '', avatar: '' }));
  };

  const onChangeSurname = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setFullname((state) => [state[0], value]);
    dispatch(changeUsername({ name: `${fullname.join(' ')}`, jobStatus: '', avatar: '' }));
  };

  const onSubmitFormGame = (data: IFormGameData) => {
    // data => Данные после заполнения формы (старт новой игры)
    dispatch(changeUsername({ name: `${fullname.join(' ')}`, jobStatus: data.job, avatar: data.avatar }));
    formGame.resetFields();
    setModalActive(false);
    history.push(PathRoutes.Lobby);
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
      dispatch(changeAvatar(`${reader.result}`));
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
            <Input placeholder="Rick" onChange={onChangeName} />
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
            <Input placeholder="Griffin" onChange={onChangeSurname} />
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

          <Form.Item name="avatar" label="Upload avatar:">
            <Input type="file" onChange={onChangeImage} value={imageAvatar} />
          </Form.Item>

          {imageAvatar.length ? (
            <Avatar shape="circle" size={64} src={imageAvatar} alt="avatar" />
          ) : (
            <Avatar shape="circle" size={64} alt="avatar">
              {getFirstUpLetters(user.name)}
            </Avatar>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default Home;
