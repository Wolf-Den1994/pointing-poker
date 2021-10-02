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
    statistics.forEach((el) => {
      el.statisticValues.forEach((elem) => {
        result.push({ issue: el.taskName, card: elem.card, averageValue: elem.averageValue, total: el.total });
      });
    });
    return result;
  };

  console.log(resultArrs());

  return (
    <div className={style.exportFile}>
      <span className={style.format}>Download the result of the game in format:</span>
      <ExportXLSX xlsxData={resultArrs()} file={filename} />
      <ExportCSV csvData={resultArrs()} filename={filename} />
    </div>
  );
};

export default ExportFile;
