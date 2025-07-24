import { type NextRequest, NextResponse } from "next/server"

interface GPTFormData {
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

export async function POST(request: NextRequest) {
  try {
    const formData: GPTFormData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.jobType || !formData.description) {
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

    // Send to n8n webhook endpoint (GPT test endpoint)
    const n8nResponse = await fetch("GPT_URL", {
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

    const result = await n8nResponse.json()

    return NextResponse.json({ 
      success: true,
      message: "GPT request submitted successfully",
      data: result
    })

  } catch (error) {
    console.error("GPT form submission error:", error)
    
    // Return a generic error message to avoid exposing internal details
    return NextResponse.json(
      { 
        error: "Failed to submit GPT request. Please try again later.",
        success: false
      },
      { status: 500 }
    )
  }
}
