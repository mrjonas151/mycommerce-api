import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"; // WebSocket
import initWebSocketServer from "./websocket";

const app = express();
const httpServer = http.createServer(app);

// Configuração do WebSocket
const io = new Server(httpServer, {
    cors: {
        origin: '*', // Permitir qualquer origem
        methods: ['GET', 'POST'],
    }
});

// Tipagem para o armazenamento de webhooks por usuário
interface WebhookData {
    word: string;
    timestamp: string;
    data: any;
}

// Armazenar webhooks por userId
const webhooksByUser: { [key: string]: WebhookData[] } = {};

// Configuração do CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Quando o usuário conecta ao WebSocket
io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    // Manter o socket aberto até que o cliente desconecte
    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

// Endpoint para receber webhooks
app.post("/webhook/:userId", (req: Request, res: Response) => {
    const { userId } = req.params; // Obtém o userId da URL
    const { word } = req.body; // Obtém os dados do corpo da requisição

    // Verifique se word foi enviado no corpo da requisição
    if (!word) {
        return res.status(400).json({ message: "A palavra é obrigatória." });
    }

    // Inicializa um array para armazenar os webhooks do usuário, se ainda não existir
    if (!webhooksByUser[userId]) {
        webhooksByUser[userId] = [];
    }

    // Armazena o webhook recebido com o timestamp
    const webhookData: WebhookData = {
        word,
        timestamp: new Date().toISOString(),
        data: req.body,
    };
    webhooksByUser[userId].push(webhookData); // Adiciona o novo webhook para o userId

    // Exibir log com os detalhes da requisição
    console.log("Webhook recebido para o usuário: ${ userId }");
    console.log('Dados recebidos:', req.body);
    console.log("Palavra: ${ word }");

    // Emitir os dados para o frontend via WebSocket
    io.emit("webhookReceived", { userId, word });

    // Responder ao webhook
    res.status(200).json({ message: "Webhook recebido com sucesso!", userId, webhookData });
});

// Inicializar servidor WebSocket
const ioServer = initWebSocketServer(httpServer);

// Configuração para requisições HTTP com métodos OPTIONS
app.options('*', cors());

export { app, httpServer, ioServer };