import { Router } from 'express';
import { renderLogin, signin, logout, dashboard } from '../controllers/access.controller';

const router = Router();

router.route('/')
			.get(renderLogin)
			.post(signin)
			

router.route('/logout')
			.get(logout)
			

router.route('/dashboard')
			.get(dashboard)
			

export default router;
            
       