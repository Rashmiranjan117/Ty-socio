import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import mongoose from "mongoose";

const mongoURL =
  process.env.mongoURL ||
  "mongodb+srv://RashmiranjanM:RashmiranjanM@cluster0.lzrbtvz.mongodb.net/social";

const connection = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to port");
  } catch (err) {
    console.log("Error connecting to DB", err);
  }
};

export { connection };
