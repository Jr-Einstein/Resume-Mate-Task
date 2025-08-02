"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import FormInput from "@/components/form-input"
import type { UserData, ValidationErrors } from "@/types/user"
import { validateForm } from "@/lib/validation"
import { downloadPDF } from "@/lib/pdf-generator"

export default function HomePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    description: "",
  })
  const [errors, setErrors] = useState<ValidationErrors>({})

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleViewPDF = () => {
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Store data in localStorage for the preview page
    localStorage.setItem("userData", JSON.stringify(formData))
    router.push("/preview")
  }

  const handleDownloadPDF = () => {
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    downloadPDF(formData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-base font-bold text-center text-gray-900 mb-3">Add Your details</h1>

        <div className="space-y-2 mb-3">
          <FormInput
            icon="user.svg"
            label="Name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            error={errors.name}
          />

          <FormInput
            icon="mail.svg"
            label="Email"
            placeholder="e.g. Johndoe@gmail.com"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            error={errors.email}
          />

          <FormInput
            icon="phone-call.svg"
            label="Phone Number"
            placeholder="e.g. (220) 222-2002"
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            error={errors.phone}
          />

          <FormInput
            icon="position.svg"
            label="Position"
            placeholder="e.g. Junior Front end Developer"
            value={formData.position}
            onChange={(value) => handleInputChange("position", value)}
          />

          <FormInput
            icon="Description.svg"
            label="Description"
            placeholder="e.g. Work experiences"
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
            multiline
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleViewPDF}
            className="flex-1 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-medium py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md text-sm"
          >
            <Image src="/icons/view.svg" alt="View" width={14} height={14} className="filter brightness-0 invert" />
            View PDF
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-medium py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md text-sm"
          >
            <Image
              src="/icons/Download.svg"
              alt="Download"
              width={14}
              height={14}
              className="filter brightness-0 invert"
            />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
