// تكامل مع OpenAI API
import OpenAI from "openai";

export const getOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("مفتاح API لـ OpenAI غير موجود");
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.DRX_R1_BASE_URL || "https://api.openai.com/v1/responses", // استخدام BASE_URL الجديد
  });
};

export const openAIModels = {
  "gpt-5": "gpt-5.1",
};
