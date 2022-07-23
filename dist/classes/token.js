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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
class Token {
    constructor() { }
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: payload
        }, this.seed, { expiresIn: this.expires });
    }
    ;
    static validateToken(userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
        });
    }
    ;
    static validateadmin(userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject();
                    }
                    else {
                        var user = yield user_model_1.User.findById(decoded.user._id).populate('roles');
                        if (user) {
                            if (user.roles.length > 0) {
                                var roleAdmin = user.roles.find((x) => x.name == "administrador");
                                if (roleAdmin) {
                                    resolve(decoded);
                                }
                                else {
                                    reject();
                                }
                            }
                        }
                        resolve(decoded);
                    }
                }));
            });
        });
    }
}
exports.default = Token;
Token.seed = 'esta es la frase secreta de la aplicación';
Token.expires = '1d';
