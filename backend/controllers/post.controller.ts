import express, { Request } from "express";
import { PostModel } from "../models/link.model";
import * as dotenv from "dotenv";
dotenv.config();

// import cloudinary, { UploadApiResponse } from "cloudinary";
// import multer = require("multer");

// import type { Multer, FileFilterCallback } from "multer";

exports.getAll = async (req: express.Request, res: express.Response) => {
  try {
    let data = await PostModel.find();
    res.send(data);
  } catch (err) {
    res.send({ msg: "Error in getting data from Server", err });
  }
};

exports.getOne = async (req: express.Request, res: express.Response) => {
  try {
    let id = req.params.id;
    let data = await PostModel.find({ _id: id });
    res.send(data);
  } catch (err) {
    res.send({ msg: "Error in getting data from Server", err });
  }
};

exports.post = async (req: express.Request, res: express.Response) => {
  let data = req.body;
  try {
    let p = new PostModel(data);
    await p.save();
    res.send({ msg: "Post Successfull" });
  } catch (err) {
    res.send({ msg: "Error while posting.", err });
  }
};

exports.patch = async (req: express.Request, res: express.Response) => {
  let data = req.body;
  let id = req.params.id;

  try {
    await PostModel.findByIdAndUpdate({ _id: id }, data);
    res.send({ msg: "Update Successfull" });
  } catch (err) {
    res.send({ msg: "Error while Updating.", err });
  }
};

exports.delete = async (req: express.Request, res: express.Response) => {
  let id = req.params.id;

  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Delete Successfull" });
  } catch (err) {
    res.send({ msg: "Error while Updating.", err });
  }
};
