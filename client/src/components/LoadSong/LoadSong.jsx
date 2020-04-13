import React, { useState, useEffect } from "react";
import { ExpandedMenuItem, SelectableItem, Button } from "../../ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";

export const LoadSong = () => {
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get("/api/song");
      setSongsList(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <ExpandedMenuItem>
      <h3>Load Song</h3>
      {songsList.map((el) => {
        return (
          <SelectableItem
            key={el._id}
            onClick={() => {
              setSelectedSong(`/song/${el._id}`);
            }}>
            <p>
              <span>
                {selectedSong && selectedSong === `/song/${el._id}` && "--> "}
              </span>
              {el.title}
            </p>
          </SelectableItem>
        );
      })}
      {selectedSong && (
        <div>
          <Link to={selectedSong}>
            <Button>Load</Button>
          </Link>
          <Link to="/">
            <Button>Cancel</Button>
          </Link>
        </div>
      )}
    </ExpandedMenuItem>
  );
};
