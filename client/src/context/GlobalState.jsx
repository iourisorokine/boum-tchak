import React, { useReducer } from "react";
import { config } from "../config/config";

import GlobalContext from "./GlobalContext";
import GlobalReducer from "./GlobalReducer";
import {
  SET_TEMPO,
  SET_TIMEOUT_TEMPO,
  SET_IS_SAVE_SONG_VISIBLE,
  SET_IS_NOTE_PLAYED_ON_CLICK,
  SET_IS_ADD_INSTRUMENT_VISIBLE,
  SET_IS_PLAYING,
  SET_INSTRUMENTS,
  SET_PARTITION,
  SET_IS_REMOVE_INSTRUMENT_VISIBLE,
} from "./types";

export const GlobalState = (props) => {
  let initialState = {
    isPLaying: false,
    instruments: [],
    partition: [],
    isRemoveInstrumentVisible: false,
    partitionLength: config.START_PARTITION_LENGTH,
    maxPartitionLength: config.MAX_PARTITION_LENGTH,
    tempo: config.DEFAULT_TEMPO,
    timeoutTempo: config.DEFAULT_TIMEOUT,
    isNotePlayedOnClick: true,
    isAddInstrumentVisible: false,
    isSaveSongVisible: false,
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const setTempo = (value) => {
    dispatch({ type: SET_TEMPO, payload: value });
  };

  const setTimeoutTempo = (value) => {
    dispatch({ type: SET_TIMEOUT_TEMPO, payload: value });
  };

  const setIsNotePlayedOnClick = (value) => {
    dispatch({ type: SET_IS_NOTE_PLAYED_ON_CLICK, payload: value });
  };
  const toggleIsAddInstrumentVisible = () => {
    const newValue = !state.isAddInstrumentVisible;
    dispatch({ type: SET_IS_ADD_INSTRUMENT_VISIBLE, payload: newValue });
  };
  const setIsSaveSongVisible = (value) => {
    dispatch({ type: SET_IS_SAVE_SONG_VISIBLE, payload: value });
  };

  const setIsRemoveInstrumentVisible = (value) => {
    dispatch({ type: SET_IS_REMOVE_INSTRUMENT_VISIBLE, payload: value });
  };

  const toggleIsRemoveInstrumentVisible = () => {
    const newValue = !state.isRemoveInstrumentVisible;
    dispatch({ type: SET_IS_REMOVE_INSTRUMENT_VISIBLE, payload: newValue });
  };

  const setIsPlaying = (value) => {
    dispatch({ type: SET_IS_PLAYING, payload: value });
  };

  const setInstruments = (value) => {
    dispatch({ type: SET_INSTRUMENTS, payload: value });
  };

  const setPartition = (value) => {
    dispatch({ type: SET_PARTITION, payload: value });
  };

  return (
    <GlobalContext.Provider
      value={{
        tempo: state.tempo,
        isPlaying: state.isPlaying,
        instruments: state.instruments,
        partition: state.partition,
        timeoutTempo: state.timeoutTempo,
        isNotePlayedOnClick: state.isNotePlayedOnClick,
        isAddInstrumentVisible: state.isAddInstrumentVisible,
        isSaveSongVisible: state.isSaveSongVisible,
        isRemoveInstrumentVisible: state.isRemoveInstrumentVisible,
        setTempo,
        setIsPlaying,
        setInstruments,
        setPartition,
        setIsRemoveInstrumentVisible,
        toggleIsRemoveInstrumentVisible,
        setTimeoutTempo,
        setIsNotePlayedOnClick,
        toggleIsAddInstrumentVisible,
        setIsSaveSongVisible,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
