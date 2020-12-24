import React, { useState, useEffect, useRef, useContext } from "react";
import { djContext } from "./context/DjContext";
import axios from "axios";
import { Bars } from "svg-loaders-react";
import { DJMode as Component } from "./Component";
import {
  preparePartition,
  prepareInstruments,
  playBeat,
  playBeatSync,
} from "../utils";

let counter;

export const DJMode = (props) => {
  const [loading, setLoading] = useState(false);
  const {
    setPartition,
    setInstruments,
    highlightedNote,
    setHighlightedNote,
    loop1,
    loop2,
    loop3,
    isPlaying,
    setIsPlaying,
    setLoopActive,
    beatCounter,
    setBeatCounter,
  } = useContext(djContext);

  let musicPlaying = React.useRef(null);

  useEffect(() => {
    prepareLoop("loop1", ["Kicks 1", "E-Hi-Hats 1"]);
    prepareLoop("loop2", ["Tone Bass Synth Am"]);
    prepareLoop("loop3", ["Pizzicato C-Maj"]);
  }, []);

  const toggleActiveNote = (col, row, sounds, pitches) => {
    const updatedPartition = [...loop1.partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    setPartition(updatedPartition, "loop1");
  };

  const toggleActiveNote2 = (col, row, sounds, pitches) => {
    const updatedPartition = [...loop2.partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    setPartition(updatedPartition, "loop2");
  };

  const toggleActiveNote3 = (col, row, sounds, pitches) => {
    const updatedPartition = [...loop3.partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    setPartition(updatedPartition, "loop3");
  };

  const toggleLoop1Active = () => {
    const updatedStatus = [...loop1.status];
    const u = updatedStatus[0][0];
    updatedStatus[0][0] = u === 1 ? 0 : 1;
    setLoopActive(updatedStatus, "loop1");
  };
  const toggleLoop2Active = () => {
    const updatedStatus = [...loop2.status];
    const u = updatedStatus[0][0];
    updatedStatus[0][0] = u === 1 ? 0 : 1;
    setLoopActive(updatedStatus, "loop2");
  };
  const toggleLoop3Active = () => {
    const updatedStatus = [...loop3.status];
    const u = updatedStatus[0][0];
    updatedStatus[0][0] = u === 1 ? 0 : 1;
    setLoopActive(updatedStatus, "loop3");
  };

  const prepareLoop = async (loop, instruments) => {
    setLoading(true);
    const length = loop === "loop3" ? 8 : 4;
    const { data } = await axios.get("/api/instrument", {
      params: { names: instruments },
    });
    const preparedInstruments = prepareInstruments(data);
    const newPartition = preparePartition(preparedInstruments, length);
    setInstruments(preparedInstruments, loop);
    setPartition(newPartition, loop);
    setLoading(false);
  };

  const playMusic = () => {
    // if (!partition || !partition.length) return;
    setIsPlaying(true);
    counter = 0;

    const playInterval = () => {
      setHighlightedNote(counter % 8);
      [loop1, loop2, loop3].forEach((loop) => {
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

    musicPlaying.current = setInterval(playInterval, 200);
  };

  const onPlayBtnPress = () => {
    playMusic();
  };
  const onStopBtnPress = () => {
    setIsPlaying(false);
    clearInterval(musicPlaying.current);
  };

  if (loading) {
    return <Bars width={100} height={50} fill="#000" stroke="#000" />;
  }

  return (
    <Component
      loop1={loop1}
      loop2={loop2}
      loop3={loop3}
      onPlayBtnPress={onPlayBtnPress}
      onStopBtnPress={onStopBtnPress}
      toggleLoop1Active={toggleLoop1Active}
      toggleLoop2Active={toggleLoop2Active}
      toggleLoop3Active={toggleLoop3Active}
      isPlaying={isPlaying}
      setLoopActive={setLoopActive}
      toggleActiveNote={toggleActiveNote}
      toggleActiveNote2={toggleActiveNote2}
      toggleActiveNote3={toggleActiveNote3}
      highlightedNote={highlightedNote}
    />
  );
};
