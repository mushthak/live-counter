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

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New client connected');
    
    // Send the initial value
    ws.send(JSON.stringify({ value: currentValue }));

    // Update value every second
    const interval = setInterval(() => {
        currentValue++;
        ws.send(JSON.stringify({ value: currentValue }));
    }, 1000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
