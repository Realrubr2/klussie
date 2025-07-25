"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CheckCircle, MessageCircle, Clock, Euro, Upload, X } from "lucide-react"
import Link from "next/link"

interface HandymanFormData {
  name: string
  email: string
  phone: string
  kvk: string
  btw: string
  profilePhoto: File | null
  description: string
  services: string[]
}

export default function HandymanSignupPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<HandymanFormData>({
    name: "",
    email: "",
    phone: "",
    kvk: "",
    btw: "",
    profilePhoto: null,
    description: "",
    services: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof HandymanFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handlePhotoUpload = (file: File) => {
    if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }))
    }
  }

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, profilePhoto: null }))
  }

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert profile photo to base64 if it exists
      let profilePhotoData = null
      if (formData.profilePhoto) {
        const base64Data = await convertImageToBase64(formData.profilePhoto)
        profilePhotoData = {
          name: formData.profilePhoto.name,
          type: formData.profilePhoto.type,
          size: formData.profilePhoto.size,
          data: base64Data,
        }
      }

      // Call the handyman API
      const response = await fetch("/api/handyman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          kvk: formData.kvk,
          btw: formData.btw,
          profilePhoto: profilePhotoData,
          description: formData.description,
          services: formData.services,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Server responded with status ${response.status}`)
      }

      if (result.success) {
        alert("Bedankt voor je aanmelding! We nemen binnen 24 uur contact met je op.")
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          kvk: "",
          btw: "",
          profilePhoto: null,
          description: "",
          services: [],
        })
      } else {
        throw new Error(result.error || "Unknown error occurred")
      }
    } catch (error) {
      console.error("Signup failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Er is een fout opgetreden. Probeer het later opnieuw."
      alert(`Fout: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.kvk &&
    formData.description &&
    formData.services.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button variant="outline" className="rounded-full bg-transparent">
            ← Terug naar Home
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.handymanSignup.title}</h1>
          <p className="text-xl text-gray-600">{t.handymanSignup.subtitle}</p>
        </div>

        {/* Benefits Section */}
        <Card className="mb-12 rounded-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">{t.handymanSignup.benefits.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.handymanSignup.benefits.items.map((benefit, index) => {
                const icons = [CheckCircle, Euro, Clock, MessageCircle]
                const Icon = icons[index]

                return (
                  <div key={index} className="text-center">
                    <Icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card className="mb-12 rounded-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">{t.handymanSignup.howItWorks.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.handymanSignup.howItWorks.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>

            {/* WhatsApp Example */}
            <div className="mt-8 bg-green-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Voorbeeld WhatsApp Bericht:</h4>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>🔧 Nieuwe Klus Beschikbaar</strong>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  📍 Amsterdam Noord
                  <br />🏠 Lekkende kraan repareren
                  <br />💰 Verwachte prijs: €150-200
                  <br />⏰ Binnen 2 dagen
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    ✅ Ja, ik doe het
                  </Button>
                  <Button size="sm" variant="outline">
                    ❌ Nee, bedankt
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card className="rounded-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">{t.handymanSignup.form.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.handymanSignup.form.personalInfo}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.handymanSignup.form.fields.name} *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder={t.handymanSignup.form.placeholders.name}
                      className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.handymanSignup.form.fields.email} *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder={t.handymanSignup.form.placeholders.email}
                      className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.handymanSignup.form.fields.phone} *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder={t.handymanSignup.form.placeholders.phone}
                      className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.handymanSignup.form.fields.profilePhoto}
                    </label>
                    <div className="space-y-4">
                      {!formData.profilePhoto ? (
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">{t.handymanSignup.form.uploadPhoto}</p>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={
                              formData.profilePhoto
                                ? URL.createObjectURL(formData.profilePhoto)
                                : "/placeholder.svg?height=96&width=96"
                            }
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=96&width=96"
                            }}
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={removePhoto}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.handymanSignup.form.businessInfo}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.handymanSignup.form.fields.kvk} *
                    </label>
                    <Input
                      type="text"
                      value={formData.kvk}
                      onChange={(e) => handleInputChange("kvk", e.target.value)}
                      placeholder={t.handymanSignup.form.placeholders.kvk}
                      className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.handymanSignup.form.fields.btw}
                    </label>
                    <Input
                      type="text"
                      value={formData.btw}
                      onChange={(e) => handleInputChange("btw", e.target.value)}
                      placeholder={t.handymanSignup.form.placeholders.btw}
                      className="rounded-2xl border-2 border-gray-200 focus:border-blue-400 h-12"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.handymanSignup.form.fields.description} *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder={t.handymanSignup.form.placeholders.description}
                    className="min-h-32 rounded-2xl border-2 border-gray-200 focus:border-blue-400 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.handymanSignup.form.services}</h3>
                <p className="text-sm text-gray-600 mb-4">{t.handymanSignup.form.fields.services}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.handymanSignup.form.serviceOptions.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Checkbox
                        id={`service-${index}`}
                        checked={formData.services.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <label htmlFor={`service-${index}`} className="text-sm text-gray-700 cursor-pointer">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 text-lg rounded-2xl disabled:opacity-50"
                >
                  {isSubmitting ? "Bezig met versturen..." : t.handymanSignup.form.submit}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
