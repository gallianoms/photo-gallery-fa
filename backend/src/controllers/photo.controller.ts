import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";

import Photo from "./../models/Photo";

// Promise<Response> es necesario para que no exista error
export async function getPhotos(
  req: Request,
  res: Response
): Promise<Response> {
  // Encuentra todas las fotos
  const photos = await Photo.find();

  return res.json(
    photos
  );
}

export async function createPhoto(
  req: Request,
  res: Response
): Promise<Response> {
  //   Trae informacion de la imagen, incluyendo el path que es donde esta la imagen
  // console.log(req.file)
  const { title, description } = req.body;
  const newPhoto = {
    title,
    description,
    imagePath: req.file.path
  };
  const photo = new Photo(newPhoto);
  //   console.log(photo);
  await photo.save();

  return res.json({
    message: "Photo saved",
    photo
  });
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
  // console.log(req.params.id)
  const { id } = req.params;
  const photo = await Photo.findById(id);
  return res.json( photo );
}

export async function deletePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const deletedPhoto = await Photo.findByIdAndDelete(id);
  if (deletedPhoto) {
    await fs.unlink(path.resolve(deletedPhoto.imagePath));
  }
  return res.json({
    message: "Photo deleted",
    deletedPhoto
  });
}

export async function updatePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedPhoto = await Photo.findByIdAndUpdate(id, {
    title,
    description
  }, {new: true});
  return res.json({
    message: "Photo updated",
    updatedPhoto
  });
}
