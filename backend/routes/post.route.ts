import express, { Request } from "express";
import { PostModel } from "../models/link.model";
import * as dotenv from "dotenv";
dotenv.config();

import cloudinary, { UploadApiResponse } from "cloudinary";
import multer = require("multer");
import { authenticate } from "../middleware/auth.middleware";
import type { Multer, FileFilterCallback } from "multer";
const postController = require("../controllers/post.controller");

const postRouter: express.Router = express.Router();
let cloudname = "dwomcropb";

// interface RequestWithFile extends Request {
//   file: Multer.File;
// }

const storage = multer.diskStorage({
  filename: (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    console.warn("Only Image files are allowed");
  }
  cb(null, true);
};

const upload: Multer = multer({ storage: storage, fileFilter: imageFilter });

cloudinary.v2.config({
  cloud_name: "dwomcropb",
  api_key: process.env.CLOUDINARY_API_KEY?.toString() ?? "261285439668811",
  api_secret:
    process.env.CLOUDINARY_API_SECRET?.toString() ??
    "pZ-qJ9ySi1LFP1mg8jLjfGvUU7E",
});



postRouter.get("/", authenticate, postController.getAll);

postRouter.get("/:id", authenticate, postController.getOne);

postRouter.post("/", authenticate, postController.post);

postRouter.patch("/:id", authenticate, postController.patch);

postRouter.delete("/:id", authenticate, postController.delete);
export { postRouter };
