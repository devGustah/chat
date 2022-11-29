const express = require('express');
const app = express();
const path = require('path');
const socketIo = require('socket.io');

app.use('/group1', express.static(path.join(__dirname, 'public')))
app.use('/group2', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000, () => {
    console.log("Running")
})

const messages = {group1: [], group2: []};
const io = socketIo(server);

const group1 = io.of('/group1').on('connection', (socket) => {
    console.log('New Connection')
    socket.emit('update_messages', messages.group1)
    
    socket.on('new_message', (data) => {
        messages.group1(data)
        group1.emit('update_messages', messages.group1)
    })
})

const group2 = io.of('/group2').on('connection', (socket) => {
    console.log('New Connection')
    socket.emit('update_messages', messages.group2)
    
    socket.on('new_message', (data) => {
        messages.group2(data)
        group2.emit('update_messages', messages.group2)
    })
})

// io.on('connection', (socket) => {
//     console.log('New Connection')
//     socket.emit('update_messages', messages)
    
//     socket.on('new_message', (data) => {
//         messages.push(data)
//         io.emit('update_messages', messages)
//     })
// })