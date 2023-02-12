"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const Photo_1 = __importDefault(require("./../models/Photo"));
// Promise<Response> es necesario para que no exista error
async function getPhotos(req, res) {
    // Encuentra todas las fotos
    const photos = await Photo_1.default.find();
    return res.json(photos);
}
exports.getPhotos = getPhotos;
async function createPhoto(req, res) {
    //   Trae informacion de la imagen, incluyendo el path que es donde esta la imagen
    // console.log(req.file)
    const { title, description } = req.body;
    const newPhoto = {
        title,
        description,
        imagePath: req.file.path
    };
    const photo = new Photo_1.default(newPhoto);
    //   console.log(photo);
    await photo.save();
    return res.json({
        message: "Photo saved",
        photo
    });
}
exports.createPhoto = createPhoto;
async function getPhoto(req, res) {
    // console.log(req.params.id)
    const { id } = req.params;
    const photo = await Photo_1.default.findById(id);
    return res.json(photo);
}
exports.getPhoto = getPhoto;
async function deletePhoto(req, res) {
    const { id } = req.params;
    const deletedPhoto = await Photo_1.default.findByIdAndDelete(id);
    if (deletedPhoto) {
        await fs_extra_1.default.unlink(path_1.default.resolve(deletedPhoto.imagePath));
    }
    return res.json({
        message: "Photo deleted",
        deletedPhoto
    });
}
exports.deletePhoto = deletePhoto;
async function updatePhoto(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });
    return res.json({
        message: "Photo updated",
        updatedPhoto
    });
}
exports.updatePhoto = updatePhoto;
