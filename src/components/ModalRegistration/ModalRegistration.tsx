import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Form, Input, message, Modal, Switch } from 'antd';
import { useHistory } from 'react-router';
import useTypedSelector from '../../hooks/useTypedSelector';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { setData } from '../../store/userReducer';
import { PathRoutes, IMember, SocketTokens } from '../../types/types';
import { addAdmin, addUsers, getAllMessages, setRoomId } from '../../store/roomDataReducer';
import { changeIssue } from '../../store/issuesReducer';
import { emit, once } from '../../services/socket';
import api from '../../services/api';

interface IModalRegistrationProps {
  modalActive: boolean;
  onModalActive: Dispatch<SetStateAction<boolean>>;
}

const ModalRegistration: React.FC<IModalRegistrationProps> = ({
  modalActive,
  onModalActive,
}: IModalRegistrationProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');

  const { isDealer } = useTypedSelector((state) => state.lobby);
  const { roomId } = useTypedSelector((state) => state.roomData);

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
    onModalActive(false);
  };

  const createNewRoom = async () => {
    emit(SocketTokens.CreateRoom, {
      data: { id: '', name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar },
    });
    once(SocketTokens.ReturnRoomId, (data) => {
      dispatch(setRoomId(data.id));
      dispatch(addAdmin(data.user));
      dispatch(addUsers(data.user));
      onModalActive(false);
      history.push(PathRoutes.Admin);
    });
  };

  const enterRoom = async () => {
    try {
      const response = await api.getResourse(roomId);
      const { users, issues, messages } = response.data;
      const isDublicate = users.find((item: IMember) => item.name === firstName);
      if (!isDublicate) {
        users.push({ id: '', name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar });
        dispatch(addUsers(users));
        dispatch(changeIssue(issues));
        dispatch(getAllMessages(messages));
        emit(SocketTokens.EnterRoom, {
          user: { id: '', name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar },
          roomId,
        });
        history.push(PathRoutes.User);
      } else {
        message.error('User with the same name already exists. Enter another name!');
        return;
      }
    } catch (err) {
      onModalActive(false);
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
    onModalActive(false);
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
            label="First name:"
            tooltip="What do you want others to call you?"
            rules={[
              {
                type: 'string',
                message: 'The input is not valid First name!',
              },
            ]}
          >
            <Input placeholder="Rick" onChange={handleChangeName} />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Surname name:"
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
            label="Job position:"
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

export default ModalRegistration;