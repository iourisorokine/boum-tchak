import React, { useState, useEffect } from "react";
import { CreateLine } from "./CreateLine";
import { MusicGrid, ExpandedMenuItem } from "../../ui-kit";
import { PageSquares } from "../Shared/PageSquares";
import { PlayControls } from "./PlayControls";
import { AdvControls } from "./AdvControls";
import { AddInstrument } from "./AddInstrument";
import { SaveSong } from "./SaveSong";
import { ToolsLine } from "./ToolsLine";
import {
  playBeat,
  preparePartition,
  prepareInstruments,
  prepareOneInstrument,
} from "../utils";
import axios from "axios";

const START_PARTITION_LENGTH = 8;
const MAX_PARTITION_LENGTH = 64;
const DEFAULT_TEMPO = 120;
const DEFAULT_TIMEOUT = 60000 / 120 / 4;

export const CreateSong = (props) => {
  const [partition, setPartition] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedNote, setHighlightedNote] = useState([-1]);
  const [animatedNotes, setAnimatedNotes] = useState([]);
  const [musicLines, setMusicLines] = useState([]);
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const [timeoutTempo, setTimeoutTempo] = useState(DEFAULT_TIMEOUT);
  const [isNotePlayedOnClick, setIsNotePlayedOnClick] = useState(true);
  const [isAddInstrumentVisible, setIsAddInstrumentVisible] = useState(false);
  const [isSaveSongVisible, setIsSaveSongVisible] = useState(false);
  const [bottomMessage, setBottomMessage] = useState("");
  const [isDeleteLineVisible, setIsDeleteLineVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1]);

  let musicPlaying = React.useRef(null);

  const lengthOfPage = window.innerWidth >= 800 ? 16 : 12;

  useEffect(() => {
    const songIdToLoad = props?.match?.params?.id;
    if (songIdToLoad) {
      prepareLoadedSong(songIdToLoad);
    } else {
      prepareNewMusic();
    }
    return () => stopPlaying();
  }, []);

  const prepareNewMusic = async () => {
    const { data } = await axios.get("/api/instrument/starter");
    const musicLines = prepareInstruments(data);
    const newPartition = preparePartition(musicLines, START_PARTITION_LENGTH);
    setMusicLines(musicLines);
    setPartition(newPartition);
  };

  const prepareLoadedSong = async (songIdToLoad) => {
    const { data: loadedSong } = await axios.get(`/api/song/${songIdToLoad}`);
    console.log(loadedSong);
    const newInstruments = [...loadedSong.instruments];
    const musicLines = prepareInstruments(newInstruments);
    setMusicLines(musicLines);
    setPartition(loadedSong.partition);
    setTempo(loadedSong.tempo);
    setTimeoutTempo(60000 / loadedSong.tempo / 4);
  };

  const addOneBar = () => {
    if (partition.length && partition[0].length < MAX_PARTITION_LENGTH) {
      const updatedPartition = [...partition];
      updatedPartition.forEach((el) => {
        el.push(0);
      });
      const pagesCalc = Math.ceil(updatedPartition[0].length / lengthOfPage);
      const pagesUpdate = pages.length < pagesCalc ? pages.concat([1]) : pages;
      setPartition(updatedPartition);
      setPages(pagesUpdate);
    }
  };

  const removeOneBar = () => {
    const updatedPartition = [...partition];
    const last = updatedPartition[0].length - 1;
    updatedPartition.forEach((el) => {
      el.splice(last, 1);
    });
    const pagesCalc = Math.ceil(updatedPartition[0].length / lengthOfPage);
    const pagesUpdate =
      pages.length > pagesCalc ? pages.slice(0, pages.length - 1) : pages;
    setPartition(updatedPartition);
    setPages(pagesUpdate);
    if (currentPage > pagesUpdate.length) setCurrentPage(pagesUpdate.length);
  };

  const deleteLine = (lineNumber) => {
    const updatedPartition = [...partition];
    const updatedMusicLines = [...musicLines];
    updatedPartition.splice(lineNumber, 1);
    updatedMusicLines.splice(lineNumber, 1);
    setPartition(updatedPartition);
    setMusicLines(updatedMusicLines);
    toggleIsDeleteLineVisible();
  };

  const toggleIsDeleteLineVisible = () => {
    if (partition.length) setIsDeleteLineVisible(!isDeleteLineVisible);
  };

  const toggleIsAddInstrumentVisible = () => {
    setIsAddInstrumentVisible(!isAddInstrumentVisible);
  };

  const playMusic = (musicLines, partition, tempo) => {
    if (!partition || !partition.length) return;
    setIsPlaying(true);
    setCurrentPage(1);
    let counter = 0;

    const playInterval = () => {
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
    };

    musicPlaying.current = setInterval(playInterval, tempo);
  };

  const onPlayBtnPress = () => {
    playMusic(musicLines, partition, timeoutTempo);
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    clearInterval(musicPlaying.current);
  };

  const addInstrument = (instr) => {
    const length = partition[0] ? partition[0].length : 8;
    const newPartitionRow = [];
    for (let i = 1; i <= length; i++) {
      newPartitionRow.push(0);
    }
    const newPartition = [...partition];
    const newMusicLines = [...musicLines];
    const preparedNewInstrument = prepareOneInstrument(instr);
    newMusicLines.push(preparedNewInstrument);
    newPartition.push(newPartitionRow);
    setMusicLines(newMusicLines);
    setPartition(newPartition);
  };

  const toggleActiveNote = (col, row, sounds) => {
    const updatedPartition = [...partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    if (sounds[newIndex] && isNotePlayedOnClick) {
      sounds[newIndex].play();
    }
    setPartition(updatedPartition);
  };

  const saveTheSong = async (title) => {
    const songInstruments = musicLines.map((el) => {
      return el.id;
    });
    const songData = {
      title,
      partition,
      tempo,
      instruments: songInstruments,
      creator: props.user._id || "anonymous",
      creatorName: props.user.username || "anonymous",
      posted: true,
    };
    await axios.post("api/song/", songData);
    setIsSaveSongVisible(false);
    setBottomMessage(`New song "${title}" successfully saved!`);
    setTimeout(() => {
      setBottomMessage("");
    }, 1500);
  };

  return (
    <React.Fragment>
      {isAddInstrumentVisible && (
        <AddInstrument
          addInstrument={addInstrument}
          toggleIsAddInstrumentVisible={toggleIsAddInstrumentVisible}
        />
      )}
      {isSaveSongVisible && (
        <SaveSong
          saveTheSong={saveTheSong}
          toggleIsSaveSongVisible={() =>
            setIsSaveSongVisible(!isSaveSongVisible)
          }
          user={props.user}
        />
      )}
      {bottomMessage && (
        <ExpandedMenuItem>
          <p>{bottomMessage}</p>
        </ExpandedMenuItem>
      )}
      <PageSquares
        pages={pages}
        selectPage={setCurrentPage}
        currentPage={currentPage}
        createMode
      />
      <div
        style={{
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <MusicGrid>
          <ToolsLine
            notes={partition[0]}
            lengthOfPage={lengthOfPage}
            isLastPage={currentPage === pages.length}
          />
          {musicLines.length ? (
            musicLines.map((line, i) => {
              return (
                <CreateLine
                  key={i}
                  linePosition={i}
                  label={line.label}
                  notes={partition[i]}
                  noteColors={line.colors}
                  toggleActiveNote={toggleActiveNote}
                  sounds={line.sounds}
                  highlightedNote={highlightedNote}
                  animatedNotes={animatedNotes}
                  isDeleteLineVisible={isDeleteLineVisible}
                  deleteLine={deleteLine}
                  currentPage={currentPage}
                  lenghtOfPage={lengthOfPage}
                />
              );
            })
          ) : (
            <p>
              No partition to display yet... Click on "Add Instruments" to start
              composing.
            </p>
          )}
        </MusicGrid>
      </div>
      <PlayControls
        onPlayBtnPress={onPlayBtnPress}
        onStopBtnPress={stopPlaying}
        addOneBar={addOneBar}
        removeOneBar={removeOneBar}
        isPlaying={isPlaying}
        tempo={tempo}
        setTempo={setTempo}
        setTimeoutTempo={setTimeoutTempo}
        numberOfBars={partition[0] ? partition[0].length : 0}
        isNotePlayedOnClick={isNotePlayedOnClick}
        setIsNotePlayedOnClick={setIsNotePlayedOnClick}
      />
      <AdvControls
        toggleIsAddInstrumentVisible={toggleIsAddInstrumentVisible}
        toggleIsSaveSongVisible={() => setIsSaveSongVisible(!isSaveSongVisible)}
        toggleIsDeleteLineVisible={toggleIsDeleteLineVisible}
        user={props.user}
      />
    </React.Fragment>
  );
};
