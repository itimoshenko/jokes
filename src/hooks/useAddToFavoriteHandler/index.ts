import { favoritesJokeIdsState } from '@/store';
import { Joke } from '@/types';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const JOKE_MAX_COUNT = Number(process.env.NEXT_PUBLIC_JOKE_MAX_COUNT);

const useAddToFavoriteHandler = () => {
  const setFavoritesJokeIds = useSetRecoilState(favoritesJokeIdsState);

  return useCallback((item: Joke) => setFavoritesJokeIds((favoritesJokeIds) => {
    const index = favoritesJokeIds.findIndex((id) => id === item.id);

    if (index !== -1) {
      return [
        ...favoritesJokeIds.slice(0, index),
        ...favoritesJokeIds.slice(index + 1),
      ];
    }

    if (favoritesJokeIds.length >= JOKE_MAX_COUNT) {
      return favoritesJokeIds;
    }

    return [...favoritesJokeIds, item.id];
  }), [setFavoritesJokeIds]);
};

export default useAddToFavoriteHandler;
