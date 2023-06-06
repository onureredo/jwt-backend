import mongoose from 'mongoose';

// Connect to MongoDB using Mongoose
try {
  const client = await mongoose.connect(process.env.ATLAS_URI);
  console.log('Connected to MongoDB');
} catch (err) {
  console.log(err.stack);
  process.exit(1);
}
