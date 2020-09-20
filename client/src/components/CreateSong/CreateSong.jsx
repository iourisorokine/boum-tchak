import React from "react";
import { CreateLine } from "./CreateLine";
import { MusicGrid, ExpandedMenuItem } from "../../ui-kit";
import { PageSquares } from "../Shared/PageSquares";
import { PlayControls } from "./PlayControls";
import { AdvControls } from "./AdvControls";
import { AddInstrument } from "./AddInstrument";
import { SaveSong } from "./SaveSong";
import GlobalStateContext from "../GlobalStateContext/GlobalStateContext";
import {
  playBeat,
  preparePartition,
  prepareInstruments,
  prepareOneInstrument,
} from "../utils";
import axios from "axios";

const START_PARTITION_LENGTH = 8;
const MAX_PARTITION_LENGTH = 64;
const LENGTH_OF_PAGE = 16;

export class CreateSong extends React.Component {
  static contextType = GlobalStateContext;

  setGlobalState = this.context.setGlobalState;

  componentWillUnmount() {
    const stopPlaying = this.context.stopPlaying;
    stopPlaying();
  }

  prepareNewMusic = async () => {
    const setGlobalState = this.context.setGlobalState;
    const { data } = await axios.get("/api/instrument/starter");
    const musicLines = prepareInstruments(data);
    const newPartition = preparePartition(musicLines, START_PARTITION_LENGTH);
    setGlobalState({ musicLines, partition: newPartition });
  };

  prepareLoadedSong = async () => {
    const setGlobalState = this.context.setGlobalState;
    const songId = this.props.match.params.id;
    const { data: loadedSong } = await axios.get(`/api/song/${songId}`);
    const newInstruments = [...loadedSong.instruments];
    const musicLines = prepareInstruments(newInstruments);
    setGlobalState({
      musicLines,
      partition: loadedSong.partition,
      tempo: loadedSong.tempo,
      timeoutTempo: 60000 / loadedSong.tempo / 4,
    });
  };

  componentDidMount() {
    if (this.props?.match?.params?.id) {
      this.prepareLoadedSong();
    } else {
      this.prepareNewMusic();
    }
  }

  addOneBar = () => {
    const setGlobalState = this.context.setGlobalState;
    if (
      this.context.globalState.partition.length &&
      this.context.globalState.partition[0].length < MAX_PARTITION_LENGTH
    ) {
      const updatedPartition = [...this.context.globalState.partition];
      updatedPartition.forEach((el) => {
        el.push(0);
      });
      const p = this.context.globalState.pages.length;
      const pagesCalc = Math.ceil(updatedPartition[0].length / LENGTH_OF_PAGE);
      const pagesUpdate =
        p < pagesCalc
          ? this.context.globalState.pages.concat([1])
          : this.context.globalState.pages;
      setGlobalState({ partition: updatedPartition, pages: pagesUpdate });
    }
  };

  removeOneBar = () => {
    const updatedPartition = [...this.context.globalState.partition];
    const last = updatedPartition[0].length - 1;
    updatedPartition.forEach((el) => {
      el.splice(last, 1);
    });
    const p = this.context.globalState.pages.length;
    const pagesCalc = Math.ceil(updatedPartition[0].length / LENGTH_OF_PAGE);
    const pagesUpdate =
      p > pagesCalc ? this.context.globalState.pages.slice(0, p - 1) : this.context.globalState.pages;
    this.context.setGlobalState({ partition: updatedPartition, pages: pagesUpdate });
  };

  deleteLine = (lineNumber) => {
    const updatedPartition = [...this.state.partition];
    const updatedInstruments = [...this.state.musicLines];
    updatedPartition.splice(lineNumber, 1);
    updatedInstruments.splice(lineNumber, 1);
    this.context.setGlobalState({
      partition: updatedPartition,
      musicLines: updatedInstruments,
    });
    this.toggleIsDeleteLineVisible();
  };

  selectPage = (pageNumber) => {
    this.context.setGlobalState({ currentPage: pageNumber });
  };

  nextPage = () => {
    const current = this.context.globalState.currentPage;
    const total = this.context.globalState.pages.length;
    const nextPage = current >= total ? 1 : this.context.globalState.currentPage + 1;
    this.context.setGlobalState({ currentPage: nextPage });
  };

