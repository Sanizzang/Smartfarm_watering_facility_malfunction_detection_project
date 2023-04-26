import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dataRouter from './router/data.js';
import { config } from './config.js';
import { WebSocketServer } from 'ws';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/data', dataRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

const httpServer = app.listen(config.port);
const socketIO = new WebSocketServer({ server: httpServer });

socketIO.on('connection', (socket) => {
    console.log('client on');
});

export { app, socketIO };