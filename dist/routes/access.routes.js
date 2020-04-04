"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const access_controller_1 = require("../controllers/access.controller");
const router = express_1.Router();
router.route('/')
    .get(access_controller_1.renderLogin)
    .post(access_controller_1.signin);
router.route('/logout')
    .get(access_controller_1.logout);
router.route('/dashboard')
    .get(access_controller_1.dashboard);
exports.default = router;
