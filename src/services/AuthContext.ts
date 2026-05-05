import { createContext } from "react";

interface AuthContextType {
  isLogged: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setIsLogged: (isLogged: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  setIsLogged: () => {},
  accessToken: null,
  setAccessToken: () => {},
  login: () => {},
  logout: () => {},
});
