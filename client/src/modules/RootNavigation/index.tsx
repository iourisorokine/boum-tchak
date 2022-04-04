import React, {FC} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { User } from '../../types';
import { CreateSong } from '../CreateSong/Container';
import { SongsList } from '../DisplaySong/SongsList';
import { LoadSong } from '../LoadSong/LoadSong';
import { Auth, Variant } from '../Auth';
import { Profile } from '../Auth/Profile';
import { ProtectedRoute } from './ProtectedRoute';
import { CreateInstrument } from '../CreateInstrument/CreateInstrument';
import { MixMode } from '../MixMode/Container';
import { DjState } from '../MixMode/context/DjState';
import { Help } from '../InfoPages/Help';

export interface RootNavigationProps {
  user: User;
  setUser: (user: User) => void;
}

export const RootNavigation: FC<RootNavigationProps> = ({ user, setUser }) => {
    return (
        <Switch>
        <Route
          exact
          path="/create"
          render={(props) => (
            <CreateSong user={user} {...props} />
          )}
        />
        <Route exact path="/help" render={(props) => <Help />} />
        <Route
          exact
          path="/create/:id"
          render={(props) => (
            <CreateSong user={user} {...props} />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => {
            if (!user) {
              return <Auth setUser={setUser} variant={Variant.login} {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/signup"
          render={(props) => {
            if (!user) {
              return <Auth setUser={setUser} variant={Variant.signup} {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <ProtectedRoute
          exact
          path="/profile"
          user={user}
          setUser={setUser}
          component={Profile}
        />
        <ProtectedRoute
          exact
          path="/create-instrument"
          user={user}
          setUser={setUser}
          component={CreateInstrument}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <SongsList isAppIntroDisplayed {...props} />
          )}
        />
        <Route
          exact
          path="/listen"
          render={(props) => (
            <SongsList isAppIntroDisplayed={false} {...props} />
          )}
        />
        <Route
          exact
          path="/load-song"
          render={(props) => {
            if (user) {
              return <LoadSong user={user} {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/mix"
          render={(props) => {
            return (
              <DjState>
                <MixMode />
              </DjState>
            );
          }}
        />
      </Switch>
    )
}