import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routers/index.js";
import cors from "cors";


dotenv.config({ path: "./.env" });
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("comentario de prueba");
});

app.post("/", (req, res) => {
  res.send("comentario de prueba");
});


app.put("/", (req, res) => {
  res.send("comentario de prueba");
});

app.delete("/", (req, res) => {
  res.send("comentario de prueba");
});