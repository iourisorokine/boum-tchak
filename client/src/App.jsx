import React from "react";
import { CreateSong } from "./components/CreateSong/CreateSong";
import { SongsList } from "./components/DisplaySong/SongsList";
import { LoadSong } from "./components/LoadSong/LoadSong";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { Profile } from "./components/Auth/Profile";
import { Switch, Route } from "react-router-dom";
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
          <BackHeader/>
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
              render={(props) => <Login setUser={this.setUser} {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) => <Signup setUser={this.setUser} {...props} />}
            />
            <Route
              exact
              path="/profile"
              render={(props) => (
                <Profile
                  user={this.state.user}
                  setUser={this.setUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/listen"
              render={(props) => <SongsList {...props} />}
            />
            <Route
              exact
              path="/load-song"
              render={(props) => <LoadSong {...props} />}
            />
          </Switch>
        </Wrapper>
      </MainScreen>
    );
  }
}

export default App;
