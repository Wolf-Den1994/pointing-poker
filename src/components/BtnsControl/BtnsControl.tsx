import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { deleteRoom } from '../../services/api';
import { emit } from '../../services/socket';
import { changeGameStatus, clearRoomData } from '../../store/roomDataReducer';
import { PathRoutes, SocketTokens } from '../../types/types';
import socket from '../../utils/soketIO';
import style from './BtnsControl.module.scss';

const BtnsControl: React.FC = () => {
  const { isDealer, isGame } = useTypedSelector((state) => state.roomData);
  const userName = useTypedSelector((state) => state.userData.name);

  const history = useHistory();
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const handlerStopGame = () => {
    dispatch(changeGameStatus(false));
  };

  const handleStartGame = () => {
    dispatch(changeGameStatus(true));
    history.push(`${PathRoutes.Game}/${roomId}`);
  };

  const handleCancelGame = async () => {
    try {
      await deleteRoom({ data: { id: roomId } });
      emit(SocketTokens.DisconnectAll, { roomId });
      dispatch(clearRoomData());
      history.push(PathRoutes.Home);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  const handleExitGame = () => {
    dispatch(changeGameStatus(false));
    emit(SocketTokens.LeaveRoom, { roomId, user: userName, id: socket.id });
    history.push(PathRoutes.Home);
  };

  return (
    <div className={style.btnsControl}>
      {isDealer ? (
        <div className={style.control}>
          {isGame ? (
            <Button type="primary" size="large" className={`${style.button} ${style.white}`} onClick={handlerStopGame}>
              Stop Game
            </Button>
          ) : (
            <>
              <Button type="primary" size="large" className={style.button} onClick={handleStartGame}>
                Start Game
              </Button>
              <Button type="ghost" size="large" className={style.button} onClick={handleCancelGame}>
                Cancel game
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className={style.exit}>
          <Button type="ghost" size="large" className={style.button} onClick={handleExitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsControl;
