import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, UndoOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { startTime } from '../../store/timerReducer';
import socket from '../../utils/soketIO';
import transformationTimer from '../../utils/transformationTimer';
import style from './Timer.module.scss';

let interval: NodeJS.Timeout;

const Timer: React.FC = () => {
  const [disableButton, setDisableButton] = useState(false);

  const dispatch = useDispatch();

  const { isDealer } = useTypedSelector((state) => state.lobby);
  const roomData = useTypedSelector((state) => state.roomData);
  const timer = useTypedSelector((state) => state.timer);
  const { settings } = useTypedSelector((state) => state.settings);
  let newTime: number;

  if (settings.roundTime) {
    newTime = Number(settings.roundTime.seconds()) + Number(settings.roundTime.minutes()) * 60;
  } else {
    newTime = 140;
  }

  const startTimer = () => {
    setDisableButton(true);
    interval = setInterval(() => {
      dispatch(startTime((newTime -= 1)));
      socket.emit('setTimeOnTimer', { time: newTime, roomId: roomData.roomId });
      if (newTime <= 0) {
        dispatch(startTime(0));
        clearInterval(interval);
      }
    }, 1000);
  };

  // const stopTimer = () => {
  //   setDisableButton(false);
  //   clearInterval(interval);
  // };

  const resetTimer = () => {
    socket.emit('setTimeOnTimer', { time: newTime, roomId: roomData.roomId });
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
          <Button disabled={disableButton} onClick={startTimer}>
            <PlayCircleOutlined />
          </Button>
          {/* <Button onClick={stopTimer}>
            <PauseCircleOutlined />
          </Button> */}
          <Button onClick={resetTimer}>
            <UndoOutlined />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Timer;
