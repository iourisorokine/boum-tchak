import React, { useReducer } from "react";
import DjContext from "./DjContext";
import { djReducer } from "./DjReducer";
import {
  SET_PARTITION,
  SET_INSTRUMENTS,
  SET_HIGHLIGHTED_NOTE,
  SET_BEAT_COUNTER,
  SET_IS_PLAYING,
  SET_LOOP_ACTIVE,
  SET_TEMPO,
} from "./types";

export const DjState = (props) => {
  let initialState = {
    beatCounter: 0,
    highlightedNote: -1,
    isPlaying: false,
    tempo: 120,
    complexity: "pro",
    loop1: {
      name: "Drums",
      instruments: [],
      partition: [],
      status: [[1]],
    },
    loop2: {
      name: "Percussion",
      instruments: [],
      partition: [],
      status: [[1]],
    },
    loop3: {
      name: "Bass",
      instruments: [],
      partition: [],
      status: [[1]],
    },
    loop4: {
      name: "Melody",
      instruments: [],
      partition: [],
      status: [[1]],
    },
  };

  const [state, dispatch] = useReducer(djReducer, initialState);

  const setPartition = (value, loop = "loop1") => {
    dispatch({ type: SET_PARTITION, payload: value, loop });
  };

  const setInstruments = (value, loop = "loop1") => {
    dispatch({ type: SET_INSTRUMENTS, payload: value, loop });
  };

  const setLoopActive = (value, loop = "loop1") => {
    dispatch({ type: SET_LOOP_ACTIVE, payload: value, loop });
  };

  const setHighlightedNote = (value) => {
    dispatch({ type: SET_HIGHLIGHTED_NOTE, payload: value });
  };

  const setBeatCounter = (value) => {
    dispatch({ type: SET_BEAT_COUNTER, payload: value });
  };

  const setIsPlaying = (value) => {
    dispatch({ type: SET_IS_PLAYING, payload: value });
  };

  const setTempo = (value) => {
    dispatch({ type: SET_TEMPO, payload: value });
  };

  return (
    <DjContext.Provider
      value={{
        beatCounter: state.beatCounter,
        highlightedNote: state.highlightedNote,
        isPlaying: state.isPlaying,
        tempo: state.tempo,
        loop1: state.loop1,
        loop2: state.loop2,
        loop3: state.loop3,
        loop4: state.loop4,
        setTempo,
        setIsPlaying,
        setLoopActive,
        setHighlightedNote,
        setBeatCounter,
        setPartition,
        setInstruments,
      }}
    >
      {props.children}
    </DjContext.Provider>
  );
};
