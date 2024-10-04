export interface User {
  id: number;
  name: string;
  email?: string;
  password?: string;
  phone?: string;
  picture?: string;
  city?: string;
  address?: string;
  postcode?: string;
  refresh_token?: string;
  access_token?: string;
  role: "user" | "moderator" | "admin";
  author: "no" | "yes";
  createdAt?: Date;
  updatedAt?: Date;
}
