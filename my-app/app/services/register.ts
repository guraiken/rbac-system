import {api, errorMessage} from "./api";

interface User{
    name: String,
    email: String,
    password: String
}

export async function register( {name, email, password}:User){
    const response = await api.post("/register", {
        name, 
        email,
        password
    })
    return errorMessage(response) 
}