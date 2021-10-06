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

describe('Issues reducer', () => {
  it('should increment issueList length after adding new issue', () => {
    const action = addIssue('NewTask1');
    const newState = issuesReducer(state, action);
    expect(newState.issueList.length).toBe(2);
  });

  it('should decrement issueList length after deleteting issue', () => {
    const action = removeIssue('NewTask1');
    const newState = issuesReducer(state, action);
    expect(newState.issueList.length).toBe(0);
  });

  it('should change taskName after editing issue taskName', () => {
    const action = editIssue({ oldTaskName: 'NewTask1', newTaskName: 'NewTask2' });
    const newState = issuesReducer(state, action);
    expect(newState.issueList[0].taskName).toBe('NewTask2');
  });

  it('should be isActive truthy after call setActiveIssue issue', () => {
    const action = setActiveIssue('NewTask1');
    const newState = issuesReducer(state, action);
    expect(newState.issueList[0].isActive).toBeTruthy();
  });

  it('should be changed on new IssueList after call changeIssue issueList', () => {
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

  it('should be changed on new grade after add new grades issueList with this taskName', () => {
    const action = addGrades({ taskName: 'NewTask1', newGrade: { name: 'test1', grade: null } });
    const newState = issuesReducer(state, action);
    expect(newState.issueList[0].taskName).toBe('NewTask1');
    expect(newState.issueList[0].grades[0].grade).toBeNull();
  });

  it('should be changed on empty grades after edit grades issueList with this taskName', () => {
    const action = editGrades({ taskName: 'NewTask1', newGrade: [] });
    const newState = issuesReducer(state, action);
    expect(newState.issueList[0].grades).toStrictEqual([]);
  });
});
