import React, { useState, useEffect } from "react";
import {
  ExpandedMenuItem,
  PageLayout,
  SelectableItem,
  Button,
  H2,
} from "../../ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";

export const LoadSong = (props) => {
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(`/api/song/creator/${props.user._id}`);
    setSongsList(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const deleteSong = async (songId) => {
    const response = await axios.delete(`/api/song/${songId}`);
    setMessage(response.message);
    fetchData();
    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  return (
    <PageLayout>
      <H2>Load Song</H2>
      {songsList.map((el) => {
        return (
          <SelectableItem
            key={el._id}
            onClick={() => {
              setSelectedSong(el._id);
            }}>
            <p>
              <span>{selectedSong && selectedSong === el._id && "--> "}</span>
              {el.title}
            </p>
          </SelectableItem>
        );
      })}
      <div>{message && <p>{message}</p>}</div>
      {selectedSong && (
        <div style={{ paddingTop: 20 }}>
          <Link to={`song/${selectedSong}`}>
            <Button>Load</Button>
          </Link>
          <Button onClick={() => deleteSong(selectedSong)}>Delete</Button>
          <Link to={"/"}>
            <Button>Cancel</Button>
          </Link>
        </div>
      )}
    </PageLayout>
  );
};
