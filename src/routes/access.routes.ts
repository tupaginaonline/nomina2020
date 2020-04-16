import { Router } from 'express';
import { renderLogin, signin, logout, dashboard } from '../controllers/access.controller';
import {isAuthenticated, checkNotAuthenticated} from '../helpers/auth';

const router = Router();

router.route('/')
			.get(checkNotAuthenticated,renderLogin)
			.post(signin)
			

router.route('/logout')
			.get(logout)
			

router.route('/dashboard')
			.get(isAuthenticated,dashboard)
			

export default router;
            
       