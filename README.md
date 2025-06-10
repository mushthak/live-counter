# live-counter-ws

A lightweight WebSocket demo application that shows real-time counter updates with robust iOS background/foreground handling.

## Overview

This demo shows how to:
- Implement real-time updates using WebSocket
- Handle iOS-specific WebSocket disconnections
- Manage automatic reconnection when app returns from background

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

Open http://localhost:3000 in your browser.

## How it Works

### Server-side (`server.js`)
- Express server with WebSocket support
- Increments a counter every second
- Broadcasts counter value to all connected clients

### Client-side (`public/app.js`)
The client implements robust iOS background handling:

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
