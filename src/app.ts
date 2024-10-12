import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import http from "http";
import initWebSocketServer from "./websocket"; 

const app = express();
const httpServer = http.createServer(app); 


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.options('*', cors()); 


const io = initWebSocketServer(httpServer);

export { app, httpServer, io };
