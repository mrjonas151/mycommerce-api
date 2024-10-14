import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import initWebSocketServer from "./websocket"; 

const app = express();
const httpServer = http.createServer(app); 

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

// Endpoint para receber webhooks, agora esperando userId
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
    console.log(`Webhook recebido para o usuário: ${userId}`);
    console.log('Dados recebidos:', req.body);
    console.log(`Palavra: ${word}`);

    // Responder ao webhook
    res.status(200).json({ message: "Webhook recebido com sucesso!", userId, webhookData });
});

// Endpoint para buscar os webhooks de um determinado userId
app.get("/webhook/:userId", (req: Request, res: Response) => {
    const { userId } = req.params;

    // Verificar se existem webhooks para o userId
    if (!webhooksByUser[userId]) {
        return res.status(404).json({ message: `Nenhum webhook encontrado para o usuário ${userId}.` });
    }

    // Retornar todos os webhooks do usuário
    res.status(200).json(webhooksByUser[userId]);
});

// Inicializar servidor WebSocket
const io = initWebSocketServer(httpServer);

// Configuração para requisições HTTP com métodos OPTIONS
app.options('*', cors());

export { app, httpServer, io };
