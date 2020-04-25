import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExpandedMenuItem, Button, Input } from "../../ui-kit";

export const SaveSong = ({ saveTheSong, user, toggleIsSaveSongVisible }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <ExpandedMenuItem>
      {user ? (
        <React.Fragment>
          <p style={{ margin: 10 }}>
            Name your song (if you modified an existing song, <br />
            it will still be saved under as new one):
          </p>
          <Input
            type="text"
            placeholder="Padapoum"
            value={title}
            onChange={handleChange}
          />
          <div>
            <Button onClick={() => saveTheSong(title)}>Save</Button>
            <Button onClick={() => toggleIsSaveSongVisible()}>Cancel</Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p style={{ margin: 10 }}>
            To save a song, you need to have a profile, but let's do it! <br />
            Please login or signup:
          </p>

          <div>
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </React.Fragment>
      )}
    </ExpandedMenuItem>
  );
};
