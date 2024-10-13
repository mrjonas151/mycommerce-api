import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import http from "http";
import initWebSocketServer from "./websocket"; 

const app = express();
const httpServer = http.createServer(app); 

// Configuração do CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint para receber webhooks
app.post("/webhook", (req, res) => {
    const { word } = req.body; // Obtendo a palavra do corpo da requisição

    // Verifique se a palavra foi enviada
    if (!word) {
        return res.status(400).json({ message: "A palavra é obrigatória." });
    }

    // Exibir log com os detalhes da requisição
    console.log('Webhook recebido:');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('Dados recebidos:', req.body); // Exibe todos os dados recebidos
    console.log(`Palavra: ${word}`); // Exibe apenas a palavra recebida

    // Responder ao webhook
    res.status(200).json({ message: "Webhook recebido com sucesso!", word });
});

// Rotas para usuários
app.use("/users", userRoutes);

// Inicializar servidor WebSocket
const io = initWebSocketServer(httpServer);

// Configuração para requisições HTTP com métodos OPTIONS
app.options('*', cors());

export { app, httpServer, io };
