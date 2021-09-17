import { Input, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { addMessage } from '../../store/roomDataReducer';
import { writeMessage } from '../../store/userTypingReducer';
import style from './Chat.module.scss';
import { KeyboardKeys, SocketTokens, TextForUser } from '../../types/types';
import { on, emit } from '../../services/socket';

let timeout: NodeJS.Timeout;

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const userMessage = useTypedSelector((state) => state.userTyping);
  const { messages } = useTypedSelector((state) => state.roomData);
  const user = useTypedSelector((state) => state.userData);

  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    on(SocketTokens.SendMessage, (data) => {
      dispatch(addMessage(data));
    });
  }, []);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(writeMessage(e.target.value));
    emit(SocketTokens.SomeOneWriteMessage, {
      user: user.name,
      write: true,
      roomId,
    });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      emit(SocketTokens.SomeOneWriteMessage, {
        user: '',
        write: false,
        roomId,
      });
    }, 2000);
  };

  const handleSendMessage = () => {
    const { message } = userMessage;
    emit(SocketTokens.GetMessage, {
      roomId,
      user: user.name,
      mess: message,
    });
    dispatch(addMessage({ name: user.name, message }));
    dispatch(writeMessage(''));
  };

  const handleSendMessageOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyboardKeys.Enter) handleSendMessage();
  };

  return (
    <div className={style.chat}>
      <p className={style.title}>Chat</p>
      <div className={style.messageContainer}>
        <div className={style.messagies}>
          {messages.map((item) => (
            <p key={uuidv4()} className={style.message}>
              <span className={style.messageUser}>{item.name}: </span>
              <span className={style.messageText}>{item.message}</span>
            </p>
          ))}
        </div>
        {userMessage.showWriter ? (
          <span className={style.typingMessage}>{`${userMessage.writer} ${TextForUser.IsTyping}`}</span>
        ) : (
          ''
        )}
      </div>
      <div className={style.setOfFields}>
        <Input
          className={style.input}
          placeholder="Enter Message"
          value={userMessage.message}
          onChange={handleTyping}
          onKeyPress={handleSendMessageOnEnter}
        />
        <Button type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
