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
  SET_COPIED_PARTITION_BAR,
  SET_ANIMATED_NOTES,
  SET_CURRENT_PAGE,
  SET_PAGES,
} from "./types";

export const GlobalState = (props) => {
  let initialState = {
    isPLaying: false,
    instruments: [],
    partition: [],
    copiedPartitionBar: null,
    isRemoveInstrumentVisible: false,
    partitionLength: config.START_PARTITION_LENGTH,
    maxPartitionLength: config.MAX_PARTITION_LENGTH,
    tempo: config.DEFAULT_TEMPO,
    timeoutTempo: config.DEFAULT_TIMEOUT,
    isNotePlayedOnClick: true,
    isAddInstrumentVisible: false,
    isSaveSongVisible: false,
    animatedNotes: [],
    currentPage: 1,
    pages: [1],
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

  const setAnimatedNotes = (value) => {
    dispatch({ type: SET_ANIMATED_NOTES, payload: value });
  };

  const setCurrentPage = (value) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: value });
  };

  const setPages = (value) => {
    dispatch({ type: SET_PAGES, payload: value });
  };

  const deleteLine = (lineNumber) => {
    const updatedPartition = [...state.partition];
    const updatedInstruments = [...state.instruments];
    updatedPartition.splice(lineNumber, 1);
    updatedInstruments.splice(lineNumber, 1);
    setPartition(updatedPartition);
    setInstruments(updatedInstruments);
    setIsRemoveInstrumentVisible(!setIsRemoveInstrumentVisible);
  };

  const copyOneBar = (barIndex) => {
    const newCopiedBar = [];
    const startIndex = 4 * barIndex;
    const endIndex = startIndex + 3;
    state.partition.forEach((el) => {
      const newLine = [];
      for (let i = startIndex; i <= endIndex; i++) {
        newLine.push(el[i]);
      }
      newCopiedBar.push(newLine);
    });
    dispatch({ type: SET_COPIED_PARTITION_BAR, payload: newCopiedBar });
  };

  const pasteOneBar = (barIndex) => {
    const updatedPartition = [];
    const partitionLength = state.partition[0].length;
    const startIndex = 4 * barIndex;
    const endIndex = startIndex + 3;
    state.partition.forEach((el, index) => {
      const newLine = [];
      let offset = 0;
      for (let i = 0; i < partitionLength; i++) {
        if (i >= startIndex && i <= endIndex) {
          newLine.push(state.copiedPartitionBar[index][0 + offset]);
          offset++;
        } else {
          newLine.push(el[i]);
        }
      }
      updatedPartition.push(newLine);
    });
    dispatch({ type: SET_PARTITION, payload: updatedPartition });
  };

  return (
    <GlobalContext.Provider
      value={{
        tempo: state.tempo,
        isPlaying: state.isPlaying,
        instruments: state.instruments,
        partition: state.partition,
        copiedPartitionBar: state.copiedPartitionBar,
        timeoutTempo: state.timeoutTempo,
        isNotePlayedOnClick: state.isNotePlayedOnClick,
        isAddInstrumentVisible: state.isAddInstrumentVisible,
        isSaveSongVisible: state.isSaveSongVisible,
        isRemoveInstrumentVisible: state.isRemoveInstrumentVisible,
        animatedNotes: state.animatedNotes,
        currentPage: state.currentPage,
        pages: state.pages,
        setTempo,
        setIsPlaying,
        setInstruments,
        setPartition,
        copyOneBar,
        pasteOneBar,
        setIsRemoveInstrumentVisible,
        toggleIsRemoveInstrumentVisible,
        setTimeoutTempo,
        setIsNotePlayedOnClick,
        toggleIsAddInstrumentVisible,
        setIsSaveSongVisible,
        deleteLine,
        setAnimatedNotes,
        setCurrentPage,
        setPages,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
