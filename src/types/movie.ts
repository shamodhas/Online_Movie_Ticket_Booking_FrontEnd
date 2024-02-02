export type Movie = {
  id?: string;
  name: string;
  director: string;
  language: string;
  description: string;
  startDate: Date;
  endDate: Date;
  trailerLink: string;
  imageUrl: string;
  status?: string;
  user?: string;
};
