import WebSocket, { MessageEvent, WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { commandHandler } from './command-handler';

dotenv.config();

const port: number = +(process.env.PORT || 8080);

const wss = new WebSocketServer({ port });

const handleMessage = async (ws: WebSocket, msg: string) => {
  console.log('<- ', msg);

  let actionResult = 'Please repeat';

  try {
    actionResult = await commandHandler(msg.toString());
  } catch (e) {
    console.error(e);
    actionResult = 'Something terribly wrong has happened. Please try again.';
  }

  console.log('->', actionResult);

  ws.send(actionResult);
};

wss.on('connection', (ws: WebSocket) => {
  ws.onmessage = (msg: MessageEvent): void => {
    handleMessage(ws, msg.data.toString());
  };
});
