import style from './Result.module.scss';
import IssueCard from '../../components/IssueCard/IssueCard';
import useTypedSelector from '../../hooks/useTypedSelector';
import ExportFile from '../../components/ExportFile/ExportFile';

const Result: React.FC = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const SHOW_ELEMENTS = 5;
  const createElementsPlanning = () => {
    const elements = [];
    for (let i = 0; i < statistics.length; i += 1) {
      const { taskName } = statistics[i];
      if (i < SHOW_ELEMENTS) {
        if (i === statistics.length - 1) {
          elements.push(<span key={taskName}>{taskName}</span>);
        } else {
          elements.push(<span key={taskName}>{taskName}, </span>);
        }
      } else {
        elements.push(<span key={taskName}>...</span>);
        break;
      }
    }
    return elements;
  };
  return (
    <>
      <div className={style.wrapper}>
        <p className={style.tasks}>
          Spring {statistics.length} planning ({createElementsPlanning()})
        </p>
        <ExportFile />
        {statistics.map((elem) => {
          return <IssueCard key={elem.taskName} data={elem} />;
        })}
      </div>
    </>
  );
};

export default Result;
