type Login = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    profileImageUrl: string;
    bio: string;
  };
};

export async function fakeLogin(id: number): Promise<Login> {
  return {
    accessToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJoZWxsb0BnbWFpbC5jb20iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzc4NjA0NzMwLCJleHAiOjE3Nzg2MDgzMzB9.On6cWqU_UpUcvBhhsVGCnxIWkVxh2MkC7_aSHjJrroo",
    refreshToken: "refresh-token",
    user: {
      id: id,
      email: "jinho.kim@soongsil.ac.kr",
      name: "Kim Jinho",
      profileImageUrl:
        "https://www.anhnghethuatdulich.com/wp-content/uploads/2025/07/anh-chan-dung-trai-dep.jpg",
      bio: "Software student at Soongsil University. Interested in AI, backend development, and interview analysis systems.",
    },
  };
}
