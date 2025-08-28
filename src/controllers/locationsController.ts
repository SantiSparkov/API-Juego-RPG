import { Request, Response } from 'express';
import { LOCATIONS } from '../repositories/staticData';

export const LocationsController = {
  list: (_req: Request, res: Response) => {
    res.json(LOCATIONS);
  }
};


