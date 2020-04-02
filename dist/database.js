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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
exports.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.createPool({
        host: 'bffjve8qdffidcq0larv-mysql.services.clever-cloud.com',
        user: 'u9i1muywsyxeo4fq',
        password: 'Fa0wjWMJLhe161kgoPeW',
        database: 'bffjve8qdffidcq0larv',
        connectionLimit: 10
    });
    console.log('DB is connected');
    return connection;
});
