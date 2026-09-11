import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  console.warn('⚠️ MONGO_URI environment variable is not defined.');
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB Connected via Next.js API Route');
  } catch (error) {
    console.error('❌ Database Connection Error:', error);
  }
};