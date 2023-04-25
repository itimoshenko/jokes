import { useRef, useCallback, useEffect } from 'react';
import { loadRandomJoke } from '@/api/jokes';
import { Joke } from '@/types';
import { useSetRecoilState } from 'recoil';
import { rawJokesState } from '@/store';
import useResource from '../useResource';

const useFreshJoke = (
  interval: number,
) => {
  const { resource, load } = useResource<void, Joke, Joke | undefined>({
    loadImmediately: false,
    defaultResource: undefined,
    onLoad: loadRandomJoke,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const clear = useCallback(() => clearInterval(intervalRef.current), []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      load();
    }, interval);

    return () => {
      clear();
    };
  }, [load, clear, interval]);

  const setRawJokesState = useSetRecoilState(rawJokesState);

  useEffect(
    () => setRawJokesState((jokes) => (resource ? [resource, ...jokes] : jokes)),
    [resource, setRawJokesState],
  );
};

export default useFreshJoke;
