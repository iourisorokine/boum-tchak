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
} from "./types";

export const DjState = (props) => {
  let initialState = {
    beatCounter: 0,
    highlightedNote: -1,
    isPlaying: false,
    loop1: {
      instruments: [],
      partition: [],
      status: [[1]],
    },
    loop2: {
      instruments: [],
      partition: [],
      status: [[1]],
    },
    loop3: {
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

  return (
    <DjContext.Provider
      value={{
        beatCounter: state.beatCounter,
        highlightedNote: state.highlightedNote,
        loop1: state.loop1,
        loop2: state.loop2,
        loop3: state.loop3,
        isPlaying: state.isPlaying,
        setIsPlaying,
        setLoopActive,
        setHighlightedNote,
        setBeatCounter,
        setPartition,
        setInstruments,
      }}>
      {props.children}
    </DjContext.Provider>
  );
};
