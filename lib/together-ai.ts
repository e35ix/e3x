// تكامل مع Together AI API
import Together from "together-ai";

export const getTogetherAI = () => {
  const apiKey = process.env.TOGETHER_API_KEY;

  if (!apiKey) {
    throw new Error("مفتاح API لـ Together AI غير موجود");
  }

  return new Together({
    apiKey,
    baseURL: process.env.DRX_ADVANCED_BASE_URL || "https://api.together.ai/v1", // تصحيح BASE_URL لـ Together AI
  });
};

export const togetherModels = {
  "llama3-70b": "moonshotai/Kimi-K2-Thinking",
};
