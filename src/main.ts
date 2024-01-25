import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CorsOptions } from "cors";
dotenv.config();

type Port = number | string;

const PORT: Port = process.env.PORT || 9090;

const app = express();

const corsOptions: CorsOptions = {
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
