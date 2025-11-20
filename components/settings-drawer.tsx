"use client"

import { useState } from "react"
import { Settings, X, ChevronRight, Globe, Zap, Code, User, DollarSign, Lock, Link, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Model = {
  id: string
  name: string
  provider: string
  working: boolean
  type?: string
}

interface SettingsDrawerProps {
  availableModels: Model[]
  selectedModel: string
  setSelectedModel: (modelId: string) => void
}

const SettingItem: React.FC<{ icon: React.ReactNode; title: string; description?: string; onClick?: () => void; rightContent?: React.ReactNode }> = ({
  icon,
  title,
  description,
  onClick,
  rightContent,
}) => (
  <div
    className={cn("flex items-center justify-between p-3 rounded-lg transition-colors", onClick ? "hover:bg-zinc-800 cursor-pointer" : "")}
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="font-medium text-white">{title}</p>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
    </div>
    {rightContent || (onClick && <ChevronRight className="h-5 w-5 text-gray-500" />)}
  </div>
)

const CapabilitiesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronRight className="h-6 w-6 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold text-white">القدرات</h2>
        <div className="w-6"></div>
      </div>

      <SettingItem
        icon={<Globe className="h-5 w-5" />}
        title="البحث على الويب"
        description="سيقوم النموذج بالبحث تلقائيًا على الويب عندما يرى أنه بحاجة إلى معلومات حالية."
        rightContent={<Switch defaultChecked />}
      />
      <Separator className="my-2 bg-zinc-700" />
      <SettingItem
        icon={<Code className="h-5 w-5" />}
        title="النتائج المتقدمة"
        description="إنشاء محتوى مثل مقتطفات الأكواد، المستندات النصية، أو تصاميم المواقع في نافذة مخصصة."
        rightContent={<Switch defaultChecked />}
      />
    </div>
  )
}

const SelectModelScreen: React.FC<{ onBack: () => void; availableModels: Model[]; selectedModel: string; setSelectedModel: (modelId: string) => void }> = ({
  onBack,
  availableModels,
  selectedModel,
  setSelectedModel,
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronRight className="h-6 w-6 rotate-180" />
        </Button>
        <h2 className="text-xl font-semibold text-white">اختر النموذج</h2>
        <div className="w-6"></div>
      </div>

      <div className="space-y-3">
        {availableModels.map((model) => (
          <SettingItem
            key={model.id}
            icon={<Zap className="h-5 w-5" />}
            title={model.name}
            description={model.provider}
            onClick={() => setSelectedModel(model.id)}
            rightContent={
              selectedModel === model.id ? (
                <div className="h-4 w-4 rounded-full border-2 border-blue-500 bg-blue-500"></div>
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-gray-500"></div>
              )
            }
          />
        ))}
      </div>
    </div>
  )
}

const MainSettingsScreen: React.FC<{ onNavigate: (screen: 'capabilities' | 'selectModel') => void }> = ({ onNavigate }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-white mb-6">الإعدادات</h2>

      <div className="space-y-4">
        <SettingItem icon={<User className="h-5 w-5" />} title="الملف الشخصي" />
        <SettingItem icon={<DollarSign className="h-5 w-5" />} title="الفواتير" />
        <SettingItem icon={<Zap className="h-5 w-5" />} title="النماذج" onClick={() => onNavigate('selectModel')} />
        <SettingItem icon={<Lock className="h-5 w-5" />} title="الأذونات" />
        <SettingItem icon={<Globe className="h-5 w-5" />} title="القدرات" onClick={() => onNavigate('capabilities')} />
        <SettingItem icon={<Link className="h-5 w-5" />} title="الروابط المشتركة" />
        <Separator className="my-4 bg-zinc-700" />
        <SettingItem icon={<LogOut className="h-5 w-5 text-red-500" />} title="تسجيل الخروج" description="قد تحتاج إلى تسجيل الدخول مرة أخرى" />
      </div>
    </div>
  )
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ availableModels, selectedModel, setSelectedModel }) => {
  const [open, setOpen] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<'main' | 'capabilities' | 'selectModel'>('main')

  const handleClose = () => {
    setOpen(false)
    // العودة إلى الشاشة الرئيسية عند الإغلاق
    setTimeout(() => setCurrentScreen('main'), 300)
  }

  const handleNavigate = (screen: 'capabilities' | 'selectModel') => {
    setCurrentScreen(screen)
  }

  const handleBack = () => {
    setCurrentScreen('main')
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" title="الإعدادات والقدرات">
          <Settings className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90%] max-h-[90%] bg-zinc-900 border-t border-zinc-700">
        <DrawerHeader className="flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-6 w-6 text-gray-400" />
          </Button>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          {currentScreen === 'main' && <MainSettingsScreen onNavigate={handleNavigate} />}
          {currentScreen === 'capabilities' && <CapabilitiesScreen onBack={handleBack} />}
          {currentScreen === 'selectModel' && (
            <SelectModelScreen
              onBack={handleBack}
              availableModels={availableModels}
              selectedModel={selectedModel}
              setSelectedModel={(modelId) => {
                setSelectedModel(modelId)
                handleBack() // العودة إلى الشاشة الرئيسية بعد اختيار النموذج
              }}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
