import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import http from "http";
import initWebSocketServer from "./websocket"; // Importar o arquivo websocket

const app = express();
const httpServer = http.createServer(app); // Criar servidor HTTP

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
}));

app.use("/users", userRoutes);

const io = initWebSocketServer(httpServer);

export { app, httpServer, io };
