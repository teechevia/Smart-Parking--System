// Smart Parking Dashboard Fake Data
// Realistic parking system data for dashboard components

export type SlotStatus = "available" | "occupied" | "reserved" | "faculty"

export interface ParkingSlot {
  id: string
  status: SlotStatus
  vehicle?: {
    number: string
    owner: string
    type: string
    entryTime: string
  }
}

export interface VehicleEntry {
  id: string
  vehicleNo: string
  owner: string
  type: string
  time: string
  slot: string
  status: "active" | "exited"
  image?: string
}

export interface Alert {
  id: number
  title: string
  description: string
  time: string
  severity: "high" | "medium" | "low"
  type: "unauthorized" | "overstay" | "sensor" | "security" | "maintenance"
}

export interface VehicleScan {
  id: string
  vehicleNo: string
  timestamp: string
  gate: string
  action: "entry" | "exit"
  confidence: number
  image?: string
  owner: string
  status: "authorized" | "unauthorized" | "blacklisted"
}

export interface UnauthorizedVehicle {
  id: string
  vehicleNo: string
  detectedAt: string
  location: string
  image?: string
  reason: string
  status: "pending" | "resolved" | "escalated"
}

export interface BlacklistedVehicle {
  id: string
  vehicleNo: string
  owner: string
  reason: string
  addedOn: string
  addedBy: string
  status: "active" | "removed"
}

export interface DashboardStats {
  totalSlots: number
  occupiedSlots: number
  freeSlots: number
  reservedSlots: number
  facultySlots: number
  unauthorizedCount: number
  todayEntries: number
  todayExits: number
  occupancyRate: number
  trend: string
}

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  totalSlots: 248,
  occupiedSlots: 186,
  freeSlots: 54,
  reservedSlots: 24,
  facultySlots: 32,
  unauthorizedCount: 8,
  todayEntries: 342,
  todayExits: 298,
  occupancyRate: 75,
  trend: "+18%",
}

export const statsCards = [
  {
    label: "Total Slots",
    value: "248",
    icon: "ParkingCircle",
    trend: null,
    color: "lime",
    badge: null,
  },
  {
    label: "Occupied Slots",
    value: "186",
    icon: "Car",
    trend: "+12",
    color: "lime",
    badge: { text: "Live", color: "lime" },
  },
  {
    label: "Free Slots",
    value: "54",
    icon: "CircleCheck",
    trend: "-8",
    color: "lime",
    badge: null,
  },
  {
    label: "Unauthorized",
    value: "8",
    icon: "ShieldAlert",
    trend: "+2",
    color: "red",
    badge: { text: "Alert", color: "red" },
  },
]

