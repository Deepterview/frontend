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
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJoZWxsbzNAZ21haWwuY29tIiwidHlwZSI6IkFDQ0VTUyIsImlhdCI6MTc3OTE3MTMxMCwiZXhwIjoxNzc5MTc0OTEwfQ.OwObnFla_ve9RqsPCIwNq8UpiWxVsTkd0YdUGHRZZaQ",
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
