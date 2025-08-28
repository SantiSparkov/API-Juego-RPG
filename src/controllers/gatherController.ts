import { Request, Response, NextFunction } from 'express';
import { gatherResources } from '../services/gatherService';

export const GatherController = {
  gather: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { locationId } = req.body ?? {};
      if (typeof locationId !== 'string' || locationId.trim().length === 0) {
        return next({ status: 400, message: 'locationId debe ser string no vacío' });
      }
      const updated = gatherResources(req.params.id, locationId.trim());
      if (!updated) return next({ status: 404, message: 'Jugador no encontrado' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
};


