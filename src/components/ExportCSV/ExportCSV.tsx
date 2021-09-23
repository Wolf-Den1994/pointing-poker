import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { Button, message } from 'antd';

const headers = [
  { label: 'Card', key: 'card' },
  { label: 'Average Grade', key: 'averageGrade' },
];

const fileExtension = '.csv';

interface IExportCSVProps {
  /* eslint-disable @typescript-eslint/ban-types */
  csvData: object[];
  filename: string;
}

const ExportCSV: React.FC<IExportCSVProps> = ({ csvData, filename }: IExportCSVProps) => {
  const handleDownloadCSV = () => message.info(`The download of the CSV file has started!`);

  return (
    <CSVLink data={csvData} headers={headers} filename={filename + fileExtension} onClick={handleDownloadCSV}>
      <Button type="primary">
        <DownloadOutlined />
        <span>CSV</span>
      </Button>
    </CSVLink>
  );
};

export default ExportCSV;
