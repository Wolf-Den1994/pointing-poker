import { addUserRequest, deleteUserRequest, requestsForEnterReducer } from '../requestsForEnterReducer';

const state = {
  requestsFromUsers: [],
};

it('after adding new user length of requestsFromUsers should be incremented', () => {
  const action = addUserRequest('NewTask1');
  const newState = requestsForEnterReducer(state, action);
  expect(newState.requestsFromUsers.length).toBe(1);
});

it('after deleteting user length of requestsFromUsers should be decrement', () => {
  const newStateReqFromUsers = {
    requestsFromUsers: ['user1'],
  };
  const action = deleteUserRequest('user1');
  const newState = requestsForEnterReducer(newStateReqFromUsers, action);
  expect(newState.requestsFromUsers.length).toBe(0);
});
