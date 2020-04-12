import React from "react";
import { ExpandedMenuItem, Button } from "../../ui-kit";

export const SaveSong = () => {
  return (
    <ExpandedMenuItem>
      <p>Name your song:</p>
      <input type="text" placeholder="Padapoum" />
      <div>
        <Button>Save</Button>
      </div>
    </ExpandedMenuItem>
  );
};
