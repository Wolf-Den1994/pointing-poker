import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

interface IExportXLSXProps {
  xlsxData: unknown[];
  file: string;
}

const ExportXLSX: React.FC<IExportXLSXProps> = ({ xlsxData, file }: IExportXLSXProps) => {
  const exportToXLSX = (work: unknown[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(work);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button type="primary" onClick={() => exportToXLSX(xlsxData, file)}>
      <DownloadOutlined /> <span>Download</span>
    </Button>
  );
};

export default ExportXLSX;
