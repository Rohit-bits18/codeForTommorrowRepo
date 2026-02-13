import { Router } from "express";
import { registerController,loginController } from "../controller/user-controller";

const router = Router();

router.post('/reg',registerController);
router.post('/login',loginController);
export default router
