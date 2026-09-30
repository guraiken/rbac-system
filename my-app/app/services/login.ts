import { api } from "./api";

export type Session = {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: "ADMIN" | "USER";
    }
}

export async function login(email: string, senha: string) {
    const response = await api.post<Session>('/login', { email, senha })
    return response.data

}