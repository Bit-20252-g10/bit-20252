import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routers/index.js";

dotenv.config({ path: "./.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("comentario de prueba");
});
