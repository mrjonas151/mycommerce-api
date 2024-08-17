import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router.get("/", UserController.getUser);

router.post("/", UserController.createUser);


export default router;