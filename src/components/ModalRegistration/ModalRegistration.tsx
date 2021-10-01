import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Form, Input, message, Modal, Switch } from 'antd';
import { useHistory } from 'react-router';
import useTypedSelector from '../../hooks/useTypedSelector';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { checkForLettersAndNumbers } from '../../utils/regex';
import { setData } from '../../store/userReducer';
import { PathRoutes, IMember, SocketTokens, UserRole, TextForUser, GameRooms, LocalUserData } from '../../types/types';
import { addAdmin, addUsers, changeObserver, getAllMessages, setGameRoom } from '../../store/roomDataReducer';
import { changeIssue } from '../../store/issuesReducer';
import { emit, once } from '../../services/socket';
import { getResourse } from '../../services/api';
import { changeSettings, setCards } from '../../store/settingsReducer';
import { startTime } from '../../store/timerReducer';
import { setStatistics } from '../../store/statisticsReducer';

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

  useEffect(() => {
    const localFirstName = window.localStorage.getItem(LocalUserData.FirstName);
    const localLastName = window.localStorage.getItem(LocalUserData.LastName);
    const localJobStatus = window.localStorage.getItem(LocalUserData.JobStatus);

    if (localFirstName) setFirstName(localFirstName);
    if (localLastName) setLastName(localLastName);
    if (localJobStatus) setJobStatus(localJobStatus);
  }, []);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    window.localStorage.setItem(LocalUserData.FirstName, e.target.value);
  };

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    window.localStorage.setItem(LocalUserData.LastName, e.target.value);
  };

  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobStatus(e.target.value);
    window.localStorage.setItem(LocalUserData.JobStatus, e.target.value);
  };

  const handleChangeRole = (checked: boolean) => {
    if (checked) {
      onRole(UserRole.Observer);
      dispatch(changeObserver(true));
    } else {
      onRole(UserRole.Player);
      dispatch(changeObserver(false));
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
      const { admin, users, issues, messages, gameRoom, settings, cardSet, statistics } = response.data;
      const timerTime = settings.roundTime * 60;
      const isDublicate = users.find((item: IMember) => item.name === firstName);
      if (!isDublicate) {
        users.push(userData);
        dispatch(addAdmin(admin));
        dispatch(setGameRoom(gameRoom));
        dispatch(changeSettings(settings));
        dispatch(startTime(timerTime));
        dispatch(addUsers(users));
        dispatch(changeIssue(issues));
        dispatch(getAllMessages(messages));
        dispatch(setStatistics(statistics));
        if (cardSet) dispatch(setCards(cardSet));
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
    if (firstName.length > 2 && checkForLettersAndNumbers(firstName)) {
      dispatch(setData({ id, name: firstName, lastName, position: jobStatus, role, avatarUrl: avatar }));
      submitFormGame();
      if (isDealer) {
        createNewRoom();
      } else {
        enterRoom();
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
            initialValue={firstName}
            rules={[
              {
                type: 'string',
                message: TextForUser.ValidateFirstName,
              },
              {
                required: true,
                message: TextForUser.RequiredFirstName,
              },
              {
                min: 3,
                message: TextForUser.RequiredMinLengthFirstName,
              },
            ]}
          >
            <Input placeholder="Rick" onChange={handleChangeName} />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Last name:"
            initialValue={lastName}
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
            initialValue={jobStatus}
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
            <Avatar
              shape="circle"
              size={64}
              alt="avatar"
              style={{
                fontSize: 33,
                textShadow: '0px 4px 4px #00000040',
                backgroundColor: '#60DABF',
              }}
            >
              {getFirstUpLetters(`${firstName} ${lastName}`)}
            </Avatar>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalRegistration;
