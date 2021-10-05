import {
  addGrades,
  addIssue,
  changeIssue,
  editGrades,
  editIssue,
  issuesReducer,
  removeIssue,
  setActiveIssue,
} from '../issuesReducer';

const state = {
  issueList: [
    {
      taskName: 'NewTask1',
      grades: [
        {
          name: 'test1',
          grade: '0',
        },
      ],
      isActive: false,
    },
  ],
};

it('after adding new issue length of issueList should be incremented', () => {
  const action = addIssue('NewTask1');
  const newState = issuesReducer(state, action);
  expect(newState.issueList.length).toBe(2);
});

it('after deleteting issue length of issueList should be decrement', () => {
  const action = removeIssue('NewTask1');
  const newState = issuesReducer(state, action);
  expect(newState.issueList.length).toBe(0);
});

it('after editing taskName should be changed', () => {
  const action = editIssue({ oldTaskName: 'NewTask1', newTaskName: 'NewTask2' });
  const newState = issuesReducer(state, action);
  expect(newState.issueList[0].taskName).toBe('NewTask2');
});

it('after setActiveIssue issue should be isActive truthy', () => {
  const action = setActiveIssue('NewTask1');
  const newState = issuesReducer(state, action);
  expect(newState.issueList[0].isActive).toBeTruthy();
});

it('after changeIssue issueList should be changed on new IssueList', () => {
  const newIssueList = [
    {
      taskName: 'newIssue',
      grades: [
        {
          name: 'new',
          grade: '2',
        },
      ],
      isActive: true,
    },
  ];
  const action = changeIssue(newIssueList);
  const newState = issuesReducer(state, action);
  expect(newState.issueList.length).toBe(1);
  expect(newState.issueList[0].taskName).toBe('newIssue');
  expect(newState.issueList[0].isActive).toBeTruthy();
  expect(newState.issueList[0].grades[0].name).toBe('new');
  expect(newState.issueList[0].grades[0].grade).toBe('2');
});

it('after add new grades issueList with this taskName should be changed on new grade', () => {
  const action = addGrades({ taskName: 'NewTask1', newGrade: { name: 'test1', grade: null } });
  const newState = issuesReducer(state, action);
  expect(newState.issueList[0].taskName).toBe('NewTask1');
  expect(newState.issueList[0].grades[0].grade).toBeNull();
});

it('after edit grades issueList with this taskName should be changed on empty grades', () => {
  const action = editGrades({ taskName: 'NewTask1', newGrade: [] });
  const newState = issuesReducer(state, action);
  expect(newState.issueList[0].grades).toStrictEqual([]);
});
