import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log('dbConnect function called'); // Log when dbConnect is called

  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new connection promise');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log('Connected to MongoDB'); // Log when connected to MongoDB
      return mongoose;
    }).catch((err) => {
      console.error('Error connecting to MongoDB:', err); // Log errors
      cached.promise = null; // Reset cached.promise to allow retries
      throw err; // Re-throw the error after logging it
    });
  }

  cached.conn = await cached.promise;
  console.log('MongoDB connection established'); // Log when connection is established
  return cached.conn;
}

export default dbConnect;
