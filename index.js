const logger = require('./utils/winston')

require('dotenv').config()
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 9402
const server = require("http").createServer()
const io = require("socket.io")(server, {
  cors: {
    // origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log('[CONNECT] New connection ', socket.id)
  socket.on('request-update-acl', (payload) => {
    logger.info(`[SOCKET ON] request-update-acl: ${payload}`)
    // emit payload
    io.emit('update-acl', payload)
    // on disconnected
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id)
    })
  })

  socket.on('request-update-dashboard', (payload) => {
    logger.info(`[SOCKET ON] request-update-dashboard: ${payload}`)
    // emit payload
    io.emit('update-dashboard', payload)
    // on disconnected
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id)
    })
  })
  // Leave the room if the user closes the socket
})


server.listen(WEBSOCKET_PORT, () => {
  logger.info(`[MAIN] Listening on port ${WEBSOCKET_PORT}`)
})