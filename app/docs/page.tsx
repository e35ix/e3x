import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Code2, Terminal, Zap, AlertCircle } from "lucide-react"

export default function DocsPage() {
  const sections = [
    {
      title: "البدء السريع",
      description: "تعليمات التثبيت والإعداد الأولي",
      icon: Zap,
      items: [
        { name: "التثبيت", href: "#installation" },
        { name: "الإعداد الأولي", href: "#setup" },
        { name: "تشغيل التطبيق", href: "#running" },
      ],
    },
    {
      title: "النماذج والخوادم",
      description: "معلومات حول نماذج الذكاء الاصطناعي المدعومة",
      icon: Code2,
      items: [
        { name: "نماذج مدعومة", href: "#models" },
        { name: "إعداد الخادم المحلي", href: "#server" },
        { name: "تحسين الأداء", href: "#performance" },
      ],
    },
    {
      title: "الإعدادات والخصوصية",
      description: "حماية بيانات المستخدم والإعدادات المتقدمة",
      icon: AlertCircle,
      items: [
        { name: "خصوصية البيانات", href: "#privacy" },
        { name: "الإعدادات الآمنة", href: "#security" },
        { name: "الاتصالات الخارجية", href: "#connections" },
      ],
    },
    {
      title: "المساعدة والدعم",
      description: "حل المشاكل الشائعة والأسئلة المتكررة",
      icon: BookOpen,
      items: [
        { name: "الأسئلة الشائعة", href: "#faq" },
        { name: "استكشاف الأخطاء", href: "#troubleshooting" },
        { name: "تقارير الأخطاء", href: "#reporting" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* رأس الصفحة */}
      <section className="py-12 md:py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">الوثائق</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            استكشف دليل شامل لاستخدام CyberAI OS والحصول على أقصى استفادة من نماذج الذكاء الاصطناعي المحلية
          </p>
        </div>
      </section>

      {/* أقسام الوثائق */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, idx) => {
              const Icon = section.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-bold mb-1">{section.title}</h2>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          href={item.href}
                          className="text-primary hover:underline flex items-center gap-2"
                        >
                          <Terminal className="h-4 w-4" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* قسم التثبيت */}
      <section id="installation" className="py-12 md:py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">التثبيت والإعداد</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">المتطلبات</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Node.js 18.0 أو أحدث</li>
                <li>npm أو pnpm أو yarn</li>
                <li>نموذج محلي (اختياري للحصول على أداء أفضل)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">خطوات التثبيت</h3>
              <div className="bg-black/50 p-4 rounded-lg border border-border font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">{`# استنساخ المستودع
git clone https://github.com/cyberai/cyberai-os.git
cd cyberai-os

# تثبيت التبعيات
pnpm install

# إعداد متغيرات البيئة
cp .env.example .env.local

# تشغيل بيئة التطوير
pnpm dev`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">التحقق من التثبيت</h3>
              <p className="text-muted-foreground mb-3">
                بعد تشغيل `pnpm dev`، افتح المتصفح على:
              </p>
              <div className="bg-black/50 p-4 rounded-lg border border-border font-mono text-primary">
                http://localhost:3000
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الخصوصية */}
      <section id="privacy" className="py-12 md:py-16 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">الخصوصية والأمان</h2>

          <div className="space-y-6 text-muted-foreground">
            <p>
              CyberAI OS يعطي الأولوية لخصوصيتك. جميع البيانات تُعالج محلياً على جهازك دون إرسال أي بيانات إلى خوادم خارجية بشكل افتراضي.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">ميزات الأمان</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>معالجة البيانات محلياً بالكامل</li>
                <li>عدم جمع بيانات المستخدم</li>
                <li>لا توجد تتبعات خارجية</li>
                <li>إمكانية التحكم الكامل في الاتصالات الخارجية</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section id="faq" className="py-12 md:py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">الأسئلة الشائعة</h2>

          <div className="space-y-6">
            {[
              {
                q: "هل يمكنني استخدام CyberAI OS بدون اتصال بالإنترنت؟",
                a: "نعم، بعد تثبيت نموذج محلي، يمكنك استخدام التطبيق بالكامل بدون اتصال بالإنترنت.",
              },
              {
                q: "ما هي النماذج المدعومة؟",
                a: "نحن ندعم عدة نماذج محلية مثل Ollama والنماذج المتوافقة مع LLaMA. تحقق من قسم النماذج للقائمة الكاملة.",
              },
              {
                q: "هل تطبيق CyberAI OS مجاني؟",
                a: "نعم، التطبيق مفتوح المصدر ومجاني تماماً.",
              },
              {
                q: "كيف أبلغ عن خلل؟",
                a: "يرجى فتح issue في مستودع GitHub الخاص بنا مع وصف مفصل للمشكلة والخطوات لإعادة إنتاجها.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* زر العودة */}
      <section className="py-12">
        <div className="container mx-auto px-4 flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">العودة للرئيسية</Link>
          </Button>
          <Button asChild>
            <Link href="/chat">ابدأ المحادثة</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
