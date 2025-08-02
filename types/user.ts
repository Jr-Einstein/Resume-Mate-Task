export interface UserData {
  name: string
  email: string
  phone: string
  position: string
  description: string
}

export interface ValidationErrors {
  name?: string
  email?: string
  phone?: string
}
