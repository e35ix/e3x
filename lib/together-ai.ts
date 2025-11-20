// تكامل مع Together AI API
import Together from "together-ai";

export const getTogetherAI = () => {
  const apiKey = process.env.TOGETHER_API_KEY;

  if (!apiKey) {
    throw new Error("مفتاح API لـ Together AI غير موجود");
  }

  return new Together({
    apiKey,
    baseURL: process.env.DRX_ADVANCED_BASE_URL || "https://api.together.xyz/v1", // استخدام BASE_URL الجديد
  });
};

export const togetherModels = {
  "llama3-70b": "meta-llama/Llama-3-70b-chat-hf",
};
