import React, { FC } from 'react';
import { Input, Button, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import style from './LinkToLobby.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

const LinkToLobby: FC = () => {
  const { link } = useTypedSelector((state) => state.lobby);

  const copyLink = () => {
    message.success('Link successfully copied to clipboard!');
  };

  return (
    <div className={style.linkToLobby}>
      <div className={style.wrapper}>
        <p className={style.title}>Link to lobby:</p>
        <div className={style.setOfFields}>
          <Input size="large" placeholder="Link" readOnly value={link} className={style.input} />
          <CopyToClipboard text={link} onCopy={copyLink}>
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
