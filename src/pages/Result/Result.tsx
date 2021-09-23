import ExportFile from '../../components/ExportFile/ExportFile';
import style from './Result.module.scss';

const Result: React.FC = () => {
  return (
    <div className={style.result}>
      <div>Result Game</div>
      <ExportFile />
    </div>
  );
};

export default Result;
