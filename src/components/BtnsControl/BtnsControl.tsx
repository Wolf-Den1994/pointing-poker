import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { emit } from '../../services/socket';
import { changeGameStatus } from '../../store/roomDataReducer';
import { PathRoutes, SocketTokens } from '../../types/types';
import socket from '../../utils/soketIO';
import style from './BtnsControl.module.scss';

interface IBtnsControlProps {
  children: React.ReactNode;
}

const BtnsControl: React.FC<IBtnsControlProps> = ({ children }: IBtnsControlProps) => {
  const { isDealer } = useTypedSelector((state) => state.roomData);
  const userName = useTypedSelector((state) => state.userData.name);

  const history = useHistory();
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const handleExitGame = () => {
    dispatch(changeGameStatus(false));
    emit(SocketTokens.LeaveRoom, { roomId, user: userName, id: socket.id });
    history.push(PathRoutes.Home);
  };

  return (
    <div className={style.btnsControl}>
      {isDealer ? (
        <div className={style.control}>{children}</div>
      ) : (
        <div className={style.exit}>
          <Button type="ghost" size="large" onClick={handleExitGame}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default BtnsControl;
