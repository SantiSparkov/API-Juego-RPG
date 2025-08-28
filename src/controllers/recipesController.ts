import { Request, Response, NextFunction } from 'express';
import { RECIPES } from '../repositories/staticData';
import { PlayersRepo } from '../repositories/playersRepo';

export const RecipesController = {
  list: (_req: Request, res: Response) => {
    res.json(RECIPES);
  },
  listLearnableForPlayer: (req: Request, res: Response, next: NextFunction) => {
    const player = PlayersRepo.getById(req.params.id);
    if (!player) return next({ status: 404, message: 'Jugador no encontrado' });
    // Para este MVP, asumimos que todas las recetas son "aprendibles". Podrías filtrar por nivel/skills.
    res.json(RECIPES);
  }
};


