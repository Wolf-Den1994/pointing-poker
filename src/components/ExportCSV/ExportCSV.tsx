import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { Button } from 'antd';

const headers = [
  { label: 'Card', key: 'card' },
  { label: 'Average Grade', key: 'averageGrade' },
];
const fileExtension = '.csv';

interface IExportCSVProps {
  /* eslint-disable @typescript-eslint/ban-types */
  scvData: object[];
  filename: string;
}

const ExportCSV: React.FC<IExportCSVProps> = ({ scvData, filename }: IExportCSVProps) => {
  return (
    <CSVLink data={scvData} headers={headers} filename={filename + fileExtension}>
      <Button type="primary">
        <DownloadOutlined />
        <span>Download</span>
      </Button>
    </CSVLink>
  );
};

export default ExportCSV;
