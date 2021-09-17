/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import socket from '../utils/soketIO';

export const on = (token: string, listener: (...args: any[]) => void): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.on(token, listener);

export const emit = (token: string, ...args: any[]): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.emit(token, ...args);

export const once = (token: string, listener: (...args: any[]) => void): Socket<DefaultEventsMap, DefaultEventsMap> =>
  socket.once(token, listener);

export const connect = (): Socket<DefaultEventsMap, DefaultEventsMap> => socket.connect();
