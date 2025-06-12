const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store the current value
let currentValue = 0;

// Create a single interval for updating the counter
const mainInterval = setInterval(() => {
    currentValue++;
    // Broadcast to all connected clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ value: currentValue }));
        }
    });
}, 1000);

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('📡 New client connected');
    console.log(`🔄 Total connected clients: ${wss.clients.size}`);
    
    // Send the initial value
    ws.send(JSON.stringify({ value: currentValue }));

    ws.on('close', () => {
        console.log('❌ Client disconnected');
        console.log(`🔄 Remaining connected clients: ${wss.clients.size - 1}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
