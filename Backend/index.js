import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AllRoutes from './Router/index.js';
import mongoose from 'mongoose';


const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
  res.send("server is...");
});

app.use('/api/v1', AllRoutes);


mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database connected..");
});

app.listen(8050, () => {
  console.log("server running on port 8050");
});
