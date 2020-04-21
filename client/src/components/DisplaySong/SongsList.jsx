import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisplaySong } from "./DisplaySong";
import { prepareInstruments } from "../utils/instruments";

export const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");

  const loadSongs = async () => {
    const { data: loadedSongs } = await axios.get(
      `/api/song/posted/${currentPage}`,
      {
        page: 1,
      }
    );
    if (!loadedSongs.length) {
      setMessage("no more songs to load...");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    loadedSongs.forEach((song) => {
      const preparedInstruments = prepareInstruments(song.instruments);
      song.instruments = preparedInstruments;
    });
    if (songs.length) {
      const updatedSongs = [...songs].concat(loadedSongs);
      setSongs(updatedSongs);
    } else {
      setSongs(loadedSongs);
    }
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const loadMore = () => {
    loadSongs();
  };

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
      {message && <p>{message}</p>}
      <p onClick={loadMore}>loadMore</p>
    </React.Fragment>
  );
};
