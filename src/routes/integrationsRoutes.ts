import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/integrations', async (req: Request, res: Response) => {
  const { access_token, refresh_token, user_id, user_marketplace_id } = req.body;

  if (!access_token || !refresh_token || !user_id) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const integration = await prisma.integrations.create({
      data: {
        access_token,
        user_marketplace_id,
        user_id,  
      },
    });

    return res.status(201).json(integration);
  } catch (error) {
    console.error('Erro ao criar integração:', error);
    return res.status(500).json({ message: 'Erro ao criar integração.' });
  }
});

export default router;
