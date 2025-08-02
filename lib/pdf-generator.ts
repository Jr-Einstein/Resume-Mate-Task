import jsPDF from "jspdf"
import type { UserData } from "@/types/user"

export const generatePDF = (userData: UserData): jsPDF => {
  const doc = new jsPDF()

  // Set font
  doc.setFont("helvetica")

  // Add border
  doc.setLineWidth(1)
  doc.rect(20, 20, 170, 120)

  // Add content with proper spacing
  let yPosition = 40
  const lineHeight = 15

  // Name
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Name:", 30, yPosition)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(128, 128, 128)
  doc.text(userData.name, 80, yPosition)

  yPosition += lineHeight

  // Email
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.text("Email:", 30, yPosition)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(128, 128, 128)
  doc.text(userData.email, 80, yPosition)

  yPosition += lineHeight

  // Phone Number
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.text("Phone Number:", 30, yPosition)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(128, 128, 128)
  doc.text(userData.phone, 80, yPosition)

  yPosition += lineHeight

  // Position
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.text("Position:", 30, yPosition)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(128, 128, 128)
  doc.text(userData.position, 80, yPosition)

  yPosition += lineHeight

  // Description
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.text("Description:", 30, yPosition)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(128, 128, 128)

  // Handle multiline description
  const splitDescription = doc.splitTextToSize(userData.description, 100)
  doc.text(splitDescription, 80, yPosition)

  return doc
}

export const downloadPDF = (userData: UserData) => {
  const doc = generatePDF(userData)
  doc.save(`${userData.name.replace(/\s+/g, "_")}_details.pdf`)
}
