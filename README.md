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

### Main Thread (`app.js`)
The main thread focuses on UI operations:
- DOM element management
- Log list maintenance (last 10 logs)
- Handling Web Worker messages
- Animations for value updates
- Connection status display

### Web Worker (`socket-worker.js`)
Handles all network operations in background:
- SockJS connection management
- Automatic reconnection (configurable attempts)
- Message processing and routing
- Connection state tracking
- Error handling with status reporting

### User Interface
Split between HTML and CSS:
```
index.html
- Counter display
- Connection log list
- Status indicators

styles.css
- Modern, clean design
- Animated transitions
- Log entry styling
- Responsive layout
```

## Core Features

### 1. Web Worker Benefits
- Non-blocking WebSocket operations
- Improved UI responsiveness
- Separated concerns (UI vs Network)
- Better error handling
- Smooth animations during reconnection

### 2. Connection Management
- Configurable reconnection attempts
- Automatic recovery from disconnects
- Real-time status logging
- Clear error reporting

### 3. Dependencies
- `express`: Web application framework
- `sockjs`: WebSocket server implementation
- `sockjs-client`: WebSocket client library
## Best Practices

### 1. Performance
- Web Worker offloads network operations
- Minimal DOM updates
- Efficient connection management
- Optimized animation handling

### 2. Error Handling
- Graceful connection recovery
- Clear error messaging
- Status logging
- Configurable retry logic

### 3. User Experience
- Real-time value updates
- Smooth animations
- Connection status visibility
- Log history display

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this demo for learning and development.
