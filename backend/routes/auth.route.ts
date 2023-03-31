import express from "express";
import { UserModel, UserInterface } from "../models/auth.model";
import bcrypt from "bcrypt";

const authRouter: express.Router = express.Router();

authRouter.post(
  "/register",
  async (req: express.Request, res: express.Response) => {
    let { email, phoneNumber, password } = req.body;
    try {
      bcrypt.hash(password, 5, async (err, securedPassword) => {
        if (err) {
          console.log(err);
          res.send({ msg: "Something went wrong", err });
        } else {
          let user = new UserModel({
            email,
            phoneNumber,
            password: securedPassword,
          });
          await user.save();
        // console.log(securedPassword)
          res.send({ msg: "Account Created Successfully!" });
        }
      });
    } catch (err) {
      res.send({ msg: "Something Went wrong while creating account.", err });
    }
  }
);

authRouter.post('login', async(req,res)=>{})

export { authRouter };
