import useTypedSelector from '../../hooks/useTypedSelector';
import transformationTimer from '../../utils/transformationTimer';
import style from './Timer.module.scss';

const Timer: React.FC = () => {
  const timer = useTypedSelector((state) => state.timer);

  return (
    <div className={style.timer}>
      <div className={style.title}>Time</div>
      <p className={style.time}>
        {`${transformationTimer(timer.time).minutes}:${transformationTimer(timer.time).seconds}`}
      </p>
    </div>
  );
};

export default Timer;
