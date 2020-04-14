module.exports = {
    self: (process.env.NODE_ENV == 'production') ? "https://blockconf.digital" : "http://localhost:8081",
    host: (process.env.NODE_ENV == 'production') ? "https://api.blockconf.digital" : "http://localhost:8080",
    socket: (process.env.NODE_ENV == 'production') ? "https://socket.blockconf.digital" : "http://localhost:8082",
    startDate: 1590368400000
}
