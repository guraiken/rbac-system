import { api } from "./api";

export type Session = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
  };
};

export async function login(email: string, password: string): Promise<Session> {
  const response = await api.post<Session>("/login", { email, password });

  localStorage.setItem("session", JSON.stringify(response.data));

  return response.data;
}

export function getSession(): Session | null {
  const stored = localStorage.getItem("session");

  if (!stored) {
    return null;
  }

  return JSON.parse(stored) as Session;
}

export function logout() {
  localStorage.removeItem("session");
}