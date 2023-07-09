import { Request, Response } from 'express';
import { Instrument } from '../../models';

export const getStarterPackOfInstruments = async (req: Request, res: Response) => {
    try {
        const starterInstruments = await Instrument.find({
          name: { $in: ["Kicks 1", "Snares 1", "Clap 1"] },
        }).populate("sounds");
        if (!starterInstruments || !starterInstruments.length) {
          throw new Error("could not find any instruments");
        }
        res.json(starterInstruments);
      } catch (error) {
        res.json(error);
      }
}