type Login = {
  user: {
    id: string;
    avatar: string;
    age: number;
  };
  accessToken: string;
  refreshToken: string;
};

export async function fakeLogin(id?: string): Promise<Login> {
  return {
    user: {
      id: id || "hau2412",
      avatar: "",
      age: 20,
    },
    accessToken: "access-token",
    refreshToken: "refresh-token",
  };
}
