import ApiClient from '../ApiClient';
import { loadRandomJoke, loadTenRandomJokes } from '../jokes';

// Mocking the ApiClient.request function
jest.mock('../ApiClient', () => ({
  request: jest.fn(),
  cancelRequest: jest.fn(),
}));

describe('jokes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadRandomJoke', () => {
    it('should call ApiClient.request function with correct URL', async () => {
      await loadRandomJoke();
      expect(ApiClient.request).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/jokes/random`);
    });
  });

  describe('loadTenRandomJokes', () => {
    it('should call ApiClient.request function 10 times with correct URL', async () => {
      const joke = {
        icon_url: 'http://example.com/icon',
        id: '123',
        url: 'http://example.com/joke',
        value: 'This is a joke',
      };

      // @ts-ignore
      ApiClient.request.mockResolvedValue(joke);

      loadTenRandomJokes();

      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for all requests to finish

      expect(ApiClient.request).toHaveBeenCalledTimes(10);
      expect(ApiClient.request).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/jokes/random`);
    });

    it('should return an array of joke objects with correct length', async () => {
      const joke = {
        icon_url: 'http://example.com/icon',
        id: '123',
        url: 'http://example.com/joke',
        value: 'This is a joke',
      };

      // @ts-ignore
      ApiClient.request.mockResolvedValue(joke);

      const result = await loadTenRandomJokes();

      expect(result).toHaveLength(10);
      result.forEach((j) => expect(j).toMatchObject(joke));
    });
  });
});
