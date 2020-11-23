import React, { useState, useEffect, useRef } from "react";
import { DisplayLine } from "./DisplayLine";
import { PageCircles } from "../Shared/PageCircles";
import { playBeat } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import {
  MusicGrid,
  SongPost,
  SongPostPlay,
  SongHeader,
  SongTitle,
  Row,
} from "../../ui-kit";

const iconsStyle = {
  width: 40,
  height: 40,
  padding: "10px 30px",
  border: "solid 1px rgba(0, 0, 0, 0.6)",
  color: "rgba(0, 0, 0, 0.7)",
  backgroundColor: "rgba(250, 250, 250, 0.5)",
  borderRadius: 5,
  zIndex: 5,
};

export const DisplaySong = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedNote, setHighlightedNote] = useState(-1);
  const [animatedNotes, setAnimatedNotes] = useState([-1, -1, -1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1]);

  const timeoutTempo = 60000 / props.tempo / 4;
  let intervalId = useRef(null);

  const lengthOfPage = window.innerWidth >= 800 ? 16 : 12;

  useEffect(() => {
    const updatedPages = [];
    const numberOfPages = Math.ceil(props.partition[0].length / lengthOfPage);
    for (let i = 1; i <= numberOfPages; i++) {
      updatedPages.push(1);
    }
    setPages(updatedPages);
  }, []);

  useEffect(() => {
    return () => stopPlaying();
  }, []);

  const playMusic = (musicLines, partition, tempo) => {
    setIsPlaying(true);
    setCurrentPage(1);
    let counter = 0;
    intervalId.current = setInterval(() => {
      setHighlightedNote(counter);
      setAnimatedNotes([counter - 1, counter, counter + 1]);
      playBeat(musicLines, partition, counter);
      counter++;
      if (counter >= partition[0].length) {
        counter = 0;
      }
      if (counter % lengthOfPage === 1) {
        const nextPage = Math.ceil(counter / lengthOfPage);
        setCurrentPage(nextPage);
      }
    }, tempo);
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    clearInterval(intervalId.current);
  };

  const onSongClick = () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      playMusic(props.musicLines, props.partition, timeoutTempo);
    }
  };

  return (
    <SongPost>
      <SongPostPlay onClick={onSongClick}>
        {isPlaying ? (
          <FontAwesomeIcon icon={faStop} color="black" style={iconsStyle} />
        ) : (
          <FontAwesomeIcon icon={faPlay} color="black" style={iconsStyle} />
        )}
      </SongPostPlay>
      <SongHeader>
        <SongTitle b={true}>{props.title}</SongTitle>
        <SongTitle>by {props.creatorName}</SongTitle>
      </SongHeader>
      <Row>
        <PageCircles
          pages={pages}
          selectPage={props.selectPage}
          currentPage={currentPage}
          clickable={false}
        />
      </Row>
      <MusicGrid>
        {props.musicLines.map((line, i) => {
          return (
            <DisplayLine
              key={i}
              linePosition={i}
              notes={props.partition[i]}
              noteColors={line.colors}
              sounds={line.sounds}
              lengthOfPage={lengthOfPage}
              currentPage={currentPage}
              highlightedNote={highlightedNote}
              animatedNotes={animatedNotes}
            />
          );
        })}
      </MusicGrid>
    </SongPost>
  );
};
