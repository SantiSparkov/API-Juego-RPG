import { Request, Response, NextFunction } from 'express';
import { createPlayer, getPlayer, updatePlayerStats } from '../services/playersService';

export const PlayersController = {
  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body ?? {};
      if (typeof name !== 'string' || name.trim().length === 0) {
        return next({ status: 400, message: 'name debe ser string no vacío' });
      }
      const player = createPlayer(name.trim());
      res.status(201).json(player);
    } catch (err) {
      next(err);
    }
  },
  getById: (req: Request, res: Response, next: NextFunction) => {
    try {
      const player = getPlayer(req.params.id);
      if (!player) return next({ status: 404, message: 'Jugador no encontrado' });
      res.json(player);
    } catch (err) {
      next(err);
    }
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { experience, level, skills } = req.body ?? {};
      if (experience !== undefined && (!Number.isInteger(experience) || experience < 0)) {
        return next({ status: 400, message: 'experience debe ser entero >= 0' });
      }
      if (level !== undefined && (!Number.isInteger(level) || level < 1)) {
        return next({ status: 400, message: 'level debe ser entero >= 1' });
      }
      if (skills !== undefined) {
        if (typeof skills !== 'object' || skills === null) {
          return next({ status: 400, message: 'skills debe ser objeto' });
        }
        const { mining, woodcutting, crafting } = skills;
        if (mining !== undefined && (!Number.isInteger(mining) || mining < 1)) {
          return next({ status: 400, message: 'skills.mining debe ser entero >= 1' });
        }
        if (woodcutting !== undefined && (!Number.isInteger(woodcutting) || woodcutting < 1)) {
          return next({ status: 400, message: 'skills.woodcutting debe ser entero >= 1' });
        }
        if (crafting !== undefined && (!Number.isInteger(crafting) || crafting < 1)) {
          return next({ status: 400, message: 'skills.crafting debe ser entero >= 1' });
        }
      }
      const updated = updatePlayerStats(req.params.id, { experience, level, skills });
      if (!updated) return next({ status: 404, message: 'Jugador no encontrado' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
};


