import { Request, Response } from 'express';
import { Song } from '../../models';

import { updateUserSongs } from './updateUserSongs';

export const createSong = async (req: Request, res: Response) => {
    const { title, partition, instruments, tempo, creator, creatorName, posted } =
      req.body;
    try {
      const newSong = await Song.create({
        title,
        partition,
        instruments,
        tempo,
        creator,
        creatorName,
        posted,
      });
      if (creator) {
        await updateUserSongs(creator, newSong._id);
      }
      res.json(newSong);
    } catch (error) {
      res.json(error);
    }
  }
