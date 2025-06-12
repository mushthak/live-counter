// Get DOM elements
const valueElement = document.getElementById('value');
const logList = document.getElementById('log-list');

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

// Initialize Web Worker
const socketWorker = new Worker('socket-worker.js');

// Handle messages from the worker
socketWorker.onmessage = function(e) {
    const data = e.data;
    
    switch (data.type) {
        case 'value':
            valueElement.textContent = data.value;
            // Add a subtle animation effect
            valueElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                valueElement.style.transform = 'scale(1)';
            }, 200);
            break;
            
        case 'status':
            console.log(`Socket status: ${data.status} - ${data.message}`);
            addLog(data.status, data.message);
            break;
            
        default:
            console.log('Unknown message from worker:', data);
    }
};
