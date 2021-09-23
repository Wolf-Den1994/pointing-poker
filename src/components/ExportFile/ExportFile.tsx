import { message, Select } from 'antd';
import { useState } from 'react';
import ExportCSV from '../ExportCSV/ExportCSV';
import ExportXLSX from '../ExportXLSX/ExportXLSX';
import useTypedSelector from '../../hooks/useTypedSelector';
import style from './ExportFile.module.scss';

const { Option } = Select;

const filename = 'result-game-pointing-poker';

const ExportFile: React.FC = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);
  const [downloadExtension, setDownloadExtension] = useState('xlsx');

  const handleChangeDownloadExtension = (value: string) => setDownloadExtension(value);

  const handleExportFile = () => message.info(`The download of the ${downloadExtension} file has started!`);

  return (
    <div className={style.exportFile}>
      <span>Download the result of the game in format:</span>
      <Select defaultValue={downloadExtension} style={{ width: 70 }} onChange={handleChangeDownloadExtension}>
        <Option value="xlsx">xlsx</Option>
        <Option value="csv">csv</Option>
      </Select>
      <span onClick={handleExportFile}>
        {downloadExtension === 'xlsx' ? (
          <ExportXLSX xlsxData={statistics} file={filename} />
        ) : (
          <ExportCSV scvData={statistics} filename={filename} />
        )}
      </span>
    </div>
  );
};

export default ExportFile;
