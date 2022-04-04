import React, { useState } from 'react';

import { MainScreen, Wrapper, BackHeader } from './ui-kit';
import { Header } from './modules/Header/Header';
import { User } from './types';
import { RootNavigation } from './modules/RootNavigation';
import './App.css';

export interface AppProps {
  user: User;
}

export const App: React.FC<AppProps> = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);

  return (
    <MainScreen>
      <Header user={currentUser} />
      <Wrapper>
        <BackHeader />
        <RootNavigation user={currentUser} setUser={setCurrentUser}/>
      </Wrapper>
    </MainScreen>
  );
};
