import express from "express";
import { UserModel, UserInterface } from "../models/auth.model";
import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");
const authController = require("../controllers/authcontroller");

const authRouter: express.Router = express.Router();

authRouter.post("/register", authController.signup);

authRouter.post("/login", authController.login);

export { authRouter };
