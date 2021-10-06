import { addMessage, addUsers, changeDealer, changeObserver, roomDataReducer } from '../roomDataReducer';

const state = {
  roomId: '',
  gameRoom: 'lobby',
  admin: { id: '', name: '', lastName: '', position: '', role: 'admin', avatarUrl: '' },
  users: [],
  messages: [],
  isDealer: true,
  isObserver: false,
};

describe('RoomData reducer', () => {
  it('should increment users length and added users data after adding new user', () => {
    const user = {
      id: 'unikID123dsfijrio34sdsf',
      name: 'name1',
      lastName: 'lastName1',
      position: 'SE',
      role: 'player',
      avatarUrl: '',
    };
    const action = addUsers([user]);
    const newState = roomDataReducer(state, action);
    expect(newState.users.length).toBe(1);
    expect(newState.users[0].name).toBe('name1');
    expect(newState.users[0].role).toBe('player');
  });

  it('should increment messages length and added message data after adding new message', () => {
    const message = {
      name: 'user1',
      message: 'test',
    };
    const action = addMessage(message);
    const newState = roomDataReducer(state, action);
    expect(newState.messages.length).toBe(1);
    expect(newState.messages[0].name).toBe('user1');
    expect(newState.messages[0].message).toBe('test');
  });

  it('should be falsy dealer after change isDealer', () => {
    const action = changeDealer(false);
    const newState = roomDataReducer(state, action);
    expect(newState.isDealer).toBeFalsy();
  });

  it('should be truthy observer after change isObserver', () => {
    const action = changeObserver(true);
    const newState = roomDataReducer(state, action);
    expect(newState.isDealer).toBeTruthy();
  });
});
