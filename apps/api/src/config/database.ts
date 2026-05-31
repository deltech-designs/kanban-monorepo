import mongoose from 'mongoose';
import { getEnvVar } from '@kanban/utils';

export async function connectDatabase(): Promise<void> {
  const mongodbUri = getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/kanban');

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongodbUri);
    console.log('💚 Connected to MongoDB successfully.');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  } catch (error) {
    console.error('❌ Failed to disconnect from MongoDB:', error);
  }
}
