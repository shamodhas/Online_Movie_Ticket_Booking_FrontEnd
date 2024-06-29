export enum UserRoles {
  ADMIN,
  THEATER_EMPLOYEE,
  CUSTOMER,
  GUEST
}

export const ADMIN = "Admin",
  THEATER_EMPLOYEE = "TheaterOwner",
  CUSTOMER = "Customer",
  GUEST = "Guest"

export type User = {
  id?: string
  _id?: string
  name?: string
  email?: string
  mobileNumber?: string
  profile?: string
  role: string
}
