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
const pelicula_model_1 = require("../models/pelicula.model");
const peliculasRoute = (0, express_1.Router)();
peliculasRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const peliculas = yield pelicula_model_1.Pelicula.find().exec();
    res.json({
        ok: true,
        peliculas
    });
}));
peliculasRoute.post('/', (req, res) => {
    const pelicula = {
        name: req.body.name,
        poster: req.body.poster,
        year: req.body.year
    };
    pelicula_model_1.Pelicula.create(pelicula)
        .then(peliculaDb => {
        res.json({
            ok: true,
            pelicula: peliculaDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = peliculasRoute;
