import md5 from 'md5';

export const parseSqlResult = (result:any): any => {

	const resul = JSON.parse(JSON.stringify(result[0]));
	
	//console.log(typeof(resul));
	
	return resul;
}

export function checkMd5(cadena:string): string {

	return md5(cadena);
}
