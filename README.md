# Live Counter WebSocket Demo

A real-time counter application demonstrating advanced WebSocket implementation using SockJS and Web Workers. This application showcases robust connection handling and optimized performance through background thread processing.

## Key Features

### Real-time Communication
- Live counter updates using SockJS
- Reliable WebSocket connections with fallback options
- Server-side broadcasting to all connected clients
- Centralized counter state management

### Performance Optimization
- Web Worker for WebSocket handling
- Non-blocking UI with smooth animations
- Offloaded connection management
- Separated network and UI threads

### Connection Management
- Automatic reconnection system
- Connection state monitoring
- Configurable retry attempts
- Real-time status logging

### Modern UI
- Clean, minimalist design
- Animated value updates
- Connection status display
- Real-time log viewer

## Technology Stack

### Server-Side
- Node.js with Express
- SockJS server for WebSocket handling
- HTTP Server for static content

### Client-Side
- HTML5 & CSS3
- JavaScript (ES6+)
- SockJS Client
- Web Workers API

### Development
- npm for dependency management
- VS Code for development
- Chrome DevTools for debugging
- Git for version control

## Setup and Usage

### Requirements
- Node.js (v14+)
- npm (v6+)
- Modern web browser

### Installation
```bash
# Install dependencies
npm install
```

### Running the Application
```bash
# Start the server
npm start
```

The application will be available at http://localhost:3000

### Development Notes
- Server runs on port 3000 by default
- Connection logs visible in browser
- Real-time counter updates
- Automatic reconnection on disconnection

## Project Structure

```
├── server.js              # SockJS server implementation
├── package.json          # Project configuration
├── .gitignore           # Git ignore rules
└── public/
    ├── app.js           # Main UI thread logic
    ├── socket-worker.js # WebSocket handler (Web Worker)
    ├── index.html       # Application HTML
    ├── styles.css       # CSS styles
    └── sockjs.min.js    # SockJS client library
```

### Application Components

#### Server (`server.js`)
- Express.js application setup
- SockJS server configuration
- Static file serving
- Client connection management
- Real-time counter updates
```

### Implementation Details

#### Main Thread (`app.js`)
- DOM manipulation and UI updates
- Web Worker initialization and management
- Message handling and UI state management
- Animation and visual feedback
- Connection status display

#### Web Worker (`socket-worker.js`)
- SockJS connection handling
- Reconnection logic implementation
- Message processing and routing
- Connection state management
- Error handling and recovery

#### User Interface (`index.html` & `styles.css`)
- Clean and modern design
- Real-time counter display
- Connection status indicators
- Smooth animations
- Responsive layout
1. **Main Thread (`app.js`)**
   - UI updates and animations
   - DOM manipulation
   - Connection status display
   - Message handling from Web Worker

2. **Web Worker (`socket-worker.js`)**
   - SockJS connection management
   - Reconnection logic
   - Message processing
   - Background operation handling

1. **Connection Management**
   ```javascript
   // Tracks connection state
   let socket;
   let reconnectAttempts = 0;
   const maxReconnectAttempts = 5;
   const reconnectDelay = 3000; // 3 seconds
   ```

2. **iOS Background Detection**
   ```javascript
   document.addEventListener('visibilitychange', () => {
       if (document.visibilityState === 'visible') {
           // Reconnect when app comes to foreground
       }
   });
   ```

3. **Reconnection Strategy**
   - Attempts reconnection up to 5 times
   - 3-second delay between attempts
   - Resets attempt counter when user returns to app
   - Automatically reconnects when returning from background

### iOS-Specific Considerations

When an iOS device puts the app in background:
1. WebSocket connection typically gets disconnected
2. App detects this using visibility change events
3. Upon returning to foreground:
   - Checks connection state
   - Initiates reconnection if needed
   - Resets reconnection attempt counter

### UI Features
- Clean, modern interface
- Smooth animation on value updates
- Real-time counter display

## Project Structure

```
.
├── server.js           # WebSocket server
├── public/
│   ├── index.html     # HTML interface
│   ├── styles.css     # Styling
│   └── app.js         # WebSocket client logic
└── package.json
```

## Dependencies

- `express`: Web server framework
- `ws`: WebSocket implementation

## Best Practices Implemented

1. **Graceful Degradation**
   - Handles disconnections smoothly
   - Implements automatic reconnection
   - Manages connection state

2. **User Experience**
   - Smooth animations
   - Real-time updates
   - Automatic recovery from disconnections

3. **iOS Optimization**
   - Background state detection
   - Automatic reconnection
   - Connection state management
