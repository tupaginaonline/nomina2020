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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passportLocal = __importStar(require("passport-local"));
const LocalStrategy = passportLocal.Strategy;
const database_1 = require("./database");
const helpers_1 = require("./helpers/helpers");
passport_1.default.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield database_1.connect();
    const query = `SELECT * FROM usuarios where usuario = ?`;
    const result = yield conn.query(query, [username]);
    const user = helpers_1.parseSqlResult(result[0]);
    console.log(user[0].id);
    // const user = await User.findOne({email: email});
    if (!user) {
        return done(null, false, { message: 'Not User found.' });
    }
    else {
        return done(null, user);
        // Match Password's User
        // const match = await user.matchPassword(password);
        // if(match) {
        //  return done(null, user);
        // } else {
        //  return done(null, false, { message: 'Incorrect Password.' });
        // }
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
//passport.deserializeUser((id, done) => {
//User.findById(id, (err, user) => {
//done(err, user);
//});
//});
