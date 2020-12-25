import {
  SET_PARTITION,
  SET_INSTRUMENTS,
  SET_HIGHLIGHTED_NOTE,
  SET_BEAT_COUNTER,
  SET_IS_PLAYING,
  SET_LOOP_ACTIVE,
  SET_TEMPO,
} from "./types";

export const djReducer = (state, action) => {
  const { payload, type, loop } = action;

  switch (type) {
    case SET_PARTITION:
      return {
        ...state,
        [loop]: {
          ...state[loop],
          partition: payload,
        },
      };
    case SET_INSTRUMENTS:
      return {
        ...state,
        [loop]: {
          ...state[loop],
          instruments: payload,
        },
      };

    case SET_LOOP_ACTIVE:
      return {
        ...state,
        [loop]: {
          ...state[loop],
          status: payload,
        },
      };

    case SET_HIGHLIGHTED_NOTE:
      return {
        ...state,
        highlightedNote: payload,
      };
    case SET_BEAT_COUNTER:
      return {
        ...state,
        beatCounter: payload,
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: payload,
      };
    case SET_TEMPO:
      return {
        ...state,
        tempo: payload,
      };
    default:
      return state;
  }
};
