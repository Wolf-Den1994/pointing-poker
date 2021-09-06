import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import style from './LinkToLobby.module.scss';

interface ILinkToLobbyProps {
  value: string;
}

const LinkToLobby: FC<ILinkToLobbyProps> = ({ value }) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const startGame = () => {
    const path = `game`;
    history.push(path);
  };

  const cancelGame = () => {
    const path = `/`;
    history.push(path);
  };

  const copyLink = () => {
    message.success('Link successfully copied to clipboard!');
  };

  const onFill = () => {
    form.setFieldsValue({
      link: value,
    });
  };
  onFill();

  return (
    <>
      <div className={style.linkToLobby}>
        <div className={style.wrapper}>
          <p className={style.title}>Link to lobby:</p>
          <div className={style.link}>
            <Form
              form={form}
              name="basic"
              style={{ display: 'flex', alignItems: 'center' }}
              onFinish={copyLink}
              autoComplete="off"
            >
              <Form.Item name="link">
                <Input placeholder="Link" readOnly value={value} className={style.input} />
              </Form.Item>
              <Form.Item>
                <CopyToClipboard text={value} onCopy={() => {}}>
                  <Button type="primary" htmlType="submit" className={style.button}>
                    Copy
                  </Button>
                </CopyToClipboard>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className={style.control}>
          <Button type="primary" className={style.button} onClick={startGame}>
            Start Game
          </Button>
          <Button type="primary" className={`${style.button} ${style.white}`} onClick={cancelGame}>
            Cancel game
          </Button>
        </div>
      </div>
    </>
  );
};

export default LinkToLobby;
