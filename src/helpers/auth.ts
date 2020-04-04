import { Request , Response } from 'express';
export const isAutheticated = (req: Request, res: Response, next:any) => {
		if (req.isAuthenticated()) {
				return next();
		}
		req.flash('error_msg', 'Not Authorized.');
		res.redirect('/');
}





