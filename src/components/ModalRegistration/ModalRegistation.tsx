import { useDispatch } from 'react-redux';
import { Avatar, Form, Input, message, Modal, Switch } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router';
import socket from '../../utils/soketIO';
import useTypedSelector from '../../hooks/useTypedSelector';
import { chageModalActive } from '../../store/homeReducer';
import getFirstUpLetters from '../../utils/getFirstUpLetters';
import { setAvatar, setName, setLastName, setJobStatus, setRole } from '../../store/registrationDataReducer';
import { PathRoutes, IMember } from '../../types/types';
import { addAdmin, addUsers, getAllMessages, setRoomId } from '../../store/roomDataReducer';
import { changeIssue } from '../../store/issuesReducer';

const ModalRegistation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const imageAvatar = useTypedSelector((state) => state.registrationData.user.avatarUrl);
  const { isDealer } = useTypedSelector((state) => state.lobby);
  const registrationData = useTypedSelector((state) => state.registrationData.user);
  const { roomId } = useTypedSelector((state) => state.roomData);
  const { modalActive } = useTypedSelector((state) => state.home);

  const [formGame] = Form.useForm();

  const addAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
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

  const onChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setJobStatus(e.target.value));
  };

  const onChangeRole = (checked: boolean) => {
    if (checked) {
      dispatch(setRole('observer'));
    } else {
      dispatch(setRole('player'));
    }
  };

  const onSubmitFormGame = () => {
    formGame.resetFields();
    dispatch(chageModalActive(false));
  };

  const createNewRoom = async () => {
    socket.emit('createRoom', { data: registrationData });
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
      const response = await axios.get(`https://rsschool-pp.herokuapp.com/api/${roomId}`);
      const { users, issues, messages } = response.data;
      const isDublicate = users.find((item: IMember) => item.name === registrationData.name);
      if (!isDublicate) {
        users.push(registrationData);
        dispatch(addUsers(users));
        dispatch(changeIssue(issues));
        dispatch(getAllMessages(messages));
        socket.emit('enterRoom', { user: registrationData, roomId });
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

  const handlerOk = () => {
    if (registrationData.name.length) {
      onSubmitFormGame();
      if (isDealer) {
        createNewRoom();
      } else {
        enterRoom();
      }
    } else {
      message.error('The input is not valid First name!');
    }
  };

  const onClickCancelButton = () => {
    formGame.resetFields();
    dispatch(chageModalActive(false));
  };

  const handlerCancel = () => onClickCancelButton();

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
        <Form form={formGame} layout="vertical" scrollToFirstError>
          {isDealer ? null : (
            <Form.Item
              name="observer"
              valuePropName="checked"
              label={`Connect as ${registrationData.role}`}
              initialValue={false}
            >
              <Switch onChange={onChangeRole} />
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
            <Input placeholder="Software Engineer" onChange={onChangePosition} />
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
