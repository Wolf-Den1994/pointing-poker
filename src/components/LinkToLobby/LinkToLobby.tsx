import { Input, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import style from './LinkToLobby.module.scss';

const LinkToLobby: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const handleCopyLink = () => {
    message.success('ID successfully copied to clipboard!');
  };

  return (
    <div className={style.linkToLobby}>
      <div className={style.wrapper}>
        <p className={style.title}>ID to lobby:</p>
        <div className={style.setOfFields}>
          <Input size="large" placeholder="ID" readOnly value={roomId} className={style.input} />
          <CopyToClipboard text={roomId} onCopy={handleCopyLink}>
            <Button size="large" type="primary" htmlType="submit" className={style.button}>
              Copy
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default LinkToLobby;
