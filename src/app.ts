import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import axios from "axios";
import { Server } from "socket.io";
import initWebSocketServer from "./websocket";
import userRoutes from "./routes/userRoutes";

// Configurações do Mercado Livre
const clientId = 'SEU_CLIENT_ID';
const clientSecret = 'SEU_CLIENT_SECRET';
let refreshToken = 'SEU_REFRESH_TOKEN';
let accessToken = '';

// Inicializando a aplicação Express e servidor HTTP
const app = express();
const httpServer = http.createServer(app);

// Configuração do WebSocket
const io = new Server(httpServer, {
  cors: {
    origin: '*',
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
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Rota para obter access token usando código de autorização
app.post('/test', async (req: Request, res: Response) => {
  const app_id = '6973021883530314';
  const client_secret = 'VwhQK2Q0z9COyksPLgAWcdXCJ9aswt7i';
  const code = 'TG-66e03da762405f0001b5b104-81270097';
  const redirect_uri = 'https://n8n.criartificial.com/callback';
  const url_principal = 'https://api.mercadolibre.com/oauth/token';

  const dados = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: app_id,
    client_secret: client_secret,
    code: code,
    redirect_uri: redirect_uri
  });

  try {
    const response = await axios.post(url_principal, dados.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      }
    });

    console.log(response.data);
    res.send('Ok');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:');
    } else {
      if (error instanceof Error) {
        console.error('Erro na requisição:', error.message);
      } else {
        console.error('Erro na requisição:', error);
      }
    }
    res.status(500).send('Erro na requisição');
  }
});

// Rota para capturar o refresh token usando refresh token
app.post('/getAccessToken', async (req: Request, res: Response) => {
  const app_id = '6973021883530314';
  const client_secret = 'VwhQK2Q0z9COyksPLgAWcdXCJ9aswt7i';
  const refresh_token = 'TG-66e03defdf2c520001fbed48-81270097';
  const url_principal = 'https://api.mercadolibre.com/oauth/token';

  const dados = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: app_id,
    client_secret: client_secret,
    refresh_token: refresh_token
  });

  try {
    const response = await axios.post(url_principal, dados.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      }
    });

    res.send(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:', error.response?.data || error.message);
    } else {
      console.error('Erro na requisição:', error);
    }
    res.status(500).send('Erro na requisição');
  }
});

app.get('/vendas', async (req: Request, res: Response) => {
  const { from, to } = req.query;

  // Verificar se os parâmetros obrigatórios foram passados
  if (!from || !to) {
    return res.status(400).json({ message: 'Os parâmetros "from" e "to" são obrigatórios.' });
  }

  const sellerId = '81270097'; // ID do vendedor
  const accessToken = req.headers.authorization?.split(' ')[1]; // Extrair o token do header da requisição
  
  if (!accessToken) {
    return res.status(401).json({ message: 'Token de acesso não fornecido.' });
  }

  const url = `https://api.mercadolibre.com/orders/search?seller=${sellerId}&order.date_created.from=${from}&order.date_created.to=${to}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Usar o token de acesso válido
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:', error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({ message: error.response?.data || 'Erro na requisição para a API de vendas.' });
    } else {
      console.error('Erro na requisição:', error);
      return res.status(500).json({ message: 'Erro inesperado na API de vendas.' });
    }
  }
});


// Endpoint para receber webhooks via POST
app.post("/webhook/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ message: "A palavra é obrigatória." });
  }

  if (!webhooksByUser[userId]) {
    webhooksByUser[userId] = [];
  }

  const webhookData: WebhookData = {
    word,
    timestamp: new Date().toISOString(),
    data: req.body,
  };
  webhooksByUser[userId].push(webhookData);

  console.log(`Webhook recebido para o usuário: ${userId}`);
  io.emit("webhookReceived", { userId, word });

  res.status(200).json({ message: "Webhook recebido com sucesso!", userId, webhookData });
});

// Endpoint para buscar webhooks via GET para um userId específico
app.get("/webhook/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!webhooksByUser[userId] || webhooksByUser[userId].length === 0) {
    return res.status(404).json({ message: `Nenhum webhook encontrado para o usuário ${userId}.` });
  }
  res.status(200).json(webhooksByUser[userId]);
});

app.use("/users", userRoutes);

// Inicializar servidor WebSocket
const ioServer = initWebSocketServer(httpServer);

// Configuração para requisições HTTP com métodos OPTIONS
app.options('*', cors());

export { app, httpServer, ioServer };
