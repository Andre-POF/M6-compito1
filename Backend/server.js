import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { authorsRoute } from "./services/routes/authors.route.js";
import { blogsRoute } from "./services/routes/blogs.route.js";
import { commentsRoute } from "./services/routes/comments.route.js";
import cors from "cors";
import nodemailer from "nodemailer";

config();
const PORT = process.env.PORT || "3001";

const app = express();

app.use(express.json());

app.use(cors());

// Routing
app.use("/", authorsRoute);
app.use("/", blogsRoute);
app.use("/", commentsRoute);

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

// send mail
// provider
const sendMessage = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailBody = `<h3> Hello World! </h3>`;

  try {
    const mail = await transporter.sendMail({
      from: `Tester : <mossie.aufderhar49@ethereal.email>`,
      to: "andre.p.o.ferreira@gmail.com",
      subject: "lalalla",
      html: mailBody,
    });
    console.log(mail.messageId);
  } catch (error) {
    console.log(error);
  }
};

sendMessage();
