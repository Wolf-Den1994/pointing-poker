import { Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { SavedIssuesList } from '../../types/types';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const fileExtension = '.xlsx';

interface IExportXLSXProps {
  xlsxData: SavedIssuesList[];
  file: string;
}

const ExportXLSX: React.FC<IExportXLSXProps> = ({ xlsxData, file }: IExportXLSXProps) => {
  const exportToXLSX = (work: SavedIssuesList[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(work);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
    message.info(`The download of the XLSX file has started!`);
  };

  return (
    <Button type="primary" onClick={() => exportToXLSX(xlsxData, file)}>
      <DownloadOutlined /> <span>XLSX</span>
    </Button>
  );
};

export default ExportXLSX;
