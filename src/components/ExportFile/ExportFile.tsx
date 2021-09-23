import ExportCSV from '../ExportCSV/ExportCSV';
import ExportXLSX from '../ExportXLSX/ExportXLSX';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './ExportFile.module.scss';

const filename = 'result-game-pointing-poker';

const ExportFile: React.FC = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  return (
    <div className={style.exportFile}>
      <span>Download the result of the game in format:</span>
      <ExportXLSX xlsxData={statistics} file={filename} />
      <ExportCSV csvData={statistics} filename={filename} />
    </div>
  );
};

export default ExportFile;
