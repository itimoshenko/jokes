import React, { memo } from 'react';
import JokeList from '@/components/JokeList';
import useAddToFavoriteHandler from '@/hooks/useAddToFavoriteHandler';
import { useRecoilValue } from 'recoil';
import { favoriteJokesState } from '@/store';

const JOKE_MAX_COUNT = Number(process.env.NEXT_PUBLIC_JOKE_MAX_COUNT);

const Favorites: React.FC = memo(() => {
  const jokes = useRecoilValue(favoriteJokesState);

  const handleAddToFavorite = useAddToFavoriteHandler();

  return (
    <JokeList
      isLoading={false}
      jokes={jokes.slice(0, JOKE_MAX_COUNT)}
      onJokeClick={handleAddToFavorite}
    />
  );
});

export default Favorites;
