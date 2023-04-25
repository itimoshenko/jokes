import React, {
  memo,
} from 'react';
import JokeList from '@/components/JokeList';
import useTenRandomJokes from '@/hooks/useTenRandomJokes';
import useFreshJoke from '@/hooks/useFreshJoke';
import useAddToFavoriteHandler from '@/hooks/useAddToFavoriteHandler';

const JOKE_MAX_COUNT = Number(process.env.NEXT_PUBLIC_JOKE_MAX_COUNT);

const Jokes: React.FC = memo(() => {
  const { jokes, isLoading, error } = useTenRandomJokes();
  const handleAddToFavorite = useAddToFavoriteHandler();
  useFreshJoke(Number(process.env.NEXT_PUBLIC_JOKE_UPDATE_INTERVAL));

  return (
    <JokeList
      isLoading={isLoading}
      jokes={jokes.slice(0, JOKE_MAX_COUNT)}
      onJokeClick={handleAddToFavorite}
    />
  );
});

export default Jokes;
