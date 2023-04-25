import { Joke } from '@/types';
import { loadTenRandomJokes } from '@/api/jokes';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { jokesState, rawJokesState } from '@/store';
import useResource from '../useResource';

const useTenRandomJokes = () => {
  const { resource, isLoading, error } = useResource<void, Joke[], Joke[]>({
    loadImmediately: true,
    defaultResource: [],
    onLoad: loadTenRandomJokes,
  });

  const setRawJokesState = useSetRecoilState(rawJokesState);
  const jokes = useRecoilValue(jokesState);

  useEffect(
    () => setRawJokesState((prev) => (prev.length ? prev : resource)),
    [resource, setRawJokesState],
  );

  return { jokes, isLoading, error };
};

export default useTenRandomJokes;
