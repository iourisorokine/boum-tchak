import React, { FC, useState } from "react";
import { ExpandedMenuItem, Button, Input } from "../../../ui-kit";
import { User } from '../../../types';

export interface SaveSongProps {
  saveTheSong: ( title: string ) => void;
  user: User;
  toggleIsSaveSongVisible: () => void;
}

export const SaveSong: FC<SaveSongProps> = ({ saveTheSong, user, toggleIsSaveSongVisible }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e: any) => {
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
              will be published as annonymous... too bad!
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
