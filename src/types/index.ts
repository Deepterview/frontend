export type Auth = "login" | "register";
export type NavKey = "overview" | "resources";

export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  bio?: string;
}
