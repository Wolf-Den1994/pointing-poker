import axios from 'axios';
import { BASE_URL } from '../../types/types';
import { getResourse } from '../api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getResource api', () => {
  const roomId = '7f9bed2a-90fd-469a-83e4-3713261125c1';

  it('should successfully received data from an API', async () => {
    const data = {
      roomId: '',
      gameRoom: '',
      admin: {
        id: '',
        name: '',
        lastName: '',
        position: '',
        role: '',
        avatarUrl: '',
      },
      users: [
        {
          id: '',
          name: '',
          lastName: '',
          position: '',
          role: '',
          avatarUrl: '',
        },
      ],
      messages: [
        {
          name: '',
          message: '',
        },
      ],
      issues: [
        {
          taskName: '',
          grades: [
            {
              name: '',
              grade: '',
            },
          ],
          isActive: false,
        },
      ],
      voting: { id: '', voices: 0, votedUsers: 0 },
      settings: {
        isDealerActive: false,
        voteAfterRoundEnd: false,
        autoFlipCards: false,
        autoFlipCardsAllVoted: false,
        autoAdmitMembers: false,
        showTimer: false,
        scoreType: '',
        roundTime: 1,
      },
      cardSet: [
        {
          card: '',
          isActive: false,
        },
      ],
      statistics: [
        {
          taskName: '',
          total: null,
          statisticValues: [
            {
              card: '',
              averageValue: '',
            },
          ],
        },
      ],
    };

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getResourse(roomId)).resolves.toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/api/${roomId}`);
  });

  it('should successful received error message from an API', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getResourse(roomId)).rejects.toThrow(errorMessage);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/api/${roomId}`);
  });
});
