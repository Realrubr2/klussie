"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { FileText, Users, Wrench, Euro, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button variant="outline" className="rounded-full bg-transparent">
            ← {t.terms.backToHome}
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.terms.title}</h1>
          <p className="text-xl text-gray-600">{t.terms.subtitle}</p>
          <p className="text-sm text-gray-500 mt-2">{t.terms.lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.terms.introduction.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{t.terms.introduction.content}</p>
            <p className="text-gray-600 leading-relaxed">{t.terms.introduction.acceptance}</p>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Wrench className="w-6 h-6 text-blue-600" />
              {t.terms.service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{t.terms.service.description}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.terms.service.platform.title}</h3>
              <ul className="space-y-2 text-blue-800">
                {t.terms.service.platform.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* User Obligations */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              {t.terms.userObligations.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {t.terms.userObligations.noMisuse.title}
              </h3>
              <p className="text-red-800 mb-4">{t.terms.userObligations.noMisuse.content}</p>
              <ul className="space-y-2 text-red-800">
                {t.terms.userObligations.noMisuse.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{t.terms.userObligations.general.title}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {t.terms.userObligations.general.items.map((obligation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-2xl">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{obligation}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Terms */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Euro className="w-6 h-6 text-blue-600" />
              {t.terms.payment.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">{t.terms.payment.fixedPrice.title}</h3>
              <p className="text-green-800 mb-4">{t.terms.payment.fixedPrice.content}</p>
              <div className="bg-white border border-green-300 rounded-xl p-4">
                <h4 className="font-semibold text-green-900 mb-2">{t.terms.payment.fixedPrice.important.title}</h4>
                <p className="text-green-800 text-sm">{t.terms.payment.fixedPrice.important.content}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.terms.payment.process.title}</h3>
                <div className="space-y-3">
                  {t.terms.payment.process.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">{t.terms.payment.commission.title}</h3>
                <p className="text-orange-800">{t.terms.payment.commission.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Handyman Terms */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">{t.terms.handymanTerms.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.terms.handymanTerms.requirements.title}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {t.terms.handymanTerms.requirements.items.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-2xl">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t.terms.handymanTerms.responsibilities.title}
              </h3>
              <ul className="space-y-2">
                {t.terms.handymanTerms.responsibilities.items.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Liability */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">{t.terms.liability.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{t.terms.liability.platform}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">{t.terms.liability.limitations.title}</h3>
              <ul className="space-y-2 text-yellow-800">
                {t.terms.liability.limitations.items.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-600">{t.terms.liability.insurance}</p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.terms.termination.title}</h2>
            <p className="text-gray-600 mb-4">{t.terms.termination.content}</p>
            <div className="space-y-2">
              {t.terms.termination.reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  {reason}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Changes */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.terms.changes.title}</h2>
            <p className="text-gray-600">{t.terms.changes.content}</p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.terms.contact.title}</h2>
            <p className="text-gray-600 mb-6">{t.terms.contact.content}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="font-medium text-gray-800">{t.terms.contact.email.label}: </span>
                  <a href="mailto:info@klussie.nl" className="text-blue-600 hover:underline">
                    info@klussie.nl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-800">{t.terms.contact.address.label}: </span>
                  <div className="text-gray-600">
                    Klussie
                    <br />
                    Herengracht 123
                    <br />
                    1015 BG Amsterdam
                    <br />
                    Nederland
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
