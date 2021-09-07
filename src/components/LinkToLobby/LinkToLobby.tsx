import React, { FC } from 'react';
import { Form, Input, Button, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import style from './LinkToLobby.module.scss';

interface ILinkToLobbyProps {
  value: string;
  isDealer: boolean;
}

const LinkToLobby: FC<ILinkToLobbyProps> = ({ value, isDealer }) => {
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
      {isDealer ? (
        <div className={style.wrapper}>
          <p className={style.title}>Link to lobby:</p>
          <div className={style.setOfFields}>
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
