import React, { FC } from 'react';
import { Form, Input, Button, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import style from './LinkToLobby.module.scss';

interface ILinkToLobbyProps {
  value: string;
  standing: boolean;
}

const LinkToLobby: FC<ILinkToLobbyProps> = ({ value, standing }) => {
  const [form] = Form.useForm();

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
    <div className={style.linkToLobby}>
      {standing ? (
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
                <Input size={'large'} placeholder="Link" readOnly value={value} className={style.input} />
              </Form.Item>
              <Form.Item>
                <CopyToClipboard text={value} onCopy={() => {}}>
                  <Button size={'large'} type="primary" htmlType="submit" className={style.button}>
                    Copy
                  </Button>
                </CopyToClipboard>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LinkToLobby;
