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
  fakeOCRResults,
  generateVehicleNo,
  type EntryLog,
  type ExitLog,
} from "@/lib/fake-data"

// ============================================================================
// CONFIGURATION
// ============================================================================

// Allowed image MIME types
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// ============================================================================
// IMAGE PROCESSING PLACEHOLDER
// ============================================================================

/**
 * Process the uploaded image and extract license plate text.
 * 
 * Currently returns fake OCR results for demonstration.
 * Replace this function with actual OCR implementation.
 * 
 * @param imageBuffer - The image file buffer
 * @param mimeType - The MIME type of the image
 * @returns Detected vehicle number and confidence score
 * 
 * INTEGRATION POINTS FOR REAL OCR:
 * 
 * Option 1: EasyOCR (Python)
 * --------------------------
 * - Set up a Python microservice with FastAPI/Flask
 * - Use easyocr library: reader.readtext(image_path)
 * - Call via HTTP from this route
 * 
 * Option 2: Tesseract.js (JavaScript)
 * ------------------------------------
 * import Tesseract from 'tesseract.js';
 * const result = await Tesseract.recognize(imageBuffer, 'eng');
 * const vehicleNo = result.data.text.trim();
 * 
 * Option 3: OpenCV + Custom Model
 * --------------------------------
 * - Use OpenCV for image preprocessing (grayscale, threshold, contour detection)
 * - Apply trained YOLO/SSD model for license plate detection
 * - Extract ROI and run OCR on the cropped region
 * 
 * Option 4: Cloud OCR Services
 * ----------------------------
 * - Google Cloud Vision API
 * - AWS Textract
 * - Azure Computer Vision
 */
async function processImageOCR(
  imageBuffer: Buffer,
  mimeType: string
): Promise<{ vehicleNo: string; confidence: number }> {
  // Log image details for debugging (remove in production)
  console.log(`[OCR] Processing image: ${mimeType}, size: ${imageBuffer.length} bytes`)

  // ============================================================================
  // TODO: IMPLEMENT REAL OCR HERE
  // ============================================================================
  // 
  // Example with Tesseract.js:
  // --------------------------
  // import Tesseract from 'tesseract.js';
  // 
  // // Preprocess image if needed (convert to grayscale, enhance contrast)
  // const preprocessedImage = await preprocessImage(imageBuffer);
  // 
  // // Run OCR
  // const result = await Tesseract.recognize(preprocessedImage, 'eng', {
  //   tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
  // });
  // 
  // // Extract and clean license plate text
  // const rawText = result.data.text;
  // const vehicleNo = extractLicensePlate(rawText);
  // const confidence = result.data.confidence;
  // 
  // return { vehicleNo, confidence };
  // 
  // ============================================================================
  // Example with external Python EasyOCR service:
  // ============================================================================
  // 
  // const formData = new FormData();
  // formData.append('image', new Blob([imageBuffer], { type: mimeType }));
  // 
  // const response = await fetch('http://localhost:8000/api/ocr', {
  //   method: 'POST',
  //   body: formData,
  // });
  // 
  // const result = await response.json();
  // return { vehicleNo: result.plate_number, confidence: result.confidence };
  // 
  // ============================================================================

  // FAKE OCR RESULT FOR DEMONSTRATION
  // Randomly select from known vehicles or generate a random plate
  const useKnownVehicle = Math.random() > 0.3 // 70% chance of known vehicle
  
  let vehicleNo: string
  if (useKnownVehicle) {
    const randomIndex = Math.floor(Math.random() * fakeOCRResults.length)
    vehicleNo = fakeOCRResults[randomIndex].vehicleNo
  } else {
    vehicleNo = generateVehicleNo()
  }

  // Simulate confidence based on "image quality"
  const confidence = 92 + Math.random() * 7 // 92-99%

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return { vehicleNo, confidence }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function validateImageFile(
  file: File
): { valid: true } | { valid: false; error: string } {
  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file type: ${file.type}. Allowed types: JPG, JPEG, PNG`,
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum: 10MB`,
    }
  }

  return { valid: true }
}

// ============================================================================
// API ROUTE HANDLER
// ============================================================================

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || ""

    let vehicleNo: string
    let confidence: number
    let action = "entry"

    // ========================================================================
    // HANDLE FORMDATA (Image Upload)
    // ========================================================================
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const imageFile = formData.get("image") as File | null
      action = (formData.get("action") as string) || "entry"

      if (!imageFile) {
        return NextResponse.json(
          { success: false, error: "No image file provided" },
          { status: 400 }
        )
      }

      // Validate the image file
      const validation = validateImageFile(imageFile)
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        )
      }

      // Convert file to buffer for processing
      const arrayBuffer = await imageFile.arrayBuffer()
      const imageBuffer = Buffer.from(arrayBuffer)

      // Process image with OCR
      const ocrResult = await processImageOCR(imageBuffer, imageFile.type)
      vehicleNo = ocrResult.vehicleNo
      confidence = ocrResult.confidence

      console.log(`[OCR] Detected plate: ${vehicleNo} (${confidence.toFixed(1)}% confidence)`)
    }
    // ========================================================================
    // HANDLE JSON (Legacy/Testing)
    // ========================================================================
    else if (contentType.includes("application/json")) {
      const body = await request.json()
      vehicleNo = body.vehicleNo
      action = body.action || "entry"
      confidence = 95 + Math.random() * 5

      if (!vehicleNo) {
        return NextResponse.json(
          { success: false, error: "Vehicle number is required" },
          { status: 400 }
        )
      }
    }
    // ========================================================================
    // UNSUPPORTED CONTENT TYPE
    // ========================================================================
    else {
      return NextResponse.json(
        { success: false, error: "Unsupported content type. Use multipart/form-data or application/json" },
        { status: 400 }
      )
    }

    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // ========================================================================
    // HANDLE EXIT ACTION
    // ========================================================================
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
            confidence: Math.round(confidence * 10) / 10,
          },
        })
      }

      return NextResponse.json(
        { success: false, error: "Failed to process vehicle exit" },
        { status: 500 }
      )
    }

    // ========================================================================
    // HANDLE ENTRY ACTION
    // ========================================================================
    
    // Check vehicle status in the system
    const vehicleCheck = checkVehicleStatus(vehicleNo)

    // Handle BLACKLISTED vehicle
    if (vehicleCheck.status === "blacklisted") {
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
    const availableSlot = getFirstAvailableSlot()

    if (!availableSlot) {
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
  } catch (error) {
    console.error("[detect-vehicle] Error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 400 }
    )
  }
}
