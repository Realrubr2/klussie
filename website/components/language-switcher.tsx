"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "nl" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("nl")}
        className="rounded-full"
      >
        NL
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="rounded-full"
      >
        EN
      </Button>
    </div>
  )
}