  render() {
    const {
      globalState,
      setGlobalState,
      setIsSaveSongVisible,
      setTempo,
      setTimeoutTempo,
    } = this.context;

    const toggleIsDeleteLineVisible = () => {
      setGlobalState({ isDeleteLineVisible: !globalState.isDeleteLineVisible });
    };

    const toggleIsAddInstrumentVisible = () => {
      setGlobalState({
        isAddInstrumentVisible: !globalState.isAddInstrumentVisible,
      });
    };

    const setIsNotePlayedOnClick = (value) => {
      setGlobalState({ isNotePlayedOnClick: value });
    };

    const playMusic = (musicLines, partition, tempo) => {
      if (!partition || !partition.length) return;
      setGlobalState({ isPlaying: true, currentPage: 1 });
      let counter = 0;
      setGlobalState({
        musicPlaying: setInterval(() => {
          setGlobalState({
            highlightedNote: counter,
            animatedNotes: [counter - 1, counter, counter + 1],
          });
          playBeat(musicLines, partition, counter);
          counter++;
          if (counter >= partition[0].length) {
            counter = 0;
          }
          if (
            counter > this.state.currentPage * LENGTH_OF_PAGE ||
            counter === 0
          ) {
            this.nextPage();
          }
        }, tempo),
      });
    };

    const onPlayBtnPress = () => {
      playMusic(
        globalState.musicLines,
        globalState.partition,
        globalState.timeoutTempo
      );
    };

    const stopPlaying = () => {
      setGlobalState({ isPlaying: false });
      clearInterval(globalState.musicPlaying);
    };

    const onStopBtnPress = () => {
      stopPlaying();
    };

    const addInstrument = (instr) => {
      const length = globalState.partition[0]
        ? globalState.partition[0].length
        : 8;
      const newPartitionRow = [];
      for (let i = 1; i <= length; i++) {
        newPartitionRow.push(0);
      }
      const newPartition = [...globalState.partition];
      const newMusicLines = [...globalState.musicLines];
      const preparedNewInstrument = prepareOneInstrument(instr);
      newMusicLines.push(preparedNewInstrument);
      newPartition.push(newPartitionRow);
      setGlobalState({
        musicLines: newMusicLines,
        partition: newPartition,
      });
    };

    const toggleActiveNote = (col, row, sounds) => {
      const updatedPartition = [...globalState.partition];
      const depth = sounds.length;
      const newIndex = (updatedPartition[row][col] + 1) % depth;
      updatedPartition[row][col] = newIndex;
      if (sounds[newIndex] && globalState.isNotePlayedOnClick) {
        sounds[newIndex].play();
      }
      setGlobalState({ partition: updatedPartition });
    };

    const saveTheSong = async (title) => {
      const songInstruments = globalState.musicLines.map((el) => {
        return el.id;
      });
      const songData = {
        title,
        partition: globalState.partition,
        tempo: globalState.tempo,
        instruments: songInstruments,
        creator: this.props.user._id || "anonymous",
        creatorName: this.props.user.username || "anonymous",
        posted: true,
      };
      await axios.post("api/song/", songData);
      setGlobalState({
        isSaveSongVisible: false,
        bottomMessage: `New song "${title}" successfully saved!`,
      });
      setTimeout(() => {
        setGlobalState({ bottomMessage: "" });
      }, 1500);
    };

    return (
      <React.Fragment>
        {globalState.isAddInstrumentVisible && (
          <AddInstrument
            addInstrument={addInstrument}
            toggleIsAddInstrumentVisible={toggleIsAddInstrumentVisible}
          />
        )}
        {globalState.isSaveSongVisible && (
          <SaveSong
            saveTheSong={saveTheSong}
            toggleIsSaveSongVisible={() =>
              setIsSaveSongVisible(!globalState.isSaveSongVisible)
            }
            user={this.props.user}
          />
        )}
        {globalState.bottomMessage && (
          <ExpandedMenuItem>
            <p>{globalState.bottomMessage}</p>
          </ExpandedMenuItem>
        )}
        <PageSquares
          pages={globalState.pages}
          selectPage={this.selectPage}
          currentPage={globalState.currentPage}
        />
        <div
          style={{
            minHeight: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {!globalState.musicLines.length && (
            <p>
              No partition to display yet... Click on "Add Lines" to start
              composing.
            </p>
          )}
          <MusicGrid>
            {globalState.musicLines &&
              globalState.musicLines.map((line, i) => {
                return (
                  <CreateLine
                    key={i}
                    linePosition={i}
                    label={line.label}
                    notes={globalState.partition[i]}
                    noteColors={line.colors}
                    toggleActiveNote={toggleActiveNote}
                    sounds={line.sounds}
                    highlightedNote={globalState.highlightedNote}
                    animatedNotes={globalState.animatedNotes}
                    isDeleteLineVisible={globalState.isDeleteLineVisible}
                    deleteLine={this.deleteLine}
                    currentPage={globalState.currentPage}
                    lenghtOfPage={LENGTH_OF_PAGE}
                  />
                );
              })}
          </MusicGrid>
        </div>
        <PlayControls
          onPlayBtnPress={onPlayBtnPress}
          onStopBtnPress={onStopBtnPress}
          addOneBar={this.addOneBar}
          removeOneBar={this.removeOneBar}
          isPlaying={globalState.isPlaying}
          tempo={globalState.tempo}
          setTempo={setTempo}
          setTimeoutTempo={setTimeoutTempo}
          numberOfBars={
            globalState.partition[0] ? globalState.partition[0].length : 0
          }
          isNotePlayedOnClick={globalState.isNotePlayedOnClick}
          setIsNotePlayedOnClick={setIsNotePlayedOnClick}
        />
        <AdvControls
          toggleIsAddInstrumentVisible={toggleIsAddInstrumentVisible}
          toggleIsSaveSongVisible={() =>
            setIsSaveSongVisible(!globalState.isSaveSongVisible)
          }
          toggleIsDeleteLineVisible={toggleIsDeleteLineVisible}
          user={this.props.user}
        />
      </React.Fragment>
    );
  }
}
