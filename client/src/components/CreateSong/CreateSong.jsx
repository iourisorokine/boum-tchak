import React from "react";
import { CreateLine } from "./CreateLine";
import { MusicGrid } from "../../ui-kit";
import { PlayControls } from "./PlayControls";
import { AdvControls } from "./AdvControls";
import { AddInstrument } from "./AddInstrument";
import { SaveSong } from "./SaveSong";
import {
  preparePartition,
  prepareInstruments,
  prepareOneInstrument,
} from "../utils/instruments";
import axios from "axios";

const START_PARTITION_LENGTH = 8;
const DEFAULT_TEMPO = 120;
const DEFAULT_TIMEOUT = 60000 / 120 / 4;

export class CreateSong extends React.Component {
  state = {
    partition: [],
    isPlaying: false,
    musicPlaying: null,
    highlightedNote: -1,
    musicLines: [],
    tempo: DEFAULT_TEMPO,
    timeoutTempo: DEFAULT_TIMEOUT,
    isNotePlayedOnClick: true,
    isAddInstrumentVisible: false,
    isSaveSongVisible: false,
  };

  componentWillUnmount() {
    this.stopPlaying();
  }

  componentDidMount() {
    const prepareMusic = async () => {
      const { data } = await axios.get("/api/instrument/starter");
      const musicLines = prepareInstruments(data);
      const newPartition = preparePartition(musicLines, START_PARTITION_LENGTH);
      this.setState({ musicLines, partition: newPartition });
    };
    prepareMusic();
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

  /* Plays one beat of the music, 
  each note of the beat being the note on each line corresponding 
  to the selected index */
  playBeat = (lines, partition, beatNumber) => {
    partition.forEach((line, i) => {
      if (line[beatNumber]) {
        const soundIndex = line[beatNumber];
        lines[i].sounds[soundIndex].currentTime = 0;
        lines[i].sounds[soundIndex].play();
      }
    });
  };

  playMusic = (musicLines, partition, tempo) => {
    this.setState({ isPlaying: true });
    let counter = 0;
    this.setState({
      musicPlaying: setInterval(() => {
        this.setState({ highlightedNote: counter });
        this.playBeat(musicLines, partition, counter);
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

  addOneBar = () => {
    const updatedPartition = [...this.state.partition];
    updatedPartition.forEach((el) => {
      el.push(0);
    });
    this.setState({ partition: updatedPartition });
  };

  removeOneBar = () => {
    const updatedPartition = [...this.state.partition];
    const last = updatedPartition[0].length - 1;
    updatedPartition.forEach((el) => {
      el.splice(last, 1);
    });
    this.setState({ partition: updatedPartition });
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
          isNotePlayedOnClick={this.state.isNotePlayedOnClick}
          setIsNotePlayedOnClick={this.setIsNotePlayedOnClick}
        />
        <AdvControls
          toggleIsAddInstrumentVisible={this.toggleIsAddInstrumentVisible}
          toggleIsSaveSongVisible={this.toggleIsSaveSongVisible}
        />
        {this.state.isAddInstrumentVisible && (
          <AddInstrument
            addInstrument={this.addInstrument}
            toggleIsAddInstrumentVisible={this.toggleIsAddInstrumentVisible}
          />
        )}
        {this.state.isSaveSongVisible && <SaveSong />}
      </React.Fragment>
    );
  }
}
