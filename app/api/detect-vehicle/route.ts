import { NextResponse } from "next/server"
import {
  checkVehicleStatus,
  getFirstAvailableSlot,
  assignSlotToVehicle,
  addEntryLog,
  addAlert,
  releaseSlot,
  removeEntryLog,
  addExitLog,
  getEntryLogByVehicle,
  calculateDuration,
  type EntryLog,
  type ExitLog,
} from "@/lib/fake-data"

// POST: Vehicle entry detection
export async function POST(request: Request) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    const body = await request.json()
    const { vehicleNo, action = "entry" } = body

    if (!vehicleNo) {
      return NextResponse.json(
        { success: false, error: "Vehicle number is required" },
        { status: 400 }
      )
    }

    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // Handle EXIT action
    if (action === "exit") {
      const entryLog = getEntryLogByVehicle(vehicleNo)
      
      if (!entryLog) {
        return NextResponse.json({
          success: false,
          error: "No entry record found for this vehicle",
          data: {
            vehicleNo,
            action: "exit",
            status: "not_found",
          },
        })
      }

      // Release the parking slot
      const releaseResult = releaseSlot(vehicleNo)

      // Remove from entry logs and add to exit logs
      const removedEntry = removeEntryLog(vehicleNo)
      
      if (removedEntry && releaseResult.success) {
        const exitLog: ExitLog = {
          id: `exit-${Date.now()}`,
          vehicleNo: removedEntry.vehicleNo,
          owner: removedEntry.owner,
          type: removedEntry.type,
          entryTime: removedEntry.entryTime,
          exitTime: currentTime,
          slot: removedEntry.assignedSlot || "N/A",
          duration: calculateDuration(removedEntry.entryTime, currentTime),
          gate: "Gate 1 - Main Exit",
        }

        addExitLog(exitLog)

        return NextResponse.json({
          success: true,
          data: {
            vehicleNo: exitLog.vehicleNo,
            owner: exitLog.owner,
            type: exitLog.type,
            action: "exit",
            entryTime: exitLog.entryTime,
            exitTime: exitLog.exitTime,
            duration: exitLog.duration,
            releasedSlot: releaseResult.slotId,
            gate: exitLog.gate,
          },
        })
      }

      return NextResponse.json({
        success: false,
        error: "Failed to process vehicle exit",
      })
    }

    // Handle ENTRY action
    // Check vehicle status in the system
    const vehicleCheck = checkVehicleStatus(vehicleNo)
    const confidence = 95 + Math.random() * 5

    // Handle BLACKLISTED vehicle
    if (vehicleCheck.status === "blacklisted") {
      // Create critical alert for blacklisted vehicle
      addAlert({
        title: "Blacklisted Vehicle Entry Attempt",
        description: `Vehicle ${vehicleNo} attempted entry - access denied. This vehicle is on the blacklist.`,
        time: "Just now",
        severity: "critical",
        type: "security",
        vehicleNo,
        location: "Gate 1 - Main Entry",
        status: "active",
      })

      // Add entry log with denied status
      const entryLog: EntryLog = {
        id: `entry-${Date.now()}`,
        vehicleNo,
        owner: vehicleCheck.owner,
        type: vehicleCheck.type,
        entryTime: currentTime,
        assignedSlot: null,
        status: "blacklisted",
        confidence,
        gate: "Gate 1 - Main Entry",
      }
      addEntryLog(entryLog)

      return NextResponse.json({
        success: true,
        data: {
          vehicleNo,
          owner: vehicleCheck.owner,
          type: vehicleCheck.type,
          status: "blacklisted",
          slot: null,
          confidence: Math.round(confidence * 10) / 10,
          detectedAt: new Date().toISOString(),
          message: "Access denied - Vehicle is blacklisted",
          alert: {
            severity: "critical",
            type: "security",
            message: "Blacklisted vehicle attempted entry",
          },
        },
      })
    }

    // Handle UNAUTHORIZED vehicle
    if (vehicleCheck.status === "unauthorized") {
      // Create critical alert for unauthorized vehicle
      addAlert({
        title: "Unauthorized Vehicle Detected",
        description: `Unregistered vehicle ${vehicleNo} detected at entry gate. No valid parking permit found in database.`,
        time: "Just now",
        severity: "critical",
        type: "unauthorized",
        vehicleNo,
        location: "Gate 1 - Main Entry",
        status: "active",
      })

      // Add entry log with unauthorized status (no slot assigned)
      const entryLog: EntryLog = {
        id: `entry-${Date.now()}`,
        vehicleNo,
        owner: vehicleCheck.owner,
        type: vehicleCheck.type,
        entryTime: currentTime,
        assignedSlot: null,
        status: "unauthorized",
        confidence,
        gate: "Gate 1 - Main Entry",
      }
      addEntryLog(entryLog)

      return NextResponse.json({
        success: true,
        data: {
          vehicleNo,
          owner: vehicleCheck.owner,
          type: vehicleCheck.type,
          status: "unauthorized",
          slot: null,
          confidence: Math.round(confidence * 10) / 10,
          detectedAt: new Date().toISOString(),
          message: "Access denied - Vehicle not registered in system",
          alert: {
            severity: "critical",
            type: "unauthorized",
            message: "Unauthorized vehicle attempted entry",
          },
        },
      })
    }

    // Handle AUTHORIZED vehicle
    // Find first available parking slot
    const availableSlot = getFirstAvailableSlot()

    if (!availableSlot) {
      // No slots available
      addAlert({
        title: "Parking Full - Vehicle Waiting",
        description: `Authorized vehicle ${vehicleNo} arrived but no parking slots available.`,
        time: "Just now",
        severity: "warning",
        type: "maintenance",
        vehicleNo,
        location: "Gate 1 - Main Entry",
        status: "active",
      })

      return NextResponse.json({
        success: true,
        data: {
          vehicleNo,
          owner: vehicleCheck.owner,
          type: vehicleCheck.type,
          status: "authorized",
          slot: null,
          confidence: Math.round(confidence * 10) / 10,
          detectedAt: new Date().toISOString(),
          message: "No parking slots available",
          alert: {
            severity: "warning",
            type: "maintenance",
            message: "Parking lot is full",
          },
        },
      })
    }

    // Assign the slot to the vehicle
    const assigned = assignSlotToVehicle(availableSlot.slot.id, {
      number: vehicleNo,
      owner: vehicleCheck.owner,
      type: vehicleCheck.type,
    })

    if (assigned) {
      // Create entry log
      const entryLog: EntryLog = {
        id: `entry-${Date.now()}`,
        vehicleNo,
        owner: vehicleCheck.owner,
        type: vehicleCheck.type,
        entryTime: currentTime,
        assignedSlot: availableSlot.slot.id,
        status: "authorized",
        confidence,
        gate: "Gate 1 - Main Entry",
      }
      addEntryLog(entryLog)

      return NextResponse.json({
        success: true,
        data: {
          vehicleNo,
          owner: vehicleCheck.owner,
          type: vehicleCheck.type,
          status: "authorized",
          slot: availableSlot.slot.id,
          zone: availableSlot.zone,
          confidence: Math.round(confidence * 10) / 10,
          detectedAt: new Date().toISOString(),
          message: `Welcome! Assigned to slot ${availableSlot.slot.id}`,
          entryLog: {
            id: entryLog.id,
            entryTime: entryLog.entryTime,
            gate: entryLog.gate,
          },
        },
      })
    }

    return NextResponse.json(
      { success: false, error: "Failed to assign parking slot" },
      { status: 500 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    )
  }
}
