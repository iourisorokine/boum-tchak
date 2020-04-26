import React from "react";
import { CreateSong } from "./components/CreateSong/CreateSong";
import { SongsList } from "./components/DisplaySong/SongsList";
import { LoadSong } from "./components/LoadSong/LoadSong";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { Profile } from "./components/Auth/Profile";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { CreateInstrument } from "./components/CreateInstrument/CreateInstrument";
import { Switch, Route, Redirect } from "react-router-dom";
import { MainScreen, Wrapper, BackHeader } from "./ui-kit";
import { Header } from "./components/Header/Header";
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
        <Wrapper border="yes">
          <BackHeader />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <CreateSong user={this.state.user} {...props} />
              )}
            />
            <Route
              exact
              path="/song/:id"
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
              path="/listen"
              render={(props) => <SongsList {...props} />}
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
          </Switch>
        </Wrapper>
      </MainScreen>
    );
  }
}

export default App;
