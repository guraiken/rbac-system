import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../config/database.js"

export async function register(req, res) {
    const {name, email, password} = req.body

    if( typeof name !== "string" || name.length <= 3 || 
        typeof email !== "string" || !email.includes("@") ||
        typeof password !== "string" || password.length <= 3
    ){
        return res.status(400).json({
            message: "Informe os três campos necessários para o registro"
        })
    }

    const [users] = await db.query("SELECT id FROM users WHERE email = ?", [email])

    if(users.length > 0) {
        res.status(409).json({
            message: "Email já cadastrado!"
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    try {
        await db.query("INSERT into users (name, email, password_hash, role) VALUES (?, ?, ?, ?)", [name, email, passwordHash, "USER"]);
        return res.status(201).json({
        message: "Usuário criado com sucesso"
        })
    } catch (error) {
        return res.status(400).json({message: "Erro ao inserir usuário"})
    }
}