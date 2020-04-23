import React from "react";
import { CreateLine } from "./CreateLine";
import { MusicGrid, ExpandedMenuItem } from "../../ui-kit";
import { PlayControls } from "./PlayControls";
import { AdvControls } from "./AdvControls";
import { AddInstrument } from "./AddInstrument";
import { SaveSong } from "./SaveSong";
import {
  playBeat,
  preparePartition,
  prepareInstruments,
  prepareOneInstrument,
} from "../utils";
import axios from "axios";

const START_PARTITION_LENGTH = 8;
const MAX_PARTITION_LENGTH = 20;
const DEFAULT_TEMPO = 120;
const DEFAULT_TIMEOUT = 60000 / 120 / 4;

export class CreateSong extends React.Component {
  state = {
    partition: [],
    isPlaying: false,
    musicPlaying: null,
    highlightedNote: [-1],
    animatedNotes: [],
    musicLines: [],
    tempo: DEFAULT_TEMPO,
    timeoutTempo: DEFAULT_TIMEOUT,
    isNotePlayedOnClick: true,
    isAddInstrumentVisible: false,
    isSaveSongVisible: false,
    bottomMessage: "",
    isDeleteLineVisible: false,
  };

  componentWillUnmount() {
    this.stopPlaying();
  }

  componentDidMount() {
    const prepareNewMusic = async () => {
      const { data } = await axios.get("/api/instrument/starter");
      const musicLines = prepareInstruments(data);
      const newPartition = preparePartition(musicLines, START_PARTITION_LENGTH);
      this.setState({ musicLines, partition: newPartition });
    };

    const prepareLoadedSong = async () => {
      const songId = this.props.match.params.id;
      const { data: loadedSong } = await axios.get(`/api/song/${songId}`);
      const newInstruments = [...loadedSong.instruments];
      const musicLines = prepareInstruments(newInstruments);
      this.setState({
        musicLines,
        partition: loadedSong.partition,
        tempo: loadedSong.tempo,
        timeoutTempo: 60000 / loadedSong.tempo / 4,
      });
    };

    if (
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      prepareLoadedSong();
    } else {
      prepareNewMusic();
    }
  }

  addInstrument = (instr) => {
    const length = this.state.partition[0] ? this.state.partition[0].length : 8;
    const newPartitionRow = [];
    for (let i = 1; i <= length; i++) {
      newPartitionRow.push(0);
    }
    const newPartition = [...this.state.partition];
    const newMusicLines = [...this.state.musicLines];
    const preparedNewInstrument = prepareOneInstrument(instr);
    newMusicLines.push(preparedNewInstrument);
    newPartition.push(newPartitionRow);
    this.setState({ musicLines: newMusicLines, partition: newPartition });
  };

  toggleActiveNote = (col, row, sounds) => {
    const updatedPartition = [...this.state.partition];
    const depth = sounds.length;
    const newIndex = (updatedPartition[row][col] + 1) % depth;
    updatedPartition[row][col] = newIndex;
    if (sounds[newIndex] && this.state.isNotePlayedOnClick) {
      sounds[newIndex].play();
    }
    this.setState({ partition: updatedPartition });
  };

  playMusic = (musicLines, partition, tempo) => {
    this.setState({ isPlaying: true });
    let counter = 0;
    this.setState({
      musicPlaying: setInterval(() => {
        this.setState({
          highlightedNote: counter,
          animatedNotes: [counter - 1, counter, counter + 1],
        });
        playBeat(musicLines, partition, counter);
        counter++;
        if (counter >= partition[0].length) {
          counter = 0;
        }
      }, tempo),
    });
  };

  stopPlaying = () => {
    this.setState({ isPlaying: false });
    clearInterval(this.state.musicPlaying);
  };

  onStopBtnPress = () => {
    this.stopPlaying();
  };

  onPlayBtnPress = () => {
    this.playMusic(
      this.state.musicLines,
      this.state.partition,
      this.state.timeoutTempo
    );
  };

