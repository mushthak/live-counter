importScripts('/sockjs.min.js');

let sock = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 1;
const reconnectDelay = 3000;

function connect() {
    postMessage({ type: 'status', status: 'connecting', message: 'Connecting to server...' });
    
    // Create SockJS connection
    sock = new SockJS(self.location.origin + '/socket');

    sock.onopen = function() {
        postMessage({ type: 'status', status: 'connected', message: 'Connected to server' });
        reconnectAttempts = 0;
    };

    sock.onmessage = function(e) {
        const data = JSON.parse(e.data);
        postMessage({ type: 'value', value: data.value });
    };

    sock.onclose = function() {
        postMessage({ type: 'status', status: 'disconnected', message: 'Disconnected from server' });
        attemptReconnect();
    };
}

function attemptReconnect() {
    if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        const message = `Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})`;
        postMessage({ type: 'status', status: 'connecting', message });
        setTimeout(connect, reconnectDelay);
    } else {
        postMessage({ 
            type: 'status', 
            status: 'disconnected', 
            message: 'Max reconnection attempts reached'
        });
    }
}

// Initial connection
connect();
