import express, {Application} from 'express';
import path from 'path';
import morgan from 'morgan';
import IndexRoutes from './routes/index.routes';
import EmployeeRoutes from './routes/employee.routes';
import exphbs  from 'express-handlebars';
import {connect} from './database';


export class App{
	
	private app: Application;
	
	constructor(private port?: string | number){
		connect();
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
			extname:'.hbs'
		}));
		
		this.app.set('view engine','.hbs');
	}
	
	middlewares(){
		this.app.use(morgan('dev'));
		this.app.use(express.urlencoded({extended:false}));
		this.app.use(express.json());
	}
	
	routes(){
		this.app.use(IndexRoutes);
		this.app.use('/empleados',EmployeeRoutes);
		this.app.use('/public', express.static(path.join(__dirname, './public')));
	}
	
	async listen(){
		await this.app.listen(this.app.get('port'));
		console.log('Server on port', this.app.get('port'));
	}
	
	
}