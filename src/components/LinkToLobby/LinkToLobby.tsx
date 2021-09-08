import React, { FC } from 'react';
import { Form, Input, Button, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import style from './LinkToLobby.module.scss';
import useTypedSelector from '../../hooks/useTypedSelector';

const LinkToLobby: FC = () => {
  const { username } = useTypedSelector((state) => state.lobby);
  const { users } = useTypedSelector((state) => state.lobby);
  const { link } = useTypedSelector((state) => state.lobby);
  const isDealer = users[0].name === username;

  const [form] = Form.useForm();

  const copyLink = () => {
    message.success('Link successfully copied to clipboard!');
  };

  const onFill = () => {
    form.setFieldsValue({
      link,
    });
  };
  onFill();

  return (
    <div className={style.linkToLobby}>
      {isDealer ? (
        <div className={style.wrapper}>
          <p className={style.title}>Link to lobby:</p>
          <div className={style.setOfFields}>
            <Form layout="inline" size="large" form={form} name="basic" onFinish={copyLink} autoComplete="off">
              <Form.Item name="link">
                <Input placeholder="Link" readOnly value={link} className={style.input} />
              </Form.Item>
              <Form.Item>
                <CopyToClipboard text={link} onCopy={() => {}}>
                  <Button type="primary" htmlType="submit" className={style.button}>
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
