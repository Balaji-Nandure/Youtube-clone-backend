// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

connectDB();

/*
import express from "express";

const app = express();

(async () => {
  try {
    const dbConnected = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    app.on("error", (error) => {
      console.log("Error starting the server", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

    console.log(
      "Connected to MongoDB ----------- > 😀😀😀😀😀😀😀😀😀😀",
      dbConnected
    );
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
})();

*/
