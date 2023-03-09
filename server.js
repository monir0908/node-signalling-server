const WebSocket = require('ws');

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: 7000 });

// Keep track of connected clients
const clients = new Set();

// When a new client connects
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Add the new client to the set of connected clients
  clients.add(ws);

  // When a message is received from a client
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Send the message to all connected clients except the sender
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  // When the connection is closed
  ws.on('close', () => {
    console.log('Client disconnected');

    // Remove the client from the set of connected clients
    clients.delete(ws);
  });
});

console.log('Signalling server running on ws://localhost:7000');
