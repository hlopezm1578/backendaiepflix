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
const express_1 = require("express");
const role_model_1 = require("../models/role.model");
const roleRoutes = (0, express_1.Router)();
roleRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.Role.find().populate('users');
    res.json({
        ok: true,
        roles
    });
}));
roleRoutes.post('/', (req, res) => {
    const role = {
        name: req.body.name
    };
    role_model_1.Role.create(role).then(resp => {
        res.json({
            ok: true,
            role: resp
        });
    });
});
roleRoutes.post('/asignar', (req, res) => {
    const roleId = req.body.roleId;
    const userId = req.body.userId;
    role_model_1.Role.findByIdAndUpdate(roleId, { $push: { users: userId } }).then(resp => {
        res.json({
            ok: true,
            role: resp
        });
    });
});
roleRoutes.get('/validaradmin', (req, res) => {
    res.json({
        ok: true
    });
});
exports.default = roleRoutes;
