import React, { useState, useEffect, useRef, useContext } from "react";
import { djContext } from "./context/DjContext";
import axios from "axios";
import { Bars } from "svg-loaders-react";
import { DJMode as Component } from "./Component";
import { preparePartition, prepareInstruments, playBeat } from "../utils";

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
    loop4,
    isPlaying,
    setIsPlaying,
    setLoopActive,
  } = useContext(djContext);

  let musicPlaying = useRef(null);

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

  const toggleActiveNote4 = (col, row, sounds, pitches) => {
    const updatedPartition = [...loop4.partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    setPartition(updatedPartition, "loop4");
  };

  const toggleLoopActive = (loop) => {
    const updatedStatus = [...loop.status];
    const u = updatedStatus[0][0];
    updatedStatus[0][0] = u === 1 ? 0 : 1;
    setLoopActive(updatedStatus, loop.name);
  };

  const prepareLoop = async (loopName, instruments) => {
    setLoading(true);
    const length = loopName === "loop3" || loopName === "loop4" ? 8 : 4;
    const { data } = await axios.get("/api/instrument", {
      params: { names: instruments },
    });
    const preparedInstruments = prepareInstruments(data);
    const newPartition = preparePartition(preparedInstruments, length);
    setInstruments(preparedInstruments, loopName);
    setPartition(newPartition, loopName);
    setLoading(false);
  };

  const playMusic = () => {
    setIsPlaying(true);
    counter = 0;

    const playInterval = () => {
      setHighlightedNote(counter % 8);
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
      loop4={loop4}
      onPlayBtnPress={onPlayBtnPress}
      onStopBtnPress={onStopBtnPress}
      toggleLoopActive={toggleLoopActive}
      isPlaying={isPlaying}
      setLoopActive={setLoopActive}
      toggleActiveNote={toggleActiveNote}
      toggleActiveNote2={toggleActiveNote2}
      toggleActiveNote3={toggleActiveNote3}
      toggleActiveNote4={toggleActiveNote4}
      highlightedNote={highlightedNote}
    />
  );
};
