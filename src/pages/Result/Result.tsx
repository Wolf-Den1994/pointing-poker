import ExportFile from '../../components/ExportFile/ExportFile';
import style from './Result.module.scss';

const Result: React.FC = () => {
  return (
    <div className={style.result}>
      <ExportFile />
    </div>
  );
};

export default Result;
