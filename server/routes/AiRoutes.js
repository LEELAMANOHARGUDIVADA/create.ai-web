import { Router } from "express"
import { fetchImage, GenerateImage, GenerateText, GenerateEmail, GenerateBlog, GenerateCaption } from "../controllers/AiController.js";

const router = Router();

router.get('/generateText', GenerateText);
router.post('/generateImage', GenerateImage);
router.get('/fetchImage', fetchImage);
router.get('/generateEmail', GenerateEmail);
router.get('/generateBlog', GenerateBlog);
router.get('/generateCaption', GenerateCaption);

export default router;