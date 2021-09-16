import { Button } from 'antd';
import { PlayCircleOutlined, UndoOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { startTime } from '../../store/timerReducer';
import transformationTimer from '../../utils/transformationTimer';
import style from './Timer.module.scss';
import { SocketTokens } from '../../types/types';
import { emit } from '../../services/socket';

let interval: NodeJS.Timeout;

const Timer: React.FC = () => {
  const [disableButton, setDisableButton] = useState(false);

  const dispatch = useDispatch();

  const { isDealer } = useTypedSelector((state) => state.lobby);
  const timer = useTypedSelector((state) => state.timer);
  const { settings } = useTypedSelector((state) => state.settings);

  const { roomId } = useParams<{ roomId: string }>();

  let newTime: number;

  if (settings.roundTime) {
    newTime = Number(settings.roundTime.seconds()) + Number(settings.roundTime.minutes()) * 60;
  } else {
    newTime = 140;
  }

  const handleStartTimer = () => {
    setDisableButton(true);
    interval = setInterval(() => {
      dispatch(startTime((newTime -= 1)));
      emit(SocketTokens.SetTimeOnTimer, { time: newTime, roomId });
      if (newTime <= 0) {
        dispatch(startTime(0));
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleResetTimer = () => {
    emit(SocketTokens.SetTimeOnTimer, { time: newTime, roomId });
    setDisableButton(false);
    clearInterval(interval);
    dispatch(startTime(newTime));
  };

  return (
    <div className={style.timer}>
      <div className={style.title}>Time</div>
      <p className={style.time}>
        {`${transformationTimer(timer.time).minutes}:${transformationTimer(timer.time).seconds}`}
      </p>
      {isDealer ? (
        <div className={style.btns}>
          <Button disabled={disableButton} onClick={handleStartTimer}>
            <PlayCircleOutlined />
          </Button>
          <Button onClick={handleResetTimer}>
            <UndoOutlined />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Timer;
