import React from "react";
import { DisplayLine } from "./DisplayLine";
import { playBeat } from "../utils";
import { MusicGrid, SongPost, SongHeader, SongTitle } from "../../ui-kit";

export class DisplaySong extends React.Component {
  state = {
    isPlaying: false,
    musicPlaying: null,
    highlightedNote: -1,
    animatedNotes: [-1, -1, -1],
    timeoutTempo: 60000 / this.props.tempo / 4,
  };

  componentWillUnmount() {
    this.stopPlaying();
  }

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

  onSongClick = () => {
    if (this.state.isPlaying) {
      this.stopPlaying();
    } else {
      this.playMusic(
        this.props.musicLines,
        this.props.partition,
        this.state.timeoutTempo
      );
    }
  };

  render() {
    return (
      <SongPost>
        <SongHeader>
          <SongTitle b={true}>{this.props.title}</SongTitle>
          <SongTitle>by {this.props.creatorName}</SongTitle>
        </SongHeader>
        <MusicGrid onClick={this.onSongClick}>
          {this.props.musicLines.map((line, i) => {
            return (
              <DisplayLine
                key={i}
                linePosition={i}
                notes={this.props.partition[i]}
                noteColors={line.colors}
                sounds={line.sounds}
                highlightedNote={this.state.highlightedNote}
                animatedNotes={this.state.animatedNotes}
              />
            );
          })}
        </MusicGrid>
      </SongPost>
    );
  }
}
