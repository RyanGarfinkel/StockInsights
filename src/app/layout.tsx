'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import './globals.css';

const RootLayout =({ children }: { children: React.ReactNode }) => {

  return (
    <html lang='en'>
      <body>
        <UserProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
