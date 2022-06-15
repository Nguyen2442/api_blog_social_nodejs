let users = [];

export const SocketServer = (socket) => {
    //#reguion //!Connection
    socket.on("connect", (id) => {
        users.push({ id, socketId:  socket.id})
    })
    console.log(users)

    socket.on("disconnect", () => {
        users = users.filter((user) => user.socketId !== socket.id)
    })

    //#endregion

    //#region //!Notifications
    socket.on("createNotify", (message) => {
        const clients = users.filter((user) => message.recipients.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket.to(`${client.socketId}`).emit("createNotify", message);
            })
        }
    })

    socket.on("removeNotify", (message) => {
        const clients = users.filter((user) => message.recipients.includes(user.id));
        if (clients.length > 0) {
            socket.to(`${clients[0].socketId}`).emit("removeNotify", message);
        }
    })

    //#region //!Messages
    socket.on("addMessage", (message) => {
        const user = users.find((user) => user.id === message.recipients);
        user && socket.to(`${user.socketId}`).emit("addMessage", message);
    })

    //#endregion
}