import { Request, Response, NextFunction } from 'express';
import { craftItem } from '../services/craftService';

export const CraftController = {
  craft: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { recipeId } = req.body ?? {};
      if (typeof recipeId !== 'string' || recipeId.trim().length === 0) {
        return next({ status: 400, message: 'recipeId debe ser string no vacío' });
      }
      const player = craftItem(req.params.id, recipeId.trim());
      res.json(player);
    } catch (err) {
      next(err);
    }
  }
};