  saveTheSong = async (title) => {
    const songInstruments = this.state.musicLines.map((el) => {
      return el.id;
    });
    const songData = {
      title,
      partition: this.state.partition,
      tempo: this.state.tempo,
      instruments: songInstruments,
      creator: this.props.user._id || "anonymous",
      creatorName: this.props.user.username || "anonymous",
      posted: true,
    };
    await axios.post("api/song/", songData);
    this.setState({
      isSaveSongVisible: false,
      bottomMessage: `New song "${title}" successfully saved!`,
    });
    setTimeout(() => {
      this.setState({ bottomMessage: "" });
    }, 1500);
  };

  addOneBar = () => {
    if (
      this.state.partition.length &&
      this.state.partition[0].length < MAX_PARTITION_LENGTH
    ) {
      const updatedPartition = [...this.state.partition];
      updatedPartition.forEach((el) => {
        el.push(0);
      });
      this.setState({ partition: updatedPartition });
    }
  };

  removeOneBar = () => {
    const updatedPartition = [...this.state.partition];
    const last = updatedPartition[0].length - 1;
    updatedPartition.forEach((el) => {
      el.splice(last, 1);
    });
    this.setState({ partition: updatedPartition });
  };

  deleteLine = (lineNumber) => {
    const updatedPartition = [...this.state.partition];
    const updatedInstruments = [...this.state.musicLines];
    updatedPartition.splice(lineNumber, 1);
    updatedInstruments.splice(lineNumber, 1);
    this.setState({
      partition: updatedPartition,
      musicLines: updatedInstruments,
    });
    this.toggleIsDeleteLineVisible();
  };

  setIsNotePlayedOnClick = (value) => {
    this.setState({ isNotePlayedOnClick: value });
  };

  setTempo = (value) => {
    this.setState({ tempo: value });
  };

  setTimeoutTempo = (value) => {
    this.setState({ timeoutTempo: value });
  };

  toggleIsAddInstrumentVisible = () => {
    this.setState({
      isAddInstrumentVisible: !this.state.isAddInstrumentVisible,
    });
  };

  toggleIsSaveSongVisible = () => {
    this.setState({
      isSaveSongVisible: !this.state.isSaveSongVisible,
    });
  };

  toggleIsDeleteLineVisible = () => {
    this.setState({
      isDeleteLineVisible: !this.state.isDeleteLineVisible,
    });
  };

  render() {
    return (
      <React.Fragment>
        <MusicGrid>
          {this.state.musicLines &&
            this.state.musicLines.map((line, i) => {
              return (
                <CreateLine
                  key={i}
                  linePosition={i}
                  label={line.label}
                  notes={this.state.partition[i]}
                  noteColors={line.colors}
                  toggleActiveNote={this.toggleActiveNote}
                  sounds={line.sounds}
                  highlightedNote={this.state.highlightedNote}
                  animatedNotes={this.state.animatedNotes}
                  isDeleteLineVisible={this.state.isDeleteLineVisible}
                  deleteLine={this.deleteLine}
                />
              );
            })}
        </MusicGrid>
        <PlayControls
          onPlayBtnPress={this.onPlayBtnPress}
          onStopBtnPress={this.onStopBtnPress}
          addOneBar={this.addOneBar}
          removeOneBar={this.removeOneBar}
          isPlaying={this.state.isPlaying}
          tempo={this.state.tempo}
          setTempo={this.setTempo}
          setTimeoutTempo={this.setTimeoutTempo}
          numberOfBars={
            this.state.partition[0] ? this.state.partition[0].length : 0
          }
          isNotePlayedOnClick={this.state.isNotePlayedOnClick}
          setIsNotePlayedOnClick={this.setIsNotePlayedOnClick}
        />
        <AdvControls
          toggleIsAddInstrumentVisible={this.toggleIsAddInstrumentVisible}
          toggleIsSaveSongVisible={this.toggleIsSaveSongVisible}
          toggleIsDeleteLineVisible={this.toggleIsDeleteLineVisible}
        />
        {this.state.isAddInstrumentVisible && (
          <AddInstrument
            addInstrument={this.addInstrument}
            toggleIsAddInstrumentVisible={this.toggleIsAddInstrumentVisible}
          />
        )}
        {this.state.isSaveSongVisible && (
          <SaveSong saveTheSong={this.saveTheSong} />
        )}
        {this.state.bottomMessage && (
          <ExpandedMenuItem>
            <p>{this.state.bottomMessage}</p>
          </ExpandedMenuItem>
        )}
      </React.Fragment>
    );
  }
}
