import { Request, Response } from 'express';
import  { connect } from '../database';

export async function indexEmployee(req: Request, res: Response): Promise<Response | void> {
	res.render("employee");
}

export async function listEmployee(req: Request, res: Response): Promise<Response | void> {
	const id = req.params.id 
	res.render("listEmployee" , {id});
}