import { Button } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import { startTime } from '../../store/timerReducer';
import socket from '../../utils/soketIO';
import transformationTimer from '../../utils/transformationTimer';

let interval: NodeJS.Timeout;

const Timer: React.FC = () => {
  const [disableButton, setDisableButton] = useState(false);

  const dispatch = useDispatch();

  const { isDealer } = useTypedSelector((state) => state.lobby);
  const roomData = useTypedSelector((state) => state.roomData);
  const timer = useTypedSelector((state) => state.timer);
  const { settings } = useTypedSelector((state) => state.settings);

  const startTimer = () => {
    setDisableButton(true);
    let newTime = Number(settings.roundTime.seconds()) + Number(settings.roundTime.minutes()) * 60;
    // console.log(newTime);
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
    const defaultTime = Number(settings.roundTime.seconds()) + Number(settings.roundTime.minutes()) * 60;
    socket.emit('setTimeOnTimer', { time: defaultTime, roomId: roomData.roomId });
    setDisableButton(false);
    clearInterval(interval);
    dispatch(startTime(defaultTime));
  };

  // Пофиксить первоначальное отображение секунд
  return (
    <div>
      <div>Time</div>
      <p>{`${transformationTimer(timer.time).minutes}:${transformationTimer(timer.time).seconds}`}</p>
      {isDealer ? (
        <div>
          <Button disabled={disableButton} onClick={startTimer}>
            Start timer
          </Button>
          {/* <Button onClick={stopTimer}>Stop timer</Button> */}
          <Button onClick={resetTimer}>Reset timer</Button>
        </div>
      ) : null}
    </div>
  );
};

export default Timer;
