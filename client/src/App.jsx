import React from "react";
import { CreateSong } from "./components/CreateSong/CreateSong";
import { SongsList } from "./components/DisplaySong/SongsList";
import { LoadSong } from "./components/LoadSong/LoadSong";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { Account } from "./components/Auth/Account";
import { Switch, Route } from "react-router-dom";
import { MainScreen, Wrapper } from "./ui-kit";
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
    console.log("####### user:", this.state.user);
    return (
      <MainScreen>
        <Header />
        <Wrapper>
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
              path="/account"
              render={(props) => <Account user={this.state.user} {...props} />}
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
