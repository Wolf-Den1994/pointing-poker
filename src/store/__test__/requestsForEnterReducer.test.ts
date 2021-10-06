import { addUserRequest, deleteUserRequest, requestsForEnterReducer } from '../requestsForEnterReducer';

const state = {
  requestsFromUsers: [],
};

describe('RequestsForEnter reducer', () => {
  it('should increment requestsFromUsers length after adding new user', () => {
    const action = addUserRequest('NewTask1');
    const newState = requestsForEnterReducer(state, action);
    expect(newState.requestsFromUsers.length).toBe(1);
  });

  it('should decrement requestsFromUsers length after deleteting user', () => {
    const newStateReqFromUsers = {
      requestsFromUsers: ['user1'],
    };
    const action = deleteUserRequest('user1');
    const newState = requestsForEnterReducer(newStateReqFromUsers, action);
    expect(newState.requestsFromUsers.length).toBe(0);
  });
});
