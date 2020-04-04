import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { connect } from './database';
import { IUser } from './interfaces/User';
import { parseSqlResult } from './helpers/helpers';

import {Request} from 'express';


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
   passReqToCallback: true
}, async (req:Request, username:string, password:string, done: Function): Promise<any> => {
  
	const conn = await connect();
	  
	const query:string = `SELECT * FROM usuarios where usuario = ?`;

	const row = await conn.query(query, [username]);
	
	
	

if (JSON.stringify(row[0]).length===2) {
    return done(null, false, req.flash('error_msg', 'Error.'));
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
  done(null, rows[0]);
});

