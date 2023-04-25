import { Joke } from '@/types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import Image from 'next/image';
import React, {
  memo,
} from 'react';

type JokeListProps = {
  isLoading: boolean;
  jokes: Joke[];
  onJokeClick: (joke: Joke) => void;
};

const JokeList: React.FC<JokeListProps> = memo((
  { isLoading, jokes, onJokeClick }: JokeListProps,
) => (
  <div className="mx-auto my-16 max-w-[600px] h-full">
    <Image className="my-16 mx-auto" src="chuck.svg" alt="" width={300} height={300} />
    <List
      className="font-bold h-full"
      loading={isLoading}
      size="large"
      dataSource={jokes}
      renderItem={(item) => {
        const IconComponent = item.isFavorite ? HeartFilled : HeartOutlined;

        return (
          <List.Item
            actions={[
              <Button
                className="hover:scale-125 active:scale-75"
                type="link"
                size="large"
                shape="circle"
                icon={<IconComponent className="text-[32px] text-colorPrimary" />}
                onClick={() => onJokeClick(item)}
              />,
            ]}
          >
            <List.Item.Meta
              description={item.value}
            />
          </List.Item>
        );
      }}
    />
  </div>
));

export default JokeList;
