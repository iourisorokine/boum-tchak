import { Request, Response } from 'express';
import { Instrument } from '../../models';
import { updateUserInstruments } from './updateUserInstruments';

export const createInstrument = async (req: Request, res: Response) => {
    const {
      name,
      category,
      subCategory,
      sounds,
      colors,
      creator,
      isPrivate,
    } = req.body;
    const foundSameName = await Instrument.findOne({ name }).populate("sounds");
    if (foundSameName) {
      res.json({
        message:
          "An instrument with the same name already exists, please create a unique name",
      });
    }
    if (sounds.length < 2) {
      res.json({
        message: "An instrument should contain at least one playable sound",
      });
    }
    if (!name || !category || !subCategory) {
      res.json({
        message: "One or several fields are missing",
      });
    }
    try {
      const newInstrument = await Instrument.create({
        name,
        category,
        subCategory,
        sounds,
        colors,
        creator,
        private: isPrivate,
      });
      if (creator) {
        await updateUserInstruments(creator, newInstrument._id);
      }
      res.json(newInstrument);
    } catch (error) {
      res.json(error);
    }
  };
