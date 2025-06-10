// Create WebSocket connection
const socket = new WebSocket(`ws://${window.location.host}`);

// Get the value display element
const valueElement = document.getElementById('value');

// Handle incoming WebSocket messages
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    valueElement.textContent = data.value;
    
    // Add a subtle animation effect
    valueElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        valueElement.style.transform = 'scale(1)';
    }, 200);
});

// Handle WebSocket connection open
socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
});

// Handle WebSocket errors
socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});
