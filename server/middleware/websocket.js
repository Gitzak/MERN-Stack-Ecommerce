// websocket.js
const WebSocket = require('ws');
let wss;

function initializeWebSocket(server) {
   wss = new WebSocket.Server({ port:7501 });

  wss.on('connection', (ws) => {
    // console.log('Connected to WebSocket server');

    ws.on('message', (message) => {
      // console.log(`Received message: ${message}`);
      // Handle incoming messages from clients
    });

    ws.on('close', () => {
      // console.log('Disconnected from WebSocket server');
    });
  });

  return wss;
}

function sendOrder(order) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ data:order.notification_message, userName: order.customerFirstName[0]}));
        }
    });
}

module.exports = {initializeWebSocket,sendOrder};
