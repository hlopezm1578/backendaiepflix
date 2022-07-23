"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    saveImage(file, folder, userId) {
        return new Promise((resolve, reject) => {
            const path = this.CreateFolder(folder, userId);
            const fileName = this.GenFileName(file.name);
            const imagesInTemp = this.readTemp(userId);
            imagesInTemp.forEach(image => {
                fs_1.default.unlink(`${path}/${image}`, (err) => {
                    if (err)
                        console.log;
                });
            });
            file.mv(`${path}/${fileName}`, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(fileName);
                }
            });
        });
    }
    CreateFolder(folder, userId) {
        const pathFolder = path_1.default.resolve(__dirname, '../images/', folder);
        const temporalPath = path_1.default.resolve(__dirname, '../temp/', userId);
        const exist = fs_1.default.existsSync(temporalPath);
        if (!exist) {
            fs_1.default.mkdirSync(pathFolder);
            fs_1.default.mkdirSync(temporalPath);
        }
        return temporalPath;
    }
    GenFileName(originalName) {
        const nameArray = originalName.split('.');
        const extension = nameArray[nameArray.length - 1];
        const uniqName = (0, uniqid_1.default)();
        return `${uniqName}.${extension}`;
    }
    readTemp(userId) {
        const temporalPath = path_1.default.resolve(__dirname, '../temp/', userId);
        return fs_1.default.readdirSync(temporalPath);
    }
    getTmpImgUrl(userId, img) {
        const pathImg = path_1.default.resolve(__dirname, '../temp/', userId, img);
        console.log(pathImg);
        const exits = fs_1.default.existsSync(pathImg);
        if (!exits) {
            return path_1.default.resolve(__dirname, '../assets/', '400x250.jpg');
        }
        return pathImg;
    }
}
exports.default = FileSystem;
