import { createPool, Pool } from 'mysql2/promise';

export const connect = async (dbName:string  | undefined): Promise<Pool> => {
	
			const connection = await createPool({
						host: 'localhost',
						user: 'root',
						database: dbName
			});
			
			
			return connection;
			

}


/*
host: 'bffjve8qdffidcq0larv-mysql.services.clever-cloud.com',
		user: 'u9i1muywsyxeo4fq',
		password:'Fa0wjWMJLhe161kgoPeW',
		database: 'bffjve8qdffidcq0larv',
		connectionLimit: 10

*/

