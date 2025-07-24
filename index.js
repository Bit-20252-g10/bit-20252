import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import connectDB from './src/config/db.js';



connectDB();

const app = express();
const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});


