import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import postRoute from './routes/posts.js';

dotenv.config();

const mongoStr = process.env.DATABASE_URL;
mongoose.connect(mongoStr);
const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error);
});

database.on('connected', () => {
	console.log('Database connected');
});

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());

app.use(express.static(path.resolve(process.cwd(), 'dist')));

app.use('/posts', postRoute);

app.listen(PORT, () => {
	console.log(`Starting server at port ${PORT}`);
});