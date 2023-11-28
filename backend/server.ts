import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { envs } from './config.js';
import { userRouter } from './routers/userRouter.js';
import { orderRouter } from './routers/orderRouter.js';
import path from 'path';
import productRouter from './routers/productRouter.js';
import uploadRouter from './routers/uploadRouter.js';

const app = express();

if (envs.MONGODB_URL === undefined) {
  throw new Error('MONGODB_URL is undefined');
}

mongoose
  .connect(
    envs.MONGODB_URL as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions
  )
  .then(() => {
    console.log('Connected to mongodb...');
  })
  .catch((err) => {
    console.log('error connecting to mongodb:', err);
  });

app.use(express.static(path.join(__dirname, '')));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use('/api/paypal/clientId', (_req, res) => {
  res.send({ clientId: envs.PAYPAL_CLIENT_ID });
});

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack); // Log the error stack trace
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
  console.log('serving at http://localhost:5000...');
});
