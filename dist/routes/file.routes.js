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
const file_system_1 = __importDefault(require("../classes/file-system"));
const adminAuth_1 = require("../middlewares/adminAuth");
const filesRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
const folder = "actores";
filesRoutes.post('/', [adminAuth_1.adminAuthentication], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            msj: "No se adjunto la imagen"
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            msj: "No se adjunto la imagen - key"
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            msj: "Lo que se subio no es una imagen"
        });
    }
    var fileName = yield fileSystem.saveImage(file, folder, req.user._id);
    res.json({
        ok: true,
        file: fileName
    });
}));
filesRoutes.get('/tempimagen/:userId/:img', (req, res) => {
    const userId = req.params.userId;
    const img = req.params.img;
    const pathImg = fileSystem.getTmpImgUrl(userId, img);
    res.sendfile(pathImg);
});
exports.default = filesRoutes;
