"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { CheckCircle, Users, Clock, Shield } from "lucide-react"
import Link from "next/link"

export function Homepage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{t.homepage.hero.title}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{t.homepage.hero.subtitle}</p>
          <Link href="/gpt">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-2xl">
              {t.homepage.hero.cta}
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.homepage.howItWorks.title}</h2>
            <p className="text-xl text-gray-600">{t.homepage.howItWorks.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.homepage.howItWorks.steps.map((step, index) => (
              <Card key={index} className="text-center rounded-3xl shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.homepage.whyUs.title}</h2>
            <p className="text-xl text-gray-600">{t.homepage.whyUs.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.homepage.whyUs.features.map((feature, index) => {
              const icons = [CheckCircle, Users, Clock, Shield]
              const Icon = icons[index]

              return (
                <Card key={index} className="text-center rounded-3xl shadow-lg">
                  <CardContent className="p-6">
                    <Icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{t.homepage.footer.company}</h3>
              <p className="text-gray-400 mb-4">{t.homepage.footer.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/over-ons" className="text-gray-400 hover:text-white">
                    {t.homepage.footer.links.about}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    {t.homepage.footer.links.contact}
                  </Link>
                </li>
                <li>
                  <Link href="/aanmelden-klusser" className="text-gray-400 hover:text-white">
                    Voor Klussers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Juridisch</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    {t.homepage.footer.links.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/algemene-voorwaarden" className="text-gray-400 hover:text-white">
                    {t.homepage.footer.links.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t.homepage.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
