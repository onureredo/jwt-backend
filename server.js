import './db/index.js';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import postsRouter from './routes/postsRouter.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: '*' })); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use('/post', postsRouter); // Posts routes
app.use('/auth', authRouter); // Authentication routes
app.use('*', (req, res) => res.sendStatus(404)); // Handle undefined routes with a 404 status
app.use(errorHandler); // Handle errors using the errorHandler middleware

// Server start
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
