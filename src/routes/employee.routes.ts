import { Router } from 'express';
import { indexEmployee,listEmployee } from '../controllers/index.employee';

const router = Router();

router.route('/')
			.get(indexEmployee);

router.route('/:id')
			.get(listEmployee);

export default router;
            
       