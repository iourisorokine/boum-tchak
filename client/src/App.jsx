import React from "react";
import { CreateSong } from "./components/CreateSong/CreateSong";
import { SongsList } from "./components/DisplaySong/SongsList";
import { LoadSong } from "./components/LoadSong/LoadSong";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { Switch, Route } from "react-router-dom";
import { MainScreen, Wrapper } from "./ui-kit";
import { Header } from "./components/Header/Header";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <MainScreen>
        <Header />
        <Wrapper>
          <Switch>
            <Route exact path="/" component={CreateSong} />
            <Route exact path="/song/:id" component={CreateSong} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
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
