"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const passport_1 = __importDefault(require("passport"));
require("../passport");
exports.renderLogin = (req, res) => {
    //const conn = await connect();
    //const employes = await conn.query("SELECT * FROM empleados");
    //return res.json(employes[0])
    //let viewModel = { empleados: {} };
    //viewModel.empleados = employes[0] ;
    //let viewModel = { empleados :employes[0] };
    res.render("users/login");
};
exports.signin = passport_1.default.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/"
});
exports.logout = (req, res) => {
    return res.send("logout...");
};
exports.dashboard = (req, res) => {
    return res.send("Dashboard...");
};
