import React from "react";
import { CreateSong } from "./modules/CreateSong/Container";
import { SongsList } from "./modules/DisplaySong/SongsList";
import { LoadSong } from "./modules/LoadSong/LoadSong";
import { Login } from "./modules/Auth/Login";
import { Signup } from "./modules/Auth/Signup";
import { Profile } from "./modules/Auth/Profile";
import { ProtectedRoute } from "./modules/Auth/ProtectedRoute";
import { CreateInstrument } from "./modules/CreateInstrument/CreateInstrument";
import { DJMode } from "./modules/DJMode/Container";
import { DjState } from "./modules/DJMode/context/DjState";
import { Help } from "./modules/InfoPages/Help";
import { Switch, Route, Redirect } from "react-router-dom";
import { MainScreen, Wrapper, BackHeader } from "./ui-kit";
import { Header } from "./modules/Header/Header";
import "./App.css";

class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <MainScreen>
        <Header user={this.state.user} />
        <Wrapper>
          <BackHeader />
          <Switch>
            <Route
              exact
              path="/create"
              render={(props) => (
                <CreateSong user={this.state.user} {...props} />
              )}
            />
            <Route exact path="/help" render={(props) => <Help {...props} />} />
            <Route
              exact
              path="/create/:id"
              render={(props) => (
                <CreateSong user={this.state.user} {...props} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => {
                if (!this.state.user) {
                  return <Login setUser={this.setUser} {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              exact
              path="/signup"
              render={(props) => {
                if (!this.state.user) {
                  return <Signup setUser={this.setUser} {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <ProtectedRoute
              exact
              path="/profile"
              user={this.state.user}
              setUser={this.setUser}
              component={Profile}
            />
            <ProtectedRoute
              exact
              path="/create-instrument"
              user={this.state.user}
              setUser={this.setUser}
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
                if (this.state.user) {
                  return <LoadSong user={this.state.user} {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              exact
              path="/dj-mode"
              render={(props) => {
                return (
                  <DjState>
                    <DJMode />
                  </DjState>
                );
              }}
            />
          </Switch>
        </Wrapper>
      </MainScreen>
    );
  }
}

export default App;
