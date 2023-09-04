import express from 'express';
import routes from './routes/index';

const server = express();

server.use(express.json());
server.use(routes);

const port = process.env.PORT || 5000;

server.listen(port);
