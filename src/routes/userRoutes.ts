import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router.get("/:user_id", UserController.getUser);

router.post("/", UserController.createUser);


export default router;