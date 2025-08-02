"use client"

import Image from "next/image"

interface FormInputProps {
  icon: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  multiline?: boolean
  className?: string
}

export default function FormInput({
  icon,
  label,
  placeholder,
  value,
  onChange,
  error,
  multiline = false,
  className = "",
}: FormInputProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {multiline ? (
          <div className="flex items-start bg-white border border-gray-200 rounded-md p-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow focus-within:border-gray-300 focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <Image src={`/icons/${icon}`} alt={label} width={14} height={14} className="mt-1 mr-2 opacity-60" />
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-900 mb-0.5">{label}</label>
              <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-xs text-gray-500 placeholder-gray-400 border-none outline-none resize-none bg-transparent"
                rows={1}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center bg-white border border-gray-200 rounded-md p-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow focus-within:border-gray-300 focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <Image src={`/icons/${icon}`} alt={label} width={14} height={14} className="mr-2 opacity-60" />
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-900 mb-0.5">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-xs text-gray-500 placeholder-gray-400 border-none outline-none bg-transparent"
              />
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
