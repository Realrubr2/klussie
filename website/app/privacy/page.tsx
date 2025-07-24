"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Shield, Mail, Phone, Trash2, Clock, UserCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button variant="outline" className="rounded-full bg-transparent">
            ← {t.privacy.backToHome}
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.privacy.title}</h1>
          <p className="text-xl text-gray-600">{t.privacy.subtitle}</p>
          <p className="text-sm text-gray-500 mt-2">{t.privacy.lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacy.introduction.title}</h2>
            <p className="text-gray-600 leading-relaxed">{t.privacy.introduction.content}</p>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-blue-600" />
              {t.privacy.dataCollection.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t.privacy.dataCollection.personalInfo.title}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {t.privacy.dataCollection.personalInfo.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.privacy.dataCollection.jobInfo.title}</h3>
              <ul className="space-y-2 text-gray-600">
                {t.privacy.dataCollection.jobInfo.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Data */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              {t.privacy.dataUse.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.privacy.dataUse.primary.title}</h3>
              <p className="text-blue-800">{t.privacy.dataUse.primary.content}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t.privacy.dataUse.contact.title}</h4>
                  <p className="text-gray-600 text-sm">{t.privacy.dataUse.contact.content}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t.privacy.dataUse.followup.title}</h4>
                  <p className="text-gray-600 text-sm">{t.privacy.dataUse.followup.content}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              {t.privacy.dataRetention.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">{t.privacy.dataRetention.automatic.title}</h3>
              <p className="text-orange-800">{t.privacy.dataRetention.automatic.content}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{t.privacy.dataRetention.timeline.title}</h3>
              <div className="space-y-3">
                {t.privacy.dataRetention.timeline.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.period}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Trash2 className="w-6 h-6 text-blue-600" />
              {t.privacy.yourRights.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">{t.privacy.yourRights.deletion.title}</h3>
              <p className="text-green-800 mb-4">{t.privacy.yourRights.deletion.content}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="mailto:privacy@klussie.nl" className="inline-block">
                  <Button className="bg-green-600 hover:bg-green-700 rounded-2xl">
                    <Mail className="mr-2 h-4 w-4" />
                    {t.privacy.yourRights.deletion.emailButton}
                  </Button>
                </a>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-2xl border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    {t.privacy.yourRights.deletion.contactButton}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{t.privacy.yourRights.list.title}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {t.privacy.yourRights.list.items.map((right, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-2xl">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              {t.privacy.dataSecurity.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{t.privacy.dataSecurity.content}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {t.privacy.dataSecurity.measures.map((measure, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800 text-sm">{measure}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">{t.privacy.contact.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{t.privacy.contact.content}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="font-medium text-gray-800">{t.privacy.contact.email.label}: </span>
                  <a href="mailto:privacy@klussie.nl" className="text-blue-600 hover:underline">
                    privacy@klussie.nl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-800">{t.privacy.contact.address.label}: </span>
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

        {/* Updates */}
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacy.updates.title}</h2>
            <p className="text-gray-600">{t.privacy.updates.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
