import { message } from 'antd';

const getMessageUserDisconnect = (id: string) => message.info(`User with this id: ${id}, disconnected`);

export default getMessageUserDisconnect;
