import React from "react";
import { DisplayLine } from "./DisplayLine";
import { PageSquares } from "../Shared/PageSquares";
import { playBeat } from "../utils";
import { MusicGrid, SongPost, SongHeader, SongTitle, Row } from "../../ui-kit";

const LENGTH_OF_PAGE = 16;

export class DisplaySong extends React.Component {
  state = {
    isPlaying: false,
    musicPlaying: null,
    highlightedNote: -1,
    animatedNotes: [-1, -1, -1],
    timeoutTempo: 60000 / this.props.tempo / 4,
    currentPage: 1,
    pages: [1],
  };

  componentDidMount() {
    const updatedPages = [];
    const numberOfPages = Math.ceil(
      this.props.partition[0].length / LENGTH_OF_PAGE
    );
    for (let i = 1; i <= numberOfPages; i++) {
      updatedPages.push(1);
    }
    this.setState({ pages: updatedPages });
  }

  componentWillUnmount() {
    this.stopPlaying();
  }

  playMusic = (musicLines, partition, tempo) => {
    this.setState({ isPlaying: true, currentPage: 1 });
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
        if (
          counter > this.state.currentPage * LENGTH_OF_PAGE ||
          counter === 0
        ) {
          this.nextPage();
        }
      }, tempo),
    });
  };

  stopPlaying = () => {
    this.setState({ isPlaying: false });
    clearInterval(this.state.musicPlaying);
  };

  nextPage = () => {
    const current = this.state.currentPage;
    const total = this.state.pages.length;
    const nextPage = current >= total ? 1 : this.state.currentPage + 1;
    this.setState({ currentPage: nextPage });
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
        <Row>
          <PageSquares
            pages={this.state.pages}
            selectPage={this.selectPage}
            currentPage={this.state.currentPage}
            clickable={false}
          />
        </Row>
        <MusicGrid onClick={this.onSongClick}>
          {this.props.musicLines.map((line, i) => {
            return (
              <DisplayLine
                key={i}
                linePosition={i}
                notes={this.props.partition[i]}
                noteColors={line.colors}
                sounds={line.sounds}
                lengthOfPage={LENGTH_OF_PAGE}
                currentPage={this.state.currentPage}
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