// Parking Zones Data
export const parkingZones: Record<string, ParkingSlot[]> = {
  A: [
    { id: "A1", status: "occupied", vehicle: { number: "KA 01 AB 1234", owner: "John Doe", type: "Sedan", entryTime: "09:45 AM" } },
    { id: "A2", status: "available" },
    { id: "A3", status: "occupied", vehicle: { number: "MH 02 CD 5678", owner: "Sarah Wilson", type: "SUV", entryTime: "09:38 AM" } },
    { id: "A4", status: "reserved", vehicle: { number: "Reserved", owner: "VIP Guest", type: "N/A", entryTime: "N/A" } },
    { id: "A5", status: "available" },
    { id: "A6", status: "faculty", vehicle: { number: "DL 03 EF 9012", owner: "Dr. Mike Chen", type: "Sedan", entryTime: "08:00 AM" } },
    { id: "A7", status: "occupied", vehicle: { number: "TN 04 GH 3456", owner: "Emily Brown", type: "Hatchback", entryTime: "09:15 AM" } },
    { id: "A8", status: "available" },
  ],
  B: [
    { id: "B1", status: "available" },
    { id: "B2", status: "occupied", vehicle: { number: "GJ 05 IJ 7890", owner: "David Park", type: "SUV", entryTime: "09:02 AM" } },
    { id: "B3", status: "occupied", vehicle: { number: "RJ 06 KL 2345", owner: "Lisa Turner", type: "Sedan", entryTime: "08:55 AM" } },
    { id: "B4", status: "available" },
    { id: "B5", status: "reserved", vehicle: { number: "Reserved", owner: "Management", type: "N/A", entryTime: "N/A" } },
    { id: "B6", status: "occupied", vehicle: { number: "UP 07 MN 6789", owner: "James Lee", type: "Hatchback", entryTime: "08:48 AM" } },
    { id: "B7", status: "faculty", vehicle: { number: "HR 08 OP 0123", owner: "Prof. Anna White", type: "Sedan", entryTime: "07:45 AM" } },
    { id: "B8", status: "available" },
  ],
  C: [
    { id: "C1", status: "faculty", vehicle: { number: "MP 09 QR 4567", owner: "Dr. Robert Kim", type: "SUV", entryTime: "07:30 AM" } },
    { id: "C2", status: "occupied", vehicle: { number: "WB 10 ST 8901", owner: "Chris Johnson", type: "Sedan", entryTime: "08:30 AM" } },
    { id: "C3", status: "available" },
    { id: "C4", status: "occupied", vehicle: { number: "AP 11 UV 2345", owner: "Nancy Davis", type: "Hatchback", entryTime: "08:22 AM" } },
    { id: "C5", status: "occupied", vehicle: { number: "KL 12 WX 6789", owner: "Mark Wilson", type: "SUV", entryTime: "08:15 AM" } },
    { id: "C6", status: "reserved", vehicle: { number: "Reserved", owner: "Executive", type: "N/A", entryTime: "N/A" } },
    { id: "C7", status: "available" },
    { id: "C8", status: "occupied", vehicle: { number: "PB 13 YZ 0123", owner: "Kate Miller", type: "Sedan", entryTime: "08:05 AM" } },
  ],
  D: [
    { id: "D1", status: "available" },
    { id: "D2", status: "available" },
    { id: "D3", status: "occupied", vehicle: { number: "CH 14 AB 4567", owner: "Tom Harris", type: "SUV", entryTime: "07:55 AM" } },
    { id: "D4", status: "faculty", vehicle: { number: "JK 15 CD 8901", owner: "Dr. Sam Clark", type: "Sedan", entryTime: "07:20 AM" } },
    { id: "D5", status: "available" },
    { id: "D6", status: "occupied", vehicle: { number: "GA 16 EF 2345", owner: "Rachel Green", type: "Hatchback", entryTime: "07:40 AM" } },
    { id: "D7", status: "available" },
    { id: "D8", status: "reserved", vehicle: { number: "Reserved", owner: "Visitor Bay", type: "N/A", entryTime: "N/A" } },
  ],
}

// Recent Vehicle Entries
export const recentEntries: VehicleEntry[] = [
  {
    id: "entry-001",
    vehicleNo: "KA 01 AB 1234",
    owner: "John Doe",
    type: "Sedan",
    time: "09:45 AM",
    slot: "A1",
    status: "active",
  },
  {
    id: "entry-002",
    vehicleNo: "MH 02 CD 5678",
    owner: "Sarah Wilson",
    type: "SUV",
    time: "09:38 AM",
    slot: "A3",
    status: "active",
  },
  {
    id: "entry-003",
    vehicleNo: "DL 03 EF 9012",
    owner: "Mike Chen",
    type: "Hatchback",
    time: "09:22 AM",
    slot: "B6",
    status: "active",
  },
  {
    id: "entry-004",
    vehicleNo: "TN 04 GH 3456",
    owner: "Emily Brown",
    type: "Sedan",
    time: "09:15 AM",
    slot: "A7",
    status: "active",
  },
  {
    id: "entry-005",
    vehicleNo: "GJ 05 IJ 7890",
    owner: "David Park",
    type: "SUV",
    time: "09:02 AM",
    slot: "B2",
    status: "active",
  },
  {
    id: "entry-006",
    vehicleNo: "RJ 06 KL 2345",
    owner: "Lisa Turner",
    type: "Sedan",
    time: "08:55 AM",
    slot: "B3",
    status: "active",
  },
  {
    id: "entry-007",
    vehicleNo: "UP 07 MN 6789",
    owner: "James Lee",
    type: "Hatchback",
    time: "08:48 AM",
    slot: "C4",
    status: "active",
  },
  {
    id: "entry-008",
    vehicleNo: "WB 10 ST 8901",
    owner: "Chris Johnson",
    type: "Sedan",
    time: "08:30 AM",
    slot: "C2",
    status: "active",
  },
]

