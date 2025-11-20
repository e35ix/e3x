"use client"
import { Check, Info, AlertTriangle, BookOpen, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

interface FormattedResponseProps {
  content: string
}

export function FormattedResponse({ content }: FormattedResponseProps) {
  const { toast } = useToast()

  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    const code = String(children).replace(/\n$/, "")
    const language = match ? match[1] : "text"

    const handleCopy = () => {
      navigator.clipboard.writeText(code)
      toast({
        title: "تم النسخ",
        description: "تم نسخ الكود إلى الحافظة.",
      })
    }

    return !inline && match ? (
      <div className="relative my-4 rounded-lg bg-[#1e1e1e] shadow-lg">
        <div className="flex items-center justify-between border-b border-zinc-700 p-2 text-xs text-zinc-400">
          <span className="font-mono">{language.toUpperCase()}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-3 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white"
            onClick={handleCopy}
          >
            <Copy className="mr-1 h-3 w-3" />
            نسخ
          </Button>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="!m-0 !rounded-t-none !p-4"
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  const components = {
    code: CodeBlock,
    // يمكن إضافة مكونات أخرى هنا مثل h1, h2, ul, ol لتنسيقها
    h1: ({ node, ...props }: any) => (
      <h1 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />
    ),
    h2: ({ node, ...props }: any) => (
      <h2 className="text-xl font-semibold text-blue-400 mt-4 mb-2" {...props} />
    ),
    p: ({ node, ...props }: any) => (
      <p className="text-gray-200 leading-relaxed mb-3" {...props} />
    ),
    ul: ({ node, ...props }: any) => (
      <ul className="list-disc list-inside space-y-1 pl-5 mb-3" {...props} />
    ),
    ol: ({ node, ...props }: any) => (
      <ol className="list-decimal list-inside space-y-1 pl-5 mb-3" {...props} />
    ),
  }

  return (
    <div className="formatted-response text-sm">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}
