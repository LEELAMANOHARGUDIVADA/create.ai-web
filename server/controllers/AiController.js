import TextGenerationModel from "../ai-config/gemini.js"
import { ImageGenerationModel, fetchImageUrl } from "../ai-config/monster_api.config.js";
import Blog from "../models/BlogSchema.js";
import Email from "../models/EmailSchema.js";
import User from "../models/UserSchema.js";
import extractJsonFromMarkdown from "../utils/jsonExtractor.js";

const GenerateText = async (req, res) => {
    try {
        const { prompt } = req.query;

        const result = await TextGenerationModel.generateContent(prompt);
        return res.status(200).json({ success: true, text: result.response.text() });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const GenerateImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        const generateImage = await ImageGenerationModel(prompt);
        return res.status(200).json({ success: true, process_id: generateImage });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const fetchImage = async (req, res) => {
    try {
        const { process_id } = req.query;
        console.log(process_id);

        const response = await fetchImageUrl(process_id);
        return res.status(200).json({ success: true, imageUrl: response.result.output[0] });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const GenerateEmail = async (req, res) => {
    try {
        const { prompt, keywords, tone } = req.query;

        if (!prompt || !keywords || !tone) {
            throw new Error("All Fields Are Required");
        }

        const finalPrompt = prompt + keywords + tone;
        const generateEmail = await TextGenerationModel.generateContent(finalPrompt);

        if (generateEmail) {

            const email = new Email({
                email: generateEmail.response.text(),
                user: req.user.id
            });
            await email.save();
        }

        return res.status(200).json({ success: true, result: generateEmail.response.text() });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
const EmailHistory = async (req, res) => {
    try {
        const history = await Email.find({ user: req.user.id });

        if (!history) {
            return res.status(200).json({ success: false, message: "No Emails Found!" });
        }
        return res.status(200).json({ success: true, history });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const GenerateBlog = async (req, res) => {
    try {
        const { prompt, keywords, tone } = req.query;

        if (!prompt || !keywords || !tone) {
            throw new Error("All Fields Are Required");
        }

        const finalPrompt = prompt + keywords + tone;
        const generateEmail = await TextGenerationModel.generateContent(finalPrompt);

        const blog = new Blog({
            blog: generateEmail.response.text(),
            user: req.user.id
        });
        await blog.save();
        return res.status(200).json({ success: true, result: generateEmail.response.text() });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const BlogHistory = async (req, res) => {
    try {
        const history = await Blog.find({ user: req.user.id });

        if (!history) {
            return res.status(200).json({ success: false, message: "No Blogs Found!" });
        }
        return res.status(200).json({ success: true, history });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const GenerateCaption = async (req, res) => {
    try {
        const { prompt, platform } = req.query;

        if (!prompt || !platform) {
            throw new Error("All Fields Are Required");
        }

        const finalPrompt = "Generate Social Media Caption for" + platform + "Post Description:" + prompt;
        const generateEmail = await TextGenerationModel.generateContent(finalPrompt);

        return res.status(200).json({ success: true, result: generateEmail.response.text() });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const RefactorCode = async (req, res) => {
    try {
        const { prompt } = req.query;

        if (!prompt) {
            throw new Error("All Fields Are Required");
        }
        const finalPrompt = `You are a senior developer. Refactor the following code and explain what you improved.\n\nCode:\n${prompt}\n\nRespond in JSON with "refactored_code" and "explanation".`;
        const refactored_code = await TextGenerationModel.generateContent(finalPrompt);

        if (!refactored_code) {
            return res.status(400).json({ success: false, message: "Generation Failed!" });
        }

        const response = refactored_code.response.candidates[0].content.parts[0].text;


        const cleanedText = response
            .replace(/```json|```/g, '')
            .replace(/\n+/g, '\n')
            .trim();

        let parsed;
        try {
            parsed = JSON.parse(cleanedText);
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
            return res.status(500).json({
                success: false,
                message: "Invalid response format from AI. Check raw output for issues."
            });
        }

        return res.status(200).json({
            success: true,
            refactored_code: parsed.refactored_code,
            explanation: parsed.explanation
        });


    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const GeneratePPT = async (req, res) => {
    try {
        const { topic } = req.query;

        if (!topic) {
            throw new Error("All Fields Are Required");
        }

        const prompt = `
        Generate a structured slide deck about "${topic}". 
        Output format should be JSON with a "title" and "slides" array. 
        Each slide should have a "heading","content" and "image_prompt": a very short description of an image that can visually support the slide not more than 20 words.
        Total slides: 8.
        Make content concise and presentation-friendly.
        `;

        const generatePPT = await TextGenerationModel.generateContent(prompt);

        const parsedResponse = extractJsonFromMarkdown(generatePPT.response.text());
        // console.log(parsedResponse);

        return res.status(200).json({ success: true, result: parsedResponse});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export { GenerateText, GenerateImage, fetchImage, GenerateEmail, GenerateBlog, GenerateCaption, EmailHistory, BlogHistory, RefactorCode, GeneratePPT };