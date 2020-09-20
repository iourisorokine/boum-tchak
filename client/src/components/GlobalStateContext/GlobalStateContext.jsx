import React, { Component, createContext } from "react";

const DEFAULT_TEMPO = 120;
const DEFAULT_TIMEOUT = 60000 / 120 / 4;

const initialState = {
  partition: [],
  isPlaying: false,
  musicPlaying: null,
  highlightedNote: [-1],
  animatedNotes: [],
  musicLines: [],
  tempo: DEFAULT_TEMPO,
  timeoutTempo: DEFAULT_TIMEOUT,
  isNotePlayedOnClick: true,
  isAddInstrumentVisible: false,
  isSaveSongVisible: false,
  bottomMessage: "",
  isDeleteLineVisible: false,
  currentPage: 1,
  pages: [1],
};

const GlobalStateContext = createContext();

class GlobalStateProvider extends Component {
  state = initialState;

  // Method to update state

  setGlobalState = (newState) => {
    this.setState((prevState) => ({ ...newState }));
  };

  setIsSaveSongVisible = (isSaveSongVisible) => {
    this.setState((prevState) => ({ isSaveSongVisible }));
  };

  setTempo = (tempo) => {
    this.setState((prevState) => ({ tempo }));
  };

  setTimeoutTempo = (timeoutTempo) => {
    this.setState((prevState) => ({ timeoutTempo }));
  };

  stopPlaying = () => {
    this.setState({ isPlaying: false });
    clearInterval(this.state.musicPlaying);
  };

  render() {
    const { children } = this.props;
    const globalState = this.state;
    const {
      setGlobalState,
      setIsSaveSongVisible,
      setTempo,
      setTimeoutTempo,
      stopPlaying,
    } = this;

    return (
      <GlobalStateContext.Provider
        value={{
          setGlobalState,
          setIsSaveSongVisible,
          setTempo,
          setTimeoutTempo,
          stopPlaying,
          globalState,
        }}>
        {children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateContext;
export { GlobalStateProvider };
