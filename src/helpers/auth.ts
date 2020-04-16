import {Request, Response} from 'express';


export const isAuthenticated = (req:Request, res: Response, next: Function) => {

       if (req.isAuthenticated()){
		  return  next();
	   }
		   req.flash('errorLoginMsg','No autorizado');
		   res.redirect('/');
	   

}


export const checkNotAuthenticated = (req:Request, res: Response, next: Function) => {

       if (req.isAuthenticated()){
		    return res.redirect('/dashboard');
	   }
	   
	    next();
}

export const whoIs = (req:any, res: Response, next: Function) => {

       if (req.isAuthenticated()){
		   next();
	   }else{
		   req.flash('errorLoginMsg','No autorizado');
		   res.redirect('/');
	   }

}
