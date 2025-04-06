import TextGenerationModel from "../ai-config/gemini.js"
import { ImageGenerationModel, fetchImageUrl } from "../ai-config/monster_api.config.js";

const GenerateText = async(req,res) => {
    try {
        const { prompt } = req.query;

        const result = await TextGenerationModel.generateContent(prompt);
        return res.status(200).json({ success: true, text: result.response.text() });
        
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const GenerateImage = async(req,res) => {
    try {
        const { prompt } = req.body;

        const generateImage = await ImageGenerationModel(prompt);
        return res.status(200).json({ success: true, process_id: generateImage });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const fetchImage = async(req,res) => {
    try {
        const { process_id } = req.query;
        console.log(process_id);

        const response = await fetchImageUrl(process_id);
        return res.status(200).json({ success: true, imageUrl: response.result.output[0] });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const GenerateEmail = async(req,res) => {
    try {
        const { prompt, keywords, tone } = req.query;

        if(!prompt || !keywords || !tone){
            throw new Error("All Fields Are Required");
        }

        const finalPrompt = prompt + keywords + tone;
        const generateEmail = await TextGenerationModel.generateContent(finalPrompt);
        
        return res.status(200).json({ success: true, result: generateEmail.response.text() });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
const GenerateBlog = async(req,res) => {
    try {
        const { prompt, keywords, tone } = req.query;

        if(!prompt || !keywords || !tone){
            throw new Error("All Fields Are Required");
        }

        const finalPrompt = prompt + keywords + tone;
        const generateEmail = await TextGenerationModel.generateContent(finalPrompt);
        
        return res.status(200).json({ success: true, result: generateEmail.response.text() });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
const GenerateCaption = async(req,res) => {
    try {
        const { prompt, platform } = req.query;

        if(!prompt || !platform){
            throw new Error("All Fields Are Required");
        }

        const finalPrompt = "Generate Social Media Caption for" + platform + "Post Description:" + prompt;
        const generateEmail = await TextGenerationModel.generateContent(finalPrompt);
        
        return res.status(200).json({ success: true, result: generateEmail.response.text() });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export { GenerateText, GenerateImage, fetchImage, GenerateEmail, GenerateBlog, GenerateCaption };