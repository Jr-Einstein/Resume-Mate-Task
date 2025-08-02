import type { UserData, ValidationErrors } from "@/types/user"

export const validateForm = (data: UserData): ValidationErrors => {
  const errors: ValidationErrors = {}

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required"
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email format"
    }
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required"
  } else {
    const phoneDigits = data.phone.replace(/\D/g, "")
    if (phoneDigits.length < 10) {
      errors.phone = "Phone number must be at least 10 digits"
    }
  }

  return errors
}
