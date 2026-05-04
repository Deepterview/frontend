import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  login: () => {},
  logout: () => {},
});

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
