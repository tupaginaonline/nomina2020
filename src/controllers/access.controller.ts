import { Request, Response } from 'express';
import  { connect } from '../database';

// Modules
import passport from  "passport" ;



export  const renderLogin = (req: Request, res: Response) => {
	//const conn = await connect();
	//const employes = await conn.query("SELECT * FROM empleados");
	//return res.json(employes[0])
	//let viewModel = { empleados: {} };
	//viewModel.empleados = employes[0] ;
	//let viewModel = { empleados :employes[0] };
	 res.render("users/login");
}


  
export const signin = passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true
  });  
  

export const logout = (req: Request, res: Response): Response | void => {
	
	req.logout();
	req.flash("successLoginMsg", "Has salido satisfactoriamente");
	return res.redirect("/");
	
}


export const dashboard = async (req:any,res:Response): Promise<Response | void>  =>  {
	
	try{
		const conn = await connect(req.user.bd);
		
		const employes = await conn.query("SELECT * FROM empleados");
		
	    return res.render("dashboard", {employees:employes[0]});
		
	}catch(err){
		res.status(500).send("Error");
	}
	
}