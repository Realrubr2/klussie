import { type NextRequest, NextResponse } from "next/server"

// Handyman registration form data
interface HandymanSignupData {
  name: string
  email: string
  phone: string
  kvk: string
  btw: string
  profilePhoto: {
    name: string
    type: string
    size: number
    data: string
  } | null
  description: string
  services: string[]
}

export async function POST(request: NextRequest) {
  try {
    const formData: HandymanSignupData = await request.json()

    // Type guard validation
    const isValidForm = (
      formData &&
      typeof formData.name === "string" &&
      typeof formData.email === "string" &&
      typeof formData.phone === "string" &&
      typeof formData.kvk === "string" &&
      typeof formData.description === "string" &&
      Array.isArray(formData.services) &&
      formData.services.length > 0
    )

    if (!isValidForm) {
      return NextResponse.json(
        { error: "Missing or invalid required fields for handyman registration" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate KVK number (basic validation - should be 8 digits)
    const kvkRegex = /^\d{8}$/
    if (!kvkRegex.test(formData.kvk.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "Invalid KVK number format" },
        { status: 400 }
      )
    }


    const webhookUrl = process.env.HANDYMAN_URL
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "HANDYMAN_URL is not configured" },
        { status: 500 }
      )
    }
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook responded with status ${n8nResponse.status}`)
    }

    return NextResponse.json({
      success: true,
      message: "Handyman registration submitted successfully"
    })

  } catch (error) {
    console.error("Handyman API error:", error)

    return NextResponse.json(
      {
        error: "Failed to submit request. Please try again later.",
        success: false
      },
      { status: 500 }
    )
  }
}
