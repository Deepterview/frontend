type Login = {
  user: {
    gmail: string;
    avatar: string;
    age: number;
  };
  accessToken: string;
  refreshToken: string;
};

export async function fakeLogin(gmail?: string): Promise<Login> {
  return {
    user: {
      gmail: gmail || "abc@gmail.com",
      avatar: "",
      age: 20,
    },
    accessToken: "access-token",
    refreshToken: "refresh-token",
  };
}
