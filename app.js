import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import connectDatabase from './config/database.js';
// import cors from './middleware/security/cors/cors.js'
import userRouter from './routes/user.routes.js'
import cors from 'cors';
import errorHandler from "./middleware/errors/error.handler.js";

const app = express();

// app.use(cors)

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173','https://craxinno-technology.netlify.app']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

connectDatabase();

app.use("/api/v1", userRouter);

app.use((req, res) => {
    res.status(404).json({ success: false, status: 404, message: "Not Found" });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The server connection is now established and running on port ${port}`);
});
