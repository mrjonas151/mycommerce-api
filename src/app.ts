import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import http from "http";
import initWebSocketServer from "./websocket"; 

const app = express();
const httpServer = http.createServer(app); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'https://guiaseller-frontend.dlmi5z.easypanel.host', 
    credentials: true 
}));

app.use("/users", userRoutes);

const io = initWebSocketServer(httpServer);

export { app, httpServer, io };
