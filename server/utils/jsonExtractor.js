const extractJsonFromMarkdown = (str) => {
    const match = str.match(/```json\n([\s\S]*?)\n```/);
    if (match && match[1]) {
      return JSON.parse(match[1]);
    }
    throw new Error("Invalid JSON format from Gemini.");
  };

export default extractJsonFromMarkdown;