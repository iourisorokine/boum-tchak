import {
  SET_TEMPO,
  SET_TIMEOUT_TEMPO,
  SET_IS_ADD_INSTRUMENT_VISIBLE,
  SET_IS_NOTE_PLAYED_ON_CLICK,
  SET_IS_SAVE_SONG_VISIBLE,
  SET_IS_PLAYING,
  SET_INSTRUMENTS,
  SET_PARTITION,
  SET_COPIED_PARTITION_BAR,
  SET_ANIMATED_NOTES,
  SET_CURRENT_PAGE,
  SET_PAGES,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_TEMPO:
      return {
        ...state,
        tempo: payload,
      };
    case SET_TIMEOUT_TEMPO:
      return {
        ...state,
        timeoutTempo: payload,
      };
    case SET_IS_ADD_INSTRUMENT_VISIBLE:
      return {
        ...state,
        isAddInstrumentVisible: payload,
      };
    case SET_IS_NOTE_PLAYED_ON_CLICK:
      return {
        ...state,
        isNotePlayedOnClick: payload,
      };
    case SET_IS_SAVE_SONG_VISIBLE:
      return {
        ...state,
        isSaveSongVisible: payload,
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: payload,
      };
    case SET_INSTRUMENTS:
      return {
        ...state,
        instruments: payload,
      };
    case SET_PARTITION:
      return {
        ...state,
        partition: payload,
      };
    case SET_COPIED_PARTITION_BAR:
      return {
        ...state,
        copiedPartitionBar: payload,
      };
    case SET_ANIMATED_NOTES:
      return {
        ...state,
        animatedNotes: payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case SET_PAGES:
      return {
        ...state,
        pages: payload,
      };
    default:
      return state;
  }
};
