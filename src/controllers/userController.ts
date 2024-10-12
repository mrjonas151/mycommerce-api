import { Request, Response } from 'express';
import { UserService } from '../services/userService'; 
import axios from 'axios';

class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const newUser = await UserService.createUserService(userData);
            res.status(201).json(newUser);
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.user_id;
            const user = await UserService.getUserService(userId);
            res.status(200).json(user);
        } catch (error:any) {
            res.status(404).json({ message: error.message });
        }
    }

    static async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.user_id;
            const userData = req.body;
            const updatedUser = await UserService.updateUserService(userId, userData);
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async createCompany(req: Request, res: Response): Promise<void> {
        try {
            const companyData = req.body;
            const newCompany = await UserService.createCompanyService(companyData);
            res.status(201).json(newCompany);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getCompany(req: Request, res: Response): Promise<void> {
        try {
            const companyId = req.params.company_id;
            const company = await UserService.getCompanyService(companyId);
            res.status(200).json(company);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    static async updateCompany(req: Request, res: Response): Promise<void> {
        try {
            const companyId = req.params.company_id;
            const companyData = req.body;
            const updatedCompany = await UserService.updateCompanyService(companyId, companyData);
            res.status(200).json(updatedCompany);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async handleWebhook(req: Request, res: Response): Promise<void> {
        try {
            const { word } = req.body; 

            if (!word) {
                res.status(400).json({ message: "A palavra é obrigatória." });
            }

            const response = await axios.post('https://n8n.criartificial.com/webhook/9e16c197-c97d-43ed-a714-7b3d3377d7c4', { word });

            const keywords = response.data.keywords;
            res.status(200).json({ keywords });
        } catch (error: any) {
            res.status(500).json({ message: "Erro ao processar o webhook.", error: error.message });
        }
    }
}

export { UserController };