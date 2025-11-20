// تكامل مع DeepSeek API
import OpenAI from "openai";

export const getDeepSeekAI = () => {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error("مفتاح API لـ DeepSeek غير موجود");
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.DRX_CHAT_BASE_URL || "https://api.deepseek.com/v1", // تصحيح BASE_URL لـ DeepSeek
  });
};

export const deepSeekModels = {
  "deepseek-chat": "deepseek-chat",
};
