import socket from '../utils/soketIO';

export const on = (token: string, params: any) => socket.on(token, params);
