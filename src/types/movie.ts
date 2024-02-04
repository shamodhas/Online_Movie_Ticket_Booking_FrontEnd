import { User } from "./user";

export type Movie = {
  id?: string;
  _id?: string;
  name: string;
  director: string;
  language: string;
  description: string;
  startDate: Date;
  endDate: Date;
  trailerLink: string;
  imageUrl: string;
  status?: string;
  user?: User;
};
