import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import apiRouter from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (_, res) => {
  res.send('Ticket Server!');
});

app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
