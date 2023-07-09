import { Request, Response } from 'express';
import { Song } from '../../models';

export const deleteSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await Song.findByIdAndDelete(id);
      res.json({ message: "The song was deleted with success" });
    } catch (error) {
      res.json(error);
    }
  }