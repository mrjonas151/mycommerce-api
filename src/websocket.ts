import { Server } from "socket.io";
import http from "http";

const initWebSocketServer = (httpServer: http.Server) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',  
            methods: ['GET', 'POST'],
        },
    });

    io.on("connection", (socket) => {
        console.log("Novo cliente conectado:", socket.id);

        socket.on("message", (msg) => {
            console.log("Mensagem recebida:", msg);
            io.emit("message", msg); 
        });

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });

    return io;
};

export default initWebSocketServer;
