import { Button, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { clearRoomData } from '../../store/roomDataReducer';
import { PathRoutes } from '../../types/types';
import socket from '../../utils/soketIO';
import style from './BtnsLobby.module.scss';

const BtnsLobby: React.FC = () => {
  const { isDealer } = useTypedSelector((state) => state.lobby);
  const roomData = useTypedSelector((state) => state.roomData);

  const history = useHistory();
  const dispatch = useDispatch();

  const startGame = () => {
    history.push(PathRoutes.Game);
  };

  const cancelGame = async () => {
    try {
      await axios.delete('https://rsschool-pp.herokuapp.com/api/', { data: { id: roomData.roomId } });
      socket.emit('disconnectAll', { roomId: roomData.roomId });
      dispatch(clearRoomData());
      history.push(PathRoutes.Home);
    } catch (err) {
      message.error(err as string);
    }
  };

  const exitGame = () => {
    socket.emit('leaveRoom', { roomId: roomData.roomId, id: socket.id });
    history.push(PathRoutes.Home);
  };

  return (
    <div className={style.btnsLobby}>
      {isDealer ? (
        <div className={style.control}>
          <Button type="primary" size="large" className={style.button} onClick={startGame}>
            Start Game
          </Button>
          <Button size="large" className={`${style.button} ${style.white}`} onClick={cancelGame}>
            Cancel game
          </Button>
        </div>
      ) : (
        <div className={style.exit}>
          <Button size="large" className={`${style.button} ${style.white}`} onClick={exitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsLobby;
