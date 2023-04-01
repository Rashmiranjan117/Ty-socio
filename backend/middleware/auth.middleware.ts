import jwt from "jsonwebtoken";
import express from "express";

const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded_token = jwt.verify(token, "secret") as { userId: string };
      console.log(req.body.userId);
      if (decoded_token.userId) {
        req.body.userId = decoded_token.userId;
        next();
      } else {
        res.send({ msg: "Please Login First" });
      }
    } catch (err) {
      res.send({ msg: "Invalid Token. Please login.", err });
    }
  } else {
    res.send({ msg: "Invalid token. Please Login." });
  }
};

export {authenticate}
