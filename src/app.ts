import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"; // WebSocket
import initWebSocketServer from "./websocket"; 
import userRoutes from "./routes/userRoutes";

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

// Endpoint para receber webhooks via POST
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

    // Emitir os dados para o frontend via WebSocket
    io.emit("webhookReceived", { userId, word });

    // Responder ao webhook
    res.status(200).json({ message: "Webhook recebido com sucesso!", userId, webhookData });
});

// *Novo*: Endpoint para buscar webhooks via GET para um userId específico
app.get("/webhook/:userId", (req: Request, res: Response) => {
    const { userId } = req.params;

    // Verificar se existem webhooks para o userId
    if (!webhooksByUser[userId] || webhooksByUser[userId].length === 0) {
        return res.status(404).json({ message: `Nenhum webhook encontrado para o usuário ${userId}.` });
    }

    // Retornar todos os webhooks do userId
    res.status(200).json(webhooksByUser[userId]);
});

app.use("/user", userRoutes);

// Inicializar servidor WebSocket
const ioServer = initWebSocketServer(httpServer);

// Configuração para requisições HTTP com métodos OPTIONS
app.options('*', cors());

export { app, httpServer, ioServer };