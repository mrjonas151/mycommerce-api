import { Request, Response } from 'express';
import { UserService } from '../services/userService'; 

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
}

export { UserController };