"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CheckCircle, Users, Target, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button variant="outline" className="rounded-full bg-transparent">
            ← {t.about.backToHome}
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.about.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.about.subtitle}</p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 rounded-3xl shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.mission.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{t.about.mission.description}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t.about.mission.stats.title}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{t.about.mission.stats.handymen}</span>
                    <span className="font-bold text-2xl">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t.about.mission.stats.jobsCompleted}</span>
                    <span className="font-bold text-2xl">2,500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t.about.mission.stats.satisfaction}</span>
                    <span className="font-bold text-2xl">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <Card className="mb-12 rounded-3xl shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.values.title}</h2>
              <p className="text-gray-600 text-lg">{t.about.values.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.about.values.items.map((value, index) => {
                const icons = [CheckCircle, Users, Award]
                const Icon = icons[index]

                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Story Section */}
        <Card className="mb-12 rounded-3xl shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t.about.story.title}</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                {t.about.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mb-12 rounded-3xl shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.team.title}</h2>
              <p className="text-gray-600 text-lg">{t.about.team.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.about.team.members.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={`/placeholder.svg?height=120&width=120&text=${member.name}`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="rounded-3xl shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">{t.about.cta.title}</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">{t.about.cta.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/gpt">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-2xl px-8 py-3 text-lg">
                    {t.about.cta.findHandyman}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/aanmelden-klusser">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 rounded-2xl px-8 py-3 text-lg bg-transparent"
                  >
                    {t.about.cta.becomeHandyman}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
