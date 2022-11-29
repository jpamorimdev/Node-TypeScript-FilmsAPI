import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import logger from './lib/logger';
import allRoutes from './routes';

dotenv.config();

const server: Express = express();
const port = 3000;

server.use('/', allRoutes);

server.listen(port, () => {
  logger.info(`Server is running at port ${port}!`);
});