// تكامل مع Groq API
import { Groq } from "groq-sdk"

export const getGroqAI = () => {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("مفتاح API لـ Groq غير موجود")
  }

  return new Groq({
    apiKey,
    baseURL: process.env.DRX_DESIGNER_BASE_URL || "https://api.groq.com/openai/v1", // استخدام BASE_URL الجديد
  })
}

export const groqModels = {
  mixtral: "llama-3.1-8b-instant",
}
