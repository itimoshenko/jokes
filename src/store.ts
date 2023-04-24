import {
  AtomEffect, DefaultValue, atom, selector,
} from 'recoil';
import { Joke } from './types';

const localStorageEffect = <T>(
  key: string,
  localStorage?: Storage,
) => {
  const effect: AtomEffect<T> = ({ setSelf, onSet }) => {
    if (!localStorage) {
      return;
    }

    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      try {
        const parsedValue = JSON.parse(savedValue);

        // SSR Hack
        setTimeout(() => setSelf(parsedValue), 0);
      } catch (e) {
        setSelf(new DefaultValue());
      }
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

  return effect;
};

export const favoritesJokeIdsState = atom<string[]>({
  key: 'favoritesJokeIdsState',
  default: [],
  effects: [
    localStorageEffect('favoritesJokeIdsState', typeof window !== 'undefined' ? window.localStorage : undefined),
  ],
});

export const rawJokesState = atom<Joke[]>({
  key: 'rawJokesState',
  default: [],
  effects: [
    localStorageEffect('rawJokesState', typeof window !== 'undefined' ? window.localStorage : undefined),
  ],
});

export const jokesState = selector({
  key: 'jokesState',
  get: ({ get }) => {
    const favoritesJokeIds = get(favoritesJokeIdsState);
    const jokes = get(rawJokesState);

    return jokes.map((j) => ({ ...j, isFavorite: favoritesJokeIds.includes(j.id) }));
  },
});

export const favoriteJokesState = selector({
  key: 'favoriteJokesState',
  get: ({ get }) => {
    const jokes = get(jokesState);

    return jokes.filter((j) => j.isFavorite);
  },
});
