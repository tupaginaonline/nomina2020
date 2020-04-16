import express, {Application} from 'express';
import path from 'path';
import morgan from 'morgan';
import access from './routes/access.routes';
import EmployeeRoutes from './routes/employee.routes';
import exphbs  from 'express-handlebars';
import passport from 'passport';
import session from  'express-session' ;
import flash from 'connect-flash';
import './passport' ;

import helpers from './helpers';


export default class App{
	
	private app: Application;
	
	constructor(private port?: string | number){
		
		this.app = express();
		this.settings();
		this.middlewares();
		this.routes();
		
	}
	
	settings(){
		
		this.app.set('port', this.port || process.env.PORT || 3000);
		this.app.set('views', path.join(__dirname,'./views'));
		this.app.engine('.hbs' , exphbs({
			defaultLayout: 'main',
			partialsDir: path.join(this.app.get('views'),'partials'),
			layoutsDir: path.join(this.app.get('views'),'layouts'),
			helpers,
			extname:'.hbs'
		}));
		
		this.app.set('view engine','.hbs');
		 
	}
	
	middlewares(){
		
		
		this.app.use(morgan('dev'));
		this.app.use(express.urlencoded({extended:false}));
		this.app.use(express.json());
		this.app.use(session({
		  secret: 'secret',
		  resave: true,
		  saveUninitialized: true
		}));
		
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		
		this.app.use(flash());

		// Global Variables
		this.app.use((req:any, res:express.Response, next:Function) => {
		  res.locals.success_msg = req.flash('success_msg');
		  res.locals.error_msg = req.flash('error_msg');
		  res.locals.errorLoginMsg = req.flash('errorLoginMsg');
		  res.locals.error = req.flash('error');
		  res.locals.user = req.user || null;
		  
		  next();
		});

	}
	
	
	routes(){
		this.app.use(access);
		this.app.use('/empleados', EmployeeRoutes);
		this.app.use('/public', express.static(path.join(__dirname, './public')));
	}
	
	async listen(){
		await this.app.listen(this.app.get('port'));
		console.log('Server on port', this.app.get('port'));
	}
	
	
}