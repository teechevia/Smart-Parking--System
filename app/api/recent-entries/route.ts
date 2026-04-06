import { NextResponse } from "next/server"
import { recentEntries, dashboardStats, vehicleTypesData, hourlyUsageData, zoneCapacityData } from "@/lib/fake-data"

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      entries: recentEntries,
      stats: dashboardStats,
      vehicleTypes: vehicleTypesData,
      hourlyUsage: hourlyUsageData,
      zoneCapacity: zoneCapacityData,
    },
  })
}
