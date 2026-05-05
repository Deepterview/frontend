import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Login
  const login = (token: string) => {
    localStorage.setItem("accesstoken", token);
    setAccessToken(token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("accesstoken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
