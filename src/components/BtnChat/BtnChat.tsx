import { MessageFilled, SmileFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { setVisibleChat } from '../../store/settingsReducer';
import Chat from '../Chat/Chat';
import style from './BtnChat.module.scss';

const BtnChat: React.FC = () => {
  const dispatch = useDispatch();

  const visibleChat = useTypedSelector((state) => state.settings.visibleChat);

  const handleVisibleChat = () => dispatch(setVisibleChat(!visibleChat));

  return (
    <>
      <div className={style.wrapperChat}>
        {visibleChat ? <Chat /> : null}
        <Button type="primary" className={style.chatBtn} shape="circle" onClick={handleVisibleChat}>
          {visibleChat ? (
            <SmileFilled style={{ fontSize: '42px', color: '#fff' }} />
          ) : (
            <MessageFilled style={{ fontSize: '42px', color: '#fff' }} />
          )}
        </Button>
      </div>
    </>
  );
};

export default BtnChat;