// System Alerts
export const alerts: Alert[] = [
  {
    id: 1,
    title: "Unauthorized Vehicle Detected",
    description: "Slot B-07 - Vehicle without valid permit detected by AI camera",
    time: "Just now",
    severity: "high",
    type: "unauthorized",
  },
  {
    id: 2,
    title: "Overstay Warning",
    description: "Slot A-15 - Vehicle exceeded maximum 4-hour parking limit",
    time: "5 min ago",
    severity: "medium",
    type: "overstay",
  },
  {
    id: 3,
    title: "Sensor Malfunction",
    description: "Slot C-22 - Ground proximity sensor offline since 8:45 AM",
    time: "12 min ago",
    severity: "high",
    type: "sensor",
  },
  {
    id: 4,
    title: "Security Breach Attempt",
    description: "Gate 2 - Multiple failed access attempts detected",
    time: "18 min ago",
    severity: "high",
    type: "security",
  },
  {
    id: 5,
    title: "Battery Low",
    description: "Zone D sensor array battery below 15%",
    time: "25 min ago",
    severity: "medium",
    type: "maintenance",
  },
  {
    id: 6,
    title: "Double Parking Alert",
    description: "Slot D-03 - Vehicle partially blocking adjacent slot D-04",
    time: "32 min ago",
    severity: "medium",
    type: "unauthorized",
  },
  {
    id: 7,
    title: "Blacklisted Vehicle Entry",
    description: "Gate 1 - Vehicle MH 12 XY 9999 attempted entry, access denied",
    time: "45 min ago",
    severity: "high",
    type: "security",
  },
  {
    id: 8,
    title: "Maintenance Required",
    description: "Slot A-08 - Ground marking needs repainting",
    time: "1 hour ago",
    severity: "low",
    type: "maintenance",
  },
]

// Vehicle Scan History
export const vehicleScanHistory: VehicleScan[] = [
  {
    id: "scan-001",
    vehicleNo: "KA 01 AB 1234",
    timestamp: "09:45:23 AM",
    gate: "Gate 1 - Main Entry",
    action: "entry",
    confidence: 98.5,
    owner: "John Doe",
    status: "authorized",
  },
  {
    id: "scan-002",
    vehicleNo: "MH 02 CD 5678",
    timestamp: "09:38:15 AM",
    gate: "Gate 1 - Main Entry",
    action: "entry",
    confidence: 97.2,
    owner: "Sarah Wilson",
    status: "authorized",
  },
  {
    id: "scan-003",
    vehicleNo: "TN 99 ZZ 0000",
    timestamp: "09:32:45 AM",
    gate: "Gate 2 - West Entry",
    action: "entry",
    confidence: 94.8,
    owner: "Unknown",
    status: "unauthorized",
  },
  {
    id: "scan-004",
    vehicleNo: "DL 03 EF 9012",
    timestamp: "09:22:10 AM",
    gate: "Gate 1 - Main Entry",
    action: "entry",
    confidence: 99.1,
    owner: "Mike Chen",
    status: "authorized",
  },
  {
    id: "scan-005",
    vehicleNo: "AP 55 HH 4444",
    timestamp: "09:15:30 AM",
    gate: "Gate 2 - West Entry",
    action: "exit",
    confidence: 96.7,
    owner: "Robert Kim",
    status: "authorized",
  },
  {
    id: "scan-006",
    vehicleNo: "MH 12 XY 9999",
    timestamp: "09:10:05 AM",
    gate: "Gate 1 - Main Entry",
    action: "entry",
    confidence: 99.8,
    owner: "Blocked User",
    status: "blacklisted",
  },
  {
    id: "scan-007",
    vehicleNo: "GJ 05 IJ 7890",
    timestamp: "09:02:18 AM",
    gate: "Gate 1 - Main Entry",
    action: "entry",
    confidence: 97.9,
    owner: "David Park",
    status: "authorized",
  },
  {
    id: "scan-008",
    vehicleNo: "RJ 06 KL 2345",
    timestamp: "08:55:42 AM",
    gate: "Gate 2 - West Entry",
    action: "entry",
    confidence: 98.3,
    owner: "Lisa Turner",
    status: "authorized",
  },
  {
    id: "scan-009",
    vehicleNo: "KA 22 BB 7777",
    timestamp: "08:48:15 AM",
    gate: "Gate 1 - Main Entry",
    action: "exit",
    confidence: 96.1,
    owner: "Alex Murphy",
    status: "authorized",
  },
  {
    id: "scan-010",
    vehicleNo: "UP 07 MN 6789",
    timestamp: "08:40:33 AM",
    gate: "Gate 1 - Main Entry",
    action: "entry",
    confidence: 98.7,
    owner: "James Lee",
    status: "authorized",
  },
]

