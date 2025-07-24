"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Edit, Send, User, Mail, Phone, Wrench, Clock, DollarSign, ImageIcon, MapPin } from "lucide-react"

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
  postalCode: string
  city: string
}

interface RequestSummaryProps {
  formData: FormData
  onEdit: () => void
  onSend: () => void
  isLoading: boolean
}

export function RequestSummary({ formData, onEdit, onSend, isLoading }: RequestSummaryProps) {
  const { t } = useLanguage()

  const getUrgencyLabel = (value: string) => {
    switch (value) {
      case "low":
        return t.form.urgencyOptions.low
      case "medium":
        return t.form.urgencyOptions.medium
      case "high":
        return t.form.urgencyOptions.high
      default:
        return value
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-2xl mx-auto rounded-3xl shadow-lg">
        <CardHeader className="text-center p-8">
          <CardTitle className="text-2xl font-bold text-gray-800">{t.summary.title}</CardTitle>
          <p className="text-gray-600">{t.summary.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6 p-8 pt-0">
          {/* Job Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Wrench className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{t.summary.jobType}</h3>
                <p className="text-gray-600">{formData.jobType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                <div className="h-2 w-2 bg-white rounded-full" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{t.summary.description}</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{formData.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{t.summary.urgency}</h3>
                <p className="text-gray-600">{getUrgencyLabel(formData.urgency)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{t.summary.budget}</h3>
                <p className="text-gray-600">{formData.budget || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ImageIcon className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{t.summary.images}</h3>
                {formData.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {formData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image ? URL.createObjectURL(image) : "/placeholder.svg?height=64&width=64"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-16 object-cover rounded-2xl border"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">{t.summary.noImagesUploaded}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">{t.summary.contactInfo}</h3>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <span className="font-medium text-gray-700">{t.summary.name}:</span>
                <span className="ml-2 text-gray-600">{formData.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <span className="font-medium text-gray-700">{t.summary.email}:</span>
                <span className="ml-2 text-gray-600">{formData.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <span className="font-medium text-gray-700">{t.summary.phone}:</span>
                <span className="ml-2 text-gray-600">{formData.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <span className="font-medium text-gray-700">{t.summary.address}:</span>
                <span className="ml-2 text-gray-600">{formData.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <span className="font-medium text-gray-700">{t.summary.location}:</span>
                <span className="ml-2 text-gray-600">
                  {formData.postalCode} {formData.city}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onEdit}
              className="flex-1 bg-transparent border-blue-200 hover:bg-blue-50 rounded-2xl h-12"
            >
              <Edit className="mr-2 h-4 w-4" />
              {t.summary.edit}
            </Button>
            <Button
              onClick={onSend}
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-2xl h-12"
            >
              <Send className="mr-2 h-4 w-4" />
              {t.summary.send}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
