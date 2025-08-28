import { Request, Response, NextFunction } from 'express';
import { PlayersRepo } from '../repositories/playersRepo';
import { removeFromInventory } from '../utils/inventory';

export const InventoryController = {
  list: (req: Request, res: Response, next: NextFunction) => {
    const player = PlayersRepo.getById(req.params.id);
    if (!player) return next({ status: 404, message: 'Jugador no encontrado' });
    res.json(player.inventory);
  },
  deleteItem: (req: Request, res: Response, next: NextFunction) => {
    const player = PlayersRepo.getById(req.params.id);
    if (!player) return next({ status: 404, message: 'Jugador no encontrado' });
    const quantity = req.body?.quantity ?? 1;
    if (!Number.isInteger(quantity) || quantity < 1) {
      return next({ status: 400, message: 'quantity debe ser entero >= 1' });
    }
    const { inventory, ok } = removeFromInventory(player.inventory, req.params.itemId, quantity);
    if (!ok) return next({ status: 400, message: 'No hay cantidad suficiente o item inexistente' });
    PlayersRepo.update(player.id, { ...player, inventory });
    res.status(204).send();
  }
};


