import React, { memo } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Menu as AntMenu } from 'antd';

const items = [
  {
    key: '/jokes',
    label: 'Jokes',
  },
  {
    key: '/favorites',
    label: 'Favorites',
  },
];

const Menu: React.FC = memo(() => {
  const router = useRouter();

  return (
    <AntMenu
      rootClassName="flex justify-center"
      mode="horizontal"
      selectedKeys={[router.route]}
      items={
        items.map((item) => ({
          ...item,
          label: (
            <Link className="font-bold text-lg text-center inline-block w-[150px]" href={item.key}>{item.label}</Link>
          ),
        }))
      }
    />
  );
});

export default Menu;
