import { Transform } from 'stream';
import { IncomingMessage } from 'http';

import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { commandHandler } from './command-handler';

dotenv.config();

const port: number = +(process.env.PORT || 8080);

const wss = new WebSocketServer({ port });

const messageHandler = new Transform({
  transform(chunk, encoding, next) {
    const msg = chunk.toString();
    console.log('<-', chunk);
    commandHandler(msg)
      .catch((e) => {
        console.error(e);
        return 'Something terribly wrong has happened. Please try again.';
      })
      .then((res) => {
        console.log('->', res);
        this.push(res, encoding);
      })
      .then(() => next());
  },
  writableObjectMode: true,
  readableObjectMode: true,
  encoding: 'utf-8',
});

wss.on('listening', () => console.log('Web Socket Server is listening on', port));

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const { remoteAddress, remotePort } = req.socket;
  console.log('Established connection from', `${remoteAddress}:${remotePort}`);
  const wsDuplex = createWebSocketStream(ws, { readableObjectMode: true, decodeStrings: false });
  wsDuplex.pipe(messageHandler).pipe(wsDuplex);
});

process.once('SIGINT', () => {
  let closedConnections = 0;

  console.log('\nShutting down web socket server');
  wss.close(() => console.log('Web Socket Server was shuted down'));

  wss.clients.forEach((i) => {
    closedConnections++;
    i.close();
  });
  console.log('closed', closedConnections, 'connections');
});
