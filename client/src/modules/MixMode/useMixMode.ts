import { useState, useEffect, useRef, useContext } from "react";
import { djContext } from "./context/DjContext";
import axios from "axios";
import { preparePartition, prepareInstruments, playBeat } from "../utils";

import { Sound, Loop } from "../../types";

let counter: number;

export const useMixMode = () => {
  const [loading, setLoading] = useState(false);
  const {
    setPartition,
    setInstruments,
    highlightedNote,
    setHighlightedNote,
    loop1,
    loop2,
    loop3,
    loop4,
    tempo,
    setIsPlaying,
    setLoopActive,
  } = useContext(djContext);

  let musicPlaying = useRef<null | NodeJS.Timer>(null);

  useEffect(() => {
    prepareLoop("loop1", ["E-Kicks 1", "E-Hi-Hats 1", "E-Cymbals"]);
    prepareLoop("loop2", ["Vinyls 1", "Congas", "Clap 1"]);
    prepareLoop("loop3", ["Tone Bass Synth Am", "Tone Bass Synth Em"]);
    prepareLoop("loop4", [
      "Tone Synth Am Hi",
      "Tone Synth Chromatic",
      "Pizzicato C-Maj",
    ]);
  }, []);

  const toggleActiveNote = (col: number, row: number, sounds: Sound[], pitches: string[], loop: Loop) => {
    const updatedPartition = [...loop.partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    setPartition(updatedPartition, loop.name);
  };

  const toggleLoopActive = (loop: any) => {
    const updatedStatus = [...loop.status];
    const u = updatedStatus[0][0];
    updatedStatus[0][0] = u === 1 ? 0 : 1;
    setLoopActive(updatedStatus, loop.name);
  };

  const prepareLoop = async (loopName: string, instrumentNames: string[]) => {
    setLoading(true);
    const length = loopName === "loop3" || loopName === "loop4" ? 16 : 8;
    const { data } = await axios.get("/api/instrument", {
      params: { names: instrumentNames },
    });
    const preparedInstruments = prepareInstruments(data);
    const newPartition = preparePartition(preparedInstruments, length);
    setInstruments(preparedInstruments, loopName);
    setPartition(newPartition, loopName);
    setLoading(false);
  };

  const playMusic = () => {
    setIsPlaying(true);
    const timeoutTempo = 60000 / tempo / 4;
    counter = 0;

    const playInterval = () => {
      setHighlightedNote(counter);
      [loop1, loop2, loop3, loop4].forEach((loop) => {
        if (loop.status[0][0] === 1) {
          playBeat(
            loop.instruments,
            loop.partition,
            counter % loop.partition[0].length
          );
        }
      });
      counter++;
    };

    musicPlaying.current = setInterval(playInterval, timeoutTempo);
  };

  const onPlayBtnPress = () => {
    playMusic();
  };
  const onStopBtnPress = () => {
    setIsPlaying(false);
    clearInterval(musicPlaying.current as any);
  };

  return {
    loading,
    loop1,
    loop2,
    loop3,
    loop4,
    onPlayBtnPress,
    onStopBtnPress,
    toggleLoopActive,
    setLoopActive,
    toggleActiveNote,
    highlightedNote,
  };
};
