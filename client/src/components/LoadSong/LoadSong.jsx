import React, { useState, useEffect } from "react";
import { ExpandedMenuItem, SelectableItem, Button } from "../../ui-kit";
import axios from "axios";

export const LoadSong = () => {
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () =>{
        const {data} = await axios.get("/api/song")
        setSongsList(data);
        setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <ExpandedMenuItem>
      <h3>Load Song</h3>
      {songsList.map((el) => {
        return (
          <SelectableItem key={el._id} onClick={()=>{setSelectedSong(el._id)}}>
            <p>{el.title}</p>
          </SelectableItem>
        );
      })}
      <div>
        <Button>Load</Button>
        <Button>Cancel</Button>
      </div>
    </ExpandedMenuItem>
  );
};
