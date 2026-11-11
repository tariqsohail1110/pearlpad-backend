import express from "express";
import dotenv from 'dotenv';
import { initDB } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

await initDB();

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) =>{
    res.json({ message: 'Pearl Pad API is running' })
});

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});