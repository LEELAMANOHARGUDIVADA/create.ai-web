import { Router } from "express"
import { addCredits, createOrder } from "../controllers/PaymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/createOrder', createOrder);
router.post('/addCredits', authMiddleware, addCredits);

export default router;