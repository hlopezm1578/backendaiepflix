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
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = require("../middlewares/auth");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs_1.default.hashSync(req.body.password, 10)
    };
    user_model_1.User.create(user)
        .then((userDb) => {
        const token = token_1.default.getJwtToken({
            _id: userDb._id,
            name: userDb.name,
            email: userDb.email,
            role: userDb.roles.length > 0 ? userDb.roles[0].name : 'Usuario'
        });
        res.json({
            ok: true,
            token: token
        });
    }).catch(err => {
        console.log(err);
        res.json({
            ok: false,
            err
        });
    });
});
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_model_1.User.findOne({ email: body.email }, (err, userDb) => {
        if (err) {
            res.json({
                ok: false,
                err
            });
        }
        else {
            if (!userDb) {
                res.json({
                    ok: false,
                    mjs: 'Usuario o contraseña incorrectos'
                });
            }
            else {
                if (userDb.checkPassword(body.password)) {
                    const token = token_1.default.getJwtToken({
                        _id: userDb._id,
                        name: userDb.name,
                        email: userDb.email,
                        role: userDb.roles.length > 0 ? userDb.roles[0].name : 'Usuario'
                    });
                    res.json({
                        ok: true,
                        token: token
                    });
                }
                else {
                    res.json({
                        ok: false,
                        mjs: 'Usuario o contraseña incorrectos'
                    });
                }
            }
        }
    }).populate('roles');
});
userRoutes.put('/update', [auth_1.Authentication], (req, res) => {
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDb) => {
        if (err)
            throw err;
        if (!userDb) {
            return res.json({
                ok: false,
                mjs: "Usuario no existe"
            });
        }
        const token = token_1.default.getJwtToken({
            _id: userDb._id,
            name: userDb.name,
            email: userDb.email
        });
        res.json({
            ok: true,
            token: token
        });
    });
});
userRoutes.get('/checkadmin', [auth_1.Authentication], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('x-token') || '';
    var resp = yield token_1.default.validateadmin(token);
    res.json({
        ok: resp
    });
}));
exports.default = userRoutes;
