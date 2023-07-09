import { Request, Response } from 'express';
import { Instrument } from '../../models';

export const getInstrumentByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const instrument = await Instrument.find({ name }).populate("sounds");
      if (!instrument) {
        throw new Error("instrument not found");
      }
      res.json(instrument);
    } catch (error) {
      res.json(error);
    }
}
