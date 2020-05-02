import React, { useState, useEffect } from "react";
import { Bars } from "svg-loaders-react";
import axios from "axios";
import { DisplaySong } from "./DisplaySong";
import { prepareInstruments } from "../utils/instruments";
import { BlankSpace } from "../../ui-kit";

export const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");

  const loadSongs = async () => {
    setLoading(true);
    const { data: loadedSongs } = await axios.get(
      `/api/song/posted/${currentPage}`,
      {
        page: 1,
      }
    );
    if (!loadedSongs.length) {
      setMessage("no more songs to load...");
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }
    loadedSongs.forEach((song) => {
      const preparedInstruments = prepareInstruments(song.instruments);
      song.instruments = preparedInstruments;
    });
    setSongs([...songs, ...loadedSongs]);
    setLoading(false);
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
            creatorName={song.creatorName}
          />
        );
      })}
      {loading ? (
        <Bars width={100} height={50} fill="#000" stroke="#000" />
      ) : message ? (
        <p>{message}</p>
      ) : (
        <p onClick={loadMore}>loadMore</p>
      )}
      <BlankSpace height="100px" />
    </React.Fragment>
  );
};
