import { Space } from 'antd';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './TotalValueStatistics.module.scss';

interface ITotalValueProps {
  activeIssueTaskName: string;
  size?: string;
}

const TotalValueStatistics: React.FC<ITotalValueProps> = ({ activeIssueTaskName, size = 'big' }: ITotalValueProps) => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  const findActiveIssue = statistics.find((el) => el.taskName === activeIssueTaskName);
  const getTotalValue = findActiveIssue?.lengthAverageValue;

  return (
    <div className={style.total}>
      <Space wrap>
        <span className={style.totalTitle}>Total:</span>
        <span className={`${style.totalValue} ${style[size]}`}>{getTotalValue}</span>
      </Space>
    </div>
  );
};

export default TotalValueStatistics;
