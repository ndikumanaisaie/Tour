import express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';

import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const  MONGODB_URL = 'mongodb+srv://ndikumana:iza78289@cluster0.a3mnf.mongodb.net/testDb';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);