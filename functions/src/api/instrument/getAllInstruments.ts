import { Request, Response } from 'express';
import { Instrument } from '../../models';

export const getAllInstruments = async (req: Request, res: Response) => {
    const { category } = req.query || null;
    const { names } = req.query || null;
    try {
      const instruments = category
        ? await Instrument.find({ category }).populate("sounds")
        : names
        ? await Instrument.find({
            name: { $in: names },
          }).populate("sounds")
        : await Instrument.find().populate("sounds");
      if (!instruments) {
        throw new Error("could not find any instruments");
      }
      const reversedIntruments = instruments.reverse();
      res.json(reversedIntruments);
    } catch (error) {
      res.json(error);
    }
  }