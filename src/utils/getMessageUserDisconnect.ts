import { message } from 'antd';
import { MessageType } from 'antd/lib/message';

const getMessageUserDisconnect = (id: string): MessageType => message.info(`User with this id: ${id}, disconnected`);

export default getMessageUserDisconnect;
