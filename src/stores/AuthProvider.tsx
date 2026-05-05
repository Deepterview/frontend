import { useState, type ReactNode } from "react";
import { AuthContext } from "../services/AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  //login
  const login = (token: string) => {
    localStorage.setItem("accesstoken", token);
    setAccessToken(token);
  };

  //logout
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

export default AuthProvider;
