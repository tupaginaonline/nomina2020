import { Router } from 'express';
import { indexEmployee,listEmployee } from '../controllers/index.employee';

import { isAuthenticated } from '../helpers/auth';

 

const router = Router();

router.route('/')
			.get(isAuthenticated,indexEmployee);

router.route('/:id')
			.get(listEmployee);

export default router;
            
       