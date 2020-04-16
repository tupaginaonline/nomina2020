export interface IUser {
	id?: number; 
	usuario:string;
	nombre:string;
	apellido:string;
	clave?:string;
	bd?:string | undefined;
}