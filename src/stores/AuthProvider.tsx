import { useState, type ReactNode } from "react";
import { AuthContext } from "../services/AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  //login
  const login = (token: string) => {
    localStorage.setItem("accesstoken", token);
    setAccessToken(token);
    setIsLogged(true);
  };

  //logout
  const logout = () => {
    localStorage.removeItem("accesstoken");
    setAccessToken(null);
    setIsLogged(false);
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLogged,
        setIsLogged,
        setAccessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
