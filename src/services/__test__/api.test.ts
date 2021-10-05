import axios from 'axios';
import { BASE_URL } from '../../types/types';
import { getResourse } from '../api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getResource', () => {
  const roomId = '7f9bed2a-90fd-469a-83e4-3713261125c1';

  it('getResourse successfully data from an API', async () => {
    const data = {
      roomId: '',
      gameRoom: '',
      admin: {
        id: 'string',
        name: 'string',
        lastName: 'string',
        position: 'string',
        role: 'string',
        avatarUrl: 'string',
      },
      users: [
        {
          id: 'string',
          name: 'string',
          lastName: 'string',
          position: 'string',
          role: 'string',
          avatarUrl: 'string',
        },
      ],
      messages: [
        {
          name: 'string',
          message: 'string',
        },
      ],
      issues: [
        {
          taskName: 'string',
          grades: [
            {
              name: 'string',
              grade: 'string',
            },
          ],
          isActive: true,
        },
      ],
      voting: { id: 'string', voices: 55, votedUsers: 55 },
      settings: {
        isDealerActive: true,
        voteAfterRoundEnd: true,
        autoFlipCards: true,
        autoFlipCardsAllVoted: true,
        autoAdmitMembers: true,
        showTimer: true,
        scoreType: 'string',
        roundTime: 5,
      },
      cardSet: [
        {
          card: 'string',
          isActive: true,
        },
      ],
      statistics: [
        {
          taskName: 'string',
          total: 6,
          statisticValues: [
            {
              card: 'string',
              averageValue: 'string',
            },
          ],
        },
      ],
    };

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getResourse(roomId)).resolves.toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/api/${roomId}`);
  });

  it('getResourse erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getResourse(roomId)).rejects.toThrow(errorMessage);
  });
});
