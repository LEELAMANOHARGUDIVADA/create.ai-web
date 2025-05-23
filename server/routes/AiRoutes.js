import { Router } from "express"
import { fetchImage, GenerateImage, GenerateText, GenerateEmail, GenerateBlog, GenerateCaption, EmailHistory, BlogHistory, RefactorCode, GeneratePPT } from "../controllers/AiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/generateText', GenerateText);
router.post('/generateImage', GenerateImage);
router.get('/fetchImage', fetchImage);
router.get('/generateEmail', authMiddleware, GenerateEmail);
router.get('/emailHistory', authMiddleware, EmailHistory);
router.get('/generateBlog', authMiddleware, GenerateBlog);
router.get('/blogHistory', authMiddleware, BlogHistory);
router.get('/generateCaption', GenerateCaption);
router.get('/refactorCode', RefactorCode);
router.get('/generatePPT', GeneratePPT);

export default router;