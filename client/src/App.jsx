import React, {useState} from "react";
import { CreateSong } from "./modules/CreateSong/Container";
import { SongsList } from "./modules/DisplaySong/SongsList";
import { LoadSong } from "./modules/LoadSong/LoadSong";
import { Login } from "./modules/Auth/Login";
import { Signup } from "./modules/Auth/Signup";
import { Profile } from "./modules/Auth/Profile";
import { ProtectedRoute } from "./modules/Auth/ProtectedRoute";
import { CreateInstrument } from "./modules/CreateInstrument/CreateInstrument";
import { MixMode } from "./modules/MixMode/Container";
import { DjState } from "./modules/MixMode/context/DjState";
import { Help } from "./modules/InfoPages/Help";
import { Switch, Route, Redirect } from "react-router-dom";
import { MainScreen, Wrapper, BackHeader } from "./ui-kit";
import { Header } from "./modules/Header/Header";
import "./App.css";

export const App = ({user}) => {
  const [currentUser, setCurrentUser] = useState(user)

    return (
      <MainScreen>
        <Header user={currentUser} />
        <Wrapper>
          <BackHeader />
          <Switch>
            <Route
              exact
              path="/create"
              render={(props) => (
                <CreateSong user={currentUser} {...props} />
              )}
            />
            <Route exact path="/help" render={(props) => <Help {...props} />} />
            <Route
              exact
              path="/create/:id"
              render={(props) => (
                <CreateSong user={currentUser} {...props} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => {
                if (!currentUser) {
                  return <Login setUser={setCurrentUser} {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              exact
              path="/signup"
              render={(props) => {
                if (!currentUser) {
                  return <Signup setUser={setCurrentUser} {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <ProtectedRoute
              exact
              path="/profile"
              user={currentUser}
              setUser={setCurrentUser}
              component={Profile}
            />
            <ProtectedRoute
              exact
              path="/create-instrument"
              user={currentUser}
              setUser={setCurrentUser}
              component={CreateInstrument}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <SongsList isAppIntroDisplayed={true} {...props} />
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
                if (currentUser) {
                  return <LoadSong user={currentUser} {...props} />;
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
        </Wrapper>
      </MainScreen>
    );
}
