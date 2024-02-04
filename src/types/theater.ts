import { User } from "./user";

export type Theater = {
  id?: string;
  _id?: string;
  name: string;
  location: string;
  mobileNumber: string;
  user?: User;
};
