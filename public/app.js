// Get DOM elements
const valueElement = document.getElementById('value');
const logList = document.getElementById('log-list');

// WebSocket connection management
let socket;
let reconnectAttempts = 0;
const maxReconnectAttempts = 1;
const reconnectDelay = 3000; // 3 seconds

function addLog(status, message) {
    const li = document.createElement('li');
    li.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
    li.className = status;
    logList.insertBefore(li, logList.firstChild);

    // Keep only the last 10 logs
    if (logList.children.length > 10) {
        logList.removeChild(logList.lastChild);
    }
}

function connectWebSocket() {
    addLog('connecting', 'Connecting to server...');
    socket = new WebSocket(`ws://${window.location.host}`);

    socket.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
        const data = JSON.parse(event.data);
        console.log('Parsed value:', data.value);
        valueElement.textContent = data.value;
        
        // Add a subtle animation effect
        valueElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            valueElement.style.transform = 'scale(1)';
        }, 200);
    });

    socket.addEventListener('open', () => {
        console.log('Connected to WebSocket server');
        addLog('connected', 'Connected to server');
        reconnectAttempts = 0; // Reset reconnect attempts on successful connection
    });

    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
        addLog('disconnected', 'Disconnected from server');
        attemptReconnect();
    });

    socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
        addLog('disconnected', 'Connection error occurred');
    });
}

function attemptReconnect() {
    if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        const message = `Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})`;
        console.log(message);
        addLog('connecting', message);
        setTimeout(connectWebSocket, reconnectDelay);
    } else {
        const message = 'Max reconnection attempts reached';
        console.log(message);
        addLog('disconnected', message);
    }
}

// Initial connection
connectWebSocket();
