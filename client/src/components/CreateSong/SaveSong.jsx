import React, { useState } from "react";
import { ExpandedMenuItem, Button, Input } from "../../ui-kit";

export const SaveSong = ({ saveTheSong }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <ExpandedMenuItem>
      <p style={{ margin: 10 }}>Name your song:</p>
      <Input
        type="text"
        placeholder="Padapoum"
        value={title}
        onChange={handleChange}
      />
      <div>
        <Button onClick={() => saveTheSong(title)}>Save</Button>
      </div>
    </ExpandedMenuItem>
  );
};
