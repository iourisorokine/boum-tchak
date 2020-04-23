import React, { useState } from "react";
import { DisplayLine } from "./DisplayLine";
import { playBeat } from "../utils";
import { MusicGrid, SongPost, SongTitle } from "../../ui-kit";

export const DisplaySong = ({ partition, musicLines, title, tempo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(null);
  const [highlightedNote, setHighlightedNote] = useState(-1);
  const [animatedNotes, setAnimatedNotes] = useState([-1, -1, -1]);
  const timeoutTempo = 60000 / tempo / 4;

  const playMusic = (musicLines, partition, tempo) => {
    setIsPlaying(true);
    let counter = 0;
    setMusicPlaying(
      setInterval(() => {
        setHighlightedNote(counter);
        setAnimatedNotes([counter - 1, counter, counter + 1]);
        playBeat(musicLines, partition, counter);
        counter++;
        if (counter >= partition[0].length) {
          counter = 0;
        }
      }, tempo)
    );
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    clearInterval(musicPlaying);
  };

  const onSongClick = () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      playMusic(musicLines, partition, timeoutTempo);
    }
  };

  return (
    <SongPost>
      <SongTitle>{title}</SongTitle>
      <MusicGrid onClick={onSongClick}>
        {musicLines.map((line, i) => {
          return (
            <DisplayLine
              key={i}
              linePosition={i}
              notes={partition[i]}
              noteColors={line.colors}
              sounds={line.sounds}
              highlightedNote={highlightedNote}
              animatedNotes={animatedNotes}
            />
          );
        })}
      </MusicGrid>
    </SongPost>
  );
};
