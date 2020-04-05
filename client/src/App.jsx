import React from "react";
import { CreateSong } from "./components/CreateSong/CreateSong";
import { SongsList } from "./components/DisplaySong/SongsList";
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
            <Route exact path="/" render={props => <CreateSong />} />
            <Route
              exact
              path="/listen"
              render={props => <SongsList {...props} />}
            />
          </Switch>
        </Wrapper>
      </MainScreen>
    );
  }
}

export default App;
