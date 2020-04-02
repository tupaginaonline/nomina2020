"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_employee_1 = require("../controllers/index.employee");
const router = express_1.Router();
router.route('/')
    .get(index_employee_1.indexEmployee);
router.route('/:id')
    .get(index_employee_1.listEmployee);
exports.default = router;
