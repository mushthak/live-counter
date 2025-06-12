const express = require('express');
const http = require('http');
const sockjs = require('sockjs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const sockServer = sockjs.createServer();

// Install SockJS on the server
sockServer.installHandlers(server, { prefix: '/socket' });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store the current value
let currentValue = 0;

// Store connected clients
const connections = new Set();

// Create a single interval for updating the counter
const mainInterval = setInterval(() => {
    currentValue++;
    // Broadcast to all connected clients
    connections.forEach(conn => {
        conn.write(JSON.stringify({ value: currentValue }));
    });
}, 1000);

// SockJS connection handling
sockServer.on('connection', function(conn) {
    console.log('📡 New client connected');
    connections.add(conn);
    console.log(`🔄 Total connected clients: ${connections.size}`);
    
    // Send the initial value
    conn.write(JSON.stringify({ value: currentValue }));

    conn.on('close', function() {
        connections.delete(conn);
        console.log('❌ Client disconnected');
        console.log(`🔄 Remaining connected clients: ${connections.size}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
