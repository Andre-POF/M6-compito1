import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { authorsRoute } from "./services/routes/authors.route.js";
import { blogsRoute } from "./services/routes/blogs.route.js";
import cors from "cors";

config();
const PORT = process.env.PORT || "3001";

const app = express();

app.use(express.json());

app.use(cors());

// Routing
app.use("/", authorsRoute);
app.use("/", blogsRoute);

const intiServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");

    app.listen(PORT, () => {
      console.log(`ascoltando dalla porta ${PORT}`);
    });
  } catch (error) {
    console.log("No connection to DB");
  }
};

intiServer();
