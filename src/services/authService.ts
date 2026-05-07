import type { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const authService = {
  getProfile: async (token: string): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },

  getGoogleAuthUrl: () => `${API_BASE_URL}/api/v1/auth/google`,
  getKakaoAuthUrl: () => `${API_BASE_URL}/api/v1/auth/kakao`,
};
