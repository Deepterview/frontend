import api, { API_BASE_URL } from "../lib/api";
import type { User } from "../types";

export const authService = {
  getProfile: async (): Promise<User> => {
    const res = await api.get("/api/v1/users/me");
    return res.data.data;
  },

  getGoogleAuthUrl: () => `${API_BASE_URL}/api/v1/auth/google`,
  getKakaoAuthUrl: () => `${API_BASE_URL}/api/v1/auth/kakao`,
};
