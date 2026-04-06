"use client"

import { useState, useCallback } from "react"
import { ParkingSidebar } from "@/components/parking-sidebar"
import {
  Upload,
  Camera,
  Car,
  User,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  ParkingCircle,
  Clock,
  ScanLine,
  Sparkles,
  Image as ImageIcon,
  X,
  CheckCircle2,
  Loader2,
  Eye,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"

type AuthStatus = "authorized" | "unauthorized" | "blacklisted" | null
type ProcessingState = "idle" | "uploading" | "processing" | "complete"

interface VehicleDetails {
  vehicleNo: string
  owner: string
  type: string
  status: AuthStatus
  slot: string | null
  entryTime: string
  confidence: number
}

const recentScans = [
  {
    vehicleNo: "KA 01 AB 1234",
    owner: "John Doe",
    type: "Sedan",
    time: "09:45 AM",
    status: "authorized" as AuthStatus,
    confidence: 98,
  },
  {
    vehicleNo: "MH 02 CD 5678",
    owner: "Sarah Wilson",
    type: "SUV",
    time: "09:38 AM",
    status: "authorized" as AuthStatus,
    confidence: 95,
  },
  {
    vehicleNo: "DL 03 EF 9012",
    owner: "Unknown",
    type: "Hatchback",
    time: "09:22 AM",
    status: "unauthorized" as AuthStatus,
    confidence: 92,
  },
  {
    vehicleNo: "TN 04 GH 3456",
    owner: "Mike Chen",
    type: "Sedan",
    time: "09:15 AM",
    status: "authorized" as AuthStatus,
    confidence: 99,
  },
  {
    vehicleNo: "GJ 05 IJ 7890",
    owner: "Blacklisted",
    type: "SUV",
    time: "09:02 AM",
    status: "blacklisted" as AuthStatus,
    confidence: 97,
  },
]

const statusConfig = {
  authorized: {
    label: "Authorized",
    icon: ShieldCheck,
    bgColor: "bg-lime-500/15",
    borderColor: "border-lime-500/40",
    textColor: "text-lime-400",
    shadowColor: "shadow-lime-500/20",
    glowColor: "bg-lime-500/20",
  },
  unauthorized: {
    label: "Unauthorized",
    icon: ShieldAlert,
    bgColor: "bg-amber-500/15",
    borderColor: "border-amber-500/40",
    textColor: "text-amber-400",
    shadowColor: "shadow-amber-500/20",
    glowColor: "bg-amber-500/20",
  },
  blacklisted: {
    label: "Blacklisted",
    icon: ShieldX,
    bgColor: "bg-red-500/15",
    borderColor: "border-red-500/40",
    textColor: "text-red-400",
    shadowColor: "shadow-red-500/20",
    glowColor: "bg-red-500/20",
  },
}

export default function VehicleUploadPage() {
  const [processingState, setProcessingState] = useState<ProcessingState>("idle")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | null>(null)

  const simulateProcessing = useCallback(() => {
    setProcessingState("uploading")

    setTimeout(() => {
      setProcessingState("processing")
    }, 1000)

    setTimeout(() => {
      setVehicleDetails({
        vehicleNo: "KA 05 MX 7892",
        owner: "Alex Thompson",
        type: "Sedan",
        status: "authorized",
        slot: "A-12",
        entryTime: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        confidence: 97,
      })
      setProcessingState("complete")
    }, 3000)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setUploadedImage(event.target?.result as string)
          simulateProcessing()
        }
        reader.readAsDataURL(file)
      }
    },
    [simulateProcessing]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setUploadedImage(event.target?.result as string)
          simulateProcessing()
        }
        reader.readAsDataURL(file)
      }
    },
    [simulateProcessing]
  )

  const resetUpload = () => {
    setUploadedImage(null)
    setProcessingState("idle")
    setVehicleDetails(null)
  }

  const StatusBadge = ({ status }: { status: AuthStatus }) => {
    if (!status) return null
    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-xl ${config.bgColor} ${config.borderColor} ${config.textColor} ${config.shadowColor}`}
      >
        <Icon className="h-4 w-4" />
        {config.label}
      </span>
    )
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Ambient background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-lime-500/10 blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-lime-500/5 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-lime-500/5 blur-[100px]" />
        <div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-sky-500/5 blur-[80px]" />
      </div>

      {/* Sidebar */}
      <ParkingSidebar />

      {/* Main Content */}
      <main className="relative flex-1 overflow-auto p-5 sm:p-8 lg:p-10">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-800/50 p-10 backdrop-blur-3xl lg:p-12">
          {/* Decorative glows */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lime-500/20 blur-[100px]" />
          <div className="absolute -bottom-10 left-1/4 h-60 w-60 rounded-full bg-lime-500/10 blur-[80px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5 lg:max-w-xl">
              {/* Status badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-lime-500/40 bg-lime-500/15 px-5 py-2.5 text-sm font-semibold text-lime-400 shadow-xl shadow-lime-500/20">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered ANPR
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/15 px-5 py-2.5 text-sm font-semibold text-sky-400 shadow-xl shadow-sky-500/20">
                  <Activity className="h-4 w-4" />
                  System Ready
                </span>
              </div>

              <div>
                <h1 className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-5xl">
                  Vehicle Upload
                </h1>
                <h2 className="mt-1 bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-5xl">
                  & Recognition
                </h2>
              </div>

              <p className="max-w-lg text-lg leading-relaxed text-zinc-400">
                Upload vehicle images for instant license plate recognition. Our AI-powered system detects, validates, and assigns parking slots automatically.
              </p>
            </div>

            {/* Camera Preview Placeholder */}
            <div className="relative w-full max-w-sm lg:w-80">
              <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/80 p-1 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-lime-500/30 hover:shadow-lime-500/10">
                <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-zinc-800">
                  {/* Scan lines effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-500/5 to-transparent opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                    <div className="relative">
                      <Camera className="h-12 w-12 text-zinc-600" />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-lime-500" />
                    </div>
                    <span className="text-sm font-medium text-zinc-500">Live Camera Feed</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-xs font-medium text-lime-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
                      </span>
                      Live
                    </span>
                  </div>
                  {/* Corner brackets */}
                  <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-lime-500/50" />
                  <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-lime-500/50" />
                  <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-lime-500/50" />
                  <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-lime-500/50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload and Results Grid */}
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {/* Upload Area */}
          <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:border-lime-500/20 hover:shadow-lime-500/5">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-500/10 blur-[60px] transition-all duration-500 group-hover:bg-lime-500/15" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/15">
                    <Upload className="h-5 w-5 text-lime-400" />
                  </div>
                  Upload Vehicle Image
                </h3>
                {uploadedImage && (
                  <button
                    onClick={resetUpload}
                    className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-700"
                  >
                    <X className="h-4 w-4" />
                    Reset
                  </button>
                )}
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed transition-all duration-300 ${
                  isDragOver
                    ? "border-lime-500 bg-lime-500/10"
                    : uploadedImage
                      ? "border-lime-500/30 bg-zinc-800/50"
                      : "border-zinc-700 bg-zinc-800/30 hover:border-lime-500/50 hover:bg-zinc-800/50"
                }`}
              >
                {uploadedImage ? (
                  <div className="relative h-full w-full p-4">
                    <Image
                      src={uploadedImage}
                      alt="Uploaded vehicle"
                      fill
                      className="rounded-xl object-contain"
                    />
                    {/* Processing overlay */}
                    {processingState !== "complete" && processingState !== "idle" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-zinc-900/80 backdrop-blur-sm">
                        {processingState === "uploading" && (
                          <>
                            <Loader2 className="h-12 w-12 animate-spin text-lime-400" />
                            <span className="mt-4 text-lg font-medium text-white">Uploading...</span>
                          </>
                        )}
                        {processingState === "processing" && (
                          <>
                            <div className="relative">
                              <ScanLine className="h-16 w-16 animate-pulse text-lime-400" />
                              <div className="absolute inset-0 animate-ping">
                                <ScanLine className="h-16 w-16 text-lime-400/30" />
                              </div>
                            </div>
                            <span className="mt-4 text-lg font-medium text-white">Processing with AI...</span>
                            <span className="mt-2 text-sm text-zinc-400">Detecting license plate</span>
                          </>
                        )}
                      </div>
                    )}
                    {processingState === "complete" && (
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-lime-500/30 bg-lime-500/10 px-4 py-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-lime-400">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-medium">Detection Complete</span>
                          <span className="ml-auto text-sm">{vehicleDetails?.confidence}% Confidence</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center gap-4 p-8">
                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-700/50 transition-all duration-300 group-hover:bg-lime-500/20">
                        <ImageIcon className="h-10 w-10 text-zinc-400 transition-colors group-hover:text-lime-400" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-lg bg-lime-500 shadow-lg shadow-lime-500/30">
                        <Upload className="h-4 w-4 text-zinc-900" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-zinc-300">Drop vehicle image here</p>
                      <p className="mt-1 text-sm text-zinc-500">or click to browse files</p>
                    </div>
                    <span className="mt-2 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-400">
                      Supports JPG, PNG, WEBP
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Upload Button */}
              {!uploadedImage && (
                <label className="group/btn mt-6 flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-lime-500 to-lime-400 px-8 py-4 text-lg font-semibold text-zinc-900 shadow-xl shadow-lime-500/25 transition-all duration-300 hover:shadow-lime-500/40 hover:brightness-110">
                  <Upload className="h-5 w-5" />
                  Select Image to Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* OCR Result & Vehicle Details */}
          <div className="flex flex-col gap-8">
            {/* OCR Result Card */}
            <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:border-lime-500/20 hover:shadow-lime-500/5">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-lime-500/10 blur-[60px]" />

              <div className="relative">
                <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/15">
                    <ScanLine className="h-5 w-5 text-lime-400" />
                  </div>
                  OCR Detection Result
                  {vehicleDetails && (
                    <span className="ml-auto flex items-center gap-1.5 rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-xs font-medium text-lime-400">
                      <Zap className="h-3.5 w-3.5" />
                      {vehicleDetails.confidence}% Match
                    </span>
                  )}
                </h3>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8">
                  {processingState === "complete" && vehicleDetails ? (
                    <div className="text-center">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-xl bg-lime-500/10 px-6 py-4">
                        <Car className="h-8 w-8 text-lime-400" />
                        <span className="text-3xl font-bold tracking-widest text-white">
                          {vehicleDetails.vehicleNo}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400">License Plate Detected Successfully</p>
                    </div>
                  ) : processingState === "processing" ? (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <div className="relative h-16 w-32 overflow-hidden rounded-lg border border-lime-500/30 bg-zinc-900">
                        <div className="animate-scan absolute inset-0 bg-gradient-to-b from-lime-500/30 via-lime-500/50 to-lime-500/30" />
                      </div>
                      <span className="text-zinc-400">Scanning license plate...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-4 text-zinc-500">
                      <Eye className="h-12 w-12 opacity-50" />
                      <span>Awaiting vehicle image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle Details Card */}
            <div
              className={`group relative overflow-hidden rounded-[1.75rem] border bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:shadow-lime-500/5 ${
                vehicleDetails?.status === "blacklisted"
                  ? "border-red-500/30 hover:border-red-500/40"
                  : vehicleDetails?.status === "unauthorized"
                    ? "border-amber-500/30 hover:border-amber-500/40"
                    : "border-white/10 hover:border-lime-500/20"
              }`}
            >
              {/* Conditional glow based on status */}
              {vehicleDetails && (
                <div
                  className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[60px] ${
                    statusConfig[vehicleDetails.status!]?.glowColor || "bg-lime-500/10"
                  }`}
                />
              )}

              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-3 text-xl font-semibold text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/15">
                      <Shield className="h-5 w-5 text-lime-400" />
                    </div>
                    Vehicle Details
                  </h3>
                  {vehicleDetails && <StatusBadge status={vehicleDetails.status} />}
                </div>

                {processingState === "complete" && vehicleDetails ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-700/50">
                        <User className="h-6 w-6 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Owner Name</p>
                        <p className="font-semibold text-white">{vehicleDetails.owner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-700/50">
                        <Car className="h-6 w-6 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Vehicle Type</p>
                        <p className="font-semibold text-white">{vehicleDetails.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-700/50">
                        <ParkingCircle className="h-6 w-6 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Assigned Slot</p>
                        <p className="font-semibold text-lime-400">{vehicleDetails.slot || "Pending"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-700/50">
                        <Clock className="h-6 w-6 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Entry Time</p>
                        <p className="font-semibold text-white">{vehicleDetails.entryTime}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-700/50 bg-zinc-800/30 py-12 text-zinc-500">
                    <Shield className="mb-3 h-12 w-12 opacity-50" />
                    <span>Vehicle details will appear here</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scanned Vehicles */}
        <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:border-lime-500/20 hover:shadow-lime-500/5">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-lime-500/10 blur-[80px]" />

          <div className="relative">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="flex items-center gap-3 text-xl font-semibold text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/15">
                  <Clock className="h-5 w-5 text-lime-400" />
                </div>
                Recent Scanned Vehicles
              </h3>
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-medium text-lime-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                </span>
                Live Updates
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-700/50">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700/50 bg-zinc-800/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">Vehicle No.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">Owner</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">Confidence</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan, index) => {
                    const config = statusConfig[scan.status!]
                    const Icon = config.icon

                    return (
                      <tr
                        key={index}
                        className="border-b border-zinc-700/30 transition-colors hover:bg-zinc-800/30"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono font-semibold text-white">{scan.vehicleNo}</span>
                        </td>
                        <td className="px-6 py-4 text-zinc-300">{scan.owner}</td>
                        <td className="px-6 py-4 text-zinc-400">{scan.type}</td>
                        <td className="px-6 py-4 text-zinc-400">{scan.time}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-500/10 px-3 py-1 text-sm font-medium text-lime-400">
                            {scan.confidence}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${config.bgColor} ${config.borderColor} ${config.textColor}`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {config.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}