import { Transform } from 'stream';

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
      .catch(e => {
        console.error(e);
        return 'Something terribly wrong has happened. Please try again.'
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

wss.on('connection', (ws: WebSocket) => {
  const wsDuplex = createWebSocketStream(ws, { readableObjectMode: true, decodeStrings: false });
  wsDuplex.pipe(messageHandler).pipe(wsDuplex);
});
