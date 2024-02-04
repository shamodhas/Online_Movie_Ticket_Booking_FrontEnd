import { Theater } from "./theater";
import { User } from "./user";

export type Hall = {
  id?: string;
  _id?: string;
  name: string;
  hallNumber: string;
  theater?: Theater;
  user?: User;
};
