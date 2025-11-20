import { type NextRequest, NextResponse } from "next/server"
import { getGroqAI } from "@/lib/groq-ai"
import { getTogetherAI } from "@/lib/together-ai"
import { getOpenAI } from "@/lib/openai-ai"
import { getDeepSeekAI } from "@/lib/deepseek-ai"
import { TOOLS, executeTool } from "@/lib/tools"
import { groqModels } from "@/lib/groq-ai"
import { togetherModels } from "@/lib/together-ai"
import { openAIModels } from "@/lib/openai-ai"
import { deepSeekModels } from "@/lib/deepseek-ai"

// قائمة النماذج المدعومة من ملف التكوين
const CONFIG_MODELS = {
  "drx_chat": { provider: "deepseek", modelId: deepSeekModels["deepseek-chat"] },
  "drx_r1": { provider: "openai", modelId: openAIModels["gpt-5"] },
  "drx_advanced": { provider: "together", modelId: togetherModels["llama3-70b"] },
  "drx_designer": { provider: "groq", modelId: groqModels["mixtral"] },
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model, image_url } = await request.json()

    // التحقق من البيانات المدخلة
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "يجب توفير رسائل صالحة" }, { status: 400 })
    }

    // تحديد المزود والنموذج المناسب بناءً على ملف التكوين
    const modelConfig = CONFIG_MODELS[model as keyof typeof CONFIG_MODELS]

    if (!modelConfig) {
      return NextResponse.json({ error: `النموذج ${model} غير مدعوم أو غير موجود في ملف التكوين.` }, { status: 400 })
    }

    const { provider, modelId } = modelConfig

    // إعداد الرسائل
    let formattedMessages = messages

    // إذا كان هناك صورة وكان النموذج يدعم الصور (يجب تحديد النماذج التي تدعم الصور هنا)
    // حاليًا، نفترض أن النماذج التي تستخدم OpenAI API (مثل gpt-5) قد تدعم الصور
    if (image_url && provider === "openai") {
      // تنسيق الرسالة الأخيرة لتتضمن الصورة
      const lastMessage = messages[messages.length - 1]
      formattedMessages = [
        ...messages.slice(0, -1),
        {
          role: lastMessage.role,
          content: [
            {
              type: "image_url",
              image_url: { url: image_url },
            },
            {
              type: "text",
              text: lastMessage.content,
            },
          ],
        },
      ]
    }

    let response

    // استدعاء النموذج المناسب حسب المزود
    try {
      switch (provider) {
        case "openai":
          const openai = getOpenAI()
          response = await openai.chat.completions.create({
            tools: TOOLS,
            tool_choice: "auto",
            messages: formattedMessages,
            model: modelId,
            temperature: 0.7,
            max_tokens: 1000,
          })
          break

        case "deepseek":
          const deepseek = getDeepSeekAI()
          response = await deepseek.chat.completions.create({
            tools: TOOLS,
            tool_choice: "auto",
            messages: formattedMessages,
            model: modelId,
            temperature: 0.7,
            max_tokens: 1000,
          })
          break

        case "together":
          const together = getTogetherAI()
          response = await together.chat.completions.create({
            tools: TOOLS,
            tool_choice: "auto",
            messages: formattedMessages,
            model: modelId,
            temperature: 0.7,
            max_tokens: 1000,
          })
          break

        case "groq":
          const groq = getGroqAI()
          response = await groq.chat.completions.create({
            tools: TOOLS,
            tool_choice: "auto",
            messages: formattedMessages,
            model: modelId,
            temperature: 0.7,
            max_tokens: 1000,
          })
          break

        default:
          throw new Error("مزود غير مدعوم")
      }
    } catch (apiError: unknown) {
      console.error(`خطأ في استدعاء API ${provider}:`, apiError)

      let errorMessage = "حدث خطأ غير معروف."
      if (apiError instanceof Error) {
        errorMessage = apiError.message
      } else if (typeof apiError === "string") {
        errorMessage = apiError
      }

      return NextResponse.json(
        {
          error: `خطأ في استدعاء ${provider}: ${errorMessage}`,
          details: String(apiError),
        },
        { status: 500 },
      )
    }

    // التحقق من وجود البيانات في الاستجابة قبل إرجاعها
    if (!response || !response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error("استجابة غير صالحة من واجهة برمجة التطبيقات")
    }

    // معالجة استدعاءات الأدوات
    const message = response.choices[0].message
    if (message.tool_calls && message.tool_calls.length > 0) {
      // هنا يجب أن تكون هناك حلقة لمعالجة استدعاءات الأدوات، ولكن لغرض الدمج السريع
      // سنقوم بمحاكاة استدعاء الأداة الأولى وإرجاع النتيجة
      const toolCall = message.tool_calls[0]
      const toolName = toolCall.function.name
      const toolArgs = JSON.parse(toolCall.function.arguments)
      
      const toolOutput = await executeTool(toolName, toolArgs)

      // إرجاع استجابة محاكاة لاستدعاء الأداة
      return NextResponse.json({
        tool_call: toolCall,
        tool_output: toolOutput,
        message: "Tool call detected and executed (mocked).",
      }, { status: 200 })
    }

    return NextResponse.json(response, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: unknown) {
    console.error("خطأ في واجهة برمجة التطبيقات للدردشة:", error)

    let errorMessage = "حدث خطأ غير معروف."
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === "string") {
      errorMessage = error
    }

    return NextResponse.json(
      {
        error: `خطأ في واجهة برمجة التطبيقات للدردشة: ${errorMessage}`,
        details: String(error),
      },
      { status: 500 },
    )
  }
}
