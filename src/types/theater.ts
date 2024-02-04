import { User } from "./user";

export type Theater = {
  name: string;
  location: string;
  mobileNumber: string;
  user?: User;
};
