import './db/index.js';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse incomming requests as JSON
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

// Server start
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
