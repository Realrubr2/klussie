import { type NextRequest, NextResponse } from "next/server"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  images: Array<{
    name: string
    type: string
    size: number
    data: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // Send to n8n webhook endpoint
    const n8nResponse = await fetch("CONTACT_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        images: formData.images,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook responded with status ${n8nResponse.status}`)
    }

    return NextResponse.json({ 
      success: true,
      message: "Contact form submitted successfully"
    })

  } catch (error) {
    console.error("Contact form submission error:", error)
    
    // Return a generic error message to avoid exposing internal details
    return NextResponse.json(
      { 
        error: "Failed to submit contact form. Please try again later.",
        success: false
      },
      { status: 500 }
    )
  }
}
