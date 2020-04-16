import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { IUser } from './interfaces/User';
import { parseSqlResult, checkMd5 } from './helpers/helpers';
import { connect } from './database';
import {Request, Response} from 'express';


const authenticateUser = async (req:any, username:string, password:string, done: Function): Promise<any> => {
	
	const passMd5:string = checkMd5(password);
	const query:string = `SELECT * FROM usuarios where usuario = ? and clave = ?`;
		
		try{
			
			const conn = await connect("nomina2020_"+req.body.codigo);
			
			const row = await conn.query(query, [username,passMd5]);
				if (JSON.stringify(row[0]).length===2)
				{
					return done(null, false, req.flash('errorLoginMsg', 'Datos incorrectos'));
				}else
				{
					const user = parseSqlResult(row[0]);
					req.session.bd = "nomina2020_"+req.body.codigo;
					user.bd=req.session.bd;
					return done(null, user );
				}
			
		}catch(err){
			return done(null, false, req.flash('errorLoginMsg', 'NO DB ERR'));
		}
		
	
  
};


passport.use(new LocalStrategy({
    usernameField: 'username',
	passReqToCallback : true
}, authenticateUser));

passport.serializeUser((user:IUser, done) => {
  done(null, user);
});

passport.deserializeUser(async (u:IUser, done) => {
      try{
		  const conn = await connect(u.bd);
		  const rows = await conn.query("SELECT * FROM usuarios WHERE id = ?", [u.id]);
		  const user = parseSqlResult(rows[0]);
		  user.bd = u.bd;
		  done(null, user);  
	  }catch(err){
		  console.log(err);
	  }
 
});



