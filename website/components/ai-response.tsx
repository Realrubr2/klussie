"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Info, ArrowLeft } from "lucide-react"

interface AIResponseProps {
  response: string
  onNewRequest: () => void
}

export function AIResponse({ response, onNewRequest }: AIResponseProps) {
  const { t } = useLanguage()

  // Format the response with better styling
  const formatResponse = (text: string) => {
    const sections = text.split("\n\n")
    return sections.map((section, index) => {
      if (section.toLowerCase().includes("safety") || section.toLowerCase().includes("warning")) {
        return (
          <div key={index} className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-yellow-800">{section}</p>
          </div>
        )
      } else if (
        section.toLowerCase().includes("step") ||
        section.toLowerCase().includes("1.") ||
        section.toLowerCase().includes("2.")
      ) {
        return (
          <div key={index} className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-4">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">{section}</p>
          </div>
        )
      } else {
        return (
          <div key={index} className="flex gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl mb-4">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">{section}</p>
          </div>
        )
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-4xl mx-auto rounded-3xl shadow-lg">
        <CardHeader className="p-8">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{t.response.title}</CardTitle>
            <Button
              variant="outline"
              onClick={onNewRequest}
              className="gap-2 bg-transparent border-blue-200 hover:bg-blue-50 rounded-2xl"
            >
              <ArrowLeft className="h-4 w-4 text-blue-600" />
              {t.response.newRequest}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="prose max-w-none">{formatResponse(response)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
