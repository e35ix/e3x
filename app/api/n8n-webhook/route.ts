import { type NextRequest, NextResponse } from "next/server";

// هذه نقطة نهاية API مخصصة لاستقبال طلبات Webhook من n8n.
// يمكن استخدامها لتشغيل وظائف داخل التطبيق بناءً على أحداث في n8n، أو العكس.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // يمكنك هنا معالجة البيانات المرسلة من n8n
    console.log("Received Webhook from n8n:", body);

    // مثال: التحقق من نوع الحدث المرسل من n8n
    const eventType = body.event_type || "unknown";
    
    // يمكنك إضافة منطق معقد هنا، مثل:
    // 1. تحديث قاعدة بيانات التطبيق.
    // 2. إرسال إشعار داخلي.
    // 3. استدعاء وظيفة معينة في التطبيق (مثل تشغيل اختبار توافق).

    // مثال بسيط للرد:
    return NextResponse.json({ 
      status: "success", 
      message: `Webhook received and processed for event type: ${eventType}`,
      data: body,
    }, { status: 200 });

  } catch (error: unknown) {
    console.error("Error processing n8n webhook:", error);
    
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json(
      {
        status: "error",
        message: `Failed to process webhook: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

// يمكن إضافة دالة GET إذا لزم الأمر لاختبار الاتصال
export async function GET() {
    return NextResponse.json({ 
        status: "ready", 
        message: "n8n Webhook endpoint is active and awaiting POST requests." 
    }, { status: 200 });
}
