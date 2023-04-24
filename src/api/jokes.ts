import { Joke } from '@/types';
import ApiClient from './ApiClient';

const JOKE_MAX_COUNT = Number(process.env.NEXT_PUBLIC_JOKE_MAX_COUNT);

const loadRandomJoke = () => ApiClient.request<Joke>(`${process.env.NEXT_PUBLIC_API_URL}/jokes/random`);

const loadTenRandomJokes = () => {
  const pendingRequests = Array.from(new Array(JOKE_MAX_COUNT)).map(loadRandomJoke);
  const cancel = () => pendingRequests.forEach((req) => req.cancel());

  const result = Promise.all(pendingRequests);

  return Object.assign(result, { cancel });
};

export { loadRandomJoke, loadTenRandomJokes };
