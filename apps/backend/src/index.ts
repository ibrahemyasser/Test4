import { env } from '@/common/utils/envConfig';
import { app, logger } from '@/server';
import mongoose from 'mongoose';
const server = app.listen(env.PORT, async() => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  logger.info("Attempting to connect to database");
  await connectToDatabase()
})


const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverApi: {
        version: "1", strict:true, deprecationErrors: true
      }
    });
    logger.info('Connected to database');
  } catch (error) {
    logger.error('Database connection failed', error);
  }
}

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    mongoose.disconnect();
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
