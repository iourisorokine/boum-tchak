import React, { useState, useEffect } from "react";
import { Bars } from "svg-loaders-react";
import {
  PageLayout,
  SelectableText,
  Button,
  Heading2,
  Column,
} from "../../ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";

export const LoadSong = (props) => {
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/song/creator/${props.user._id}`);
    if (data) {
      setSongsList(data);
      setLoading(false);
    }
  };

  useEffect(() => {
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
      <Heading2>Load Song</Heading2>
      {loading && (
        <Column alignItems="center">
          <Bars width={100} height={50} fill="#000" stroke="#000" />
        </Column>
      )}
      {songsList.map((el) => {
        return (
          <SelectableText
            key={el._id}
            selected={selectedSong === el._id}
            onClick={() => {
              setSelectedSong(el._id);
            }}>
            {el.title}
          </SelectableText>
        );
      })}
      <div>{message && <p>{message}</p>}</div>
      {selectedSong && (
        <div style={{ paddingTop: 20 }}>
          <Link to={`/create/${selectedSong}`}>
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
