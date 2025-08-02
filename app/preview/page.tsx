"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { UserData } from "@/types/user"
import { downloadPDF } from "@/lib/pdf-generator"

export default function PreviewPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    if (storedData) {
      setUserData(JSON.parse(storedData))
    } else {
      router.push("/")
    }
  }, [router])

  const handleBack = () => {
    router.push("/")
  }

  const handleDownloadPDF = () => {
    if (userData) {
      downloadPDF(userData)
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg border-2 border-black p-4">
        <button onClick={handleBack} className="mb-3 p-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <Image src="/icons/chevron-left.svg" alt="Back" width={18} height={18} className="opacity-60" />
        </button>

        <div className="bg-white rounded-md p-3 mb-3 shadow-sm">
          <div className="space-y-2">
            <div className="flex">
              <span className="font-bold text-gray-900 w-32 text-sm">Name:</span>
              <span className="text-gray-600 text-sm">{userData.name}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-900 w-32 text-sm">Email:</span>
              <span className="text-gray-600 text-sm">{userData.email}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-900 w-32 text-sm">Phone Number:</span>
              <span className="text-gray-600 text-sm">{userData.phone}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-900 w-32 text-sm">Position:</span>
              <span className="text-gray-600 text-sm">{userData.position}</span>
            </div>

            <div className="flex">
              <span className="font-bold text-gray-900 w-32 self-start text-sm">Description:</span>
              <span className="text-gray-600 flex-1 text-sm">{userData.description}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-medium py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md text-sm"
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
  )
}
