import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router.get("/:user_id", UserController.getUser);

router.post("/", UserController.createUser);

router.put('/:user_id', UserController.updateUser);

router.post("/company", UserController.createCompany);

router.get("/company/:company_id", UserController.getCompany);

router.put("/company/:company_id", UserController.updateCompany);

router.post("/webhook", UserController.handleWebhook);

export default router;