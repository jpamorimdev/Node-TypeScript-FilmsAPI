import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import logger from './lib/logger';

dotenv.config();

const server: Express = express();
const port = 3000;

server.get('/health', (req: Request, res: Response) => {
  res.send('ok');
});

server.listen(port, () => {
  logger.info(`Server is running at port ${port}!`);
});