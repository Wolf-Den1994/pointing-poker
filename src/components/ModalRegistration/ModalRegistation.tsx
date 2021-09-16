import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Form, Input, message, Modal, Switch } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router';
import socket from '../../utils/soketIO';
import useTypedSelector from '../../hooks/useTypedSelector';
import { chageModalActive } from '../../store/homeReducer';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { setData } from '../../store/userReducer';
import { PathRoutes, IMember, SERVER_URL } from '../../types/types';
import { addAdmin, addUsers, getAllMessages, setRoomId } from '../../store/roomDataReducer';
import { changeIssue } from '../../store/issuesReducer';

const ModalRegistation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');

  const { isDealer } = useTypedSelector((state) => state.lobby);
  const { roomId } = useTypedSelector((state) => state.roomData);
  const { modalActive } = useTypedSelector((state) => state.home);

  const [formGame] = Form.useForm();

  const handleAddAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(`${reader.result}`);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobStatus(e.target.value);
  };

  const handleChangeRole = (checked: boolean) => {
    if (checked) {
      setRole('observer');
    } else {
      setRole('player');
    }
  };

  const submitFormGame = () => {
    formGame.resetFields();
    dispatch(chageModalActive(false));
  };

  const createNewRoom = async () => {
    socket.emit('createRoom', {
      data: { id: '', name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar },
    });
    socket.once('returnRoomId', (data) => {
      dispatch(setRoomId(data.id));
      dispatch(addAdmin(data.user));
      dispatch(addUsers(data.user));
      dispatch(chageModalActive(false));
      history.push(PathRoutes.Admin);
    });
  };

  const enterRoom = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/${roomId}`);
      const { users, issues, messages } = response.data;
      const isDublicate = users.find((item: IMember) => item.name === firstName);
      if (!isDublicate) {
        users.push({ id: '', name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar });
        dispatch(addUsers(users));
        dispatch(changeIssue(issues));
        dispatch(getAllMessages(messages));
        socket.emit('enterRoom', {
          user: { id: '', name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar },
          roomId,
        });
        history.push(PathRoutes.User);
      } else {
        message.error('User with the same name already exists. Enter another name!');
        return;
      }
    } catch (err) {
      dispatch(chageModalActive(false));
      if (err instanceof Error) {
        message.error(`Failed to establish a connection. Contact the system administrator. Error: ${err.message}`);
      }
    }
  };

  const handleOk = () => {
    if (firstName.length) {
      dispatch(setData({ id: '', name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar }));
      submitFormGame();
      if (isDealer) {
        createNewRoom();
      } else {
        enterRoom();
      }
    } else {
      message.error('The input is not valid First name!');
    }
  };

  const handleClickCancelButton = () => {
    formGame.resetFields();
    dispatch(chageModalActive(false));
  };

  const handleCancel = () => handleClickCancelButton();

  return (
    <>
      <Modal
        visible={modalActive}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Connect to lobby"
        okText="Confirm"
        centered
      >
        <Form form={formGame} layout="vertical" scrollToFirstError>
          {isDealer ? null : (
            <Form.Item name="observer" valuePropName="checked" label={`Connect as ${role}`} initialValue={false}>
              <Switch onChange={handleChangeRole} />
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
            <Input placeholder="Rick" onChange={handleChangeName} />
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
            <Input placeholder="Griffin" onChange={handleChangeSurname} />
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
            <Input placeholder="Software Engineer" onChange={handleChangePosition} />
          </Form.Item>

          <Form.Item name="avatar" label="Upload avatar:">
            <Input type="file" onChange={handleAddAvatar} value={avatar} />
          </Form.Item>

          {avatar && avatar.length ? (
            <Avatar shape="circle" size={64} src={avatar} alt="avatar" />
          ) : (
            <Avatar shape="circle" size={64} alt="avatar">
              {getFirstUpLetters(`${firstName} ${lastName}`)}
            </Avatar>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalRegistation;
