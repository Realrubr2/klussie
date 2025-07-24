"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, MessageCircle } from "lucide-react"

interface RequestSuccessProps {
  onNewRequest: () => void
}

export function RequestSuccess({ onNewRequest }: RequestSuccessProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.success.title}</h2>
              <p className="text-gray-600">{t.success.subtitle}</p>
            </div>

            {/* Status Steps */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-green-800 font-medium">{t.success.step1}</span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 animate-pulse" />
                <span className="text-sm text-blue-800 font-medium">{t.success.step2}</span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <MessageCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{t.success.step3}</span>
              </div>
            </div>

            {/* Action Button */}
            <Button onClick={onNewRequest} className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-8 py-3 text-base">
              {t.success.newRequest}
            </Button>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">{t.success.disclaimer}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
