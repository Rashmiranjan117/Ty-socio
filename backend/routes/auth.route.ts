import express from "express";
import { UserModel, UserInterface } from "../models/auth.model";
import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");
const authController = require("../controllers/authcontroller");

const authRouter: express.Router = express.Router();

authRouter.post("/register", authController.signup);

authRouter.post("/login", authController.login);

authRouter.get("/", async (req: express.Request, res: express.Response) => {
  try {
    let data = await UserModel.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

authRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    let id = req.params.id;
    try {
      await UserModel.findByIdAndDelete({ _id: id });
      res.send("deleted");
    } catch (err) {
      res.send(err);
    }
  }
);

export { authRouter };
