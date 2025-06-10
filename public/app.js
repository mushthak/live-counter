// Get the value display element
const valueElement = document.getElementById('value');

// WebSocket connection management
let socket;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 3000; // 3 seconds

function connectWebSocket() {
    socket = new WebSocket(`ws://${window.location.host}`);

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        valueElement.textContent = data.value;
        
        // Add a subtle animation effect
        valueElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            valueElement.style.transform = 'scale(1)';
        }, 200);
    });

    socket.addEventListener('open', () => {
        console.log('Connected to WebSocket server');
        reconnectAttempts = 0; // Reset reconnect attempts on successful connection
    });

    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
        attemptReconnect();
    });

    socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
    });
}

function attemptReconnect() {
    if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(`Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})...`);
        setTimeout(connectWebSocket, reconnectDelay);
    } else {
        console.log('Max reconnection attempts reached');
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        if (!socket || socket.readyState === WebSocket.CLOSED) {
            console.log('Page became visible, attempting to reconnect...');
            reconnectAttempts = 0; // Reset attempts when user manually returns
            connectWebSocket();
        }
    }
});

// Initial connection
connectWebSocket();
