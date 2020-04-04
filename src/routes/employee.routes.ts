import { Router } from 'express';
import { indexEmployee,listEmployee } from '../controllers/index.employee';

import { isAutheticated } from '../helpers/auth';

 

const router = Router();

router.route('/')
			.get(isAutheticated,indexEmployee);

router.route('/:id')
			.get(listEmployee);

export default router;
            
       