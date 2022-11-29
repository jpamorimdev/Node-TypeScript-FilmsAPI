import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import logger from './lib/logger';
import allRoutes from './routes';
import util from 'util';
import SafeMongooseConnection from './lib/safe-mongoose-connection';

dotenv.config();

const httpServer: Express = express();
const SERVER_PORT = 3000;


async function initMongo() {
  let debugCallback;
  if (process.env.NODE_ENV === 'development') {
    debugCallback = (collectionName: string, method: string, query: any, doc: string): void => {
      const message = `${collectionName}.${method}(${util.inspect(query, { colors: true, depth: null })})`;
      logger.log({
        level: 'verbose',
        message,
        consoleLoggerOptions: { label: 'MONGO' }
      });
    };
  }

  const safeMongooseConnection = new SafeMongooseConnection({
    mongoUrl: process.env.MONGO_URL ?? '',
    debugCallback,
    onStartConnection: (mongoUrl: string) => logger.info(`Connecting to MongoDB at ${mongoUrl}`),
    onConnectionError: (error: any, mongoUrl: string) => logger.log({
      level: 'error',
      message: `Could not connect to MongoDB at ${mongoUrl}`,
      error
    }),
    onConnectionRetry: mongoUrl => logger.info(`Retrying to MongoDB at ${mongoUrl}`)
  });

  // Close the Mongoose connection, when receiving SIGINT
  process.on('SIGINT', () => {
    console.log('\n'); /* eslint-disable-line */
    logger.info('Gracefully shutting down');
    logger.info('Closing the MongoDB connection');
    safeMongooseConnection.close(err => {
      if (err) {
        logger.log({
          level: 'error',
          message: 'Error shutting closing mongo connection',
          error: err
        });
      } else {
        logger.info('Mongo connection closed successfully');
      }
      process.exit(0);
    }, true);
  });

  return new Promise<void>((resolve, reject) => {
    safeMongooseConnection.connect(mongoUrl => {
      logger.info(`Connected to MongoDB at ${mongoUrl}`);
      resolve();
    });
  });
}

async function initHTTPServer() {
  httpServer.use('/', allRoutes);

  return new Promise<void>((resolve, reject) => {
    httpServer.listen(SERVER_PORT, () => {
      logger.info(`HTTP server listening on port ${SERVER_PORT}`);
      resolve();
    });
  });
}

async function main() {
  await initMongo();
  await initHTTPServer();
}

main();