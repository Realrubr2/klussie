"use client"

import { useState } from "react"
import { HandymanForm } from "@/components/gpt-form"
import { HandymanLoading } from "@/components/gpt-loading"
import { RequestSuccess } from "@/components/request-success"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function GPTPage() {
  const [currentStep, setCurrentStep] = useState<"form" | "loading" | "success" | "error">("form")
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  const handleSendRequest = async (formData: any) => {
    setCurrentStep("loading")
    setError(null)

    try {
      // Call our API route instead of external webhook directly
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("Response status:", response.status)

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Server responded with status ${response.status}`)
      }

      if (result.success) {
        console.log("Success response:", result)
        setCurrentStep("success")
      } else {
        throw new Error(result.error || "Unknown error occurred")
      }
    } catch (error) {
      console.error("Request failed:", error)

      if (error instanceof TypeError && error.message.includes("fetch")) {
        setError("Netwerkfout: Controleer je internetverbinding en probeer opnieuw.")
      } else if (error instanceof Error) {
        setError(`Er is een fout opgetreden: ${error.message}`)
      } else {
        setError("Er is een onbekende fout opgetreden. Probeer het later opnieuw.")
      }

      setCurrentStep("error")
    }
  }

  const handleNewRequest = () => {
    setCurrentStep("form")
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      {currentStep === "form" && <HandymanForm onSubmit={handleSendRequest} isLoading={false} />}

      {currentStep === "loading" && <HandymanLoading />}

      {currentStep === "success" && <RequestSuccess onNewRequest={handleNewRequest} />}

      {currentStep === "error" && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.error.notFound}</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleNewRequest}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Probeer opnieuw
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
