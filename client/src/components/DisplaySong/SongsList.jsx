import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisplaySong } from "./DisplaySong";
import { prepareInstruments } from "../utils/instruments";

export const SongsList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const prepareLoadedSongs = async () => {
      const { data: loadedSongs } = await axios.get(`/api/song/`);
      loadedSongs.forEach((song) => {
        const preparedInstruments = prepareInstruments(song.instruments);
        song.instruments = preparedInstruments;
      });
      setSongs(loadedSongs);
    };
    prepareLoadedSongs();
  }, []);

  return (
    <React.Fragment>
      {songs.map((song) => {
        return (
          <DisplaySong
            title={song.title}
            partition={song.partition}
            musicLines={song.instruments}
            tempo={song.tempo}
          />
        );
      })}
    </React.Fragment>
  );
};
