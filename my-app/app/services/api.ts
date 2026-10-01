import axios from "axios"


export const api = axios.create({
    baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`
})

export function errorMessage (error: unknown): string {
    if(axios.isAxiosError(error) && error.response?.data.message)
        return error.response.data.message
    
    return "Não foi possível conectar com a API"
}