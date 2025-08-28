import { Router } from 'express';
import { RecipesController } from '../controllers/recipesController';

const router = Router();

router.get('/', RecipesController.list);
router.get('/player/:id', RecipesController.listLearnableForPlayer);

export default router;
