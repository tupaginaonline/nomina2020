import { Request, Response } from 'express';
import  { connect } from '../database';

export async function indexWelcome(req: Request, res: Response): Promise<Response | void> {
	const conn = await connect();
	const employes = await conn.query("SELECT * FROM empleados");
	//return res.json(employes[0])
	let viewModel = { empleados: {} };
	viewModel.empleados = employes[0] ;
	//let viewModel = { empleados :employes[0] };
	res.render("index",  viewModel );
}