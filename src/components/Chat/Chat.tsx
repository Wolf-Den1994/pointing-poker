import { Input, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { addMessage } from '../../store/roomDataReducer';
import { writeMessage } from '../../store/userTypingReducer';
import socket from '../../utils/soketIO';
import style from './Chat.module.scss';

let timeout: NodeJS.Timeout;

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const userMessage = useTypedSelector((state) => state.userTyping);
  const roomData = useTypedSelector((state) => state.roomData);
  const { user } = useTypedSelector((state) => state.registrationData);

  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(writeMessage(e.target.value));
    socket.emit('someOneWriteMessage', {
      user: user.name,
      write: true,
      roomId: roomData.roomId,
    });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      socket.emit('someOneWriteMessage', {
        user: '',
        write: false,
        roomId: roomData.roomId,
      });
    }, 2000);
  };

  const sendMessage = () => {
    const { message } = userMessage;
    socket.emit('getMessage', {
      roomId: roomData.roomId,
      user: user.name,
      mess: message,
    });
    dispatch(addMessage({ name: user.name, message }));
    dispatch(writeMessage(''));
  };

  return (
    <div className={style.chat}>
      <p className={style.title}>Chat</p>
      <div className={style.messageContainer}>
        <div className={style.messagies}>
          {roomData.messages.map((item) => (
            <p key={uuidv4()} className={style.message}>
              <span className={style.messageUser}>{item.name}: </span>
              <span className={style.messageText}>{item.message}</span>
            </p>
          ))}
        </div>
        {userMessage.showWriter ? (
          <span className={style.typingMessage}>{`${userMessage.writer} is typing a message ...`}</span>
        ) : (
          ''
        )}
      </div>
      <div className={style.setOfFields}>
        <Input className={style.input} placeholder="Enter Message" value={userMessage.message} onChange={onTyping} />
        <Button type="primary" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
