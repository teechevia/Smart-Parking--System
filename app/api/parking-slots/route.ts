import { NextResponse } from "next/server"
import { parkingZones, countSlotsByStatus, getTotalSlots } from "@/lib/fake-data"

export async function GET() {
  const slotCounts = countSlotsByStatus()
  const totalSlots = getTotalSlots()
  
  return NextResponse.json({
    success: true,
    data: {
      zones: parkingZones,
      summary: {
        total: totalSlots,
        available: slotCounts.available,
        occupied: slotCounts.occupied,
        reserved: slotCounts.reserved,
        faculty: slotCounts.faculty,
      },
    },
  })
}
