import { Router } from 'express';
import { PlayersController } from '../controllers/playersController';
import { GatherController } from '../controllers/gatherController';
import { CraftController } from '../controllers/craftController';
import { InventoryController } from '../controllers/inventoryController';
import { RecipesController } from '../controllers/recipesController';

const router = Router();

router.post('/', PlayersController.create);
router.get('/:id', PlayersController.getById);
router.put('/:id', PlayersController.update);
router.post('/:id/gather', GatherController.gather);
router.post('/:id/craft', CraftController.craft);
router.get('/:id/inventory', InventoryController.list);
router.delete('/:id/inventory/:itemId', InventoryController.deleteItem);
router.get('/:id/recipes', RecipesController.listLearnableForPlayer);

export default router;
