export type Auth = "login" | "register";
export type NavKey = "overview" | "resources";

export interface User {
  id: number;
  name?: string;
  email?: string;
  profileImageUrl?: string;
  bio?: string;
}
