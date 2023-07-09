import { Request, Response } from 'express';
import { Instrument } from '../../models';

export const getInstrumentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const instrument = await Instrument.findById(id).populate("sounds");
      if (!instrument) {
        throw new Error("instrument not found");
      }
      res.json(instrument);
    } catch (error) {
      res.json(error);
    }
}
