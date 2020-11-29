import React, { useState, useEffect, useContext } from "react";
import { CreateLine } from "./CreateLine";
import { MusicGrid, ExpandedMenuItem, AverageEditBtn, Row } from "../../ui-kit";
import { PageCircles } from "../Shared/PageCircles";
import { PlayControls } from "./PlayControls";
import { AdvControls } from "./AdvControls";
import { AddInstrument } from "./AddInstrument";
import { SaveSong } from "./SaveSong";
import { ToolsLine } from "./ToolsLine";
import { config } from "./../../config/config";
import {
  playBeat,
  getRandomName,
  preparePartition,
  prepareInstruments,
  prepareOneInstrument,
  playOneToneJsNote,
} from "../utils";
import axios from "axios";
import { globalContext } from "../../context/GlobalContext";

export const CreateSong = (props) => {
  const [highlightedNote, setHighlightedNote] = useState([-1]);
  const [animatedNotes, setAnimatedNotes] = useState([]);
  const [bottomMessage, setBottomMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1]);

  let musicPlaying = React.useRef(null);

  const lengthOfPage = window.innerWidth >= 800 ? 16 : 12;

  const {
    tempo,
    setTempo,
    setIsPlaying,
    timeoutTempo,
    instruments,
    setInstruments,
    partition,
    setPartition,
    setTimeoutTempo,
    isNotePlayedOnClick,
    isAddInstrumentVisible,
    toggleIsAddInstrumentVisible,
    toggleIsRemoveInstrumentVisible,
    isSaveSongVisible,
    setIsSaveSongVisible,
  } = useContext(globalContext);

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
    const preparedInstruments = prepareInstruments(data);
    const newPartition = preparePartition(
      preparedInstruments,
      config.START_PARTITION_LENGTH
    );
    setInstruments(preparedInstruments);
    setPartition(newPartition);
  };

  const prepareLoadedSong = async (songIdToLoad) => {
    const { data: loadedSong } = await axios.get(`/api/song/${songIdToLoad}`);
    const newInstruments = [...loadedSong.instruments];
    const preparedInstruments = prepareInstruments(newInstruments);
    setInstruments(preparedInstruments);
    setPartition(loadedSong.partition);
    setTempo(loadedSong.tempo);
    setTimeoutTempo(60000 / loadedSong.tempo / 4);
    const numberOfPages = Math.ceil(
      loadedSong.partition[0].length / lengthOfPage
    );
    const newPages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      newPages.push(1);
    }
    setPages(newPages);
  };

  const addOneBar = () => {
    if (partition.length && partition[0].length < config.MAX_PARTITION_LENGTH) {
      const updatedPartition = [...partition];
      updatedPartition.forEach((el) => {
        el.push(0);
      });
      const pagesCalculation = Math.ceil(
        updatedPartition[0].length / lengthOfPage
      );
      const pagesUpdate =
        pages.length < pagesCalculation ? pages.concat([1]) : pages;
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

  const playMusic = (instruments, partition, tempo) => {
    if (!partition || !partition.length) return;
    setIsPlaying(true);
    setCurrentPage(1);
    let counter = 0;

    const playInterval = () => {
      setHighlightedNote(counter);
      setAnimatedNotes([counter - 1, counter, counter + 1]);
      playBeat(instruments, partition, counter);
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
    playMusic(instruments, partition, timeoutTempo);
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
    const newInstruments = [...instruments];
    const preparedNewInstrument = prepareOneInstrument(instr);
    newInstruments.push(preparedNewInstrument);
    newPartition.push(newPartitionRow);
    setInstruments(newInstruments);
    setPartition(newPartition);
  };

  const toggleActiveNote = (col, row, sounds, pitches) => {
    const updatedPartition = [...partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    if (sounds[newIndex] instanceof Audio && isNotePlayedOnClick) {
      sounds[newIndex].play();
    } else if (instruments[row].isToneJs && pitches.length) {
      if (pitches[newIndex]) playOneToneJsNote(pitches[newIndex]);
    }
    setPartition(updatedPartition);
  };

  const saveTheSong = async (title) => {
    const songInstruments = instruments.map((el) => {
      return el.id;
    });
    const songData = {
      title,
      partition,
      tempo,
      instruments: songInstruments,
      creator: props.user?._id || undefined,
      creatorName: props.user?.username || getRandomName(),
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
        <AddInstrument addInstrument={addInstrument} />
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
      <PageCircles
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
            totalLength={partition[0] && partition[0].length}
            lengthOfPage={lengthOfPage}
            isLastPage={currentPage === pages.length}
            currentPage={currentPage}
          />
          {instruments.length ? (
            <React.Fragment>
              {instruments.map((instrument, i) => {
                return (
                  <CreateLine
                    key={i}
                    linePosition={i}
                    label={instrument.label}
                    notes={partition[i]}
                    noteColors={instrument.colors}
                    toggleActiveNote={toggleActiveNote}
                    sounds={instrument.sounds}
                    pitches={instrument.pitches}
                    highlightedNote={highlightedNote}
                    animatedNotes={animatedNotes}
                    currentPage={currentPage}
                    lenghtOfPage={lengthOfPage}
                  />
                );
              })}
            <Row padding='16px 0px 0px 0px'>
              <AverageEditBtn padding='2px 16px 2px 16px' onClick={toggleIsAddInstrumentVisible}>+ Add</AverageEditBtn>
              <AverageEditBtn padding='2px 8px 2px 8px' onClick={toggleIsRemoveInstrumentVisible}>- Remove</AverageEditBtn>
            </Row>
          </React.Fragment>
          ) : (
            <AverageEditBtn padding={'8px 8px 8px 8px'} onClick={toggleIsAddInstrumentVisible}>
              No partition to display yet... Click here to add your first instrument
            </AverageEditBtn>
          )}
        </MusicGrid>
      </div>
      <PlayControls
        onPlayBtnPress={onPlayBtnPress}
        onStopBtnPress={stopPlaying}
        addOneBar={addOneBar}
        removeOneBar={removeOneBar}
        numberOfBars={partition[0] ? partition[0].length : 0}
      />
      <AdvControls
        toggleIsSaveSongVisible={() => setIsSaveSongVisible(!isSaveSongVisible)}
        user={props.user}
      />
    </React.Fragment>
  );
};
