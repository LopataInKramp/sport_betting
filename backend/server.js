import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from './routs/auth.js';
import {authenticateToken} from "./middleware/auth.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(authenticateToken);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));