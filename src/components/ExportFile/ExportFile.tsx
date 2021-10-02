import ExportCSV from '../ExportCSV/ExportCSV';
import ExportXLSX from '../ExportXLSX/ExportXLSX';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './ExportFile.module.scss';
import { SavedIssuesList } from '../../types/types';

const filename = 'result-game-pointing-poker';

const ExportFile: React.FC = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const resultArrs = () => {
    const result: SavedIssuesList[] = [];
    statistics.forEach((stat) => {
      stat.statisticValues.forEach((value) => {
        result.push({ issue: stat.taskName, card: value.card, averageValue: value.averageValue, total: stat.total });
      });
    });
    return result;
  };

  return (
    <div className={style.exportFile}>
      <span className={style.format}>Download the result of the game in format:</span>
      <ExportXLSX xlsxData={resultArrs()} file={filename} />
      <ExportCSV csvData={resultArrs()} filename={filename} />
    </div>
  );
};

export default ExportFile;
