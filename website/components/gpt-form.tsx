"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wrench, Upload, X, Loader2 } from "lucide-react"

interface FormData {
  jobType: string
  description: string
  urgency: string
  budget: string
  images: Array<{
    name: string
    type: string
    size: number
    data: string
  }>
  name: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
}

interface HandymanFormProps {
  onSubmit: (data: FormData) => void
  isLoading: boolean
}

interface ChatMessage {
  type: "bot" | "user"
  content: string
  images?: File[]
}

export function HandymanForm({ onSubmit, isLoading }: HandymanFormProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([{ type: "bot", content: t.form.welcome }])
  const [currentInput, setCurrentInput] = useState("")
  const [formData, setFormData] = useState<FormData>({
    jobType: "",
    description: "",
    urgency: "",
    budget: "",
    images: [],
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  })
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [validationError, setValidationError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const questions = [
    { key: "jobType", question: t.form.questions.jobType, placeholder: t.form.placeholders.jobType, type: "text" },
    {
      key: "description",
      question: t.form.questions.description,
      placeholder: t.form.placeholders.description,
      type: "textarea",
    },
    { key: "urgency", question: t.form.questions.urgency, type: "select" },
    { key: "budget", question: t.form.questions.budget, placeholder: t.form.placeholders.budget, type: "text" },
    { key: "images", question: t.form.questions.images, type: "image" },
    { key: "name", question: t.contactInfo.name, type: "text" },
    { key: "email", question: t.contactInfo.email, type: "email" },
    { key: "phone", question: t.contactInfo.phone, type: "tel" },
    { key: "address", question: t.contactInfo.address, type: "text" },
    {
      key: "postalCode",
      question: t.contactInfo.postalCode,
      placeholder: t.contactInfo.postalCodePlaceholder,
      type: "text",
    },
    { key: "city", question: t.contactInfo.city, type: "text" },
  ]

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Dutch phone number validation (supports +31, 06, 0031 formats)
    const phoneRegex = /^(\+31|0031|0)[6-9]\d{8}$|^(\+31|0031|0)[1-9]\d{8}$/
    const cleanPhone = phone.replace(/[\s\-$$$$]/g, "")
    return phoneRegex.test(cleanPhone)
  }

  const validatePostalCode = (postalCode: string): boolean => {
    // Dutch postal code validation (1234AB format)
    const postalCodeRegex = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/
    return postalCodeRegex.test(postalCode.trim())
  }

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const validateCurrentInput = (): boolean => {
    const currentQuestion = questions[currentStep]
    setValidationError("")

    if (currentQuestion.type === "email") {
      if (!validateEmail(currentInput)) {
        setValidationError("Voer een geldig e-mailadres in")
        return false
      }
    }

    if (currentQuestion.type === "tel") {
      if (!validatePhone(currentInput)) {
        setValidationError("Voer een geldig Nederlands telefoonnummer in (bijv. 06-12345678 of +31-6-12345678)")
        return false
      }
    }

    if (currentQuestion.key === "postalCode") {
      if (!validatePostalCode(currentInput)) {
        setValidationError("Voer een geldige Nederlandse postcode in (bijv. 1234AB)")
        return false
      }
    }

    return true
  }

  const handleNext = async () => {
    if (currentStep < questions.length) {
      const currentQuestion = questions[currentStep]

      // Skip validation for image uploads
      if (currentQuestion.type !== "image" && !validateCurrentInput()) {
        return
      }

      const value = currentInput

      // Add user response to messages
      const userMessage: ChatMessage = {
        type: "user",
        content: currentQuestion.type === "select" ? getUrgencyLabel(currentInput) : currentInput,
        images: currentQuestion.type === "image" ? uploadedImages : undefined,
      }

      setMessages((prev) => [...prev, userMessage])

      // Update form data
      if (currentQuestion.key === "images") {
        // Convert images to base64 before storing
        const imagePromises = uploadedImages.map(async (image) => ({
          name: image.name,
          type: image.type,
          size: image.size,
          data: await convertImageToBase64(image),
        }))
        const convertedImages = await Promise.all(imagePromises)
        setFormData((prev) => ({ ...prev, images: convertedImages }))
      } else {
        setFormData((prev) => ({ ...prev, [currentQuestion.key]: value }))
      }

      // Move to next question or submit
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
        setMessages((prev) => [...prev, { type: "bot", content: questions[currentStep + 1].question }])
        setCurrentInput("")
        setValidationError("")
      } else {
        // Submit form - convert images if this is the final step and it's an image question
        let finalData = {
          ...formData,
          [currentQuestion.key]: value,
        }

        if (currentQuestion.key === "images") {
          const imagePromises = uploadedImages.map(async (image) => ({
            name: image.name,
            type: image.type,
            size: image.size,
            data: await convertImageToBase64(image),
          }))
          const convertedImages = await Promise.all(imagePromises)
          finalData = {
            ...formData,
            images: convertedImages,
          }
        }

        onSubmit(finalData)
      }
    }
  }

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

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).filter(
        (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024,
      )
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const currentQuestion = questions[currentStep]

      // Don't prevent default for textarea (allow new lines)
      if (currentQuestion.type === "textarea") {
        return
      }

      // Don't prevent default for select (allow opening dropdown)
      if (currentQuestion.type === "select") {
        return
      }

      e.preventDefault()

      // Only proceed if we can proceed (same logic as the Next button)
      if (canProceed() && !isLoading) {
        handleNext()
      }
    }
  }

  const canProceed = () => {
    if (currentStep >= questions.length) return false
    const currentQuestion = questions[currentStep]

    if (currentQuestion.type === "image") {
      return true // Images are optional
    }
    return currentInput.trim() !== ""
  }

  const renderInput = () => {
    if (currentStep >= questions.length) return null

    const currentQuestion = questions[currentStep]

    switch (currentQuestion.type) {
      case "textarea":
        return (
          <Textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={4}
            className="resize-none rounded-2xl p-4 text-base min-h-[120px]"
          />
        )
      case "select":
        return (
          <Select value={currentInput} onValueChange={setCurrentInput}>
            <SelectTrigger className="rounded-2xl h-14 px-4 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="low" className="rounded-xl">
                {t.form.urgencyOptions.low}
              </SelectItem>
              <SelectItem value="medium" className="rounded-xl">
                {t.form.urgencyOptions.medium}
              </SelectItem>
              <SelectItem value="high" className="rounded-xl">
                {t.form.urgencyOptions.high}
              </SelectItem>
            </SelectContent>
          </Select>
        )
      case "email":
        return (
          <Input
            type="email"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="your.email@example.com"
            className="rounded-2xl h-14 px-4 text-base"
            onKeyDown={handleKeyDown}
          />
        )
      case "tel":
        return (
          <Input
            type="tel"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="+31 6 12345678 of 06-12345678"
            className="rounded-2xl h-14 px-4 text-base"
            onKeyDown={handleKeyDown}
          />
        )
      case "image":
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
              <p className="text-sm text-blue-800">{t.imageDisclaimer}</p>
            </div>
            <div
              className="border-2 border-dashed border-blue-300 rounded-3xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{t.form.imageUpload.dragDrop}</p>
              <p className="text-xs text-gray-500 mt-1">{t.form.imageUpload.maxSize}</p>
              <p className="text-xs text-gray-500">{t.form.imageUpload.formats}</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="hidden"
            />
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image ? URL.createObjectURL(image) : "/placeholder.svg?height=96&width=96"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-2xl"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=96&width=96"
                      }}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      default:
        return (
          <Input
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={currentQuestion.placeholder || "Enter your response..."}
            className="rounded-2xl h-14 px-4 text-base"
            onKeyDown={handleKeyDown}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <Wrench className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Klussie</h1>
        </div>

        <Card className="w-full rounded-3xl shadow-lg">
          <CardContent className="p-8">
            {/* Chat Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.images && message.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {message.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image ? URL.createObjectURL(image) : "/placeholder.svg?height=64&width=64"}
                            alt={`Uploaded ${imgIndex + 1}`}
                            className="w-full h-16 object-cover rounded-xl"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Question */}
            {currentStep < questions.length && (
              <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-2xl">
                  <p className="text-sm text-gray-800">{questions[currentStep].question}</p>
                </div>

                {renderInput()}

                {/* Validation Error */}
                {validationError && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                    <p className="text-sm text-red-700">{validationError}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {questions[currentStep].type === "image" && (
                    <Button
                      variant="outline"
                      onClick={handleNext}
                      className="flex-1 bg-transparent border-blue-200 hover:bg-blue-50 rounded-2xl h-12"
                    >
                      {t.noImages}
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed() || isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-2xl h-12"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.form.submitting}
                      </>
                    ) : currentStep === questions.length - 1 ? (
                      t.form.buttons.submit
                    ) : (
                      t.form.buttons.next
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