// Unauthorized Vehicles
export const unauthorizedVehicles: UnauthorizedVehicle[] = [
  {
    id: "unauth-001",
    vehicleNo: "TN 99 ZZ 0000",
    detectedAt: "09:32 AM",
    location: "Slot B-07",
    reason: "No valid parking permit found in database",
    status: "pending",
  },
  {
    id: "unauth-002",
    vehicleNo: "KA 88 XX 1111",
    detectedAt: "09:05 AM",
    location: "Slot C-15",
    reason: "Expired visitor pass (expired 2 days ago)",
    status: "escalated",
  },
  {
    id: "unauth-003",
    vehicleNo: "DL 44 YY 2222",
    detectedAt: "08:45 AM",
    location: "Gate 2 - Attempted Entry",
    reason: "Vehicle not registered in system",
    status: "pending",
  },
  {
    id: "unauth-004",
    vehicleNo: "MH 55 WW 3333",
    detectedAt: "08:22 AM",
    location: "Slot A-12",
    reason: "Wrong parking zone - registered for Zone D only",
    status: "resolved",
  },
  {
    id: "unauth-005",
    vehicleNo: "GJ 66 VV 4444",
    detectedAt: "07:58 AM",
    location: "Faculty Zone C-01",
    reason: "Non-faculty vehicle in faculty parking",
    status: "pending",
  },
  {
    id: "unauth-006",
    vehicleNo: "RJ 77 UU 5555",
    detectedAt: "07:35 AM",
    location: "Reserved Slot A-04",
    reason: "Parked in VIP reserved slot",
    status: "escalated",
  },
  {
    id: "unauth-007",
    vehicleNo: "WB 33 TT 6666",
    detectedAt: "07:12 AM",
    location: "Slot D-08",
    reason: "Permit suspended for outstanding fees",
    status: "pending",
  },
  {
    id: "unauth-008",
    vehicleNo: "PB 22 SS 7777",
    detectedAt: "06:48 AM",
    location: "Gate 1 - Attempted Entry",
    reason: "Forged/invalid parking permit detected",
    status: "escalated",
  },
]

// Blacklisted Vehicles
export const blacklistedVehicles: BlacklistedVehicle[] = [
  {
    id: "black-001",
    vehicleNo: "MH 12 XY 9999",
    owner: "Anonymous",
    reason: "Multiple hit-and-run incidents in parking lot",
    addedOn: "March 15, 2026",
    addedBy: "Security Admin",
    status: "active",
  },
  {
    id: "black-002",
    vehicleNo: "KA 44 AB 0000",
    owner: "Former Employee",
    reason: "Employment terminated - access revoked",
    addedOn: "March 10, 2026",
    addedBy: "HR Department",
    status: "active",
  },
  {
    id: "black-003",
    vehicleNo: "DL 88 ZZ 1234",
    owner: "Unknown",
    reason: "Repeated unauthorized parking violations (5+ times)",
    addedOn: "March 5, 2026",
    addedBy: "Security Admin",
    status: "active",
  },
  {
    id: "black-004",
    vehicleNo: "TN 66 QQ 5678",
    owner: "John Smith",
    reason: "Property damage to parking infrastructure",
    addedOn: "February 28, 2026",
    addedBy: "Facility Manager",
    status: "active",
  },
  {
    id: "black-005",
    vehicleNo: "GJ 11 PP 9012",
    owner: "Jane Doe",
    reason: "Outstanding parking fees - $500+",
    addedOn: "February 20, 2026",
    addedBy: "Finance Department",
    status: "removed",
  },
  {
    id: "black-006",
    vehicleNo: "AP 99 OO 3456",
    owner: "Unknown",
    reason: "Suspected theft attempt in parking area",
    addedOn: "February 15, 2026",
    addedBy: "Security Admin",
    status: "active",
  },
  {
    id: "black-007",
    vehicleNo: "UP 55 NN 7890",
    owner: "Mike Johnson",
    reason: "Aggressive behavior towards security staff",
    addedOn: "February 8, 2026",
    addedBy: "Security Admin",
    status: "active",
  },
  {
    id: "black-008",
    vehicleNo: "HR 33 MM 2345",
    owner: "Lisa Brown",
    reason: "Permit fraud - using duplicate/forged permits",
    addedOn: "January 30, 2026",
    addedBy: "Security Admin",
    status: "active",
  },
]

