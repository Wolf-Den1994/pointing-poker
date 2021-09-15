import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import socket from '../../utils/soketIO';
import useTypedSelector from '../../hooks/useTypedSelector';
import imagePokerPlanning from '../../assets/images/poker-planning.png';
import style from './Home.module.scss';
import { chageModalActive } from '../../store/homeReducer';
import ModalRegistation from '../../components/ModalRegistration/ModalRegistation';
import { changeDealer } from '../../store/lobbyReducer';
import { setRoomId } from '../../store/roomDataReducer';
import { setId, setRole } from '../../store/registrationDataReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { roomId } = useTypedSelector((state) => state.roomData);

  const handlerStartNewGame = () => {
    dispatch(setId(socket.id));
    dispatch(setRole('admin'));
    dispatch(changeDealer(true));
    dispatch(chageModalActive(true));
  };

  const handlerChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRoomId(e.target.value));
  };

  const handlerConnectToGame = async () => {
    try {
      const response = await axios.get(`https:/https://rsschool-pp.herokuapp.com/api/${roomId}`);
      if (response.data) {
        dispatch(setId(socket.id));
        dispatch(changeDealer(false));
        dispatch(chageModalActive(true));
      } else {
        message.error('Such room doesnt exist, try again!');
      }
    } catch (err: any) {
      message.error('Something is going wrong, try again');
    }
  };

  useEffect(() => {
    socket.on('disconnect', () => {
      window.location.reload();
      socket.connect();
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
            <Button type="primary" size="large" onClick={handlerStartNewGame}>
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
              <Input size="large" type="text" placeholder="ID" value={roomId} onChange={handlerChangeLink} />
              <Button type="primary" size="large" onClick={handlerConnectToGame}>
                Connect
              </Button>
            </div>
            <p>
              Enter <span className={style.span}>ID</span> to join the lobby.
            </p>
          </div>
        </div>
      </div>
      <ModalRegistation />
    </>
  );
};

export default Home;
