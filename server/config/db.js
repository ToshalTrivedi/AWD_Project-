import mongoose from 'mongoose';

/**
 * Robust database connection utility supporting MongoDB Atlas and local instances.
 * Gracefully reports connection state, disconnections, and errors without exposing credentials.
 */
let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crackly';

  // Sanitize URI for safe console logging
  const sanitizedUri = uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');

  try {
    mongoose.set('strictQuery', false);
    mongoose.set('bufferCommands', false); // Fail-fast so offline fallback triggers immediately

    mongoose.connection.on('connected', () => {
      isConnected = true;
      console.log(`[Database] MongoDB connected successfully to ${sanitizedUri}`);
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
      console.error(`[Database Error] MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('[Database Warning] MongoDB disconnected. Reconnection pending...');
    });

    mongoose.connection.on('reconnected', () => {
      isConnected = true;
      console.log('[Database] MongoDB reconnected successfully.');
    });

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
  } catch (error) {
    isConnected = false;
    console.error(`[Database Initial Fail] Unable to establish MongoDB connection: ${error.message}`);
    console.log('[Database Notice] The platform Express API will run with fallback demonstration capabilities.');
  }
};

export const getDbStatus = () => {
  return {
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    readyStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown'
  };
};
