
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/users', userRoutes);

const mongoStr = process.env.DATABASE_URL;

const PORT = process.env.PORT|| 5000;

mongoose.connect(mongoStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error);
});

database.on('connected', () => {
	console.log('Database connected');
});
