import { type NextRequest, NextResponse } from "next/server"
import { checkLocalModelExists } from "@/lib/local-models"
import { groqModels } from "@/lib/groq-ai"
import { togetherModels } from "@/lib/together-ai"
import { openAIModels } from "@/lib/openai-ai"
import { deepSeekModels } from "@/lib/deepseek-ai"
// import { openRouterModels } from "@/lib/openrouter" // تم إزالة الاستيراد غير المستخدم
// import { xaiModels } from "@/lib/xai" // تم إزالة الاستيراد غير المستخدم

export async function GET(request: NextRequest) {
  try {
    // قائمة النماذج المتاحة
    const availableModels = []

    // تعريف النماذج الجديدة بناءً على ملف التكوين (dr.x models)
    // drx_chat (DeepSeek)
    if (process.env.DEEPSEEK_API_KEY) {
      availableModels.push({
        id: "drx_chat",
        name: "dr.x Chat (DeepSeek)",
        description: "النموذج الأساسي للمحادثات اليومية",
        type: "cloud",
        provider: "deepseek",
        icon: "DS",
        color: "#2196f3",
        apiId: deepSeekModels["deepseek-chat"],
        multimodal: false,
      })
    }

    // drx_r1 (OpenAI)
    if (process.env.OPENAI_API_KEY) {
      availableModels.push({
        id: "drx_r1",
        name: "dr.x R1 (GPT-5)",
        description: "النموذج المتقدم للتفكير المعقد",
        type: "cloud",
        provider: "openai",
        icon: "GPT",
        color: "#673ab7",
        apiId: openAIModels["gpt-5"],
        multimodal: true, // نفترض دعم الوسائط المتعددة لـ GPT-5
      })
    }

    // drx_advanced (Together AI / Llama 3 70B)
    if (process.env.TOGETHER_API_KEY) {
      availableModels.push({
        id: "drx_advanced",
        name: "dr.x Advanced (Llama 3 70B)",
        description: "النموذج المتقدم للمعالجة المتوازية",
        type: "cloud",
        provider: "together",
        icon: "LL",
        color: "#4caf50",
        apiId: togetherModels["llama3-70b"],
        multimodal: false,
      })
    }

    // drx_designer (Groq / Mixtral)
    if (process.env.GROQ_API_KEY) {
      availableModels.push({
        id: "drx_designer",
        name: "dr.x Designer (Mixtral)",
        description: "النموذج المختص بالتصميم والإبداع",
        type: "cloud",
        provider: "groq",
        icon: "GQ",
        color: "#8e44ad",
        apiId: groqModels["mixtral"],
        multimodal: false,
      })
    }

    // التحقق من وجود النماذج المحلية
    const llama3_8b_gguf = process.env.LLAMA3_8B_GGUF_PATH || ""
    const llama3_8b_hf = process.env.LLAMA3_8B_PATH || ""

    const localModels = [
      {
        id: "llama3-8b",
        name: "Llama 3 (8B) - GGUF",
        description: "نموذج Llama 3 المحلي بحجم 8 مليار معلمة (صيغة GGUF)",
        type: "local",
        provider: "meta",
        icon: "LL",
        color: "#4a55a7",
        path: llama3_8b_gguf,
        available: checkLocalModelExists(llama3_8b_gguf),
        size: "4GB",
        ram: "8GB",
        multimodal: false,
      },
      {
        id: "llama3-8b-hf",
        name: "Llama 3 (8B) - Finetuned",
        description: "نموذج Llama 3 المدرب محلياً بحجم 8 مليار معلمة",
        type: "local",
        provider: "meta",
        icon: "LL",
        color: "#4a55a7",
        path: llama3_8b_hf,
        available: checkLocalModelExists(llama3_8b_hf),
        size: "4GB",
        ram: "8GB",
        multimodal: false,
      },
    ]

    // إضافة النماذج المحلية المتوفرة فقط
    const availableLocalModels = localModels.filter((model) => model.available)
    const allModels = [...availableLocalModels, ...availableModels]

    return NextResponse.json(
      { models: allModels },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error: any) {
    console.error("خطأ في استرجاع النماذج:", error)
    return NextResponse.json({ error: error.message || "حدث خطأ أثناء استرجاع النماذج" }, { status: 500 })
  }
}
