const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// WebSocket for synchronization
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('setVideo', (url) => {
        socket.broadcast.emit('setVideo', url);
    });

    socket.on('play', () => {
        socket.broadcast.emit('play', time);
    });

    socket.on('pause', () => {
        socket.broadcast.emit('pause', time);
    });

    socket.on('seek', (time) => {
        socket.broadcast.emit('seek', time);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
