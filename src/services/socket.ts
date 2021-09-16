import socket from '../utils/soketIO';

export const io = (method: string, token: string, params: any) => {
  switch (method) {
    case 'on':
      socket.on(token, params);
      break;

    default:
      break;
  }
};
