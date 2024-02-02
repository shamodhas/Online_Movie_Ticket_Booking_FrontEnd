export enum UserRoles {
  ADMIN,
  THEATER_EMPLOYEE,
  CUSTOMER,
  GUEST,
}

export type User = {
  id?: string;
  name?: string;
  email?: string;
  mobileNumber?: string;
  profile?: string;
  role: UserRoles;
};
