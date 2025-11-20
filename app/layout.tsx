import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import { NotificationServiceProvider } from "@/components/notification-service-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CyberAI OS - نظام الذكاء الاصطناعي المحلي",
  description: "منصة متكاملة للذكاء الاصطناعي المحلي مع الحفاظ على الخصوصية والأداء العالي",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SidebarProvider>
            <div className="flex min-h-screen"> {/* تم إزالة الشريط الجانبي الثابت */}
              {/* <AppSidebar /> تم إزالته بناءً على طلب المستخدم لتحسين واجهة المحادثة */}
              <main className="flex-1">
                <ErrorBoundary>
                  <NotificationServiceProvider>
                    {children}
                  </NotificationServiceProvider>
                </ErrorBoundary>
              </main>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
