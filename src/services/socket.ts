/* eslint-disable @typescript-eslint/no-explicit-any */
import { Manager, Socket } from 'socket.io-client';
import { SocketTokens } from '../types/types';
import socket from '../utils/soketIO';

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export const on = (token: string, listener: (...args: any[]) => void): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.on(token, listener);

export const emit = (token: string, ...args: any[]): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.emit(token, ...args);

export const once = (token: string, listener: (...args: any[]) => void): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.once(token, listener);

export const ioOn = (
  token: SocketTokens.ReconnectError,
  listener: (...args: any[]) => void | Promise<void>,
): Manager<DefaultEventsMap, DefaultEventsMap> => socket.io.on(token, listener);

export const connect = (): Socket<DefaultEventsMap, DefaultEventsMap> => socket.connect();
