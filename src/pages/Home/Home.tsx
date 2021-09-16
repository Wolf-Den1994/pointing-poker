import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, message } from 'antd';
import socket from '../../utils/soketIO';
import useTypedSelector from '../../hooks/useTypedSelector';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import style from './Home.module.scss';
import ModalRegistration from '../../components/ModalRegistration/ModalRegistration';
import { changeDealer } from '../../store/lobbyReducer';
import { setRoomId } from '../../store/roomDataReducer';
import { setId, setRole } from '../../store/userReducer';
import { SocketTokens } from '../../types/types';
import { on, connect } from '../../services/socket';
import { getResourse } from '../../services/api';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { roomId } = useTypedSelector((state) => state.roomData);

  const [modalActive, setModalActive] = useState(false);

  const handleStartNewGame = () => {
    dispatch(setId(socket.id));
    dispatch(setRole('admin'));
    dispatch(changeDealer(true));
    setModalActive(true);
  };

  const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRoomId(e.target.value));
  };

  const handleConnectToGame = async () => {
    try {
      const response = await getResourse(roomId);
      if (response.data) {
        dispatch(setId(socket.id));
        dispatch(changeDealer(false));
        setModalActive(true);
      } else {
        message.error('Such room doesnt exist, try again!');
      }
    } catch (err) {
      message.error(`Something is going wrong, try again! ${err}`);
    }
  };

  useEffect(() => {
    on(SocketTokens.Disconnect, () => {
      window.location.reload();
      connect();
    });
  });

  return (
    <>
      <div className={style.wrapper}>
        <img className={style.image} src={imagePokerPlanning} alt="poker-planning" />
        <div className={style.row}>
          <h1 className={style.title}>Start your planning:</h1>
          <div className={style.box}>
            <p className={style.session}>Create a session: </p>
            <Button type="primary" size="large" onClick={handleStartNewGame}>
              Start new game
            </Button>
          </div>
        </div>

        <div className={style.row}>
          <div className={`${style.box} ${style.box_lobby}`}>
            <p className={style.session}>
              Connect to lobby by <span>ID:</span>
            </p>
            <div className={style.connect}>
              <Input size="large" type="text" placeholder="ID" value={roomId} onChange={handleChangeLink} />
              <Button type="primary" size="large" onClick={handleConnectToGame}>
                Connect
              </Button>
            </div>
            <p>
              Enter <span className={style.span}>ID</span> to join the lobby.
            </p>
          </div>
        </div>
      </div>
      <ModalRegistration modalActive={modalActive} onModalActive={setModalActive} />
    </>
  );
};

export default Home;
