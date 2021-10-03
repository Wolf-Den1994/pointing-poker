import { message } from 'antd';
import CSVReader, { IFileInfo } from 'react-csv-reader';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emit } from '../../services/socket';
import { changeIssue } from '../../store/issuesReducer';
import { IDataFile, IssuesListMode, SocketTokens, TextForUser } from '../../types/types';
import { getExtension } from '../../utils/getExtension';
import Error from './Error';
import style from './ImportFile.module.scss';

const duration = 3.5;
const headerFile = 'issues';
const extension = 'csv';
let areIssuesInHeader: boolean;

const ImportFile: React.FC = () => {
  const dispatch = useDispatch();

  const { roomId } = useParams<{ roomId: string }>();

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, '_'),
  };

  const handleForce = (data: IDataFile[], fileInfo: IFileInfo) => {
    if (getExtension(fileInfo.name) === extension) {
      data.forEach((value) => {
        if (Object.keys(value).includes(headerFile)) {
          areIssuesInHeader = true;
        } else {
          areIssuesInHeader = false;
        }
      });

      if (areIssuesInHeader) {
        const tasks = data.map((item) => item.issues);
        const isDuplicate = tasks.some((task, index) => tasks.indexOf(task) !== index);

        if (isDuplicate) {
          message.warning(TextForUser.AboutDublicateInFile);
        } else {
          const taskNamesArray = data.map((value) => ({ taskName: `${value.issues}`, grades: [], isActive: false }));
          emit(SocketTokens.ChangeIssuesList, {
            newIssue: taskNamesArray,
            mode: IssuesListMode.All,
            roomId,
          });
          dispatch(changeIssue(taskNamesArray));
        }
      } else {
        message.error(<Error />, duration);
      }
    } else {
      message.error(TextForUser.WrongFileCSV);
    }
  };

  return (
    <div className={style.container}>
      <CSVReader
        cssClass={style.reactCsvInput}
        label="Click to upload CSV file here:"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
    </div>
  );
};

export default ImportFile;
