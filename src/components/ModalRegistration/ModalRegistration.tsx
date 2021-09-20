import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Form, Input, message, Modal, Switch } from 'antd';
import { useHistory } from 'react-router';
import moment from 'moment';
import useTypedSelector from '../../hooks/useTypedSelector';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { setData } from '../../store/userReducer';
import { PathRoutes, IMember, SocketTokens, UserRole, TextForUser, GameRooms } from '../../types/types';
import { addAdmin, addUsers, getAllMessages, setGameRoom } from '../../store/roomDataReducer';
import { changeIssue } from '../../store/issuesReducer';
import { emit, once, on } from '../../services/socket';
import { getResourse } from '../../services/api';
import { changeSettings } from '../../store/settingsReducer';

interface IModalRegistrationProps {
  role: string;
  onRole: Dispatch<SetStateAction<string>>;
  id: string;
  roomId: string;
  onRoomId: Dispatch<SetStateAction<string>>;
  modalActive: boolean;
  onModalActive: Dispatch<SetStateAction<boolean>>;
}

const ModalRegistration: React.FC<IModalRegistrationProps> = ({
  role,
  onRole,
  id,
  roomId,
  onRoomId,
  modalActive,
  onModalActive,
}: IModalRegistrationProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [avatar, setAvatar] = useState('');

  const { isDealer } = useTypedSelector((state) => state.roomData);

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
      onRole(UserRole.Observer);
    } else {
      onRole(UserRole.Player);
    }
  };

  const submitFormGame = () => {
    formGame.resetFields();
    onModalActive(false);
  };

  const createNewRoom = async () => {
    emit(SocketTokens.CreateRoom, {
      data: { id, name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar },
    });
    once(SocketTokens.ReturnRoomId, (data) => {
      onRoomId(data.id);
      dispatch(addAdmin(data.user));
      dispatch(addUsers(data.user));
      onModalActive(false);
      history.push(`${PathRoutes.Lobby}/${data.id}`);
    });
  };

  const enterRoom = async () => {
    try {
      const userData = {
        id,
        name: firstName,
        lastName,
        position: jobStatus,
        role,
        avatarUrl: avatar,
      };
      const response = await getResourse(roomId);
      const { admin, users, issues, messages, gameRoom, settings } = response.data;
      const isDublicate = users.find((item: IMember) => item.name === firstName);
      if (!isDublicate) {
        users.push(userData);
        dispatch(addAdmin(admin));
        dispatch(setGameRoom(gameRoom));
        dispatch(changeSettings({ ...settings, roundTime: moment(response.data.settings.roundTime, 'mm:ss') }));
        dispatch(addUsers(users));
        dispatch(changeIssue(issues));
        dispatch(getAllMessages(messages));
        emit(SocketTokens.EnterRoom, {
          user: userData,
          roomId,
        });
        const path = gameRoom === GameRooms.Lobby ? PathRoutes.Lobby : PathRoutes.Game;
        history.push(`${path}/${roomId}`);
      } else {
        message.error(TextForUser.DublicateUserName);
        return;
      }
    } catch (err) {
      onModalActive(false);
      if (err instanceof Error) {
        message.error(`${TextForUser.ErrorServer} ${err.message}`);
      }
    }
  };

  const handleOk = () => {
    if (firstName.length) {
      if (firstName.length <= 10 && lastName.length <= 10) {
        dispatch(setData({ id, name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar }));
        submitFormGame();
        if (isDealer) {
          createNewRoom();
        } else {
          enterRoom();
        }
      } else {
        message.error(TextForUser.NameIsLong);
      }
    } else {
      message.error(TextForUser.ValidateFirstName);
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
              <Switch onChange={handleChangeRole} checkedChildren={role} unCheckedChildren={role} />
            </Form.Item>
          )}

          <Form.Item
            name="name"
            label="First name:"
            tooltip="What do you want others to call you?"
            rules={[
              {
                type: 'string',
                message: TextForUser.ValidateFirstName,
              },
              {
                required: true,
                message: TextForUser.RequiredFirstName,
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
