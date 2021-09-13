import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Form, Input, Modal, Switch } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router';
import socket from '../../utils/soketIO';
import useTypedSelector from '../../hooks/useTypedSelector';
import { chageModalActive, changeAvatar } from '../../store/homeReducer';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { setAvatar, setData, setName, setLastName } from '../../store/registrationDataReducer';
import { PathRoutes } from '../../types/types';
import { addAdmin, addUsers, getAllMessages, setRoomId } from '../../store/roomDataReducer';

interface IFormGameData {
  observer: boolean;
  name: string;
  surname: string;
  job: string;
  avatar: string;
}

const ModalRegistation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const imageAvatar = useTypedSelector((state) => state.registrationData.user.avatarUrl);
  const { isDealer } = useTypedSelector((state) => state.lobby);
  const registrationData = useTypedSelector((state) => state.registrationData.user);
  // console.log(registrationData);
  const { roomId, users } = useTypedSelector((state) => state.roomData);
  const { modalActive } = useTypedSelector((state) => state.home);

  const [formGame] = Form.useForm();

  const addAvatar = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(setAvatar(`${reader.result}`));
    };
    reader.readAsDataURL(file);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const onChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(e.target.value));
  };

  const onSubmitFormGame = (data: IFormGameData) => {
    // data => Данные после заполнения формы (старт новой игры)
    // dispatch(changeUser({ name: `${name} ${surname}`, jobStatus: data.job, avatar: data.avatar }));
    const role = isDealer ? 'admin' : 'player';
    dispatch(
      setData({
        name: registrationData.name,
        lastName: registrationData.lastName,
        position: data.job,
        role,
        avatar: data.avatar,
        id: '',
      }),
    );
    formGame.resetFields();
    dispatch(chageModalActive(false));
    history.push(PathRoutes.Lobby);
  };

  const createNewRoom = async () => {
    socket.emit('createRoom', { data: registrationData });
    socket.once('returnRoomId', (data) => {
      dispatch(setRoomId(data.id));
      dispatch(addAdmin(data.user));
      dispatch(addUsers(data.user));
      history.push(PathRoutes.Admin);
    });
  };

  const enterRoom = async () => {
    try {
      const response = await axios.get(`https://rsschool-pp.herokuapp.com/api/${roomId}`);
      console.log(response);
      if (response) {
        response.data.users.push(registrationData);
        dispatch(addUsers(response.data.users));
        // dispatch(getAllMessages(response.data.messages));
        socket.emit('enterRoom', { user: registrationData, roomId });
        history.push(PathRoutes.Chat);
      } else {
        // eslint-disable-next-line no-alert
        alert('Not so fast!');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handlerOk = () => {
    // formGame.submit();
    if (isDealer) {
      createNewRoom();
    } else {
      enterRoom();
    }
  };

  const onClickCancelButton = () => {
    formGame.resetFields();
    dispatch(chageModalActive(false));
  };

  const handlerCancel = () => onClickCancelButton();

  useEffect(() => {
    socket.on('disconnect', () => {
      window.location.reload();
      socket.connect();
    });
  });

  return (
    <>
      <Modal
        visible={modalActive}
        onOk={handlerOk}
        onCancel={handlerCancel}
        title="Connect to lobby"
        okText="Confirm"
        centered
      >
        <Form form={formGame} onFinish={onSubmitFormGame} layout="vertical" scrollToFirstError>
          {isDealer ? null : (
            <Form.Item name="observer" valuePropName="checked" label="Connect as Observer" initialValue={false}>
              <Switch />
            </Form.Item>
          )}

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
            <Input type="file" onChange={addAvatar} value={imageAvatar} />
          </Form.Item>

          {imageAvatar && imageAvatar.length ? (
            <Avatar shape="circle" size={64} src={imageAvatar} alt="avatar" />
          ) : (
            <Avatar shape="circle" size={64} alt="avatar">
              {getFirstUpLetters(`${registrationData.name} ${registrationData.lastName}`)}
            </Avatar>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalRegistation;
