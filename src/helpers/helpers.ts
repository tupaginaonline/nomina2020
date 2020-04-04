
export const parseSqlResult = (result:any): any => {
	
	
	
	const resul = JSON.parse(JSON.stringify(result[0]));
	
	//console.log(typeof(resul));
	
	return resul;
}
