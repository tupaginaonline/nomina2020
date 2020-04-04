"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const access_routes_1 = __importDefault(require("./routes/access.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const database_1 = require("./database");
const passport_1 = __importDefault(require("passport"));
class App {
    constructor(port) {
        this.port = port;
        database_1.connect();
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.set('views', path_1.default.join(__dirname, './views'));
        this.app.engine('.hbs', express_handlebars_1.default({
            defaultLayout: 'main',
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    routes() {
        this.app.use(access_routes_1.default);
        this.app.use('/empleados', employee_routes_1.default);
        this.app.use('/public', express_1.default.static(path_1.default.join(__dirname, './public')));
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Server on port', this.app.get('port'));
        });
    }
}
exports.App = App;
