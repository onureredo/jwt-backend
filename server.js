import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse incomming requests as JSON
app.use(cors());
app.use(express.json());

// Server start
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
