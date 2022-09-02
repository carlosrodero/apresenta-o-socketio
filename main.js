const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
  
  socket.on('join', (username) => {
    socket.username = username
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' entrou no chat!'})
  })

  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))
})

http.listen(3000, () => console.log('listening on port 3000'))