import { NextResponse } from "next/server"
import { fakeOCRResults } from "@/lib/fake-data"

export async function POST() {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  // Return a random vehicle from the fake OCR results
  const randomIndex = Math.floor(Math.random() * fakeOCRResults.length)
  const vehicle = fakeOCRResults[randomIndex]
  
  return NextResponse.json({
    success: true,
    data: {
      vehicleNo: vehicle.vehicleNo,
      owner: vehicle.owner,
      type: vehicle.type,
      status: vehicle.status,
      slot: vehicle.slot,
      confidence: vehicle.confidence,
      detectedAt: new Date().toISOString(),
    },
  })
}
