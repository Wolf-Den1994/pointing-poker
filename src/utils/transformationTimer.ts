interface ITimer {
  minutes: string;
  seconds: string;
}

const transformationTimer = (time: number): ITimer => {
  const secondsInOneMinute = 60;
  const minutes = `0${Math.floor(time / secondsInOneMinute)}`.slice(-2);
  const seconds = `0${Math.floor(time % secondsInOneMinute)}`.slice(-2);
  return { minutes, seconds };
};

export default transformationTimer;
