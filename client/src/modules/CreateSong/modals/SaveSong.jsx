import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExpandedMenuItem, Button, Input } from "../../../ui-kit";

export const SaveSong = ({ saveTheSong, user, toggleIsSaveSongVisible }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <ExpandedMenuItem>
      {
        <React.Fragment>
          {user ? (
            <p style={{ margin: 10 }}>
              Name your song (if you modified an existing song, <br />
              it will still be saved under as new one):
            </p>
          ) : (
            <p style={{ margin: 10 }}>
              You don't have a user account yet, therefore your song <br />
              will be published as annonymous... to bad!
              <br />
              Please create a user profile before saving next time <br />
              Name your song:
            </p>
          )}
          <Input
            type="text"
            placeholder="My Supa Song..."
            value={title}
            width={"260px"}
            onChange={handleChange}
          />
          <div>
            <Button onClick={() => saveTheSong(title)}>Save</Button>
            <Button onClick={() => toggleIsSaveSongVisible()}>Cancel</Button>
          </div>
        </React.Fragment>
      }
    </ExpandedMenuItem>
  );
};
