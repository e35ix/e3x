// تكامل مع Groq API
import { Groq } from "groq-sdk"

export const getGroqAI = () => {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    console.error("مفتاح API لـ Groq غير موجود. لن يتم تفعيل نماذج Groq.")
    return null // إرجاع قيمة null بدلاً من رمي خطأ
  }

  return new Groq({
    apiKey,
  })
}

export const groqModels = {
  llama3: "llama-3.3-70b-versatile",
  mixtral: "mixtral-8x7b-32768",
  gemma: "gemma-7b-it",
}
