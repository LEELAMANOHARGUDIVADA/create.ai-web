import { Router } from "express"
import { createOrder } from "../controllers/PaymentController.js";

const router = Router();

router.post('/createOrder', createOrder);

export default router;