import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { connect } from './database';
import { IUser } from './interfaces/User';
import { parseSqlResult,checkMd5 } from './helpers/helpers';

import {Request,Response} from 'express';
	

export default function passportL(req:Request,res:Response,next: Function){
	
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username:string, password:string, done: Function): Promise<any> => {
	
	const passMd5:string = checkMd5(password);
	console.log(passMd5);
  
	const conn = await connect();
	  
	const query:string = `SELECT * FROM usuarios where usuario = ? and clave = ?`;

	const row = await conn.query(query, [username,passMd5]);
	


if (JSON.stringify(row[0]).length===2) {
    return done(null, false, req.flash('errorLoginMsg', 'Datos incorrectos'));
} else {
	   const user = parseSqlResult(row[0]);
	   return done(null, user , req.flash("success_msg", "Hola, " + user.usuario)     );
	  
	  // Match Password's User
	  
      // const match = await user.matchPassword(password);
   
   // if(match) {
    //  return done(null, user);
   // } else {
    //  return done(null, false, { message: 'Incorrect Password.' });
   // }
  }
}));

passport.serializeUser((user:IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const conn = await connect();
  const rows = await conn.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  const user = parseSqlResult(rows[0]);
  done(null, user);
});


next();	
}

