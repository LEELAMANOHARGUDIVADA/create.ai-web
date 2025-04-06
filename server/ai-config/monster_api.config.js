import axios from "axios";

const ImageGenerationModel = async (prompt) => {
  const options = {
    method: "POST",
    url: "https://api.monsterapi.ai/v1/generate/txt2img",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization:
        `Bearer ${process.env.MONSTER_API_AUTH_KEY}`,
    },
    data: {
      aspect_ratio: "square",
      guidance_scale: 7.5,
      negprompt: "deformed, bad anatomy, disfigured, poorly drawn face",
      prompt: prompt,
      safe_filter: true,
      samples: 1,
      seed: 2414,
      steps: 15,
      style: "photorealistic",
    },
  };

  try {
    const response = await axios.request(options);
    const process_id = response.data.process_id;
    return process_id;
  } catch (error) {
    console.log(error);
  }
};

const fetchImageUrl = async (process_id) => {
  const options = {
    method: "GET",
    url: `https://api.monsterapi.ai/v1/status/${process_id}`,
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.MONSTER_API_AUTH_KEY}`,
    },
  };
  try {
    const response = await axios.request(options);
    const imageUrl = response.data;
    return imageUrl;
  } catch (error) {
    console.log(error);
  }
};

export { ImageGenerationModel, fetchImageUrl };
