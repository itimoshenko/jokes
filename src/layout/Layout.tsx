import React, { memo } from 'react';

import {
  ConfigProvider,
  Layout as AntLayout,
} from 'antd';

import Menu from './Menu';
import THEME from '../../ant-design.theme';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC<React.PropsWithChildren> = memo((
  { children }: React.PropsWithChildren,
) => (
  <ConfigProvider theme={THEME}>
    <AntLayout className="min-h-screen">
      <Header className="p-0 sticky top-0 z-10 w-full">
        <Menu />
      </Header>
      <Content className="h-full">
        {children}
      </Content>
      <Footer className="h-[10px] p-0 bg-colorPrimary" />
    </AntLayout>
  </ConfigProvider>
));

export default Layout;