// Hourly Usage Data for Charts
export const hourlyUsageData = [
  { hour: "6AM", usage: 20, entries: 15, exits: 5 },
  { hour: "7AM", usage: 35, entries: 42, exits: 12 },
  { hour: "8AM", usage: 65, entries: 68, exits: 18 },
  { hour: "9AM", usage: 78, entries: 45, exits: 22 },
  { hour: "10AM", usage: 85, entries: 28, exits: 15 },
  { hour: "11AM", usage: 88, entries: 22, exits: 18 },
  { hour: "12PM", usage: 92, entries: 35, exits: 28 },
  { hour: "1PM", usage: 90, entries: 18, exits: 22 },
  { hour: "2PM", usage: 88, entries: 25, exits: 30 },
  { hour: "3PM", usage: 82, entries: 15, exits: 25 },
  { hour: "4PM", usage: 78, entries: 20, exits: 35 },
  { hour: "5PM", usage: 65, entries: 12, exits: 48 },
  { hour: "6PM", usage: 45, entries: 8, exits: 42 },
  { hour: "7PM", usage: 32, entries: 5, exits: 28 },
  { hour: "8PM", usage: 25, entries: 3, exits: 18 },
]

// Vehicle Types Distribution
export const vehicleTypesData = [
  { type: "Sedan", count: 98, color: "#84cc16", percentage: 53 },
  { type: "SUV", count: 52, color: "#38bdf8", percentage: 28 },
  { type: "Hatchback", count: 28, color: "#fbbf24", percentage: 15 },
  { type: "Two Wheeler", count: 8, color: "#a78bfa", percentage: 4 },
]

// Zone Capacity Data
export const zoneCapacityData = [
  { id: "A", name: "Zone A", capacity: 62, occupied: 48, available: 14 },
  { id: "B", name: "Zone B", capacity: 62, occupied: 56, available: 6 },
  { id: "C", name: "Zone C", capacity: 62, occupied: 42, available: 20 },
  { id: "D", name: "Zone D", capacity: 62, occupied: 40, available: 22 },
]

// Weekly Trends
export const weeklyTrends = [
  { day: "Mon", occupancy: 72, revenue: 2450 },
  { day: "Tue", occupancy: 78, revenue: 2680 },
  { day: "Wed", occupancy: 85, revenue: 2920 },
  { day: "Thu", occupancy: 82, revenue: 2810 },
  { day: "Fri", occupancy: 88, revenue: 3050 },
  { day: "Sat", occupancy: 45, revenue: 1550 },
  { day: "Sun", occupancy: 32, revenue: 1100 },
]

// Monthly Revenue Data
export const monthlyRevenueData = [
  { month: "Jan", revenue: 78500, target: 75000 },
  { month: "Feb", revenue: 82300, target: 80000 },
  { month: "Mar", revenue: 91200, target: 85000 },
  { month: "Apr", revenue: 88700, target: 85000 },
]

// Utility functions
export function getSlotsByStatus(status: SlotStatus): ParkingSlot[] {
  const slots: ParkingSlot[] = []
  Object.values(parkingZones).forEach((zone) => {
    zone.forEach((slot) => {
      if (slot.status === status) {
        slots.push(slot)
      }
    })
  })
  return slots
}

export function countSlotsByStatus(): Record<SlotStatus, number> {
  const counts: Record<SlotStatus, number> = { available: 0, occupied: 0, reserved: 0, faculty: 0 }
  Object.values(parkingZones).forEach((zone) => {
    zone.forEach((slot) => {
      counts[slot.status]++
    })
  })
  return counts
}

export function getTotalSlots(): number {
  let total = 0
  Object.values(parkingZones).forEach((zone) => {
    total += zone.length
  })
  return total
}

export function getAlertsByPriority(severity: "high" | "medium" | "low"): Alert[] {
  return alerts.filter((alert) => alert.severity === severity)
}

export function getUnauthorizedByStatus(status: "pending" | "resolved" | "escalated"): UnauthorizedVehicle[] {
  return unauthorizedVehicles.filter((vehicle) => vehicle.status === status)
}

export function getActiveBlacklistedVehicles(): BlacklistedVehicle[] {
  return blacklistedVehicles.filter((vehicle) => vehicle.status === "active")
}
