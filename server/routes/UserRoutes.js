import { Router } from "express";
import { deductCredit, login, register, verifyOtp } from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verifyOtp', verifyOtp);
router.post('/deductCredit', authMiddleware, deductCredit);

export default router;