import express from "express";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { connection } from "./config/db";
import { authRouter } from "./routes/auth.route";
import cors from "cors";

const port: string | number = process.env.port || 8080;

(async () => {
  try {
    await connection();
    console.log("MongoDB connected!");
    const app: express.Application = express();
    app.use(express.json());
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use("/auth", authRouter);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
})();
