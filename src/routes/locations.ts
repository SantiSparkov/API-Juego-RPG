import { Router } from 'express';
import { LocationsController } from '../controllers/locationsController';

const router = Router();

router.get('/', LocationsController.list);

export default router;
