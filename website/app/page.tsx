"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Homepage } from "@/components/homepage"

interface FormData {
  jobType: string
  description: string
  urgency: string
  budget: string
  images: File[]
  name: string
  email: string
  phone: string
  address: string
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <Homepage />
    </div>
  )
}
