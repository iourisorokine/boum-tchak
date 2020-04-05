import React from "react";
import { DisplaySong } from "./DisplaySong";
import { useDataPresets } from "../data/useDataPresets";

const { songs } = useDataPresets();

export const SongsList = () => {
  return (
    <React.Fragment>
      {songs.map(song => {
        return (
          <DisplaySong
            partition={song.partition}
            musicLines={song.instruments}
            tempo={song.tempo}
          />
        );
      })}
    </React.Fragment>
  );
};
